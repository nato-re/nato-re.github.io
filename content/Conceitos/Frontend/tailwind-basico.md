---
title: Tailwind CSS Básico
tags: [conceitos, frontend, css, tailwind]
---

# 🎨 Tailwind CSS

O **Tailwind CSS** é um framework CSS do tipo "Utility-first". Em vez de você escrever classes longas em arquivos `.css` separados (como `.meu-botao`), você aplica pequenas classes utilitárias diretamente no HTML.

## Principais Diferenças do Bootstrap

| Feature | Bootstrap | Tailwind |
| :--- | :--- | :--- |
| **Estilo** | Componentes Prontos (`btn btn-primary`) | Utilitários (`bg-blue-500 text-white p-2`) |
| **Customização** | Difícil (sobrescrever CSS) | Muito fácil (muda a classe no HTML) |
| **Peso Final** | Pesado (traz tudo) | Leve (purga o que não for usado) |

## Classes Mais Usadas

- **Espaçamento:** `p-4` (padding de 1rem), `m-2` (margin), `mt-4` (margin-top).
- **Cores:** `text-red-500`, `bg-blue-600`.
- **Bordas:** `border`, `border-gray-300`, `rounded-md` (arredondado).
- **Layout:** `flex`, `justify-center`, `items-center`, `grid`, `grid-cols-2`.
- **Interatividade:** `hover:bg-blue-700`, `focus:ring-2`.

## 📖 Documentação Oficial
- [Tailwind Docs](https://tailwindcss.com/docs/utility-first)
