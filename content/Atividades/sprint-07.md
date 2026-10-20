---
type: assignment
id: asklive-sprint-07
title: "[Sprint 07] Sistema de Moderação de Perguntas"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
status: published
publish_date: 2026-10-13T08:00:00Z
due_date: 2026-10-20T23:59:59Z
points: 14
base_repo: https://github.com/nato-re/falaq-base (branch v5.0-pivot-starter)
tags:
  - laravel
  - eloquent
  - requisitos
  - ciclo-de-vida
  - moderacao
  - etapa3
created: 2026-10-13T08:00:00
updated: 2026-10-13T08:00:00
---

# 🚀 [Sprint 07] Sistema de Moderação de Perguntas

---

## 🎯 Contexto Corporativo (O Chamado da Startup)

Após a implementação do ciclo de vida dos eventos pelo Tech Lead, a diretoria da startup **AskLive (FalaQ)** aprovou a feature de segurança mais crítica da plataforma: **o Sistema de Moderação de Perguntas**.

Atualmente, quando participantes enviam perguntas ofensivas ou fora do escopo da palestra, os organizadores não têm como sinalizar o conteúdo. Seu objetivo como desenvolvedor backend é criar o módulo de moderação na entidade `Pergunta`, permitindo que os participantes reportem perguntas impróprias e que moderadores analisem e decidam o destino de cada caso.

> 💡 **Nota de Preparação para a Prova Final:** Esta atividade reproduz com fidelidade absoluta a estrutura e os critérios técnicos da Prova Final prática de 90 minutos. Domine este fluxo para gabaritar a avaliação!

---

## 🛠️ Chamados Técnicos (Tickets da Sprint)

Trabalhe a partir da branch `v5.0-pivot-starter` e execute os 4 tickets abaixo na sequência recomendada:

### 🎫 Ticket #013 (Modelagem & Migration de Moderações)
1. Crie a migration com o comando `php artisan make:migration create_moderacoes_table --create=moderacoes`.
2. Configure as seguintes colunas:
   - `pergunta_id` (Chave estrangeira vinculada à tabela `perguntas`, com `constrained()->cascadeOnDelete()`).
   - `motivo` (Coluna do tipo `text` para descrever a denúncia).
   - `status` (Coluna do tipo `string`, com valor padrão `->default('analisando')`).
   - `timestamps()`
3. Execute `php artisan migrate`.

### 🎫 Ticket #014 (Configuração dos Models & Relacionamentos 1:N)
1. Crie o Model `app/Models/Moderacao.php` com o array `$fillable`:
   ```php
   protected $fillable = ['pergunta_id', 'motivo', 'status'];
   ```
2. Defina os relacionamentos bidirecionais:
   - Em `app/Models/Moderacao.php`: método `pergunta()` retornando `belongsTo(Pergunta::class)`.
   - Em `app/Models/Pergunta.php`: método `moderacoes()` retornando `hasMany(Moderacao::class)`.

### 🎫 Ticket #015 (Validação de Entrada com FormRequest)
1. Crie o FormRequest com `php artisan make:request StoreModeracaoRequest`.
2. No método `authorize()`, retorne `true`.
3. No método `rules()`, declare as regras para o campo `motivo`:
   - Obrigatório (`required`)
   - Mínimo de 10 caracteres (`min:10`)
   - Máximo de 255 caracteres (`max:255`)

### 🎫 Ticket #016 (Rotas, Controller & Autorização do Moderador)
1. Crie o `ModeracaoController` com o comando `php artisan make:controller ModeracaoController`.
2. Registre as rotas protegidas em `routes/web.php`:
   - `POST /perguntas/{pergunta}/moderar`: Aciona `ModeracaoController@store` para registrar a denúncia (qualquer participante autenticado).
   - `GET /eventos/{evento}/moderacoes`: Aciona `ModeracaoController@index` para listar a **Fila de Moderação do Evento** (apenas o dono/moderador do evento).
   - `PATCH /moderacoes/{moderacao}/status`: Aciona `ModeracaoController@updateStatus` para aprovar ou rejeitar a pergunta.
3. No método `index`, liste as moderações **evitando o problema N+1** utilizando Eager Loading (`Moderacao::with('pergunta')->latest()->paginate(15)`).
4. No método `updateStatus`, proteja a ação garantindo que apenas o dono do evento possa decidir o status (`$this->authorize('moderate', $moderacao->pergunta->evento)`).

---

## 📏 Rubrica de Avaliação em Fases Cumulativas (14 Pontos)

| Nível / Fase | Critério Técnico Avaliado | Pontos |
| :--- | :--- | :---: |
| **Fase 1: Fundação de Dados** | Migration `moderacoes` com FK e default + Model com `$fillable` e relacionamentos $1:N$ | **5,0 pts** |
| **Fase 2: Entrada Segura & Persistência** | Validação com `StoreModeracaoRequest` + Controller `store` associando a pergunta | **4,5 pts** |
| **Fase 3: Autorização & Performance** | Fila de Moderação com Eager Loading (`with('pergunta')`) + Transição de status protegida por Policy (`moderate`) | **4,5 pts** |
| **TOTAL** | | **14,0 pts** |

---

## 📚 Material de Apoio na Wiki
- [[Conceitos/Arquitetura/engenharia-de-requisitos|Engenharia de Requisitos: Da Dor do Cliente ao Código]]
- [[Conceitos/Database/ciclo-de-vida-e-status|Ciclo de Vida do Dado e Máquinas de Estado]]
- [[Conceitos/HTTP/validacao-form-request|Validação com FormRequest]]
- [[Conceitos/Database/relacionamento-n-1|Relacionamentos N:1 e 1:N no Eloquent]]
- [[Conceitos/Database/eager-loading-with|Eager Loading com with() (Eliminando o N+1)]]
