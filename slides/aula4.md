---
marp: true
class: invert
theme: uncover
---


# Formulários, Requisições e CSS

---

## Echo 

É a palavra chave do PHP que escreve informações no HTML resultante, como é muito comum fazer isso temos um _sugar syntax_ para isso.

```php
<?php
  $texto = "olá mundo";
?>
<h1> <?php echo $texto ?> </h1>
<h1> <?= $texto ?> </h1>
```

<div>
  <h1>Olá mundo</h1>
  <h1>Olá mundo</h1>
</div>

---

## Requisições

No PHP, podemos adquirir informações das requisições através das variáveis `$POST` e `$GET`;

```php
$usuario = $POST['user'];
$senha = $POST['password'];

if($usuario === 'nato-re' && $senha === '12345678'){
  echo "Credencias validadas com sucesso";
} else {
  echo "Usuário ou senha inválidos";
}

```

---

## Formulários
Formulário é uma tag `hmtl` que permite que o usuário faça requisições enviando dados dos _inputs_ dentro dele. Esses dados são enviados como _query params_ no caso do `method` GET e Form Data no caso do `POST`.

```php
<form action="/caminho" method="POST">
    <input name='user' />
    <input name='password' />
    <button>Test</button>
</form>
```
