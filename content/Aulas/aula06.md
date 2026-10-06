---
marp: true
title: "Aula 06: Relacionamentos N:M & Tabelas Pivot"
theme: default
class: lead
backgroundColor: "#1E1E2E"
color: "#CDD6F4"
style: |
  h1, h2, h3 { color: #89B4FA; }
  strong { color: #F38BA8; }
  a { color: #A6E3A1; text-decoration: none; }
  code { background-color: #313244; color: #FAB387; padding: 2px 6px; border-radius: 4px; }
  pre { background-color: #181825; border-left: 4px solid #89B4FA; }
paginate: true
created: 2026-10-06T08:00:00
updated: 2026-10-06T08:00:00
---

> [!TIP] Apresentação
> 📽️ **<a href="/slides/aula06.html" data-router-ignore target="_blank">Abrir Slides (Marp)</a>** — Versão para projeção em sala de aula.

# 🔗 Aula 06: Relacionamentos N:M & Tabelas Pivot
*TPA Laravel — AskLive App (FalaQ)*  
**Branch de Partida:** `v5.0-pivot-starter`

---

## 💥 O Problema na Startup AskLive

A palestra começou. Em 10 minutos, o auditório enviou **180 perguntas**.

**O dilema do palestrante no palco:**
- O telão exibe perguntas em ordem cronológica simples.
- A pergunta mais genial sobre segurança ficou soterrada no final da fila.
- Como a plateia pode **votar** nas melhores perguntas para que elas subam no ranking?

---

## 🚫 A Tentação da "Gambiarra"

*"Professor, basta criar uma coluna `votos_count` na tabela de perguntas e somar +1 toda vez que alguém clicar!"*

**Por que isso quebra em produção?**
1. **Fraude / Autoclick:** O mesmo usuário clica 50 vezes seguidas no botão.
2. **Inconsistência:** Quem votou em quê? Como o usuário sabe se já votou para poder cancelar o voto?
3. **Falta de rastreabilidade:** Não sabemos a identidade do eleitor.

---

## 🧩 Modelagem: Por que 1:N não resolve?

Pense na relação entre **Usuários** e **Perguntas** no contexto de votos:

- Um **Usuário** pode votar em **Muitas** perguntas.
- Uma **Pergunta** pode receber votos de **Muitos** usuários.

Se colocarmos `user_id` na tabela `perguntas`, a pergunta só poderia ter 1 voto na vida inteira.  
Se colocarmos `pergunta_id` na tabela `users`, o usuário só poderia votar em 1 pergunta!

👉 Precisamos de uma relação **Muitos para Muitos ($N:M$)**.

---

## 🌉 A Tabela Pivot (A Ponte Entre Mundos)

Uma relação $N:M$ é dividida em **duas relações 1:N** através de uma tabela intermediária:

```
[ Usuários (users) ]  1 ──< N  [ pergunta_user ]  N >── 1  [ Perguntas (perguntas) ]
```

Cada linha da tabela `pergunta_user` representa um único voto:
- `user_id`: quem votou
- `pergunta_id`: qual pergunta recebeu o voto

---

## 📏 A Convenção Sagrada do Laravel

O Laravel descobre a tabela pivot sozinho se você seguir a regra:

1. Nomes dos dois models no **singular** (`pergunta` e `user`).
2. Coloque-os em **ordem alfabética**: `P` vem antes de `U`.
3. Junte em snake_case: **`pergunta_user`**.

```
Evento + User   ➡️   evento_user   (E antes de U)
Tag + Pergunta  ➡️   pergunta_tag  (P antes de T)
```

*(Se usar `users_perguntas` ou `perguntas_users`, o Laravel não encontra a tabela sem configuração manual!)*

---

## 🛡️ A Migration da Pivot

```bash
php artisan make:migration create_evento_user_table --create=evento_user
```

```php
Schema::create('evento_user', function (Blueprint $table) {
    $table->id();
    $table->foreignId('evento_id')->constrained()->cascadeOnDelete();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->timestamps();

    // 🔒 TRAVA DE OURO: impede duplicidade no banco!
    $table->unique(['evento_id', 'user_id']);
});
```

---

## 🤝 O Eloquent: belongsToMany

Definimos o método nos dois Models envolvidos:

```php
// app/Models/Evento.php
public function participantes(): BelongsToMany
{
    return $this->belongsToMany(User::class, 'evento_user')->withTimestamps();
}
```

```php
// app/Models/User.php
public function eventosInscritos(): BelongsToMany
{
    return $this->belongsToMany(Evento::class, 'evento_user')->withTimestamps();
}
```

---

## 🕹️ Manipulando Vínculos: A Mágica do toggle()

O Laravel tem métodos prontos para gerenciar a pivot:

```php
// Adiciona vínculo (se já existir, dá erro de unique no banco)
$evento->participantes()->attach($userId);

// Remove vínculo
$evento->participantes()->detach($userId);

// 🪄 TOGGLE: Se já está inscrito, remove. Se não está, inscreve!
$evento->participantes()->toggle($userId);
```

Para likes, favoritos e inscrições, o **`toggle()`** resolve tudo em 1 linha.

---

## ⚡ Performance: withCount()

Como listar eventos mostrando o total de inscritos sem gerar o problema $N+1$?

```php
// No Controller:
$eventos = Evento::withCount('participantes')
    ->orderByDesc('participantes_count')
    ->get();
```

O Eloquent injeta a coluna virtual `participantes_count` diretamente na query SQL (`COUNT(*)` agrupado), sem carregar milhares de usuários na memória RAM!

---

## 🚀 Mestre vs Aprendiz na Aula de Hoje

- **Live Coding (Mestre em Sala):**
  - Implementar a tabela `evento_user` (Inscrição em eventos).
  - Rota com `toggle()` para o participante entrar/sair do evento.
  - Exibir contador de inscritos na tela com `withCount('participantes')`.

- **Sprint 06 (Vocês na Startup):**
  - Implementar a tabela `pergunta_user` (Upvotes das perguntas).
  - Rota de upvote com `toggle()`.
  - Ordenar o telão pelas perguntas mais votadas!

---

# 🛠️ Roteiro de Live Coding (Passo a Passo)

### Passo 1: Criar a Migration da Pivot `evento_user`
```bash
php artisan make:migration create_evento_user_table --create=evento_user
```
No arquivo gerado em `database/migrations/`:
```php
public function up(): void
{
    Schema::create('evento_user', function (Blueprint $table) {
        $table->id();
        $table->foreignId('evento_id')->constrained()->cascadeOnDelete();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->timestamps();

        $table->unique(['evento_id', 'user_id']);
    });
}
```
Rodar:
```bash
php artisan migrate
```

---

### Passo 2: Configurar os Relacionamentos nos Models

Em `app/Models/Evento.php`:
```php
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

public function participantes(): BelongsToMany
{
    return $this->belongsToMany(User::class, 'evento_user')->withTimestamps();
}
```

Em `app/Models/User.php`:
```php
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

public function eventosInscritos(): BelongsToMany
{
    return $this->belongsToMany(Evento::class, 'evento_user')->withTimestamps();
}
```

---

### Passo 3: Rota e Controller da Inscrição

Em `routes/web.php`:
```php
Route::post('/eventos/{evento}/participar', [EventoController::class, 'toggleInscricao'])
    ->middleware('auth')
    ->name('eventos.participar');
```

Em `app/Http/Controllers/EventoController.php`:
```php
public function toggleInscricao(Evento $evento)
{
    $evento->participantes()->toggle(auth()->id());

    return back()->with('status', 'Inscrição atualizada com sucesso!');
}
```

---

### Passo 4: Exibir Contagem e Botão na View

No `EventoController@show`:
```php
public function show(Evento $evento)
{
    $evento->loadCount('participantes');
    return view('eventos.show', compact('evento'));
}
```

Na view `resources/views/eventos/show.blade.php`:
```blade
<div class="flex items-center gap-4 my-4">
    <span class="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
        👥 {{ $evento->participantes_count }} participante(s)
    </span>

    @auth
        <form action="{{ route('eventos.participar', $evento) }}" method="POST">
            @csrf
            <button type="submit" class="px-4 py-2 text-sm font-medium rounded-md {{ $evento->participantes->contains(auth()->user()) ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white' }}">
                {{ $evento->participantes->contains(auth()->user()) ? 'Cancelar Inscrição' : 'Inscrever-se no Evento' }}
            </button>
        </form>
    @endauth
</div>
```
