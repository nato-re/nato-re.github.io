---
tags:
  - conceito
  - laravel
  - eloquent
  - relacionamentos
created: 2026-09-08T07:33:00
updated: 2026-09-08T07:33:00
---

# Relacionamento N:1 no Eloquent (`belongsTo` e `hasMany`)

O relacionamento do tipo **$N:1$ (Muitos-para-Um)** acontece quando múltiplos registros de uma tabela apontam para um único registro de outra tabela.

- **Exemplo:** Várias **Perguntas** pertencem a um único **Usuário**.
- **Regra de Ouro:** A tabela do lado "Muitos" é quem guarda a chave estrangeira (ex: `user_id` na tabela `perguntas`).

---

## 1. No Model Filho (`Pergunta.php`)
Usamos o método `belongsTo()`:

```php
use Illuminate\Database\Eloquent\Relations\BelongsTo;

public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}
```

## 2. No Model Pai (`User.php`)
Usamos o método inverso `hasMany()`:

```php
use Illuminate\Database\Eloquent\Relations\HasMany;

public function perguntas(): HasMany
{
    return $this->hasMany(Pergunta::class);
}
```

---

## 3. Como usar no Blade
Podemos navegar dinamicamente como uma propriedade do objeto:

```blade
<p>Autor: {{ $pergunta->user->name ?? 'Anônimo' }}</p>
```

> **Atenção:** Ao iterar sobre perguntas exibindo o usuário, lembre-se de usar [[Conceitos/Eager Loading (with)|Eager Loading (with)]] para evitar sobrecarregar o banco com dezenas de consultas repetidas!
