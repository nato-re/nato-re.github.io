---
type: assignment
id: asklive-sprint-03
title: "[Sprint 03] Área VIP: Autenticação e Visibilidade"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
status: published
publish_date: 2026-09-15T08:00:00Z
due_date: 2026-09-22T23:59:59Z
points: 10
base_repo: https://github.com/nato-re/falaq-base (branch v3.0-authN-public)
autograder_rubric: consolidation_etapa3.yaml
tags:
  - laravel
  - autenticacao
  - middleware
  - etapa3
created: 2026-09-14T22:15:00
updated: 2026-09-22T01:05
---

# 🚀 [Sprint 03] Área VIP: Autenticação e Visibilidade

---

## 🎯 Contexto Corporativo
Bem-vindos de volta à startup **AskLive (FalaQ)**! Na aula de hoje, o professor configurou o fluxo de Login/Registro e protegeu a gestão de **Eventos**. Agora apenas Organizadores logados podem criar novos eventos, e eventos ainda em rascunho foram ocultados da página principal.

No entanto, o mural de **Perguntas** continua escancarado! Qualquer visitante anônimo consegue disparar perguntas, e o organizador não tem controle sobre quais perguntas vão aparecer no telão principal do evento.

---

## 🚀 Sua Missão
Para esta sprint, você precisará proteger o acesso à criação de perguntas e adicionar uma lógica de moderação (visibilidade).

Faça o `git clone` (ou puxe as atualizações `git pull`) mudando para a branch base da aula 3 (`v3.0-authN-public`), e resolva os dois chamados abaixo:

### 🎫 Ticket #005 (Proteção com Middleware)
A rota que recebe os dados do formulário de perguntas não pode ser acessada por usuários não logados (anônimos).
1. No seu arquivo `routes/web.php`, localize a rota de `POST` responsável por armazenar uma nova pergunta.
2. Aplique o middleware de autenticação (`auth`) nesta rota para que o *Segurança* do Laravel bloqueie visitantes sem ingresso.

### 🎫 Ticket #006 (Moderação / Status Público)
O organizador solicitou que as perguntas enviadas pelos participantes fiquem "pendentes de moderação" (escondidas) até que ele aprove. A tabela `perguntas` já possui uma coluna booleana chamada `is_public` (que por padrão vem como `false` ao criar no banco).
1. No `EventoController`, ao carregar as perguntas de um evento específico, adicione um novo filtro (`where`) para trazer **apenas as perguntas onde `is_public` for `true`**.
2. Garanta que essa mudança não quebre a paginação e o Eager Loading (`with('user')`) desenvolvidos nas sprints anteriores.

---

## ⚖️ Critérios de Aceite (Rubrica do Autograder)
- [ ] A rota `POST /eventos/{evento}/perguntas` (ou equivalente) está protegida pelo middleware `auth`.
- [ ] O acesso anônimo a essa rota via ThunderClient/Postman retorna redirecionamento para o login (HTTP 302) ou não-autorizado (HTTP 401).
- [ ] A query que busca as perguntas no Controller utiliza a cláusula `where('is_public', true)`.
- [ ] As perguntas pendentes (onde `is_public` é `false`) sumiram da visão do público.

---

## 📚 Material de Apoio na Wiki
- [[HTTP/rotas|Entendendo Rotas e Agrupamentos]]
- [[HTTP/middleware|Como aplicar Middlewares de Segurança]]
- [[Seguranca/auth-facade|Trabalhando com a Auth Facade]]
- [[Aulas/aula03|📖 Roteiro e Slides da Aula 03]]
