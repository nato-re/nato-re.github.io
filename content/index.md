---
title: Wiki TPA — Desenvolvimento Web Backend
tags:
  - wiki
  - home
  - cotemig
  - laravel
created: 2026-08-31T20:12:00
updated: 2026-10-05
---

# 🎓 Wiki — TPA: Desenvolvimento Backend com Laravel

Portal oficial de conteúdos pedagógicos, roteiros práticos e apresentações para os estudantes de **TPA (Técnicas de Programação Avançadas)** do Colégio COTEMIG.

---

## 📍 Etapa em Andamento: 3ª Etapa (AskLive / FalaQ)

Estamos desenvolvendo o ecossistema da startup **FalaQ-Eu_T_3scuto**, focando em boas práticas de arquitetura MVC, performance de consultas SQL e APIs RESTful.

| Aula | Tema da Aula | Roteiro de Leitura | Apresentação | Atividade Prática |
| :---: | :--- | :---: | :---: | :---: |
| **01** | Onboarding no MVP, FormRequests e Paginação | [[Aulas/aula01\|📖 Guia]] | <a href="/slides/aula01.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-01\|🎯 Sprint 01]] |
| **02** | Relacionamentos N:1 e Otimização Eager Loading | [[Aulas/aula02\|📖 Guia]] | <a href="/slides/aula02.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-02\|🎯 Sprint 02]] |
| **03** | Área VIP: Autenticação Manual e Middlewares | [[Aulas/aula03\|📖 Guia]] | <a href="/slides/aula03.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-03\|🎯 Sprint 03]] |
| **04** | Revisão de Auth, Tailwind CSS e Validação Visual | [[Aulas/aula04\|📖 Guia]] | <a href="/slides/aula04.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-04\|🎯 Sprint 04]] |
| **05** | AuthZ & Interfaces Dinâmicas (Policies e Blade) | [[Aulas/aula05|📖 Guia]] | <a href="/slides/aula05.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-05|🎯 Sprint 05]] |
| **06** | Relacionamentos N:M & Tabelas Pivot (Upvotes) | [[Aulas/aula06|📖 Guia]] | <a href="/slides/aula06.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-06|🎯 Sprint 06]] |

👉 [[Etapas/etapa-3|Acessar o Hub Completo da 3ª Etapa com Repositório e Instruções de Setup]]

---

## 🧠 Biblioteca de Conceitos

Consulte os artigos atômicos para tirar dúvidas de sintaxe e arquitetura:

### 🗄️ Banco de Dados & Eloquent ORM
- [[Conceitos/Database/model|Model (Eloquent ORM)]] — Definição de tabelas, atributos e convenções
- [[Conceitos/Database/relacionamento-n-1|Relacionamentos N:1]] — Uso de `belongsTo` e `hasMany` entre tabelas
- [[Conceitos/Database/relacionamento-n-m-pivot|Relacionamentos N:M e Tabelas Pivot]] — Relações muitos-para-muitos, `belongsToMany`, `toggle()` e `withCount()`
- [[Conceitos/Database/eager-loading-with|Eager Loading com with()]] — Detecção e eliminação do problema $N+1$
- [[Conceitos/Database/filtro-where|Filtros com where()]] — Filtragem condicional encadeada
- [[Conceitos/Database/ordenacao-orderby|Ordenação (orderBy / latest)]] — Ordenação de resultados
- [[Conceitos/Database/paginacao|Paginação de Dados]] — Navegação eficiente sem sobrecarregar a memória

### 🌐 Arquitetura Web & MVC
- [[Conceitos/HTTP/controller|Controllers no Laravel]] — Orquestração de regras de negócio
- [[Conceitos/HTTP/validacao-form-request|Validação com FormRequest]] — Proteção de dados e HTTP 422
- [[Conceitos/HTTP/requisicao|Requisições HTTP]] — Ciclo de vida da requisição e status codes
- [[Conceitos/Frontend/blade|Blade Templating]] — Renderização dinâmica de views HTML

### 🔒 Segurança & Autorização
- [[Conceitos/Seguranca/auth-facade|Auth Facade]] — Login manual e usuário autenticado
- [[Conceitos/Seguranca/authz-policies|Autorização (AuthZ & Policies)]] — Regras de acesso e proteção de modelos
- [[Conceitos/Seguranca/hash-senhas|Hash de Senhas]] — Armazenamento seguro de credenciais

---

## 📚 Jornada Completa da Disciplina
- [[Etapas/etapa-1|1ª Etapa: Fundamentos de PHP & Lógica Web]]
- [[Etapas/etapa-2|2ª Etapa: Introdução ao Laravel, Migrations e CRUD]]
- [[Etapas/etapa-3|3ª Etapa: APIs REST & Otimização com Eloquent ORM]]
