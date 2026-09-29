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
// app/Policies/PerguntaPolicy.php
public function delete(User $user, Pergunta $pergunta)
{
    // O usuário logado é o MESMO usuário que criou a pergunta?
    return $user->id === $pergunta->user_id;
}
```

---

## Barrando na Porta (Controller)

Se a Policy diz "Não", o Controller não pode deixar passar.

```php
// app/Http/Controllers/EventoController.php
public function destroyPergunta(Pergunta $pergunta)
{
    $this->authorize('delete', $pergunta);
    $pergunta->delete();
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
<!-- feed.blade.php -->
<div>
    <p>{{ $pergunta->body }}</p>
    
    <!-- Só renderiza o HTML se a Policy permitir! -->
    @can('delete', $pergunta)
        <x-danger-button>Excluir Pergunta</x-danger-button>
    @endcan
</div>
```

---

## 🚀 Live Coding vs Sprint

- **Live Coding (Agora):** Proteger as ações globais do `Evento` (Excluir Evento).
- **Sprint (Exercício):** Proteger as ações na `Pergunta` (Apenas autor apaga).
