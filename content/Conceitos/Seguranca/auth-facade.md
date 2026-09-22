---
title: Auth Facade
tags:
  - conceitos
  - seguranca
  - autenticacao
created: 2026-09-14T22:18
updated: 2026-09-22T00:36
---

# 🔑 Auth Facade

No Laravel, uma "Facade" é uma classe que provê acesso simples e estático aos serviços por trás dos panos. A **Auth Facade** (`Illuminate\Support\Facades\Auth`) é a principal ferramenta para lidar com autenticação (Login/Logout) e verificar quem é o usuário atual.

## Métodos Mais Utilizados

### 1. `Auth::check()`
Retorna `true` se o usuário atual estiver logado, e `false` caso seja um visitante anônimo.
Muito usado no Blade para exibir partes diferentes do layout.

```php
if (Auth::check()) {
    // O usuário está logado
}
```

No Blade, existe uma diretiva equivalente chamada `@auth` e `@guest`:
```blade
@auth
    <p>Bem-vindo, {{ Auth::user()->name }}!</p>
    <a href="/logout">Sair</a>
@endauth

@guest
    <a href="/login">Fazer Login</a>
@endguest
```

### 2. `Auth::user()`
Retorna a instância do Model `User` (o usuário que está logado). Retorna `null` se não houver ninguém logado.

```php
// Pegando o ID do usuário logado para salvar no banco de dados
$evento->user_id = Auth::user()->id;
```
Ou pode usar a versão em função helper `auth()->user()->id`.

### 3. `Auth::attempt()`
O método manual para tentar fazer login. Ele recebe um array com as credenciais (geralmente e-mail e senha) e tenta batê-las contra o banco de dados.

```php
$credentials = [
    'email' => 'natu@cotemig.br',
    'password' => 'senha_super_secreta'
];

// O attempt já faz o hash da senha enviada e compara com o banco
if (Auth::attempt($credentials)) {
    // Autenticado com sucesso! A sessão foi iniciada.
    return redirect()->intended('/dashboard');
}

// Falhou
return back()->withErrors(['email' => 'Credenciais inválidas.']);
```

### 4. `Auth::logout()`
Encerra a sessão do usuário atual.

```php
Auth::logout();
```

## Como interage com os Middlewares?
Quando você usa o [[HTTP/middleware|Middleware `auth`]] nas suas rotas, por trás dos panos o Laravel está executando o `Auth::check()` para decidir se deixa a requisição passar ou não.


## 📖 Documentação Oficial
- [Laravel Docs: Authentication](https://laravel.com/docs/authentication)
