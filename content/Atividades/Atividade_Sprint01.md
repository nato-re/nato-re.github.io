---
type: assignment
id: falaq-sprint-01
title: "[Sprint 01] Estabilização do MVP: Trolls e Travamentos"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
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
  - cotemig/3b1
created: 2026-08-31T20:35
updated: 2026-08-31T23:50
---

# 🚀 [Sprint 01] Estabilização do MVP: Trolls e Travamentos

> 📢 **Publicação Agendada:** Terça-feira (01/09) para a **Turma 3B1**.  
> 💡 *Turmas anteriores:* Caso já tenha concluído a atividade em sala, consulte o [[Atividades/Atividade_Sprint01_Gabarito|🔑 Gabarito Oficial]].

---

## 🎯 Contexto Corporativo
Bem-vindos ao time Backend da **FalaQ-Eu_T_3scuto**! Nosso MVP estourou no evento de lançamento, mas os clientes estão furiosos. Recebemos dois tickets de prioridade máxima no nosso Board de Engenharia.

---

## 🚀 Sua Missão
Faça o *Fork* do nosso repositório base (`https://github.com/cotemig/falaq-base`) e resolva os dois problemas abaixo. Quando terminar, faça o `git push` e submeta o link do seu PR (Pull Request) no LMS.

### 🎫 Ticket #001 (Segurança)
Usuários estão enviando spam com perguntas de apenas uma letra ou vazias.  
**Ação:** No `StorePerguntaRequest`, implemente regras estritas:
- `texto`: obrigatório (`required`), string, mínimo de 10 caracteres (`min:10`), máximo de 255 (`max:255`).
- `evento_id`: obrigatório (`required`), deve existir na tabela de eventos (`exists:eventos,id`).

### 🎫 Ticket #002 (Performance)
O sistema tenta carregar 5.000 perguntas de uma vez, congelando a memória do servidor e a tela do usuário.  
**Ação:** Modifique o `EventoController` para:
1. Filtrar (`where`) apenas as perguntas do evento atual.
2. Ordenar (`latest`) para que as mais recentes apareçam primeiro.
3. Paginar (`paginate`) para trazer apenas 10 por vez.
4. Adicionar os botões de navegação (`{{ $perguntas->links() }}`) na view Blade (`eventos/show.blade.php`).

---

## ⚖️ Critérios de Aceite (Rubrica)
- [ ] O endpoint rejeita envios vazios retornando status **HTTP 422**.
- [ ] O Controller usa paginação encadeada (sem `all()` ou `get()`).
- [ ] A interface exibe os botões de paginação (`links()`).
- [ ] Submissão do link do PR no LMS até 08/09 às 23:59.

---

## 📚 Material de Apoio na Wiki
- [[Conceitos/Requisição|HTTP Status Codes]]
- [[Conceitos/Validação (FormRequest)|Validação com FormRequest]]
- [[Conceitos/Paginação|Paginação no Eloquent]]
- [[Conceitos/Filtro (where)|Filtros (where)]]
- [[Aulas/aula01-marp|📖 Roteiro da Aula 01]]
