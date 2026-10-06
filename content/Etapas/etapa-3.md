---
title: "3ª Etapa: APIs REST & Otimização com Eloquent ORM"
tags:
  - etapa3
  - laravel
  - asklive
  - falaq
created: 2026-09-08T11:00:00
updated: 2026-10-05
---

# 🚀 3ª Etapa: APIs REST & Otimização de Performance

Bem-vindos à 3ª Etapa letiva de **TPA (Técnicas de Programação Avançadas)** no COTEMIG! 

Nesta etapa, assumimos o papel de desenvolvedores backend na startup **FalaQ-Eu_T_3scuto (AskLive App)**, evoluindo uma aplicação real através de Sprints corporativas com foco em estabilidade, relacionamentos de banco de dados, detecção do problema N+1 e arquitetura de APIs REST.

---

## 📅 Roadmap de Sprints & Aulas

| Sprint / Aula | Tema Central | Slides da Aula | Enunciado da Atividade | Conceitos Relacionados |
| :--- | :--- | :--- | :--- | :--- |
| **Aula 01 / Sprint 01** | Onboarding no Projeto, FormRequests e Paginação | <a href="/slides/aula01.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-01\|🎯 Sprint 01: Estabilização do MVP]] | [[Conceitos/HTTP/validacao-form-request\|Validação]], [[Conceitos/Database/paginacao\|Paginação]] |
| **Aula 02 / Sprint 02** | Relacionamentos N:1 (`belongsTo`/`hasMany`) e Eager Loading (`with()`) | <a href="/slides/aula02.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-02\|🎯 Sprint 02: Autoria & Performance (N+1)]] | [[Conceitos/Database/relacionamento-n-1\|Relacionamentos N:1]], [[Conceitos/Database/eager-loading-with\|Eager Loading]] |
| **Aula 03 / Sprint 03** | Área VIP: Autenticação Manual e Middlewares | <a href="/slides/aula03.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-03\|🎯 Sprint 03: Área VIP e Autenticação]] | [[Conceitos/Seguranca/auth-facade\|Auth Facade]], [[Conceitos/HTTP/middleware\|Middlewares]] |
| **Aula 04 / Sprint 04** | Revisão de Auth, Tailwind CSS e Validação Visual | <a href="/slides/aula04.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-04\|🎯 Sprint 04: Validação Visual]] | [[Conceitos/Frontend/tailwind-basico\|Tailwind]], [[Conceitos/Frontend/blade-diretivas-error\|Diretivas @error]] |
| **Aula 05 / Sprint 05** | AuthZ & Interfaces Dinâmicas (Policies e Blade) | <a href="/slides/aula05.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-05\|🎯 Sprint 05: Proteção de Entidade Filha]] | [[Conceitos/Seguranca/authz-policies\|AuthZ & Policies]], [[Conceitos/Frontend/blade\|Blade]] |
| **Aula 06 / Sprint 06** | Relacionamentos N:M e Tabelas Pivot (Upvotes) | <a href="/slides/aula06.html" data-router-ignore target="_blank">📽️ Slides Marp</a> | [[Atividades/sprint-06\|🎯 Sprint 06: Upvotes & Ranking no Telão]] | [[Conceitos/Database/relacionamento-n-m-pivot\|Relacionamentos N:M]], [[Conceitos/Database/ordenacao-orderby\|Ordenação]] |

---

## 💻 Repositório Base da Etapa
- **Repositório Starter no GitHub:** [github.com/nato-re/falaq-base](https://github.com/nato-re/falaq-base)
- **Instruções de Inicialização:**
  ```bash
  git clone https://github.com/nato-re/falaq-base.git
  cd falaq-base
  composer install
  cp .env.example .env
  php artisan key:generate
  touch database/database.sqlite
  php artisan migrate --seed
  php artisan serve
  ```

---

## 🎯 Critérios Gerais de Avaliação
- As entregas devem ser feitas via Pull Request ou submissão do link do repositório no **Google Classroom**.
- Todo código deve respeitar as convenções do Laravel (PSR-12) e conter testes automatizados ou validações de integridade.
