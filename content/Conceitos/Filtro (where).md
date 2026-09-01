---
tags:
  - conceito
  - laravel
  - banco-de-dados
created: 2026-08-31T20:17
updated: 2026-08-31T21:13
---
# Filtro (where)

A cláusula `where` é utilizada no [[Model]] para refinar a busca no banco de dados. Sem ela, você corre o risco de vazar dados de outros escopos (ex: mostrar perguntas do Evento A na página do Evento B).

### Sintaxe Básica
```php
// Busca perguntas APENAS do evento cujo ID seja 5
$perguntas = Pergunta::where('evento_id', 5)->get();
```

Sempre que utilizar o `where`, lembre-se de que ele retorna um *Query Builder*. Para de fato buscar os dados, você deve encadear comandos como `->get()`, `->first()`, ou encadear com uma [[Paginação|->paginate()]].
