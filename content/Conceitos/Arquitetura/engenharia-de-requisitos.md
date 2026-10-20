---
title: Engenharia de Requisitos no Desenvolvimento Web
tags:
  - conceito
  - arquitetura
  - requisitos
  - laravel
  - engenharia-de-software
created: 2026-10-06T14:00
updated: 2026-10-06T14:00
---

# 📋 Engenharia de Requisitos: Da Dor do Cliente ao Código

Em projetos reais e em avaliações práticas, o desenvolvedor raramente recebe o código mastigado. Ele recebe uma **história de usuário**, um **chamado de suporte** ou uma **narrativa de dor do cliente corporativo**.

A **Engenharia de Requisitos** é a disciplina que transforma esse texto livre em artefatos concretos da arquitetura [[Conceitos/HTTP/controller|MVC]] do Laravel.

---

## 🎯 O Método dos Grifos (A Técnica do Lápis)

Ao ler uma especificação técnica ou demanda de cliente, use a técnica gramatical para mapear cada palavra diretamente para uma peça do ecossistema Laravel:

| Elemento Gramatical | Exemplo na Demanda do Cliente | Correspondente no Laravel |
| :--- | :--- | :--- |
| **Substantivo** | "O sistema deve registrar **denúncias** e **ações de moderação**" | **Model & Migration** (`Moderacao`, `tabela moderacoes`) |
| **Preposição de Vínculo** | "Cada denúncia pertence **a uma pergunta**" | **Chave Estrangeira & Relacionamento** (`pergunta_id`, `belongsTo`) |
| **Verbo de Ação** | "O moderador pode **aprovar** ou **rejeitar**" | **Rota & Método no Controller** (`POST /moderacoes/{id}/aprovar`) |
| **Adjetivo / Regra** | "O motivo deve ser **obrigatório** e ter no mínimo **10 letras**" | **Regras do FormRequest** (`required|min:10|string`) |
| **Estado / Condição** | "A moderação nasce **pendente** e passa a **resolvida**" | **Coluna com valor padrão** (`->default('pendente')`) |

---

## 🏗️ A Ordem Ágil de Execução (Evitando o Blank Canvas)

Quando você tiver apenas 90 minutos para construir uma funcionalidade completa, **nunca comece pela View ou pelo Controller**. Siga sempre a rota crítica dos dados:

```
[ 1. Migration ]  ──>  [ 2. Model ]  ──>  [ 3. FormRequest ]  ──>  [ 4. Controller ]  ──>  [ 5. Rota & View ]
(Cria as tabelas)      ($fillable e       (Valida a entrada)       (Orquestra a regra)      (Expõe na web)
                        relações)
```

1. **Migration Primeiro:** Se a tabela e as chaves estrangeiras não existirem no banco, nada funcionará.
2. **Model Imediatamente:** Defina o `$fillable` com os campos novos para evitar o clássico erro `MassAssignmentException` e configure os métodos `belongsTo` ou `hasMany`.
3. **FormRequest para Blindar:** Escreva as regras de validação antes de tocar no Controller.
4. **Controller Limpo:** Use injeção do FormRequest e salve os dados já validados.
5. **Rota Protegida:** Cadastre em `routes/web.php` com o middleware apropriado (`auth`).

---

## 💡 Exemplo Prático de Transposição

### O Briefing do Cliente:
> *"Precisamos de um sistema para os organizadores registrarem feedbacks das palestras. O usuário logado envia uma nota de 1 a 5 e um comentário opcional. Não podemos aceitar notas fora desse intervalo."*

### O Mapeamento Técnico:
* **Migration:** `create_feedbacks_table` com colunas `evento_id` (FK), `user_id` (FK), `nota` (integer), `comentario` (text, nullable).
* **Model:** `Feedback` com `$fillable = ['evento_id', 'user_id', 'nota', 'comentario']` e relações `belongsTo(Evento::class)` e `belongsTo(User::class)`.
* **FormRequest:** `StoreFeedbackRequest` com regras: `'nota' => 'required|integer|min:1|max:5'`, `'comentario' => 'nullable|string|max:500'`.
* **Controller:** `FeedbackController@store` salvando via `$evento->feedbacks()->create(...)`.

---

## 🔗 Conceitos Relacionados
- [[Conceitos/Database/ciclo-de-vida-e-status|Ciclo de Vida do Dado e Máquinas de Estado]]
- [[Conceitos/HTTP/validacao-form-request|Validação com FormRequest]]
- [[Conceitos/Database/model|Model Eloquent e Fillable]]
