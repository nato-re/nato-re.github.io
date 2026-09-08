---
type: assignment
id: falaq-sprint-02
title: "[Sprint 02] Autoria de Perguntas & Otimização de Performance (N+1)"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
status: published
publish_date: 2026-09-08T08:00:00Z
due_date: 2026-09-15T23:59:59Z
points: 10
base_repo: https://github.com/nato-re/falaq-base
autograder_rubric: consolidation_etapa3.yaml
tags:
  - laravel
  - relacionamentos
  - performance
  - eager-loading
  - etapa3
created: 2026-09-08T07:33:00
updated: 2026-09-08T11:07
---

# 🚀 [Sprint 02] Autoria de Perguntas & Otimização de Performance (N+1)

---

## 🎯 Contexto Corporativo
Bem-vindos à Sprint 02 do time Backend da **FalaQ-Eu_T_3scuto**! Graças à Sprint 1, nosso MVP não quebra mais com spam de perguntas vazias e a paginação está ativa. No entanto, o organizador da palestra exigiu que o nome do participante apareça em cada pergunta postada no telão. Quando a funcionalidade foi liberada, o servidor de banco de dados quase caiu devido a um volume insano de consultas repetidas!

---

## 🚀 Sua Missão
No seu repositório clonado da FalaQ, resolva os dois chamados prioritários da Sprint:

### 🎫 Ticket #003 (Relacionamento N:1)
O Model `Pergunta` precisa estar vinculado ao Model `User`:
1. No Model `app/Models/Pergunta.php`, crie o método `user()` retornando o relacionamento `belongsTo(User::class)`.
2. No Model `app/Models/User.php`, crie o método inverso `perguntas()` retornando `hasMany(Pergunta::class)`.
3. Na view Blade (`resources/views/eventos/show.blade.php`), exiba o nome do autor em cada card com fallback seguro:
   `{{ $pergunta->user->name ?? 'Anônimo' }}`.

### 🎫 Ticket #004 (Performance & Carregamento Ansioso)
Elimine o terrível **Problema N+1**:
1. No `EventoController` (no método que lista as perguntas do evento), você **NÃO DEVE** deixar a busca disparar queries em loop (*Lazy Loading*).
2. Adicione o carregamento ansioso utilizando o método **`with('user')`** encadeado antes de paginar.
3. Certifique-se de manter os filtros do evento, a ordenação decrescente e a paginação de 10 em 10.

---

## ⚖️ Critérios de Aceite (Rubrica do Autograder)
- [ ] O Model `Pergunta` possui o método `user()` com retorno explícito `BelongsTo`.
- [ ] O Model `User` possui o método `perguntas()` com retorno explícito `HasMany`.
- [ ] O Controller utiliza `with('user')` na consulta de perguntas, evitando o problema do $N+1$.
- [ ] A View Blade exibe corretamente o nome do usuário vinculado com operador `??` contra nulos.

---

## 📚 Material de Apoio na Wiki
- [[Conceitos/relacionamento-n-1|Relacionamentos N:1 no Eloquent ORM]]
- [[Conceitos/eager-loading-with|O Problema N+1 e Eager Loading (with)]]
- [[Conceitos/paginacao|Paginação no Eloquent]]
- [[Aulas/aula02-marp|📖 Roteiro e Slides da Aula 02]]
