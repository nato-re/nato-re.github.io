---
tags:
  - conceito
  - laravel
  - banco-de-dados
created: 2026-08-31T20:17
updated: 2026-08-31T21:13
---
# Ordenação (orderBy)

Utilizamos o `orderBy` logo após invocar um [[Model]] ou um [[Filtro (where)]] para definir a ordem em que os resultados virão do banco.

### Sintaxe
```php
$perguntas = Pergunta::orderBy('created_at', 'desc')->get();
```
- `desc`: Descendente (Do mais novo para o mais velho, ou do maior para o menor).
- `asc`: Ascendente (Padrão).

### O atalho `latest()`
O Laravel oferece um atalho de sintaxe incrível para ordenar pela data de criação (`created_at` em ordem decrescente). O código acima pode ser simplificado para:
```php
$perguntas = Pergunta::latest()->get();
```
