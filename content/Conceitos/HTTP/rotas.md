---
title: Rotas Web no Laravel
tags:
  - conceitos
  - http
  - rotas
created: 2026-09-14T22:16
updated: 2026-09-22T00:36
---

# 🛣️ Rotas Web no Laravel

As rotas (`Routes`) são a porta de entrada da sua aplicação. Elas conectam a URL que o usuário digitou no navegador ao código que deve ser executado no backend (geralmente um [[HTTP/controller|Controller]]).

No Laravel, as rotas que lidam com requisições do navegador (HTML, Sessões, Cookies) ficam no arquivo `routes/web.php`.

## Representação Visual do Ciclo da Rota

```mermaid
flowchart LR
    A[Navegador] -->|Requisição GET /eventos| B(Router: web.php)
    B -->|Match!| C{Middleware}
    C -->|Passou| D[EventoController@index]
    D -->|Devolve HTML| A
```

## Como Definir uma Rota Básica

Uma rota precisa de dois componentes principais: o **verbo HTTP** (GET, POST, etc.) e a **URL**.

```php
use Illuminate\Support\Facades\Route;

// 1. Rota devolvendo uma View diretamente
Route::get('/sobre', function () {
    return view('sobre');
});

// 2. Rota apontando para um Controller (Padrão MVC)
use App\Http\Controllers\EventoController;

Route::get('/eventos', [EventoController::class, 'index']);
Route::post('/eventos', [EventoController::class, 'store']);
```

## Rotas com Parâmetros Dinâmicos

Às vezes, a URL contém informações variáveis, como o ID de um evento. Usamos `{chaves}` para definir parâmetros.

```php
// O parâmetro {evento} será passado para o Controller
Route::get('/eventos/{evento}', [EventoController::class, 'show']);
```

## Nomeando Rotas (Best Practice)

Sempre dê nomes às suas rotas usando o método `->name()`. Isso evita que você tenha que alterar dezenas de arquivos se um dia a URL mudar.

```php
// Definição
Route::get('/eventos', [EventoController::class, 'index'])->name('eventos.index');
```

```blade
<!-- Uso no Blade (Visualização) -->
<a href="{{ route('eventos.index') }}">Ver Todos os Eventos</a>
```

## Agrupamento e Middlewares

Você pode agrupar rotas que compartilham as mesmas regras, como exigir autenticação (ver [[Seguranca/auth-facade|Auth Facade]] e [[HTTP/middleware|Middleware]]).

```php
Route::middleware(['auth'])->group(function () {
    Route::get('/eventos/create', [EventoController::class, 'create'])->name('eventos.create');
    Route::post('/eventos', [EventoController::class, 'store'])->name('eventos.store');
});
```


## 📖 Documentação Oficial
- [Laravel Docs: Routing](https://laravel.com/docs/routing)
