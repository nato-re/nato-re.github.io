---
marp: true
class: invert
---

# Revisão - Programação para Internet

> Revisão dos conceitos fundamentais de PHP, HTTP, Formulários e Apache

---

## Protocolo HTTP

**HTTP** é um protocolo de comunicação usado para transferir dados na web através de mensagens HTTP entre Cliente e Servidor.

- **Cliente:** Navegador ou aplicativo que faz requisições
- **Servidor:** Computador que responde às requisições

---

## Requisição HTTP

**Requisição HTTP:** Mensagem enviada pelo cliente para o servidor, contendo informações sobre o que o cliente deseja.

Uma requisição HTTP é composta por:

1. **Método** (GET, POST, PUT, DELETE, etc.)
2. **URL** (endereço do recurso)
3. **Versão do protocolo** (HTTP/1.1, HTTP/2)
4. **Cabeçalhos** (headers)
5. **Corpo** (body - opcional)

---

## Resposta HTTP

**Resposta HTTP:** Mensagem enviada pelo servidor para o cliente, contendo o resultado da requisição.

Uma resposta HTTP é composta por:

1. **Código de status** (200, 404, 500, etc.)
2. **Versão do protocolo** (HTTP/1.1, HTTP/2)
3. **Cabeçalhos** (headers)
4. **Corpo** (body - opcional)

---

## O que é PHP?

**PHP** é uma linguagem de programação web do lado do servidor que gera HTML em tempo de execução.

```php
<?php
  $mensagem = "Olá, mundo!";
  echo $mensagem;
?>
```

O código PHP é processado no servidor e o resultado (HTML) é enviado ao navegador do cliente.

---

## Função Echo no PHP

O que acontece ao executar um código PHP usando a função `echo`?

**Resposta:** O texto passado como parâmetro é impresso na resposta HTTP.

```php
<?php
  echo "Este texto será enviado na resposta HTTP";
?>
```

---

## Anatomia de uma URL

Considere: `https://www.youtube.com:443/results?search_query=duquesa`

- **Protocolo:** `https`
- **Domínio (Host):** `www.youtube.com`
- **Porta:** `443`
- **Caminho (Path):** `/results`
- **Parâmetros:** `search_query=duquesa`

---

## O que é o Apache?

**Apache** é um servidor web que:

- Processa requisições HTTP
- Envia respostas HTTP
- Mapeia URLs para arquivos no sistema de arquivos

**Cenário:** Servidor Apache rodando com DocumentRoot em `H:\www\`

Exemplo: `http://localhost:80/index.php` → `H:\www\index.php`

---

## Apache e DocumentRoot

**O que acontece?**
O servidor Apache irá:

1. Procurar o arquivo `H:\www\pasta\arquivo.php`
2. Executá-lo
3. Responder a requisição com seu retorno no corpo da resposta

---

## O que é WAMP?

**WAMP** é um programa que gerencia infraestrutura para desenvolvimento de aplicações web, usando:

- **W**indows (Sistema Operacional)
- **A**pache (Servidor Web)
- **M**ySQL (Banco de Dados)
- **P**HP (Linguagem de Programação)

---

## Formulários HTML

**Função:** Capturar dados do usuário e enviá-los como corpo ou parâmetros de query de requisição HTTP.

```html
<form action="processar.php" method="POST">
  <input name="nome" type="text" />
  <button>Enviar</button>
</form>
```

---


## Atributo Action em Formulários

**Para que serve o atributo `action`?**

Define a URL para onde os dados do formulário serão enviados quando o formulário for submetido.

```html
<form action="./login.php" method="POST">
  <input name="email" type="email" />
  <input name="senha" type="password" />
  <button type="submit">Entrar</button>
</form>
```

Os dados serão enviados para `login.php` ao clicar no botão de submit.

---

## Métodos HTTP: GET vs POST

**GET:**

- Dados enviados na URL (query params)
- Visível no navegador
- Limitado em tamanho
- Acesso via `$_GET`

**POST:**

- Dados enviados no corpo da requisição
- Não visível na URL
- Sem limite de tamanho
- Acesso via `$_POST`

---

## Variável $_POST no PHP

**O que é a variável `$_POST`?**

É uma variável superglobal que contém os dados enviados no corpo da requisição HTTP.

```php
<?php
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  
  echo "Olá, $nome! Seu email é $email";
?>
```

---

## Exemplo Prático: Formulário + PHP

<div style="display: flex; gap: 20px; font-size: 0.8em;">

<div style="flex: 1;">

**form.html**

```html
<form action="processar.php" 
      method="POST">
  <input name="usuario" />
  <input name="senha" 
         type="password" />
  <button>Login</button>
</form>
```

</div>

<div style="flex: 1;">

**processar.php**

```php
<?php
$user = $_POST['usuario'];
$pass = $_POST['senha'];

if($user === 'admin' && 
   $pass === '1234'){
  echo "Login OK!";
} else {
  echo "Erro!";
}
?>
```

</div>

</div>

---