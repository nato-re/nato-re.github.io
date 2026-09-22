---
type: assignment
id: asklive-sprint-04
title: "[Sprint 04] Identidade Visual e Feedback de Validação"
module: 3ª Etapa - TPA Laravel
turma_ativa: 3B1
status: published
publish_date: 2026-09-22T08:00:00Z
due_date: 2026-09-29T23:59:59Z
points: 10
base_repo: https://github.com/nato-re/falaq-base (branch v4.0-auth-tailwind)
autograder_rubric: revision_etapa3.yaml
tags:
  - laravel
  - tailwind
  - blade
  - error
  - validacao
created: 2026-09-22T00:00:00
updated: 2026-09-22T11:20
---

# 🚀 [Sprint 04] Identidade Visual e Feedback de Validação

---

## 🎯 Contexto Corporativo
O professor implementou um visual incrível na página de Registro e Login do AskLive usando **Tailwind CSS**, além de garantir que os usuários saibam exatamente o que erraram através da diretiva `@error`.

Agora, a diretoria do AskLive quer permitir que os próprios usuários cadastrem novos Eventos! Sua missão é construir o formulário de **Criação de Eventos**, garantindo que ele tenha uma estilização limpa e feedbacks visuais rigorosos caso o usuário tente enviar dados inválidos (ex: evento sem título).

---

## 🚀 Sua Missão
Acesse a branch `v4.0-auth-tailwind`. Você tem dois chamados críticos de Frontend e UX (Experiência do Usuário) para resolver.

### 🎫 Ticket #007 (Construção do Formulário e Tailwind)
1. Crie a view `resources/views/eventos/create.blade.php`.
2. Estilize o contêiner do formulário centralizando-o na tela (ex: usando `max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md`).
3. Crie os campos `titulo` e `descricao` usando classes utilitárias para deixar as caixas de texto bonitas (borda cinza, padding, etc).
4. Substitua o botão padrão por um botão estilizado com Tailwind (ex: `bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700`).

### 🎫 Ticket #008 (UX e Validação do Formulário)
1. Adicione a diretiva `@error('titulo')` abaixo do input de título, exibindo a variável `{{ $message }}` em texto vermelho (`text-red-500`). Faça o mesmo para a descrição.
2. Utilize a função `{{ old('titulo') }}` dentro da tag `<input>` (e `<textarea>`) para que o usuário não perca o texto digitado caso a validação falhe.
3. Condicione as classes HTML para que as bordas do formulário fiquem vermelhas usando a checagem (ex: `@error('titulo') border-red-500 @enderror`).

---

## ⚖️ Critérios de Aceite
- [ ] A view `eventos/create.blade.php` existe e possui um formulário completo.
- [ ] Tentar enviar um formulário em branco exibe as mensagens de erro em vermelho abaixo dos respectivos campos.
- [ ] O texto digitado não é apagado após uma falha de validação (graças ao `old()`).
- [ ] As caixas de texto possuem borda vermelha ativada condicionalmente pelo `@error`.
- [ ] O botão de envio tem cor de fundo, cor de texto, bordas arredondadas e efeito de hover.

---

## 📚 Material de Apoio na Wiki
- [[Frontend/tailwind-basico|Entendendo o Tailwind CSS]]
- [[Frontend/blade-diretivas-error|Como capturar falhas com @error e old()]]
- [[HTTP/sessoes-e-cookies|Como os erros sobrevivem ao redirecionamento?]]
- [[Seguranca/hash-senhas|Por que fazemos Hash de Senhas?]]
- [[Aulas/aula04|📖 Slides da Aula 04]]
