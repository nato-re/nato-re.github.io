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
  .somente-web { display: none !important; }
paginate: true
created: 2026-10-27T08:00:00
updated: 2026-10-27T10:00:00
---

<div class="somente-web">

> [!TIP] Apresentação em Slides
> 📽️ **<a href="/slides/aula08b.html" data-router-ignore target="_blank">Abrir Slides da Aula 08B (Marp)</a>** — Versão para projeção em sala de aula.
> 📦 **<a href="/static/tpa-aula08b-base.zip" target="_blank">Download do Projeto Base (ZIP)</a>** — Aplicação executável pronta para acompanhamento prático.

</div>

# 📊 Aula 08B: Integração de APIs & O Ciclo das Duas Requisições HTTP
*TPA Laravel — Backend (Http::get) & Frontend (fetch)*  
**Séries do Ibovespa em Períodos Pós-Eleitorais: Arquitetura & Resiliência**

---

## 📦 1. Obtenção da Base & Execução Imediata

Você não precisa construir a infraestrutura do zero. Baixe a base executável completa:

- **Download direto:** `https://nato-re.github.io/static/tpa-aula08b-base.zip`
- **Setup em container descartável (sem instalar PHP/Composer no host):**

```bash
# 1. Baixar e descompactar
curl -O https://nato-re.github.io/static/tpa-aula08b-base.zip
unzip tpa-aula08b-base.zip && cd tpa-aula08b-base

# 2. Configurar ambiente e dependências
cp .env.example .env
docker run -v $PWD:/app -w /app composer:2 composer install
docker run -v $PWD:/app -w /app composer:2 php artisan key:generate

# 3. Subir o servidor de desenvolvimento
docker run --name tpa_aula08b -p 8000:8000 -v $PWD:/app -w /app composer:2 php artisan serve --host=0.0.0.0 --port=8000
```

---

## 🗺️ 2. As Duas URLs Locais & Mapa de Arquivos

Abra no seu navegador:
1. `http://localhost:8000/` &rarr; **Aplicação Web Interativa** (Blade + JS)
2. `http://localhost:8000/api/ibovespa/pos-eleicoes` &rarr; **API JSON do Nosso Laravel**

**Arquivos essenciais que você vai inspecionar e modificar:**
- `app/Services/IbovespaService.php` &rarr; **Requisição 1** (`Http::get` no backend)
- `app/Http/Controllers/IbovespaController.php` &rarr; Normalização de dados e resposta JSON
- `routes/api.php` &rarr; Rota exposta pela aplicação
- `resources/views/ibovespa.blade.php` &rarr; **Requisição 2** (`fetch()` no navegador)
- `storage/app/dados/ibovespa_historico.json` &rarr; Contingência local offline
- `tests/` &rarr; Suíte de testes automatizados (`php artisan test`)

---

## 🛡️ 3. O Que Fazer Quando a API Externa Falhar?

Em ambiente corporativo ou na rede escolar, **serviços externos oscilam ou bloqueiam acessos**:

1. **Timeout Defensivo (5s):** Nunca deixe uma requisição externa esperar indefinidamente, sob pena de esgotar os workers do PHP-FPM.
2. **Contingência Estrutural Transparente:** Se a API externa falhar (HTTP 429, 500 ou timeout de rede), o Laravel recorre ao arquivo local `storage/app/dados/ibovespa_historico.json`.
3. **Honestidade nos Dados:** Quando não há cotações reais verificadas no ambiente, o sistema entrega `null` e declara o status abertamente, **sem inventar preços** e sem quebrar a tela.

---

## 🧭 4. O Ciclo das Duas Requisições HTTP

```
                    ┌──────────────────────────────────┐
                    │  API Externa de Cotações         │
                    └────────────────▲─────────────────┘
                                     │
           [Requisição 1: Servidor a Servidor (Http::get)]
           (PHP no backend; timeout defensivo; CORS NÃO se aplica)
                                     │
                    ┌────────────────▼─────────────────┐
                    │  Aplicação Laravel (Nosso App)   │
                    │  Service -> Controller -> JSON   │
                    └────────────────▲─────────────────┘
                                     │
           [Requisição 2: Cliente ao Servidor (fetch)]
           (JavaScript no browser; mesma origem; validação response.ok)
                                     │
                    ┌────────────────▼─────────────────┐
                    │  Navegador do Estudante          │
                    │  (Interface DOM e Canvas)        │
                    └──────────────────────────────────┘
```

---

## ⚙️ 5. Requisição 1: O Laravel como Cliente HTTP

**Por que a chamada externa é feita no servidor e não no navegador?**

1. **CORS é restrição de navegadores:**
   - CORS (*Cross-Origin Resource Sharing*) é aplicado exclusivamente por navegadores para proteger usuários contra requisições cross-site não autorizadas.
   - Requisições servidor-a-servidor (feitas pelo PHP com `Http::get`) trafegam diretamente pela rede e **não passam pelo navegador**: CORS simplesmente não existe entre servidores.
2. **Encapsulamento e Segurança:**
   - Detalhes de infraestrutura, URLs de provedores e eventuais tokens de acesso nunca são expostos no código-fonte do cliente.
3. **Resiliência Centralizada:**
   - O servidor normaliza os dados e aplica contingência antes de entregar ao frontend.

---

## 🔍 6. Requisição 1 no Código: `IbovespaService.php`

No backend, o Laravel consome o serviço externo com timeout obrigatório:

```php
use Illuminate\Support\Facades\Http;

public function consultarApiExterna(string $url): array
{
    // Timeout estrito de 5s: protege workers do PHP-FPM contra travamento
    $response = Http::withHeaders([
        'User-Agent' => 'AskLive-Finance/1.0',
    ])->timeout(5)->get($url);

    if ($response->successful()) {
        return [
            'origem' => 'api_externa',
            'series' => $this->normalizarSeriesExternas($response->json()),
        ];
    }

    // Se o serviço externo responder erro 4xx/5xx, aciona contingência
    return $this->carregarContingenciaOuIndisponivel();
}
```

---

## 💾 7. Contingência Estrutural com Arquivo Local

Se a API externa cair, oscilar ou for bloqueada por proxy escolar, a aplicação mantém a funcionalidade com os marcos do calendário eleitoral oficial do TSE:

```php
public function carregarHistoricoArquivado(): ?array
{
    $caminho = storage_path('app/dados/ibovespa_historico.json');
    if (!file_exists($caminho)) {
        return null;
    }

    $conteudo = json_decode(file_get_contents($caminho), true);
    return $conteudo['series'] ?? null;
}
```

- **Marcos Oficiais:** Resoluções TSE nº 23.390 (2014), 23.555 (2018) e 23.674 (2021).
- **Datas:** D0 é o 1º dia útil pós-pleito; D+15 e D+30 são marcos calendários didáticos (dias corridos após D0). Cotações não verificadas vêm como `null`.

---

## 🚀 8. Expondo a API no Laravel: `IbovespaController.php`

O Laravel agora assume o papel de **servidor** para o nosso frontend:

```php
// routes/api.php
Route::get('/ibovespa/pos-eleicoes', [IbovespaController::class, 'index']);
```

```php
// app/Http/Controllers/IbovespaController.php
public function index(Request $request): JsonResponse
{
    $resultado = $this->ibovespaService->obterCotacoes();

    if ($resultado['origem'] === 'indisponivel') {
        return response()->json([
            'mercado'      => 'B3 / Ibovespa',
            'origem_dados' => 'indisponivel',
            'series'       => [],
        ], 503);
    }

    return response()->json([
        'mercado'      => 'B3 / Ibovespa',
        'origem_dados' => $resultado['origem'],
        'series'       => $resultado['series'],
    ], 200);
}
```

---

## ⚡ 9. Requisição 2: O Navegador como Cliente (`fetch`)

No frontend (`resources/views/ibovespa.blade.php`), o JavaScript consome nossa API interna:

```javascript
fetch('/api/ibovespa/pos-eleicoes')
    .then(response => {
        // ⚠️ ATENÇÃO: fetch() NÃO pula para o catch em erro 4xx ou 500!
        if (!response.ok) {
            throw new Error(`Erro na API do Laravel: HTTP ${response.status}`);
        }
        return response.json();
    })
    .then(payload => {
        console.log('Origem dos dados:', payload.origem_dados);
        renderizarTabela(payload.series);
    })
    .catch(erro => {
        console.error('Falha capturada:', erro.message);
    });
```

---

## ⚠️ 10. A Pegadinha Fundamental do `fetch()`

**Por que a verificação `if (!response.ok)` é obrigatória?**

1. O `fetch()` só rejeita a Promise em caso de **falha de rede física** (DNS inválido, cabo desconectado, servidor fora do ar).
2. Se o Laravel responder **HTTP 500 (Internal Server Error)** com uma página de erro HTML:
   - A Promise do `fetch()` é resolvida como **sucesso**!
   - A linha `response.json()` tenta interpretar a página HTML como JSON.
   - O código quebra com: `SyntaxError: Unexpected token < in JSON at position 0`.
3. **Com `if (!response.ok)`:** você intercepta status 4xx e 5xx antes de tentar fazer parse de JSON.

---

## 🎨 11. Interface Segura e Manipulação do DOM

Prevenção de XSS e controle de estado na interface:

```javascript
function renderizarTabela(series) {
    const tbody = document.getElementById('tabela-corpo');
    tbody.textContent = ''; // Limpa estado anterior com segurança

    series.forEach(item => {
        const tr = document.createElement('tr');
        
        // Uso de textContent em vez de innerHTML: previne injeção de script
        const tdAno = document.createElement('td');
        tdAno.textContent = item.ano;
        tr.appendChild(tdAno);

        const tdStatus = document.createElement('td');
        tdStatus.textContent = item.status_cotacao;
        tr.appendChild(tdStatus);

        tbody.appendChild(tr);
    });
}
```

---

## 📈 12. O Desafio do Gráfico: O Que Fazer com Cotações `null`?

Quando a API externa cai ou a contingência local está ativa, as cotações de fechamento são `null`:

```javascript
// Cláusula de guarda rigorosa:
const temCotacoesReais = Array.isArray(series) &&
    series.some(p => p.status_cotacao === 'serie_disponivel' &&
                     p.d0_fechamento !== null &&
                     p.d30_fechamento !== null);

if (!temCotacoesReais) {
    // ❌ NÃO desenhe uma linha reta no zero nem invente dados fictícios!
    // ✅ Exiba o estado honesto de indisponibilidade na interface:
    exibirAvisoGrafico('Visualização gráfica indisponível: cotações reais não verificadas.');
    return;
}

desenharCanvas(series);
```

---

## 🧪 13. Suíte de Testes Automatizados

A base já vem acompanhada de testes unitários e de integração que garantem o contrato:

```bash
docker run -v $PWD:/app -w /app composer:2 php artisan test
```

```
   PASS  Tests\Unit\IbovespaServiceTest
  ✓ calcular variacao percentual
  ✓ enriquecer com variacao trata nulos defensivamente
  ✓ contingencia local arquivo real
  ✓ janelas didaticas produzem efeito real

   PASS  Tests\Feature\IbovespaApiTest
  ✓ pagina principal renderiza com sucesso
  ✓ endpoint api retorna contrato uniforme
  ✓ filtro por ano valido
  ✓ rejeita ano invalido com status 422
  ✓ filtro por janela d15 valida
  ✓ rejeita janela invalida com status 422
  ✓ indisponibilidade geral retorna 503 honesto

  Tests: 11 passed (93 assertions)
```

---

## 🎯 14. Roteiro Prático: 8 Exercícios na Base

Acompanhe a aula executando, diagnosticando e modificando a base:

1. **Ex. 1:** Inspecionar e testar a Requisição 1 com timeout defensivo.
2. **Ex. 2:** Tratar defensivamente falhas na API externa e verificar o fallback.
3. **Ex. 3:** Acessar o endpoint interno e testar filtros de query string (`?ano=` e `?janela=`).
4. **Ex. 4:** Inspecionar a Requisição 2 via `fetch()` e comprovar a pegadinha do `response.ok`.
5. **Ex. 5:** Inspecionar a contingência com JSON local e marcos do TSE.
6. **Ex. 6:** Analisar a proteção matemática do cálculo de variação com valores `null`.
7. **Ex. 7:** Praticar a manipulação segura do DOM (`createElement` / `textContent`).
8. **Ex. 8:** Testar a validação do gráfico e a honestidade do estado vazio com cotações nulas.

---

# 📖 Guia Completo & Material de Apoio da Aula 08B

## ⚖️ Rigor Metodológico e Neutralidade Analítica

- **Fontes Oficiais Verificadas:** As datas das eleições baseiam-se no calendário oficial do **Tribunal Superior Eleitoral (TSE)** para o 2º turno das eleições presidenciais:
  - **2014:** 26/10/2014 — Domingo (Resolução TSE nº 23.390/2013)
  - **2018:** 28/10/2018 — Domingo (Resolução TSE nº 23.555/2017)
  - **2022:** 30/10/2022 — Domingo (Resolução TSE nº 23.674/2021)
- **Definição Explícita de D0:** O marco **D0** é definido rigorosamente como o **primeiro dia útil imediatamente subsequente ao pleito** (segunda-feira pós-2º turno), uma vez que o pleito ocorre no domingo e os mercados financeiros não operam em fins de semana:
  - **2014:** 2º Turno em 26/10/2014 &rarr; Marco Inicial D0 em **27/10/2014** (Segunda-feira).
  - **2018:** 2º Turno em 28/10/2018 &rarr; Marco Inicial D0 em **29/10/2018** (Segunda-feira).
  - **2022:** 2º Turno em 30/10/2022 &rarr; Marco Inicial D0 em **31/10/2022** (Segunda-feira).
- **Marcos Didáticos Dn (D+15 e D+30):** Os marcos **D+15** e **D+30** são **marcos calendários didáticos** que representam exatamente **15 e 30 dias corridos contados a partir de D0** (e não a partir do domingo do pleito). Como são marcos calendários didáticos para análise temporal de séries, **não são anunciados como pregões de bolsa sem verificação na série**:
  - **Janela D+15 (15 dias corridos após D0):**
    - **2014:** 27/10/2014 + 15 dias corridos = **11/11/2014** (Terça-feira).
    - **2018:** 29/10/2018 + 15 dias corridos = **13/11/2018** (Terça-feira).
    - **2022:** 31/10/2022 + 15 dias corridos = **15/11/2022** (Terça-feira — Feriado da Proclamação da República).
  - **Janela D+30 (30 dias corridos após D0):**
    - **2014:** 27/10/2014 + 30 dias corridos = **26/11/2014** (Quarta-feira).
    - **2018:** 29/10/2018 + 30 dias corridos = **28/11/2018** (Quarta-feira).
    - **2022:** 31/10/2022 + 30 dias corridos = **30/11/2022** (Quarta-feira).
- **Não Inferência de Causalidade:** As variações dos mercados financeiros respondem a uma multiplicidade de determinantes macroeconômicos e geopolíticos globais. A concomitância temporal entre datas do calendário eleitoral e flutuações do índice Ibovespa **não constitui relação de causa e efeito**.
- **Neutralidade Absoluta:** O código, as rotas, os dados e a interface **não contêm menção a candidatos, partidos políticos ou vencedores de pleitos**.

---

## 🛠️ Passo a Passo Detalhado dos 8 Exercícios Práticos

### Exercício 1: Inspecionar e Testar a Requisição 1 com Timeout Defensivo
- **Arquivo de estudo:** `app/Services/IbovespaService.php` (método `consultarApiExterna`).
- **O que fazer:**
  1. Localize a chamada `Http::withHeaders(...)->timeout(5)->get($url)`.
  2. Observe a presença do cabeçalho `User-Agent`. Provedores externos frequentemente rejeitam requisições sem User-Agent definido.
  3. **Experimento:** Altere temporariamente o timeout para `0.001` (1 milissegundo) para simular uma conexão ultralenta.
  4. Dispare a consulta no navegador e observe que a aplicação não trava: o Laravel captura a exceção de timeout e aciona o fallback.
  5. Restaure o timeout para `5` segundos.
- **Validação:** Execute `docker run -v $PWD:/app -w /app composer:2 php artisan test --filter=IbovespaServiceTest`.

### Exercício 2: Tratamento Defensivo na Resposta da API Externa
- **Arquivo de estudo:** `app/Services/IbovespaService.php` (método `obterCotacoes`).
- **O que fazer:**
  1. Analise por que `$response->successful()` não é suficiente: o serviço externo pode responder status 200 contendo erro no corpo JSON (`chart.error`).
  2. **Experimento:** Altere a variável `IBOVESPA_API_URL` no `.env` para `http://127.0.0.1:9999/indisponivel`.
  3. No navegador, clique em "Consultar Séries".
  4. Verifique que a interface exibe o badge `ORIGEM: CONTINGÊNCIA LOCAL (JSON)` e status 200, sem quebrar.
  5. Restaure a variável original no `.env`.

### Exercício 3: Exposição da API JSON e Filtros de Query String
- **Arquivos de estudo:** `routes/api.php` e `app/Http/Controllers/IbovespaController.php`.
- **O que fazer:**
  1. Abra a URL `http://localhost:8000/api/ibovespa/pos-eleicoes` diretamente no navegador para visualizar o payload JSON entregue pelo Laravel.
  2. Teste os parâmetros de filtro:
     - `http://localhost:8000/api/ibovespa/pos-eleicoes?ano=2014`
     - `http://localhost:8000/api/ibovespa/pos-eleicoes?janela=d15`
     - `http://localhost:8000/api/ibovespa/pos-eleicoes?ano=2018&janela=d30`
  3. Teste valores inválidos para testar a validação:
     - `http://localhost:8000/api/ibovespa/pos-eleicoes?ano=1999` &rarr; Verifique a resposta com erro HTTP 422.
- **Validação:** Execute `docker run -v $PWD:/app -w /app composer:2 php artisan test --filter=filtro`.

### Exercício 4: Requisição 2 via `fetch()` e a Pegadinha do `response.ok`
- **Arquivo de estudo:** `resources/views/ibovespa.blade.php` (função `executarConsulta`).
- **O que fazer:**
  1. Localize o bloco:
     ```javascript
     if (!response.ok) {
         throw new Error(`Servidor Laravel respondeu com status HTTP ${response.status}`);
     }
     ```
  2. **Experimento:** Comente temporariamente essa verificação `if (!response.ok)`.
  3. No seletor da página, altere o código no console para consultar uma rota inválida ou passe um ano rejeitado pelo backend.
  4. Abra o Console do Desenvolvedor (F12) e veja o erro de parse JSON estourando sem mensagem inteligível.
  5. Descomente a checagem e veja o erro amigável capturado no painel.

### Exercício 5: Contingência Estrutural com JSON Local (Marcos do TSE)
- **Arquivo de estudo:** `storage/app/dados/ibovespa_historico.json` e `app/Services/IbovespaService.php`.
- **O que fazer:**
  1. Abra o arquivo `storage/app/dados/ibovespa_historico.json`.
  2. Inspecione as datas do 2º turno de 2014, 2018 e 2022, o marco D0 (segunda-feira pós-eleição) e as janelas D+15 e D+30.
  3. Observe que `d0_fechamento` e `d30_fechamento` estão definidos como `null`.
  4. Compreenda como o método `carregarHistoricoArquivado()` garante a entrega de uma estrutura válida mesmo em ambiente escolar offline.
- **Validação:** Execute `docker run -v $PWD:/app -w /app composer:2 php artisan test --filter=contingencia`.

### Exercício 6: Cálculo Seguro de Variação Percentual com Nulos
- **Arquivo de estudo:** `app/Services/IbovespaService.php` (método `calcularVariacaoPercentual`).
- **O que fazer:**
  1. Inspecione a fórmula: `round((($dn - $d0) / $d0) * 100, 2)`.
  2. Analise a cláusula de guarda:
     ```php
     if ($d0 === null || $dn === null || $d0 == 0) {
         return null;
     }
     ```
  3. Por que checar `$d0 == 0` é essencial em qualquer aplicação financeira?
  4. O que aconteceria se tentássemos calcular a variação sem verificar se `$d0` é nulo?

### Exercício 7: Interface Reativa e Manipulação Segura do DOM
- **Arquivo de estudo:** `resources/views/ibovespa.blade.php` (funções `renderizarTabela` e `executarConsulta`).
- **O que fazer:**
  1. Identifique no código o momento em que o botão é desabilitado (`btn.disabled = true`) e o texto muda para "Consultando...".
  2. Localize o bloco `finally` ou a restauração do botão nas Promises.
  3. Observe como cada célula da tabela é criada com `document.createElement('td')` e o conteúdo atribuído via `td.textContent = ...`.
  4. **Modificação:** Adicione à tabela uma coluna para exibir a fonte oficial do TSE (`item.fonte_tse`).

### Exercício 8: O Tratamento Rigoroso de Cotações Nulas no Gráfico
- **Arquivo de estudo:** `resources/views/ibovespa.blade.php` (função `renderizarGraficoCanvas`).
- **O que fazer:**
  1. Localize a condição que checa se há cotações numéricas verificadas:
     ```javascript
     const temCotacoesReais = payload.series.some(item =>
         item.status_cotacao === 'serie_disponivel' &&
         item.d0_fechamento !== null &&
         (item.dn_fechamento !== null || item.d30_fechamento !== null)
     );
     ```
  2. Observe que, quando a contingência local é utilizada, `temCotacoesReais` resulta em `false`.
  3. Constatar no navegador que a área do gráfico exibe o container tracejado com a mensagem: *"Visualização gráfica indisponível: cotações de mercado reais não verificadas no ambiente."*
  4. Por que essa postura é superior a desenhar uma linha arbitrária no zero ou inventar dados?
- **Validação:** Verifique a renderização honesta no navegador em `http://localhost:8000/`.

---

## ❓ Perguntas de Verificação da Aprendizagem

1. **Por que a chamada externa para o provedor de cotações deve ser feita pelo Laravel (`Http::get`) e não pelo navegador via `fetch()`?**  
   *Resposta esperada:* Porque políticas de CORS são restrições de segurança aplicadas exclusivamente por navegadores para proteger usuários. Requisições servidor-a-servidor trafegam diretamente pela rede e não sofrem bloqueio de CORS. Além disso, a chamada no servidor protege credenciais e permite aplicar contingência defensiva centralizada.

2. **O que acontece se uma API externa demorar 40 segundos para responder e o Laravel não tiver configurado `timeout()`?**  
   *Resposta esperada:* O worker do PHP-FPM que atendeu a requisição ficará travado esperando o socket externo. Se múltiplos usuários fizerem a mesma consulta, a fila de workers se esgota rapidamente, gerando negação de serviço (DoS) para toda a aplicação. O `timeout(5)` protege a integridade do servidor.

3. **Se o endpoint interno do Laravel retornar HTTP 500, o `fetch()` no navegador vai cair no bloco `.catch()`?**  
   *Resposta esperada:* Não. O `fetch()` só rejeita a Promise em caso de falha de conexão de rede. Respostas 4xx e 500 são consideradas respostas HTTP válidas. Sem a verificação explícita de `if (!response.ok)`, a aplicação tenta processar o corpo da resposta com `response.json()`, resultando em erro de parse.
