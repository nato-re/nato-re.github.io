---
title: Tailwind CSS Básico
tags:
  - conceitos
  - frontend
  - css
  - tailwind
created: 2026-09-22T00:37
updated: 2026-09-22T01:00
---

# 🎨 Tailwind CSS

O **Tailwind CSS** é um framework CSS do tipo "Utility-first". Em vez de você escrever classes longas em arquivos `.css` separados (como `.meu-botao`), você aplica pequenas classes utilitárias diretamente no HTML.

## Principais Diferenças do Bootstrap

Não existe um melhor ou pior, mas abordagens arquiteturais diferentes:

| Característica | Bootstrap (Componentes) | Tailwind (Utilitários) |
| :--- | :--- | :--- |
| **Abordagem** | Classes semânticas e blocos prontos (`btn btn-primary`) | Propriedades visuais granulares (`bg-blue-500 p-2`) |
| **Customização** | Exige arquivos CSS extras para sobrescrever variáveis/estilos | Feita diretamente pela combinação de classes no HTML |
| **Peso do CSS** | Traz estilos padronizados inteiros | O compilador do Vite extrai apenas as classes que você usou |

## Classes Mais Usadas

- **Espaçamento:** `p-4` (padding de 1rem), `m-2` (margin), `mt-4` (margin-top).
- **Cores:** `text-red-500`, `bg-blue-600`.
- **Bordas:** `border`, `border-gray-300`, `rounded-md` (arredondado).
- **Layout:** `flex`, `justify-center`, `items-center`, `grid`, `grid-cols-2`.
- **Interatividade:** `hover:bg-blue-700`, `focus:ring-2`.

## 📖 Documentação Oficial
- [Tailwind Docs](https://tailwindcss.com/docs/utility-first)
