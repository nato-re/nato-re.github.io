---
title: "Gabarito: [Sprint 02] Autoria de Perguntas & Eager Loading"
tags:
  - gabarito
  - professor
  - laravel
  - etapa3
draft: true
created: 2026-09-08T07:33:00
updated: 2026-09-08T10:16
---

# 🔑 Gabarito Resolvido: Sprint 02 (Relacionamentos & Eager Loading)

---

## 1. Model `Pergunta` (`app/Models/Pergunta.php`)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pergunta extends Model
{
    protected $fillable = ['user_id', 'evento_id', 'conteudo'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

## 2. Model `User` (`app/Models/User.php`)
```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    public function perguntas(): HasMany
    {
        return $this->hasMany(Pergunta::class);
    }
}
```

## 3. Controller `EventoController` (`app/Http/Controllers/EventoController.php`)
```php
public function show(Evento $evento)
{
    $perguntas = Pergunta::where('evento_id', $evento->id)
        ->with('user') // <--- Resolve o problema N+1 em apenas 2 queries
        ->latest()
        ->paginate(10);

    return view('eventos.show', compact('evento', 'perguntas'));
}
```

## 4. View Blade (`resources/views/eventos/show.blade.php`)
```blade
<div class="mt-2 text-sm text-gray-500">
    Enviada por: 
    <strong>{{ $pergunta->user->name ?? 'Anônimo' }}</strong>
</div>
```
