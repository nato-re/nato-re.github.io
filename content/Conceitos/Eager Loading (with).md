---
tags:
  - conceito
  - laravel
  - performance
  - eager-loading
created: 2026-09-08T07:33:00
updated: 2026-09-08T07:33:00
---

# O Problema N+1 e Eager Loading (`with`)

O **Problema N+1** acontece quando o Laravel executa **1 consulta** para buscar uma lista e depois executa **mais N consultas** individuais dentro de um loop para carregar as relações de cada item.

### Exemplo do Gargalo (Lazy Loading):
Se listarmos 50 perguntas no Blade chamando `$pergunta->user->name`:
- 1 consulta para trazer as 50 perguntas.
- 50 consultas separadas (`SELECT * FROM users WHERE id = ?`).
- **Total:** 51 requisições ao banco de dados para carregar uma única página!

---

## A Solução: Carregamento Ansioso com `with()`

O **Eager Loading** instrui o Eloquent a carregar de antemão todos os relacionamentos em lote.

```php
// No Controller:
$perguntas = Pergunta::where('evento_id', $evento->id)
    ->with('user') // <--- CARREGAMENTO ANSIOSO
    ->latest()
    ->paginate(10);
```

### O que acontece no Banco:
O Laravel executa apenas **2 consultas SQL rápidas**:
1. `SELECT * FROM perguntas WHERE evento_id = 1 LIMIT 10;`
2. `SELECT * FROM users WHERE id IN (2, 5, 9, 14);`

**Resultado:** A página carrega instantaneamente e a CPU do servidor permanece tranquila!
