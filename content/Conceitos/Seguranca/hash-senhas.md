---
title: Hash de Senhas
tags: [conceitos, seguranca, hash, criptografia]
---

# 🔒 Hash de Senhas

Nunca, jamais, em hipótese alguma salve senhas em texto puro no banco de dados.

Se você salvar `123456` e o banco de dados vazar, os hackers terão a senha original de todos os seus usuários.

## O que é um Hash?

O Hash (via algoritmo Bcrypt ou Argon2) é uma função matemática de **Mão Única**.
Ele transforma `123456` em algo como `$2y$10$wT8KzQ...`.

- É fácil transformar o texto no Hash.
- É **impossível** pegar o Hash e descobrir o texto original.

## Como o Laravel Verifica a Senha?

Se é impossível reverter, como sabemos se a senha está correta no login?
Quando o usuário digita a senha no login, o Laravel **gera um novo Hash** daquela senha digitada e compara se o resultado bate com o Hash salvo no banco.

## A Facade `Hash`

```php
use Illuminate\Support\Facades\Hash;

// Criando usuário (Register)
User::create([
    'password' => Hash::make($request->password)
]);

// Verificando manualmente (O Auth::attempt já faz isso pra você!)
if (Hash::check('123456', $user->password)) {
    // A senha bate!
}
```

## 📖 Documentação Oficial
- [Laravel Docs: Hashing](https://laravel.com/docs/hashing)
