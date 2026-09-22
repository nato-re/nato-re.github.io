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
updated: 2026-09-22T01:05
---

# 🚀 [Sprint 04] Identidade Visual e Feedback de Validação

---

## 🎯 Contexto Corporativo
O professor implementou um visual incrível na página de Registro e Login do AskLive usando **Tailwind CSS**, além de garantir que os usuários saibam exatamente o que erraram através da diretiva `@error`.

Porém, a página de visualização do Evento (onde o público envia as **Perguntas**) ainda está usando formulários HTML puro, sem nenhum estilo. Pior ainda: se o usuário tentar enviar uma pergunta em branco, a página recarrega e não avisa o que aconteceu!

---

## 🚀 Sua Missão
Acesse a branch `v4.0-auth-tailwind`. Você tem dois chamados críticos de Frontend e UX (Experiência do Usuário) para resolver.

### 🎫 Ticket #007 (UX e Validação do Formulário)
1. Localize o formulário de envio de perguntas (provavelmente em `resources/views/eventos/show.blade.php`).
2. Adicione a diretiva `@error('conteudo')` (ou o nome do seu campo) abaixo do `textarea` da pergunta.
3. Se houver erro, exiba a variável `{{ $message }}` em texto vermelho (`text-red-500`).
4. Utilize a função `{{ old('conteudo') }}` dentro da tag `<textarea>` para que o usuário não perca o texto digitado caso a validação falhe.
5. Pinte as bordas do formulário de vermelho condicionalmente usando a checagem `@error('conteudo') border-red-500 @enderror`.

### 🎫 Ticket #008 (Estilização Básica com Tailwind)
1. Substitua o botão padrão por um botão estilizado com Tailwind (ex: `bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700`).
2. Adicione um espaçamento decente (`padding` e `margin`) no mural de perguntas para que os "cards" das perguntas fiquem bonitos e se pareçam com balões de chat.

---

## ⚖️ Critérios de Aceite
- [ ] Tentar enviar uma pergunta em branco exibe a mensagem de erro em vermelho abaixo do campo.
- [ ] O texto digitado não é apagado após uma falha de validação (graças ao `old()`).
- [ ] O botão de envio tem cor de fundo, cor de texto, bordas arredondadas e efeito de hover.
- [ ] As perguntas no mural estão separadas por margens (`mb-4` ou similar).

---

## 📚 Material de Apoio na Wiki
- [[Frontend/tailwind-basico|Entendendo o Tailwind CSS]]
- [[Frontend/blade-diretivas-error|Como capturar falhas com @error e old()]]
- [[HTTP/sessoes-e-cookies|Como os erros sobrevivem ao redirecionamento?]]
- [[Seguranca/hash-senhas|Por que fazemos Hash de Senhas?]]
- [[Aulas/aula04|📖 Slides da Aula 04]]
