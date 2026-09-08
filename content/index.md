---
title: Wiki TPA — Desenvolvimento Web Backend
tags:
  - wiki
  - home
  - cotemig
  - laravel
created: 2026-08-31T20:12:00
updated: 2026-09-08T11:07
---

# 🎓 Wiki — TPA: Desenvolvimento Backend com Laravel

Portal oficial de conteúdos pedagógicos, roteiros práticos e apresentações para os estudantes de **TPA (Técnicas de Programação Avançadas)** do Colégio COTEMIG.

---

## 📍 Etapa em Andamento: 3ª Etapa (AskLive / FalaQ)

Estamos desenvolvendo o ecossistema da startup **FalaQ-Eu_T_3scuto**, focando em boas práticas de arquitetura MVC, performance de consultas SQL e APIs RESTful.

| Aula | Tema da Aula | Roteiro de Leitura | Apresentação | Atividade Prática |
| :---: | :--- | :---: | :---: | :---: |
| **01** | Onboarding no MVP, FormRequests e Paginação | [[Aulas/aula01-marp\|📖 Guia]] | <a href="/slides/aula01-marp.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-01\|🎯 Sprint 01]] |
| **02** | Relacionamentos N:1 e Otimização Eager Loading | [[Aulas/aula02-marp\|📖 Guia]] | <a href="/slides/aula02-marp.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-02\|🎯 Sprint 02]] |
| **03** | APIs RESTful & Recursos JSON Padronizados | *Em breve* | *Em breve* | *Em breve* |

👉 [[Etapas/etapa-3|Acessar o Hub Completo da 3ª Etapa com Repositório e Instruções de Setup]]

---

## 🧠 Biblioteca de Conceitos

Consulte os artigos atômicos para tirar dúvidas de sintaxe e arquitetura:

### 🗄️ Banco de Dados & Eloquent ORM
- [[Conceitos/model|Model (Eloquent ORM)]] — Definição de tabelas, atributos e convenções
- [[Conceitos/relacionamento-n-1|Relacionamentos N:1]] — Uso de `belongsTo` e `hasMany` entre tabelas
- [[Conceitos/eager-loading-with|Eager Loading com with()]] — Detecção e eliminação do problema $N+1$
- [[Conceitos/filtro-where|Filtros com where()]] — Filtragem condicional encadeada
- [[Conceitos/ordenacao-orderby|Ordenação (orderBy / latest)]] — Ordenação de resultados
- [[Conceitos/paginacao|Paginação de Dados]] — Navegação eficiente sem sobrecarregar a memória

### 🌐 Arquitetura Web & MVC
- [[Conceitos/controller|Controllers no Laravel]] — Orquestração de regras de negócio
- [[Conceitos/validacao-form-request|Validação com FormRequest]] — Proteção de dados e HTTP 422
- [[Conceitos/requisicao|Requisições HTTP]] — Ciclo de vida da requisição e status codes
- [[Conceitos/blade|Blade Templating]] — Renderização dinâmica de views HTML

---

## 📚 Jornada Completa da Disciplina
- [[Etapas/etapa-1|1ª Etapa: Fundamentos de PHP & Lógica Web]]
- [[Etapas/etapa-2|2ª Etapa: Introdução ao Laravel, Migrations e CRUD]]
- [[Etapas/etapa-3|3ª Etapa: APIs REST & Otimização com Eloquent ORM]]
