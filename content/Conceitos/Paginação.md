---
tags:
  - conceito
  - laravel
  - performance
created: 2026-08-31T20:17
updated: 2026-08-31T21:13
---
# Paginação

A paginação é essencial para a saúde da aplicação. Substituir métodos de busca massiva (como o `->get()` ou `->all()`) por paginação impede que o servidor consuma toda a sua memória RAM ao processar milhares de registros de uma vez.

No Laravel, a paginação é feita de forma quase mágica através do método `paginate()`.

```php
// Traz apenas 10 registros por página
$perguntas = Pergunta::paginate(10);
```

### Na View (Blade)
Para que os botões de "Próximo" e "Anterior" apareçam no HTML, basta chamar o método `links()` na variável que recebeu a paginação:
```html
{{ $perguntas->links() }}
```
