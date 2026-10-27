---
type: assignment
id: asklive-sprint-08
title: "[Sprint 08] Interações Dinâmicas com APIs & fetch"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
status: published
publish_date: 2026-10-20T08:00:00Z
due_date: 2026-10-27T23:59:59Z
points: 14
base_repo: https://github.com/nato-re/falaq-base (branch v5.5-moderacao-complete)
tags:
  - laravel
  - http
  - api
  - fetch
  - javascript
  - etapa3
created: 2026-10-20T08:00:00
updated: 2026-10-20T08:00:00
---

# 🚀 [Sprint 08] Interações Dinâmicas com APIs & fetch()

---

## 🎯 Contexto Corporativo (A Demanda da Startup)

Após o sucesso da Fila de Moderação, a equipe de produto da **AskLive (FalaQ)** recebeu feedbacks contundentes de usuários durante uma conferência ao vivo:

> *"O telão é incrível, mas toda vez que clicamos para votar numa pergunta ou consultar o perfil de um palestrante, a página inteira recarrega, causando um 'piscar' na tela e fazendo o usuário perder a posição de rolagem!"*

Sua missão como desenvolvedor backend/fullstack é modernizar a experiência de uso:
1. No **Backend:** Permitir que endpoints respondam JSON estruturado e consumir serviços externos com a Facade `Http::get`.
2. No **Frontend:** Usar a função nativa `fetch()` do JavaScript para alternar votos e carregar avatares em segundo plano, sem recarregar a página!

---

## 🛠️ Chamados Técnicos (Tickets da Sprint)

Trabalhe na branch `v5.5-moderacao-complete` e execute os chamados abaixo:

### 🎫 Ticket #017 (Endpoint de Voto com Resposta Híbrida/JSON)
1. No `PerguntaController@votar`, adapte o método para verificar se a requisição espera uma resposta JSON (`$request->expectsJson()` ou `$request->ajax()`):
   - Alterne o voto via `$pergunta->votos()->toggle(auth()->id())`.
   - Se a requisição esperar JSON, devolva:
     ```php
     return response()->json([
         'votos_count' => $pergunta->votos()->count(),
         'votado'      => $pergunta->votos()->where('user_id', auth()->id())->exists(),
     ]);
     ```
   - Se for um envio de formulário comum sem JS, mantenha o fallback tradicional: `return back()`.

### 🎫 Ticket #018 (Upvote sem Recarregar a Página via fetch())
1. Na view `resources/views/eventos/show.blade.php`, localize o botão de upvote de cada pergunta.
2. Adicione uma função JavaScript `votarPergunta(perguntaId, buttonElement)`:
   - Dispare uma requisição `POST` para `/perguntas/${perguntaId}/votar`.
   - Passe os cabeçalhos obrigatórios do Laravel:
     ```javascript
     headers: {
         'Accept': 'application/json',
         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
     }
     ```
   - No `.then(data => ...)`, atualize o texto do contador numérico dentro do botão com `data.votos_count` sem recarregar a tela!

### 🎫 Ticket #019 (Consumo de Avatar no Backend com Http::get)
1. Crie o `PerfilController` com o comando `php artisan make:controller PerfilController`.
2. Implemente o método `buscarAvatar(string $username)`:
   - Use `Http::timeout(3)->get("https://api.github.com/users/{$username}")`.
   - Se a resposta for bem-sucedida, extraia `avatar_url`.
   - Se falhar (usuário não encontrado ou erro de rede), aplique o fallback defensivo gerando uma foto com as iniciais (`https://ui-avatars.com/api/?name=${username}`).
   - Retorne a resposta em formato JSON: `response()->json(['avatar' => $avatarUrl])`.

### 🎫 Ticket #020 (Exibição Dinâmica na View)
1. No card de cada pergunta em `eventos/show.blade.php`, inclua um avatar dinâmico para o autor da pergunta.
2. Ao carregar a página, utilize `fetch()` para preencher a foto do autor caso ele possua um usuário do GitHub cadastrado.

---

## 📏 Rubrica de Avaliação em Fases Cumulativas (14 Pontos)

| Nível / Fase | Critério Técnico Avaliado | Pontos |
| :--- | :--- | :---: |
| **Fase 1: Backend como Serviço (JSON)** | Endpoint de voto adaptado para responder JSON com contador atualizado + Rota de perfil com `Http::get` e fallback | **5,0 pts** |
| **Fase 2: Frontend Dinâmico (fetch)** | Implementação do `fetch()` com cabeçalhos corretos (`Accept: application/json` e `X-CSRF-TOKEN`) | **4,5 pts** |
| **Fase 3: UX & Manipulação do DOM** | Atualização do número de votos em tela sem reload + Fallback gracioso funcionando caso a API externa caia | **4,5 pts** |
| **TOTAL** | | **14,0 pts** |

---

## 📚 Material de Apoio na Wiki
- [[Conceitos/HTTP/consumo-api-http-e-fetch|Consumo de APIs: O Ciclo HTTP Ponta a Ponta (Http::get & fetch)]]
- [[Conceitos/HTTP/requisicao|Requisições HTTP, Headers & Status Codes]]
- [[Conceitos/Database/relacionamento-n-m-pivot|Tabelas Pivot e Método toggle()]]
