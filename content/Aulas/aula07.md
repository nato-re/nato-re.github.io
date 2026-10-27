---
marp: true
title: "Aula 07: Engenharia de Requisitos & Ciclo de Vida do Dado"
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
created: 2026-10-13T08:00:00
updated: 2026-10-13T08:00:00
---

> [!TIP] Apresentação
> 📽️ **<a href="/slides/aula07.html" data-router-ignore target="_blank">Abrir Slides (Marp)</a>** — Versão para projeção em sala de aula.

# 📋 Aula 07: Engenharia de Requisitos & Ciclo de Vida do Dado
*TPA Laravel — AskLive App (FalaQ)*  
**Branch de Partida:** `v5.0-pivot-starter`

---

## 💥 O Desabafo do Cliente da Startup

O organizador de palestras chega desesperado:

> *"Qualquer um cadastra evento falso na plataforma e perguntas de spam estão aparecendo no telão! Não podemos deixar nada ir ao ar sem moderação! Preciso de um fluxo onde o conteúdo nasce em análise e só o organizador ou palestrante pode aprovar!"*

---

## 🧭 O Fluxo Real da Fila de Moderação (Padrão Slido)

```
[ Participante da Plateia ]
          │
          ▼ Envia pergunta no formulário
┌──────────────────────────────────────┐
│  Pergunta nasce no Banco de Dados    │
│         status: 'pendente'           │
└──────────────────────────────────────┘
          │
          ├───> Telão Público (Auditório): ❌ NÃO EXIBE (status = 'aprovada')
          │
          ▼
┌──────────────────────────────────────┐
│       Fila do Moderador              │ ──> Protegida por Policy (Aula 05):
│   (Apenas o Palestrante visualiza)   │     @can('moderate', $evento)
└──────────────────────────────────────┘
          │
     ┌────┴──────────────┐
     ▼                   ▼
 [ APROVAR ]        [ REJEITAR ]
     │                   │
     ▼                   ▼
status: 'aprovada'   status: 'rejeitada'
     │                   │
     ▼                   ▼
 Aparece no Telão!    Arquivada
```

---

## 🎯 O Método dos Grifos (A Técnica do Lápis)

Ao ler uma história de usuário ou chamado, grife as palavras:

| Elemento | Texto do Cliente | No Laravel |
| :--- | :--- | :--- |
| **Substantivo** | "Registrar **denúncias** e **moderações**" | **Model & Migration** (`Moderacao`) |
| **Preposição** | "Moderação pertence **à pergunta**" | **Chave Estrangeira** (`pergunta_id`) |
| **Verbo** | "O moderador pode **aprovar**" | **Rota & Controller** (`updateStatus`) |
| **Adjetivo** | "Motivo **obrigatório** com **10 letras**" | **FormRequest** (`required\|min:10`) |
| **Condição** | "Nasce **em análise** e vira **aprovada**" | **Coluna status** (`->default(...)`) |

---

## 🔄 Ciclo de Vida: A Armadilha do Booleano

*"Professor, por que não colocar uma coluna `$table->boolean('is_approved')`?"*

**Por que quebra em produção?**
1. O que acontece quando o item fica em *"suspensão temporária"*?
2. Em 3 meses, seu banco vira um pesadelo: `is_approved`, `is_rejected`, `is_pending`.
3. **A Solução:** Uma única coluna `status` com valores finitos e claros (`rascunho`, `publicado`, `encerrado`).

---

## 🛡️ Migrations com Valor Padrão (`default`)

O formulário do usuário **nunca** deve enviar o status inicial!

```php
Schema::table('eventos', function (Blueprint $table) {
    // Todo evento nasce como rascunho automaticamente!
    $table->string('status')->default('rascunho');
});
```

> **Regra de Ouro:** Quem dita o ponto de partida do ciclo de vida é o banco de dados via `->default()`, blindando a aplicação contra manipulação externa no payload da requisição.

---

## 🚀 Live Coding (Mestre): Ciclo de Vida do Evento

Vamos implementar na entidade pai `Evento`:
- Estado inicial: `rascunho`
- Transição para: `publicado` ou `encerrado`
- Regra na Home: apenas eventos `publicados` aparecem no feed público.

---

### Passo 1: Migration com Coluna `status`

```bash
php artisan make:migration add_status_to_eventos_table --table=eventos
```

```php
Schema::table('eventos', function (Blueprint $table) {
    $table->string('status')->default('rascunho')->after('descricao');
});
```

Rodar:
```bash
php artisan migrate
```

---

### Passo 2: Atualizar o Model `Evento`

Em `app/Models/Evento.php`:
```php
class Evento extends Model
{
    protected $fillable = [
        'titulo',
        'descricao',
        'data_inicio',
        'user_id',
        'status', // 🔒 OBRIGATÓRIO: impede MassAssignmentException
    ];

    public function isPublicado(): bool
    {
        return $this->status === 'publicado';
    }
}
```

---

### Passo 3: Rota e Controller de Transição de Estado

Em `routes/web.php`:
```php
use App\Http\Controllers\EventoController;

Route::patch('/eventos/{evento}/status', [EventoController::class, 'updateStatus'])
    ->middleware('auth')
    ->name('eventos.status');
```

---

### Passo 4: Método no `EventoController`

```php
public function updateStatus(Request $request, Evento $evento)
{
    $request->validate([
        'status' => 'required|in:rascunho,publicado,encerrado',
    ]);

    $evento->update([
        'status' => $request->status,
    ]);

    return back()->with('status', 'Status do evento atualizado com sucesso!');
}
```

---

### Passo 5: Filtrar Feed Público na Home

No `EventoController@index`:
```php
public function index()
{
    // Apenas eventos publicados entram na vitrine!
    $eventos = Evento::where('status', 'publicado')
        ->latest()
        ->paginate(10);

    return view('eventos.index', compact('eventos'));
}
```

---

### Passo 6: Transições de Estado na View Blade

Em `resources/views/eventos/show.blade.php`:

Renderizamos o status com badge visual e disponibilizamos os botões de transição para o organizador via formulários com *method spoofing* (`@method('PATCH')`):

```blade
{{-- Feedback de transição de status --}}
@if (session('status'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
@endif

<div class="d-flex align-items-center gap-3 mb-4">
    {{-- Badge do status atual --}}
    @if ($evento->status === 'publicado')
        <span class="badge bg-success fs-6">Publicado</span>
    @elseif ($evento->status === 'encerrado')
        <span class="badge bg-secondary fs-6">Encerrado</span>
    @else
        <span class="badge bg-warning text-dark fs-6">Rascunho</span>
    @endif

    {{-- Ações exclusivas do organizador (AuthZ) --}}
    @can('update', $evento)
        @if ($evento->status === 'rascunho')
            <form action="{{ route('eventos.status', $evento) }}" method="POST" class="d-inline">
                @csrf
                @method('PATCH')
                <input type="hidden" name="status" value="publicado">
                <button type="submit" class="btn btn-sm btn-success fw-bold">
                    🚀 Publicar Evento
                </button>
            </form>
        @elseif ($evento->status === 'publicado')
            <form action="{{ route('eventos.status', $evento) }}" method="POST" class="d-inline">
                @csrf
                @method('PATCH')
                <input type="hidden" name="status" value="encerrado">
                <button type="submit" class="btn btn-sm btn-outline-danger fw-bold">
                    🔒 Encerrar Evento
                </button>
            </form>
        @endif
    @endcan
</div>
```

> **Por que `@method('PATCH')`?** Formulários HTML suportam nativamente apenas `GET` e `POST`. A diretiva `@method('PATCH')` injeta um campo oculto (`<input type="hidden" name="_method" value="PATCH">`) para o Laravel rotear a requisição com fidelidade para a rota `Route::patch()` definida no Passo 3.

---

## 🎯 Agora é com vocês! (Sprint 07)

Espelho do Aprendiz na entidade filha: **Módulo de Moderação de Perguntas**.

*(👉 Este exercício replica exatamente a estrutura exigida na Prova Final!)*

- 📖 **Artigo de Requisitos:** [[Conceitos/Arquitetura/engenharia-de-requisitos|Engenharia de Requisitos]]
- 🔄 **Artigo de Ciclo de Vida:** [[Conceitos/Database/ciclo-de-vida-e-status|Ciclo de Vida & Status]]
- 🎯 **Enunciado e Rubrica:** [[Atividades/sprint-07|Sprint 07: Sistema de Moderação de Perguntas]]
