---
title: Diretivas Blade para Formulários (@error e old)
tags:
  - conceitos
  - frontend
  - blade
  - validacao
created: 2026-09-22T00:37
updated: 2026-09-22T00:37
---

# ⚠️ Diretivas Blade para Validação de Forms

Quando trabalhamos com formulários, validar os dados no backend é apenas metade do trabalho. Precisamos dar **feedback visual** ao usuário. O Blade facilita isso com duas ferramentas incríveis: `@error` e `old()`.

## 1. A Função `old()`
Imagine preencher um formulário gigante de 10 campos, errar apenas a senha, e o sistema apagar tudo que você digitou ao recarregar a página. Frustrante, né?
A função `old('nome_do_campo')` resgata o último valor digitado da Sessão.

```html
<!-- Em um Input -->
<input type="text" name="titulo" value="{{ old('titulo') }}">

<!-- Em um Textarea (o valor vai no meio das tags) -->
<textarea name="descricao">{{ old('descricao') }}</textarea>
```

## 2. A Diretiva `@error`
O Laravel guarda os erros de validação na Sessão. O Blade intercepta esses erros magicamente.
Se o campo "email" falhar na validação do Controller, o bloco `@error('email')` será ativado.

```html
<label>Email</label>
<input type="email" name="email" value="{{ old('email') }}">

@error('email')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
```

A variável `$message` é injetada automaticamente dentro desse bloco contendo o texto do erro.

## 3. Estilização Condicional com Tailwind
Você pode usar o `@error` no meio de atributos HTML para pintar classes CSS de vermelho condicionalmente:

```html
<input type="text" name="titulo" 
       class="border @error('titulo') border-red-500 @else border-gray-300 @enderror">
```

## 📖 Documentação Oficial
- [Laravel Docs: Displaying Validation Errors](https://laravel.com/docs/validation#working-with-error-messages)
