---
tags:
  - conceito
  - laravel
  - mvc
created: 2026-08-31T20:17
updated: 2026-08-31T21:13
---
# Model

No padrão MVC, o **Model** é a camada responsável por conversar com o Banco de Dados. No Laravel, nós utilizamos o [[Eloquent ORM]] para representar nossas tabelas como Models.

Em vez de escrever `SELECT * FROM perguntas`, nós interagimos com a classe:
```php
$perguntas = Pergunta::all();
```

**Retroativo:** Este conceito foi introduzido nas etapas iniciais e é a base para fazermos [[Filtro (where)]], [[Ordenação (orderBy)]] e [[Paginação]].
