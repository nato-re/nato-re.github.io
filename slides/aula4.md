---
marp: true
class: invert
theme: uncover
---


# Formulários, Requisições e CSS

---

## Echo 

É a palavra chave do PHP que escreve informações no HTML resultante, como é muito comum fazer isso temos um _sugar syntax_ para isso.

<div style="display: flex; gap: 20px;">

  <div style="flex: 1;">

  ##### 🐘 Código PHP
  ```php
  <?php
    $texto = "olá mundo";
  ?>
  <h1> <?php echo $texto ?> </h1>
  <h1> <?= $texto ?> </h1>
  ```

  </div>

  <div style="flex: 1;">

  #### 🌐 HTML Resultante
  ```html
  <div>
    <h1>Olá mundo</h1>
    <h1>Olá mundo</h1>
  </div>
  ```

  </div>

</div>

---


## Formulários
Formulário é uma tag `HTML` que permite que o usuário faça requisições enviando dados dos _inputs_ dentro dele. Esses dados são enviados como _query params_ no caso do `method` GET e Form Data no caso do `POST`.

```html
<form action="/arquivo.php" method="POST">
    <input name='user' />
    <input name='password' />
    <button>Login</button>
</form>
```

---

## Requisições

No PHP, podemos adquirir informações das requisições através das variáveis `$POST` e `$GET`;

```php
// arquivo.php
<?php
$usuario = $POST['user'];
$senha = $POST['password'];

if($usuario === 'nato-re' && $senha === '12345678'){
  $mensagem = "Credencias validadas com sucesso";
} else {
  $mensagem = "Usuário ou senha inválidos";
}
?>
<h1> <?= $mensagem ?> </h1>
```

---

## Exercício 1

Crie um script PHP que contenha um formulário com um campo de texto para o usuário digitar seu nome. Ao clicar em um botão de "Enviar", a página deve processar os dados e exibir a mensagem: "Olá, [nome do usuário]! Seja bem-vindo ao mundo do PHP."

--- 

## Exercício 2 

Enunciado: Desenvolva uma página que apresente dois campos de entrada do tipo numérico (number) e um botão de ação. Ao ser submetido, o script PHP deve capturar os dois valores, realizar a operação matemática de soma e exibir o resultado final de forma clara para o usuário.

---

## Exercício 3

Construa um formulário que solicite a idade de um visitante. O script deve avaliar o valor recebido: se a idade for igual ou superior a 18 anos, exiba a frase "Você é maior de idade" na cor verde; se for inferior, exiba "Você ainda é menor de idade" na cor vermelha. Utilize estruturas condicionais (if/else) e CSS inline para a estilização.

---

## Exercício 4

Crie uma página onde o usuário possa customizar a aparência do site. O formulário deve conter um campo de seleção (select) com pelo menos três opções de cores (ex: Azul, Verde, Amarelo). Ao enviar o formulário, a cor de fundo (background-color) da própria página deve ser alterada dinamicamente para a cor escolhida pelo usuário.
