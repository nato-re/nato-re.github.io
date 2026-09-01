---
tags:
  - conceito
  - laravel
  - frontend
  - mvc
created: 2026-08-31T20:49
updated: 2026-08-31T21:13
---
# Blade (Template Engine)

Blade é o motor de templates oficial do Laravel. Ele permite que escrevamos estruturas lógicas do PHP (como `if`, `foreach`, e manipulação de variáveis) dentro do HTML de forma extremamente limpa. 

Na arquitetura do [[Padrão MVC]], o Blade representa a camada de **View**.

A grande vantagem do Blade é que ele é compilado para PHP puro e guardado em cache, garantindo altíssima performance.

### Diretivas que você mais usará na 3ª Etapa:
- Exibir variáveis estáticas: `{{ $evento->nome }}`
- Exibir os botões de [[Paginação]]: `{{ $perguntas->links() }}`
- Renderizar feedbacks de erros barrados pela [[Validação (FormRequest)]]:
```html
@error('conteudo')
    <div class="text-red-500">{{ $message }}</div>
@enderror
```
