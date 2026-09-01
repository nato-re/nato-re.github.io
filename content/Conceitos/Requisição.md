---
tags:
  - conceito
  - http
  - laravel
created: 2026-08-31T20:49
updated: 2026-08-31T21:13
---
# Requisição (Request)

Toda vez que você acessa um site, clica num link ou envia um formulário, o seu navegador dispara uma **Requisição HTTP** para o servidor. Ela contém o método (GET, POST, PUT, DELETE), cabeçalhos e, muitas vezes, dados preenchidos pelo usuário.

No Laravel, nós não manipulamos variáveis puras como o antigo `$_POST` do PHP. Nós utilizamos a classe orientada a objetos `Request` (ou `Illuminate\Http\Request`).

### Segurança em Primeiro Lugar
A regra número 1 do backend é: **Nunca confie no input do usuário**. 

Antes da requisição sequer tocar na lógica do seu [[Controller]] ou do seu [[Model]], ela **deve** ser inspecionada. Se os dados da requisição falharem na inspeção de uma classe de [[Validação (FormRequest)]], o Laravel devolve um [[HTTP Status Codes|Status 422]] e a requisição é cancelada.
