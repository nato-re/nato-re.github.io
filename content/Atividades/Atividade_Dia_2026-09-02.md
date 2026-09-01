---
type: assignment
id: falaq-dia-2026-09-02
title: "[Dia] Atividade prática para Turma 3B1"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
status: draft
publish_date: 2026-09-02T08:00:00Z
due_date: 2026-09-09T23:59:59Z
points: 10
base_repo: https://github.com/nato-re/falaq-base
autograder_rubric: consolidation_etapa3.yaml
tags:
  - laravel
  - prática
created: 2026-09-01T09:45:00Z
updated: 2026-09-01T09:15
---

# 📚 Atividade do dia

Prepare o ambiente local clonando o repositório base e implemente as correções pedidas nos tickets **#001** (Segurança) e **#002** (Performance) da sprint anterior. Depois, submeta o seu PR.

## 🎯 Objetivo
- Aplicar validações de `FormRequest`.
- Refatorar a query de listagem usando `where`, `orderBy` e `paginate`.

## ✅ Critérios de aceitação
- O endpoint rejeita envios inválidos retornando **HTTP 422**.
- A listagem utiliza paginação (10 itens por página) e exibe os botões de navegação (`{{ $perguntas->links() }}`).
- O código passa nos testes do autograder (arquivo `consolidation_etapa3.yaml`).

## 📂 Repositório base
[https://github.com/nato-re/falaq-base](https://github.com/nato-re/falaq-base)

---
