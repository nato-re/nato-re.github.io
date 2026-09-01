---
type: assignment
id: falaq-sprint-01
title: "[Sprint 01] Estabilização do MVP: Trolls e Travamentos"
module: 3ª Etapa - TPA Laravel
status: published
publish_date: 2026-09-01T08:00:00Z
due_date: 2026-09-08T23:59:59Z
points: 10
base_repo: https://github.com/cotemig/falaq-base
autograder_rubric: consolidation_etapa3.yaml
tags:
  - laravel
  - segurança
  - performance
  - etapa3
created: 2026-08-31T20:35
updated: 2026-08-31T21:13
---

## 🎯 Contexto corporativo
Bem-vindos ao time Backend da FalaQ-Eu_T_3scuto! Nosso MVP estourou no fim de semana, mas os clientes estão furiosos. Recebemos dois tickets de prioridade máxima no nosso Board.

## 🚀 Sua Missão
Faça o *Fork* do nosso repositório base e resolva os dois problemas abaixo. Quando terminar, submeta o link do seu PR (Pull Request) na plataforma.

### Ticket #001 (Segurança)
Usuários estão enviando spam com perguntas de apenas uma letra. 
**Ação:** No `StorePerguntaRequest`, implemente regras rigorosas: o texto deve ser obrigatório, ser do tipo string, ter mínimo de 10 caracteres e máximo de 255.

### Ticket #002 (Performance)
O sistema tenta carregar 5.000 perguntas de uma vez, explodindo a memória.
**Ação:** Modifique o `EventoController` para:
1. Filtrar (`where`) apenas as perguntas deste evento.
2. Ordenar (`latest`) para as mais recentes aparecerem no topo.
3. Paginar (`paginate`) para trazer apenas 10 por vez.

## ⚖️ Critérios de Aceite (Rubrica)
- [ ] O endpoint rejeita envios vazios retornando HTTP 422.
- [ ] O Controller usa paginação encadeada (sem `all()` ou `get()`).
- [ ] A interface exibe os botões de paginação (`links()`).

## 📚 Material de Apoio na Wiki
- [[HTTP Status Codes]]
- [[Paginação]]
- [[Filtro (where)]]
