---
marp: true
title: "Aula 08B: Integração de APIs & O Ciclo das Duas Requisições HTTP"
theme: default
class: lead
backgroundColor: "#1E1E2E"
color: "#CDD6F4"
style: |
  h1, h2, h3 { color: #89B4FA; }
  strong { color: #F38BA8; }
  a { color: #A6E3A1; text-decoration: none; }
  code { background-color: #313244; color: #FAB387; padding: 2px 6px; border-radius: 4px; }
  pre { background-color: #181825; border-left: 4px solid #89B4FA; font-size: 0.85em; }
paginate: true
created: 2026-10-27T08:00:00
updated: 2026-10-27T08:00:00
---

> [!TIP] Apresentação
> 📽️ **<a href="/slides/aula08b.html" data-router-ignore target="_blank">Abrir Slides (Marp)</a>** — Versão para projeção em sala de aula.

# 📊 Aula 08B: Integração de APIs & O Ciclo das Duas Requisições HTTP
*TPA Laravel — Séries Temporais do Ibovespa em Períodos Pós-Eleitorais*  
**O Papel do Laravel no Servidor e do Navegador no Frontend**

---

## 🎯 O Desafio da Aula

Queremos modelar a integração e a exibição de séries temporais vinculadas a marcos do calendário eleitoral brasileiro (2º turno de 2014, 2018 e 2022).

Como o acesso a APIs de mercado financeiro impõe restrições de rede e cotações reais não foram verificadas no ambiente de ensino, nosso objetivo central é **o ciclo completo de resiliência das duas requisições HTTP** sem alegar análise de mercado realizada:

1. **Requisição 1 (Servidor):** O Laravel consome o serviço externo de cotações com timeout defensivo e contingência estrutural (`Http::get`).
2. **Requisição 2 (Navegador):** O JavaScript do cliente consome a API JSON do nosso Laravel com tratamento seguro de respostas (`fetch`).

> **Aviso Metodológico:** As datas eleitorais seguem o calendário oficial do Tribunal Superior Eleitoral (TSE: https://www.tse.jus.br/). As datas D+0 e D+30 são marcos calendários didáticos para modelagem temporal. Cotações de mercado reais não estão disponíveis neste ambiente e são tratadas sob estrutura didática com status explícito de indisponibilidade. Variações históricas refletem conjunturas macroeconômicas complexas; associação temporal **não implica causalidade**.

---

## 🧭 O Mapa das Duas Requisições HTTP

```
                    ┌──────────────────────────────────┐
                    │  API Externa de Cotações         │
                    └────────────────▲─────────────────┘
                                     │
           [Requisição 1: Servidor a Servidor (Http::get)]
           (PHP no backend; timeout defensivo; CORS não se aplica entre servidores)
                                     │
                    ┌────────────────▼─────────────────┐
                    │  Aplicação Laravel (Nosso App)   │
                    │  Controller -> Normalização JSON │
                    └────────────────▲─────────────────┘
                                     │
           [Requisição 2: Cliente ao Servidor (fetch)]
           (JavaScript no browser; validação de response.ok)
                                     │
                    ┌────────────────▼─────────────────┐
                    │  Navegador do Usuário            │
                    │  (DOM e Renderização Gráfica)    │
                    └──────────────────────────────────┘
```

---

## ⚙️ Requisição 1: O Laravel como Cliente HTTP

No backend, o Laravel faz a requisição externa utilizando a Facade `Http`:

```php
use Illuminate\Support\Facades\Http;

// Consulta o endpoint de cotações com intervalo histórico configurado
$url = 'https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?period1=1414368000&period2=1669852800&interval=1d';

// Timeout obrigatório para proteger os workers do PHP-FPM
$response = Http::withHeaders([
    'User-Agent' => 'AskLive-Finance/1.0',
])->timeout(5)->get($url);
```

**Por que a chamada externa é feita no servidor?**
- **CORS é política aplicada por navegadores:** CORS (*Cross-Origin Resource Sharing*) é um mecanismo de segurança implementado e aplicado exclusivamente por navegadores para restringir requisições HTTP entre origens distintas. Chamadas HTTP servidor-a-servidor (como as feitas pelo PHP/Laravel via `Http::get`) não passam pelo navegador e, portanto, não estão sujeitas a restrições de CORS.
- **Proteção da arquitetura:** O navegador do usuário final consome apenas a API da própria aplicação (mesma origem), mantendo eventuais chaves de acesso, credenciais e detalhes de infraestrutura encapsulados no backend.

---

## 🛡️ Tratamento Defensivo na Resposta Externa

APIs externas podem oscilar, sofrer lentidão, timeout de rede ou responder erros 4xx/5xx:

```php
try {
    $response = Http::withHeaders([
        'User-Agent' => 'AskLive-Finance/1.0',
    ])->timeout(5)->get($url);

    if ($response->successful()) { // Status 200 a 299
        $payload = $response->json() ?? [];
        $resultadoChart = $payload['chart']['result'][0] ?? null;
        $erroChart = $payload['chart']['error'] ?? null;

        // Trata payload HTTP 2xx com chart.result ausente ou com erro como inválido/indisponível
        if (!empty($resultadoChart['timestamp']) && empty($erroChart)) {
            return [
                'origem' => 'api_externa',
                'series' => $this->normalizarSeriesExternas($payload),
            ];
        }

        \Illuminate\Support\Facades\Log::warning("Resposta HTTP externa 2xx com payload inválido ou erro no chart");
    } else {
        \Illuminate\Support\Facades\Log::warning("Resposta HTTP externa com erro: " . $response->status());
    }
} catch (\Throwable $e) {
    // Trata timeouts de rede, queda de conexão ou falhas de DNS
    \Illuminate\Support\Facades\Log::warning("Exceção na chamada externa: " . $e->getMessage());
}

// Se a chamada externa falhar, oscilar ou der timeout, aciona contingência estrutural:
$historico = $this->carregarHistoricoArquivado();

if ($historico !== null) {
    return [
        'origem' => 'historico_arquivado_contingencia',
        'series' => $historico,
    ];
}

// Se o arquivo local de contingência também não estiver acessível, declara indisponibilidade:
return [
    'origem' => 'indisponivel',
    'series' => [],
];
```

> **Regra de Ouro:** Nunca deixe a sua aplicação quebrar porque o serviço de terceiro falhou. Defina timeout, capture exceções de rede e tenha sempre uma estratégia de contingência transparente.

---

## 💾 Plano de Contingência: Fallback em Arquivo Local

Se o serviço externo estiver indisponível ou bloqueado por proxy da rede escolar, carregamos a estrutura didática de contingência (arquivo JSON local com marcos calendários do TSE e cotações nulas; não se trata de série histórica de preços).

**Instalação do arquivo no projeto Laravel:**
Copie o JSON de contingência disponibilizado no material do curso (`site/static/dados/ibovespa_historico.json`) para a pasta de dados da aplicação:
```bash
mkdir -p storage/app/dados
cp /caminho/para/site/static/dados/ibovespa_historico.json storage/app/dados/
# Nota didática: o arquivo local provê contingência estrutural imediata no ambiente local.
```

```php
class IbovespaFallback
{
    /**
     * Contingência didática com estrutura arquivada em JSON:
     * Calendário eleitoral: Resoluções TSE nº 23.390/2013, 23.555/2017 e 23.674/2021.
     * Marcos temporais: D+0 e D+30 como marcos calendários didáticos.
     * Cotações: Marcadores de calendário com cotações nulas (demonstração sem dados reais não verificados).
     */
    public function carregarHistoricoArquivado(): ?array
    {
        $caminho = storage_path('app/dados/ibovespa_historico.json');
        if (!file_exists($caminho)) {
            \Illuminate\Support\Facades\Log::warning("Arquivo de contingência não encontrado em {$caminho}");
            return null;
        }

        $conteudo = json_decode(file_get_contents($caminho), true);
        return $conteudo['series'] ?? null;
    }
}
```

---

## 🚀 Expondo a API JSON do Nosso Laravel

Agora o Laravel atua como **servidor** para o nosso frontend.  
Em `routes/api.php`:

```php
use App\Http\Controllers\IbovespaController;

Route::get('/ibovespa/pos-eleicoes', [IbovespaController::class, 'index']);
```

No `IbovespaController.php`:
```php
class IbovespaController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        $resultado = $this->ibovespaService->obterCotacoes();

        if ($resultado['origem'] === 'indisponivel') {
            return response()->json([
                'mercado'       => 'B3 / Ibovespa',
                'origem_dados'  => 'indisponivel',
                'aviso'         => 'Serviço externo e arquivo local de contingência indisponíveis no momento.',
                'fontes'        => [
                    'tse'      => 'TSE - Calendário Eleitoral Oficial (Resoluções 23.390, 23.555 e 23.674)',
                    'cotacoes' => 'Demonstração indisponível.',
                ],
                'series'        => [],
            ], 503);
        }

        return response()->json([
            'mercado'       => 'B3 / Ibovespa',
            'origem_dados'  => $resultado['origem'], // 'api_externa' ou 'historico_arquivado_contingencia'
            'aviso'         => 'Estrutura didática para análise temporal. Não prova causalidade.',
            'fontes'        => [
                'tse'      => 'TSE - Calendário Eleitoral Oficial (Resoluções 23.390, 23.555 e 23.674)',
                'cotacoes' => 'Demonstração didática de estrutura sem cotações de mercado não verificadas.',
            ],
            'series'        => $resultado['series'],
        ]);
    }
}
```

---

## ⚡ Requisição 2: O Navegador como Cliente (`fetch`)

No frontend (Blade / JavaScript), o navegador consome nosso próprio endpoint:

```javascript
fetch('/api/ibovespa/pos-eleicoes')
    .then(response => {
        // ⚠️ ATENÇÃO: fetch() NÃO rejeita erro 404 ou 500!
        if (!response.ok) {
            throw new Error(`Erro na API do Laravel: HTTP ${response.status}`);
        }
        return response.json();
    })
    .then(dados => {
        console.log('Dados recebidos:', dados.series);
        const statusEl = document.getElementById('status');

        // Diferencia cotações disponíveis de demonstração com cotações indisponíveis
        const temCotacoesReais = Array.isArray(dados.series) &&
            dados.series.some(p => p.status_cotacao === 'serie_disponivel' && p.d0_fechamento !== null && p.d30_fechamento !== null);

        if (dados.origem_dados === 'indisponivel' || !temCotacoesReais) {
            if (statusEl) {
                statusEl.textContent = `Status: ${dados.origem_dados}. Cotações de mercado reais indisponíveis neste ambiente.`;
            }
            return;
        }

        renderizarGrafico(dados.series);
    })
    .catch(erro => {
        console.error('Falha de rede ou processamento:', erro.message);
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.textContent = `Falha ao carregar cotações: ${erro.message}`;
        }
    });
```

---

## ❓ A Pegadinha Fundamental do `fetch()`

> **Por que checar `if (!response.ok)` é obrigatório?**

Se o Laravel retornar status `500 (Internal Server Error)` com uma página HTML de erro:

1. O `fetch()` **NÃO** pula para o `.catch()`. A Promise é considerada resolvida com sucesso porque houve uma resposta HTTP!
2. Na linha seguinte, `response.json()` tenta fazer parse do HTML de erro como JSON.
3. O erro estoura no parse:  
   `SyntaxError: Unexpected token < in JSON at position 0`.
4. **Com `if (!response.ok)`:** você intercepta o código de status HTTP antes de tentar ler o JSON.

---

## 📈 Renderização no Frontend (Suporte Opcional)

Com os dados limpos entregues pela nossa API, o frontend desenha a série temporal somente quando há cotações válidas:

```javascript
function renderizarGrafico(series) {
    // Validação defensiva: se não houver cotações numéricas reais, exibe status e não plota gráfico vazio
    const cotacoesValidas = Array.isArray(series) &&
        series.some(p => p.status_cotacao === 'serie_disponivel' && p.d0_fechamento !== null && p.d30_fechamento !== null);
    if (!cotacoesValidas) {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.textContent = 'Visualização gráfica indisponível: cotações de mercado reais não verificadas no ambiente.';
        }
        return;
    }

    const rotulos = [];
    const cotacoes = [];

    series.forEach(ponto => {
        rotulos.push(`${ponto.ano} D+0 (${ponto.d0_data})`);
        cotacoes.push(ponto.d0_fechamento);
        rotulos.push(`${ponto.ano} D+30 (${ponto.d30_data})`);
        cotacoes.push(ponto.d30_fechamento);
    });

    const ctx = document.getElementById('graficoIbovespa').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: rotulos,
            datasets: [{
                label: 'Pontos Ibovespa (Fechamento D+0 vs D+30)',
                data: cotacoes,
                borderColor: '#89B4FA'
            }]
        }
    });
}
```

---

## ❓ Pergunta de Verificação

> **Cenário:** O desenvolvedor quer que o JavaScript no navegador faça uma requisição direta para uma API externa via `fetch('https://api.externa.com/cotacoes')`. O navegador exibe erro de CORS no console.
>
> **Por que mover essa requisição para o Laravel (`Http::get`) resolve o problema?**

1. Porque o PHP desativa a política de segurança do navegador do cliente.
2. Porque CORS é uma política de segurança aplicada pelos navegadores; requisições servidor-a-servidor não passam pelo navegador e o browser consome a própria origem da aplicação. *(Correta!)*
3. Porque o Laravel altera os cabeçalhos remotos da API de terceiros.

---

## 🗺️ Síntese: As Duas Pontas da Integração

```
[ Provedor de Dados Externo ]
          ▲
          │ (1) Http::get (Backend como cliente)
          ▼
[ Aplicação Laravel ]  <-- Valida status, normaliza dados, trata falhas
          ▲
          │ (2) fetch() (Navegador como cliente)
          ▼
[ Interface / DOM ]    <-- Checa response.ok, exibe dados e status
```

- **Backend como Cliente:** `Http::timeout(5)->get()` + checagem de status + fallback defensivo.
- **Frontend como Cliente:** `fetch()` + `if (!response.ok)` + atualização assíncrona da interface.

> 📖 **Artigo de Referência:** [[Conceitos/HTTP/consumo-api-http-e-fetch|Consumo de APIs: Http::get no Laravel e fetch() no Frontend]].

---

## 🎯 Roteiro Prático de Exercícios

1. **Ex. 1:** Criar service `IbovespaService` no Laravel com `Http::get` e timeout defensivo.
2. **Ex. 2:** Tratar defensivamente falhas de conexão, status HTTP e normalizar para o schema único da aplicação.
3. **Ex. 3:** Expor endpoint JSON próprio em `routes/api.php` entregando as séries normalizadas.
4. **Ex. 4:** Consumir o endpoint interno no Blade com `fetch()` validando `response.ok`.
5. **Ex. 5:** Implementar contingência com estrutura arquivada em JSON e declaração explícita de indisponibilidade de cotações.
6. **Ex. 6:** Implementar cálculo seguro de variação percentual tratando valores nulos defensivamente.
7. **Ex. 7:** Construir interface com feedback de loading, tratamento de falhas e renderização segura via DOM.
8. **Ex. 8:** Desafio: Validação defensiva de cotações antes de renderização gráfica em Canvas/Chart.js.
