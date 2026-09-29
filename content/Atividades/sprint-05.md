---
type: assignment
base_repo: asklive-app
base_branch: v4.5-authz-starter
---

# Sprint 05: Proteção de Entidade Filha (Pergunta)

**Objetivo:** Após acompanharmos a proteção do modelo `Evento` em sala, o seu desafio é proteger a entidade filha `Pergunta`. O sistema não pode permitir que qualquer usuário delete perguntas alheias.

## 🛠️ Tarefas (Tickets)

### Ticket 1: O Componente Visual
1. Crie um novo componente Blade `danger-button` (`resources/views/components/danger-button.blade.php`).
2. Ele deve ser um botão vermelho para sinalizar exclusão.

### Ticket 2: A Regra de Negócio (Policy)
1. Crie uma Policy para o modelo `Pergunta` (`PerguntaPolicy`).
2. Escreva o método `delete(User $user, Pergunta $pergunta)`.
3. A regra: Retorna verdadeiro apenas se o `$user->id` for igual ao `user_id` da pergunta OU se o usuário for o dono do evento daquela pergunta.

### Ticket 3: Protegendo o Back-end
1. Vá no `EventoController@destroyPergunta` (ou `PerguntaController`).
2. Adicione `$this->authorize('delete', $pergunta);` antes de deletar a pergunta do banco.

### Ticket 4: Protegendo a Interface (UI)
1. Na view `eventos.show`, envolva o componente `<x-danger-button>` na diretiva `@can('delete', $pergunta)`.

## 📏 Critérios de Aceite (Rubrica)
- O teste local `AuthZTest` do seu repositório base deve passar com 100% de sucesso.
- O botão "Excluir Pergunta" some para perguntas de outros usuários.
- O Laravel retorna a tela de 403 caso forcem a URL de exclusão.

## 📚 Material de Apoio
- [[Conceitos/Seguranca/authz-policies|Diferença entre AuthN e AuthZ]]
