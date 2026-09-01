---
tags:
  - conceito
  - laravel
  - frontend
  - mvc
created: 2026-08-31T20:49
updated: 2026-09-01T00:02
---
# Blade (Template Engine)

Blade é o motor de templates oficial do Laravel. Ele permite que escrevamos estruturas lógicas do PHP (como `if`, `foreach`, e manipulação de variáveis) dentro do HTML de forma extremamente limpa. 

Na arquitetura do [[Padrão MVC]], o Blade representa a camada de **View**.

A grande vantagem do Blade é que ele é compilado para PHP puro e guardado em cache, garantindo altíssima performance.

### Diretivas que você mais usará na 3ª Etapa:
- Exibir variáveis: `{{ $evento->titulo }}`
- Loop de dados com fallback para lista vazia (`@forelse`):
```blade
@forelse ($perguntas as $pergunta)
    <div class="card mb-3 p-3 shadow-sm border-left-accent">
        <p class="mb-1 text-dark">{{ $pergunta->texto }}</p>
        <small class="text-muted">Enviado em {{ $pergunta->created_at->format('d/m/Y H:i') }}</small>
    </div>
@empty
    <p class="alert alert-info">Nenhuma pergunta enviada ainda. Seja o primeiro!</p>
@endforelse
```
- Exibir botões de [[Paginação]]: `{{ $perguntas->links() }}`
- Renderizar feedbacks de erros barrados pela [[Validação (FormRequest)]]:
```blade
@error('texto')
    <div class="text-danger small mt-1">{{ $message }}</div>
@enderror
```

---

## 🛠️ Como a View Funciona na Prática (O Fluxo de Dados)

1. **Chegada no Controller:** O `EventoController@show` recupera o evento e suas perguntas paginadas:
   ```php
   return view('eventos.show', compact('evento', 'perguntas'));
   ```
2. **Recepção no Blade (`resources/views/eventos/show.blade.php`):**
   - `$evento` traz o título do evento e metadados.
   - `$perguntas` é uma instância de `LengthAwarePaginator` contendo os 10 itens da página atual.
3. **Renderização dos Links:** Ao chamar `{{ $perguntas->links() }}`, o Laravel gera automaticamente os botões HTML `<nav>` com os parâmetros de URL (`?page=1`, `?page=2`) mantendo filtros existentes.
