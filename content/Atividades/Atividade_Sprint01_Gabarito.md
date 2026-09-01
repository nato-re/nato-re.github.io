---
type: solution
id: falaq-sprint-01-gabarito
title: "[Gabarito] Resolução da Atividade Sprint 01 — FalaQ"
module: 3ª Etapa - TPA Laravel
status: reference
tags:
  - laravel
  - gabarito
  - professor
  - etapa3
created: 2026-08-31T23:50
updated: 2026-08-31T23:50
---

# 🔑 Gabarito Oficial: Sprint 01 (FalaQ-Eu_T_3scuto)

Este documento é a referência técnica e resolução completa dos dois tickets da **Sprint 01**. Utilizado para avaliação do professor, testes automatizados (Autograder) e disponibilização da solução para turmas concluídas.

---

## 🎫 Ticket #001: Segurança (FormRequest)

### O Problema
Envio de perguntas vazias ou spam (ex: "a", "k") sem validação no backend, poluindo o banco de dados.

### Solução (`app/Http/Requests/StorePerguntaRequest.php`)

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePerguntaRequest extends FormRequest
{
    /**
     * Determina se o usuário está autorizado a fazer a requisição.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Regras de validação estritas para evitar spam.
     */
    public function rules(): array
    {
        return [
            'texto'     => ['required', 'string', 'min:10', 'max:255'],
            'evento_id' => ['required', 'exists:eventos,id'],
        ];
    }

    /**
     * Mensagens de erro customizadas (opcional, boa prática).
     */
    public function messages(): array
    {
        return [
            'texto.required' => 'O texto da pergunta é obrigatório.',
            'texto.min'      => 'A pergunta deve conter no mínimo 10 caracteres.',
            'texto.max'      => 'A pergunta não pode exceder 255 caracteres.',
        ];
    }
}
```

### Validação HTTP
- **Entrada inválida:** Retorna `HTTP 422 Unprocessable Content`.
- **Entrada válida:** Executa a criação e retorna `HTTP 201 Created` ou redireciona.

---

## 🎫 Ticket #002: Performance (Paginação e Ordenação)

### O Problema
O controller chamava `Pergunta::all()`, carregando milhares de registros de uma vez em memória, travando o navegador e misturando perguntas de eventos diferentes.

### Solução no Controller (`app/Http/Controllers/EventoController.php`)

```php
<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use App\Models\Pergunta;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    /**
     * Exibe o evento com suas perguntas paginadas e ordenadas.
     */
    public function show(Evento $evento)
    {
        // 1. Filtra as perguntas do evento específico
        // 2. Ordena pelas mais recentes (latest / desc)
        // 3. Pagina em blocos de 10 registros por página
        $perguntas = $evento->perguntas()
            ->latest()
            ->paginate(10);

        return view('eventos.show', compact('evento', 'perguntas'));
    }
}
```

*Nota alternativa (usando Query Builder direto):*
```php
$perguntas = Pergunta::where('evento_id', $evento->id)
    ->orderBy('created_at', 'desc')
    ->paginate(10);
```

### Solução na View Blade (`resources/views/eventos/show.blade.php`)

Para renderizar os botões de navegação da paginação:

```blade
{{-- Abaixo da lista de perguntas --}}
<div class="mt-6">
    {{ $perguntas->links() }}
</div>
```

---

## 🧪 Comandos de Teste e Validação Automática

```bash
# 1. Executar seeder de teste (5.000 registros)
php artisan db:seed --class=PerguntaSeeder

# 2. Testar validação via cURL (deve retornar HTTP 422)
curl -X POST http://localhost:8000/api/perguntas \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"texto": "spam"}'

# 3. Testar consulta paginada (deve retornar apenas 10 itens no payload)
curl -s http://localhost:8000/eventos/1 | grep -o 'pagination'
```

---

## 📊 Rubrica de Correção (Pontuação Total: 10 pts)

| Item | Critério | Pontos |
|------|----------|--------|
| **FormRequest** | Criou/editou `StorePerguntaRequest` com `required`, `min:10`, `max:255` | 4.0 pts |
| **Filtro (`where`)** | Query filtra apenas perguntas vinculadas ao `evento_id` | 2.0 pts |
| **Paginação + Ordem** | Substituiu `all()` por `latest()->paginate(10)` | 3.0 pts |
| **Blade `links()`** | Adicionou a renderização dos links de paginação na view | 1.0 pt |
