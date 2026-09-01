---
tags:
  - conceito
  - laravel
  - seguranca
  - http
created: 2026-08-31T20:17
updated: 2026-08-31T21:13
---
# Validação e Form Requests

No Laravel, não devemos confiar nos dados enviados pelo usuário. A validação garante que regras de negócio e de segurança sejam respeitadas.

Para evitar sujar o Controller, usamos classes dedicadas chamadas **Form Requests**.

```php
public function rules(): array
{
    return [
        'conteudo' => ['required', 'string', 'min:5', 'max:255'],
    ];
}
```

### O Status 422
Se os dados enviados falharem nestas regras, o Laravel automaticamente interrompe a requisição e devolve um [[HTTP Status Codes|Status 422 Unprocessable Content]]. Se o usuário estiver usando um formulário web tradicional, ele será redirecionado de volta com os erros gravados na Sessão (Flash Data).
