---
type: assignment
id: asklive-sprint-06
title: "[Sprint 06] Upvotes & Ranking de Perguntas no Telão"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
status: published
publish_date: 2026-10-06T08:00:00Z
due_date: 2026-10-13T23:59:59Z
points: 10
base_repo: https://github.com/nato-re/falaq-base (branch v5.0-pivot-starter)
autograder_rubric: pivot_upvotes_etapa3.yaml
tags:
  - laravel
  - eloquent
  - pivot
  - relacionamento-nm
  - etapa3
created: 2026-10-06T08:00:00
updated: 2026-10-06T08:00:00
---

# 🚀 [Sprint 06] Upvotes & Ranking de Perguntas no Telão

---

## 🎯 Contexto Corporativo

Após o sucesso do sistema de inscrição em palestras demonstrado pelo Tech Lead em sala, o time de produto da startup **AskLive (FalaQ)** aprovou a funcionalidade mais aguardada pelos palestrantes: **o ranking de perguntas por votos da plateia**.

Atualmente, quando uma palestra recebe dezenas de perguntas, as melhores dúvidas acabam se perdendo no feed em ordem cronológica. Sua tarefa como desenvolvedor backend júnior é implementar o sistema de upvotes na entidade `Pergunta` usando modelagem Muitos-para-Muitos ($N:M$) com tabela pivot, garantindo que usuários autenticados possam curtir/descurtir perguntas e que o telão exiba as mais votadas no topo!

---

## 🚀 Sua Missão

Trabalhe na branch `v5.0-pivot-starter` e implemente os quatro chamados técnicos abaixo:

### 🎫 Ticket #009 (Modelagem N:M e Migration da Pivot)
1. Crie uma nova migration com o comando `php artisan make:migration create_pergunta_user_table --create=pergunta_user`.
2. Configure as colunas de chave estrangeira:
   - `pergunta_id` (com `constrained()->cascadeOnDelete()`)
   - `user_id` (com `constrained()->cascadeOnDelete()`)
   - `timestamps()`
3. Adicione uma restrição de integridade composta para impedir duplicidade de votos do mesmo usuário na mesma pergunta:
   ```php
   $table->unique(['pergunta_id', 'user_id']);
   ```
4. Execute `php artisan migrate`.

### 🎫 Ticket #010 (Configuração dos Models com belongsToMany)
1. No model `app/Models/Pergunta.php`, crie o método de relacionamento `votos()`:
   - Deve retornar uma relação `BelongsToMany` apontando para o model `User::class`.
   - Adicione o encadeamento `->withTimestamps()`.
2. No model `app/Models/User.php`, crie o método inverso `perguntasVotadas()`:
   - Deve retornar uma relação `BelongsToMany` apontando para `Pergunta::class` na tabela pivot `pergunta_user`.
   - Adicione `->withTimestamps()`.

### 🎫 Ticket #011 (Rota de Voto com Alternância via toggle)
1. Em `routes/web.php`, registre uma rota do tipo `POST`:
   - URL: `/perguntas/{pergunta}/votar`
   - Nome: `perguntas.votar`
   - Protegida pelo middleware `auth`
2. No `PerguntaController` (ou controller responsável pelas perguntas), implemente o método `votar(Pergunta $pergunta)`:
   - Utilize a alternância mágica do Eloquent: `$pergunta->votos()->toggle(auth()->id());`
   - Redirecione o usuário de volta (`return back();`) com mensagem de status.

### 🎫 Ticket #012 (Ranking e UI de Votos no Telão)
1. No carregamento das perguntas de um evento (`EventoController@show`), altere a consulta para ordenar por relevância:
   - Inclua a contagem de votos via `withCount('votos')`.
   - Ordene as perguntas de forma decrescente: `->orderByDesc('votos_count')`.
2. Na view de exibição do evento (`resources/views/eventos/show.blade.php`), dentro de cada card de pergunta:
   - Exiba a quantidade de votos usando o atributo virtual `{{ $pergunta->votos_count }}`.
   - Adicione um formulário/botão de Upvote que submete para `route('perguntas.votar', $pergunta)`.
   - Se o usuário já votou na pergunta, estilize o botão de forma destacada (ex: indicando que um novo clique removerá o voto).

---

## ⚖️ Critérios de Aceite (Rubrica do Autograder)

- [ ] A migration `create_pergunta_user_table` cria a tabela `pergunta_user` com chave única composta `['pergunta_id', 'user_id']`.
- [ ] O model `Pergunta` possui o relacionamento `votos()` retornando `BelongsToMany`.
- [ ] O model `User` possui o relacionamento `perguntasVotadas()` retornando `BelongsToMany`.
- [ ] Usuários anônimos são impedidos de votar (redirecionados para login ou status 401/403).
- [ ] Disparar a rota `perguntas.votar` insere o registro na tabela pivot se o usuário ainda não votou.
- [ ] Disparar a rota `perguntas.votar` remove o registro da tabela pivot caso o usuário já tenha votado (`toggle`).
- [ ] As perguntas na tela do evento são ordenadas pelo número de votos (`votos_count`) de forma decrescente.
- [ ] A suíte de testes `php artisan test --filter=UpvotePerguntaTest` passa com 100% de sucesso.

---

## 📚 Material de Apoio na Wiki
- [[Conceitos/Database/relacionamento-n-m-pivot|Conceito: Relacionamentos N:M e Tabelas Pivot]]
- [[Conceitos/Database/relacionamento-n-1|Conceito: Relacionamentos 1:N no Eloquent]]
- [[Conceitos/Database/ordenacao-orderby|Conceito: Ordenação de Consultas (orderBy)]]
- [[Aulas/aula06|Slides e Roteiro da Aula 06]]
