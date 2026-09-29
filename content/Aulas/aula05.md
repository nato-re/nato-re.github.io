---
marp: true
theme: default
class: invert
paginate: true
---

# 🛡️ Aula 05: AuthZ & Interfaces Dinâmicas
*TPA Laravel - AskLive App*
**Branch de Partida:** `v4.5-authz-starter`

---

## O Dilema do Usuário Autenticado

Você fez Login (AuthN). O sistema sabe quem você é.

**Problema:** Você acessa a URL `/perguntas/10/delete`. A pergunta 10 foi criada por *outro* usuário. 
O que o sistema faz?

1. Deleta a pergunta? ❌ (Inseguro!)
2. Bloqueia a ação? ✅ (Autorização - AuthZ!)

---

## Laravel Policies (Os Seguranças da Balada)

As **Policies** são classes que organizam a lógica de autorização em torno de um Model.

```php
// app/Policies/EventoPolicy.php
public function close(User $user, Evento $evento)
{
    // O usuário logado é o MESMO usuário que criou o evento?
    return $user->id === $evento->user_id;
}
```

---

## Barrando na Porta (Controller)

Se a Policy diz "Não", o Controller não pode deixar passar.

```php
// app/Http/Controllers/EventoController.php
public function close(Evento $evento)
{
    $this->authorize('close', $evento);
    $evento->update(['status' => 'fechado']);
    return back();
}
```

---

## A Frustração do Usuário (UI/UX)

O Controller está protegido (Recebemos erro 403). **Mas o botão de Excluir continua na tela!**
É péssimo para a experiência de uso oferecer botões que não funcionam.

**A Solução:** Envolver componentes Blade com autorização.

---

## Componentização e Diretiva @can

```html
<!-- eventos/show.blade.php -->
<div>
    <h1>{{ $evento->titulo }}</h1>
    
    <!-- Só renderiza o HTML se a Policy permitir! -->
    @can('close', $evento)
        <x-warning-button>Encerrar Evento</x-warning-button>
    @endcan
</div>
```

---

## 🚀 Live Coding vs Sprint

- **Live Coding (Agora):** Proteger as ações globais do `Evento` (Excluir Evento).
- **Sprint (Exercício):** Proteger as ações na `Pergunta` (Apenas autor apaga).
