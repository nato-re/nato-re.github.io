---
tags:
  - conceito
  - laravel
  - mvc
created: 2026-08-31T20:49
updated: 2026-08-31T21:13
---
# Controller

O **Controller** atua como o "maestro" da aplicação no [[Padrão MVC]]. Ele é a ponte de ligação entre o que o usuário pede e o que o servidor faz.

Por boas práticas de desenvolvimento limpo, o Controller não deve conter regras complexas (como verificar tamanho de senhas — isso é trabalho da [[Validação (FormRequest)]]).

**O Fluxo ideal de um Controller:**
1. Recebe a [[Requisição]] que foi encaminhada pela rota.
2. Interage com o [[Model]] para buscar, filtrar ou salvar dados no banco.
3. Empacota tudo e entrega para a interface (o [[Blade]]).

Exemplo:
```php
public function show($id) {
    // 1. Busca no Model
    $evento = Evento::findOrFail($id); 
    // 2. Entrega para a View
    return view('eventos.show', compact('evento')); 
}
```
