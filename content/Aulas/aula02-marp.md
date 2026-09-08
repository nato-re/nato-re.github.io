---
title: "Aula 02: Relacionamentos N:1 e Eager Loading (Evitando o Problema N+1)"
tags:
  - cotemig
  - laravel
  - slides
  - etapa3
marp: true
theme: default
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
  :root { --color-bg:#0f1117; --color-accent:#7c6af7; --color-accent2:#4ade80; --font:'Inter',sans-serif; --mono:'JetBrains Mono',monospace; }
  section { background:#0f1117; color:#e2e8f0; font-family:var(--font); font-size:28px; padding:60px 80px; }
  h1 { font-size:2.2em; font-weight:700; color:#fff; letter-spacing:-0.02em; line-height:1.15; }
  h2 { font-size:1.4em; font-weight:600; color:var(--color-accent); margin-bottom:0.4em; }
  h3 { font-size:1em; font-weight:600; color:var(--color-accent2); text-transform:uppercase; letter-spacing:.08em; }
  p, li { color:#94a3b8; }
  strong { color:#fff; }
  em { color:var(--color-accent); font-style:normal; }
  code { font-family:var(--mono); background:#1e2130; color:#a5f3fc; padding:.1em .4em; border-radius:4px; font-size:.8em; }
  pre { background:#1e2130; border-left:3px solid var(--color-accent); border-radius:8px; padding:1em 1.4em; }
  pre code { background:none; color:#e2e8f0; font-size:.75em; line-height:1.7; }
  blockquote { background:#1a1d27; border-left:4px solid var(--color-accent); border-radius:0 8px 8px 0; padding:.8em 1.2em; color:#94a3b8; font-style:normal; }
  section.lead blockquote { display: none; }
  section.lead h1 { background:linear-gradient(135deg,#a78bfa,#7c6af7,#4ade80); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  section::after { color:#2e3347; font-size:.6em; }
  table { width:100%; border-collapse:collapse; font-size:.85em; }
  th { background:#252836; color:var(--color-accent); padding:.5em 1em; border-bottom:2px solid var(--color-accent); text-transform:uppercase; font-size:.8em; letter-spacing:.05em; }
  td { padding:.45em 1em; border-bottom:1px solid #2e3347; }
paginate: true
---

<!-- _class: lead -->
<!-- _header: "TPA Laravel · 3ª Etapa" -->
<!-- _footer: "Prof. Renato · COTEMIG 2026" -->

# Aula 02: Relacionamentos N:1
## & O Fim do Gargalo N+1 no Eloquent

**Sprint 02 — FalaQ-Eu_T_3scuto**

---

<!-- _header: "Pauta da Sprint 02" -->

## 📋 Objetivos de Aprendizagem

- **Active Retrieval (Warm-Up):** A ilusão das consultas em loop.
- **Modelagem Relacional N:1:** Chaves estrangeiras, `belongsTo` e `hasMany`.
- **Ticket #003:** Quem perguntou? Exibindo o autor de cada mensagem.
- **O Desastre em Produção:** 51 queries para renderizar 50 perguntas!
- **Ticket #004:** O que é o **Problema N+1** e como exterminá-lo com `with()`.
- **Cool-Down Slido:** Retenção ativa e deploy da Sprint.

---

<!-- _header: "Active Retrieval · Slido" -->

## 📱 Warm-Up: A Pegadinha do ORM

> **Pergunta Rápida no Slido:**  
> *"Se temos 50 perguntas na tela e fazemos um loop no Blade acessando `$pergunta->user->name`, sem nenhuma configuração no Controller, quantas consultas o banco de dados executará?"*

- **A)** Apenas 1 consulta SQL
- **B)** 2 consultas SQL
- **C)** 51 consultas SQL *(Problema N+1)*

*Aguarde a votação no telão antes de avançar!*

---

<!-- _header: "Sprint 02 · Ticket #003" -->

## 🎫 Ticket #003: O Mistério do Autor

> *"No telão de eventos ao vivo, todas as perguntas estão sem autor ou anônimas. Precisamos que o nome do usuário participante apareça no card da pergunta."*

### O que temos no Banco de Dados:
- Tabela `users` (`id`, `name`, `email`)
- Tabela `perguntas` (`id`, `user_id`, `evento_id`, `conteudo`)

A chave estrangeira **`user_id`** já existe no banco, mas o Eloquent ainda não sabe como navegar entre essas duas entidades!

---

<!-- _header: "Eloquent ORM · Lado N" -->

## 🧩 Model Pergunta: `belongsTo`

Como a tabela `perguntas` guarda a chave `user_id`, a pergunta **pertence a um usuário**:

`app/Models/Pergunta.php`:
```php
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

---

<!-- _header: "Eloquent ORM · Lado 1" -->

## 🔄 Model User: Relação Inversa `hasMany`

Um usuário pode enviar **várias perguntas** ao longo do evento:

`app/Models/User.php`:
```php
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

---

<!-- _header: "Blade Template · Exibição" -->

## 💻 Renderizando o Autor no Blade

Agora podemos acessar `$pergunta->user->name` diretamente no template:

`resources/views/eventos/show.blade.php`:
```blade
@foreach ($perguntas as $pergunta)
    <div class="card">
        <p>{{ $pergunta->conteudo }}</p>
        <div class="meta">
            Enviado por: 
            <strong>{{ $pergunta->user->name ?? 'Anônimo' }}</strong>
            <span>{{ $pergunta->created_at->diffForHumans() }}</span>
        </div>
    </div>
@endforeach
```

---

<!-- _header: "Incidente de Produção · SRE Alert" -->

## 🚨 O Alarme do SRE: Servidor em Chamas!

> **Chamado do DBA no Slack:**  
> *"Parabéns, os nomes apareceram. Mas olhem o log do banco: centenas de queries idênticas por segundo!"*

```sql
SELECT * FROM perguntas WHERE evento_id = 1 LIMIT 10;
SELECT * FROM users WHERE id = 3 LIMIT 1;
SELECT * FROM users WHERE id = 7 LIMIT 1;
SELECT * FROM users WHERE id = 12 LIMIT 1;
SELECT * FROM users WHERE id = 3 LIMIT 1; -- Consultou o mesmo usuário de novo!
... (mais de 50 queries individuais repetidas!)
```

---

<!-- _header: "Arquitetura · O Problema N+1" -->

## 🕵️ Anatomia do Lazy Loading

Por padrão, o Eloquent é "preguiçoso" (*Lazy*): ele **não busca** o relacionamento até que você acesse a propriedade no código.

1. **1 query** inicial para buscar as perguntas:
   `SELECT * FROM perguntas;`
2. **N queries** extras executadas dentro do loop Blade:
   Cada `$p->user->name` dispara um novo `SELECT * FROM users WHERE id = ?`.

$$\text{Total} = 1 + N \text{ queries}$$

Para 100 perguntas: **101 viagens de rede ao banco de dados!**

---

<!-- _header: "Solução · Eager Loading" -->

## ⚡ A Cura: Eager Loading com `with()`

Instruímos o Eloquent a carregar de antemão os autores em uma única viagem coordenada:

`app/Http/Controllers/EventoController.php`:
```php
// ❌ ANTES (Gargalo de N+1 queries):
$perguntas = Pergunta::where('evento_id', $evento->id)->paginate(10);

//  DEPOIS (Apenas 2 queries rápidas!):
$perguntas = Pergunta::where('evento_id', $evento->id)
    ->with('user') // <--- CARREGAMENTO ANSIOSO AQUI
    ->latest()
    ->paginate(10);
```

---

<!-- _header: "Engenharia de Dados · O SQL Otimizado" -->

## 🔬 O que o Banco Executa Agora?

O Laravel agrupa todos os IDs de usuários daquele lote e usa `WHERE id IN (...)`:

```sql
-- Query 1 (Busca as 10 perguntas do evento):
SELECT * FROM perguntas WHERE evento_id = 1 ORDER BY created_at DESC LIMIT 10;

-- Query 2 (Busca TODOS os autores daquelas perguntas de uma só vez):
SELECT * FROM users WHERE id IN (3, 7, 12, 19);
```

Reduzimos de **51 viagens de rede para apenas 2 consultas** otimizadas!

---

<!-- _header: "Benchmark · Comparativo" -->

## 📊 Comparativo de Performance

| Cenário | Lazy Loading (Sem `with`) | Eager Loading (Com `with`) |
|:---|:---:|:---:|
| **10 perguntas na tela** | 11 queries | **2 queries** |
| **50 perguntas na tela** | 51 queries | **2 queries** |
| **500 perguntas na tela** | 501 queries | **2 queries** |
| **Latência Média** | ~380ms a 1200ms | **~15ms** |
| **Consumo de CPU** | Pico elevado | Imperceptível |

---

<!-- _header: "Active Retrieval · Slido" -->

## 📱 Cool-Down: Validação de Conhecimento

> **Quiz Final no Slido:**  
> *"Qual método do Eloquent define o lado N de um relacionamento N:1 (a classe do Model cuja tabela guarda a chave estrangeira `user_id`)?"*

- **A)** `hasMany()`
- **B)** `belongsTo()`  *(Correta!)*
- **C)** `belongsToMany()`

---

<!-- _class: lead -->
<!-- _header: "Sprint 02 · Deploy" -->

## 🏁 Encerramento da Sprint 02

Resolva os tickets, faça o commit e submeta o link no LMS:

```bash
git add .
git commit -m "fix: add user relationship and eager loading to prevent N+1 queries"
git push origin main
```

**Próxima Aula:** *Autenticação (AuthN) e Rotas Protegidas no Laravel!*
