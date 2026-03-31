---
marp: true
theme: default
class: invert
paginate: true
backgroundColor: #1e1e2e
color: #cdd6f4
style: |
  section {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    justify-content: start;
    text-align: left;
    font-size: 32px;
  }
  h1 { font-size: 56px; color: #89b4fa; margin-bottom: 20px;}
  h2 { font-size: 44px; color: #89b4fa; margin-bottom: 30px;}
  h3 { font-size: 36px; color: #a6e3a1; }
  p, ul, li { font-size: 32px; line-height: 1.4; }
  code { color: #fab387; background: #313244; }
  pre { background: #11111b !important; border: 1px solid #313244; }
  pre code { font-size: 26px; }
  blockquote { border-left: 5px solid #a6e3a1; color: #a6adc8; font-size: 28px; padding-left: 15px;}
---

# 🛡️ PDO & Segurança no Backend
### Parando os Hackers no Prata e Subindo pro Challenger

<!--
Notas para o Instrutor:
- Boas-vindas animadas! "Hoje vamos construir nossa fundação no backend como uma verdadeira parede do Braum. Os códigos agora contarão com Dark Mode ativado para máximo conforto visual!"
-->

---

## 🔌 A Conexão PDO (IP do Server Riot)

Tudo começa abrindo o canal de comunicação:

```php
$dsn  = "mysql:host=localhost;dbname=league_db";
$user = "dev_challenger";
$pass = "faker_god_123";

try {
    // 1. Instanciando a conexão com os dados acima
    $pdo = new PDO($dsn, $user, $pass);
    // 🟢 League Server Online!
} catch (PDOException $e) {
    die("Servidor em Manutenção!"); 
}
```

<!--
Notas para o Instrutor:
- Destaque o bloco Try/Catch. Se o banco de dados cair, caímos elegantemente com uma mensagem vazia sem expor logins e senhas para o usuário na tela de erro do PHP.
-->

---

## 📖 Lendo Dados: SELECT * FROM...

Buscando informações gerais da Rotação Grátis:

```php
// Carregar TODOS os campeões do server
$query = "SELECT * FROM campeoes";

$stmt = $pdo->query($query);
$campeoes = $stmt->fetchAll();
```

> Útil para quando você **não recebe dados do usuário**, apenas puxa o que já é público do cliente.

<!--
Notas para o Instrutor:
- Explique o fetchAll(): "Ele devolve uma lista (array) contendo todas as linhas da tabela 'campeoes'."
- Relembre que o PDO::query() só é seguro quando as informações *não* vêm de inputs do formulário. Quando vem formulário... aí o Teemo armou uma cogumelo!
-->

---

## 😱 Uma Página "Simples" (Insegura)

Vamos criar uma busca de jogador na base do [OP.GG]... (Não façam isso em casa!)

```php
// ⚠️ RECEBENDO DA URL E JOGANDO DIRETO NO SQL:
$nome = $_GET['busca']; 

$query = "SELECT * FROM campeoes WHERE nome = '$nome'";
$stmt  = $pdo->query($query);
$loot  = $stmt->fetchAll();
```

> **Se a busca for `Yasuo`, a query fica:**
> `SELECT * FROM campeoes WHERE nome = 'Yasuo'`

<!--
Notas para o Instrutor:
- Mostre o perigo de conectar GET/POST direto na string do banco.
- Crie a expectativa: "O que acontece se um hacker main Shaco digitar um comando de banco de dados em vez do nome do personagem?"
-->

---

## 🦹 O Vilão: SQL Injection

Ocorre quando dados do usuário alteram a lógica da query para farmar dados.

* **O Ataque (Input):** `' OR '1'='1`
* **Como o Banco interpreta:** 
  `WHERE nome = '' OR '1'='1'` 

> **O Dano:** A condição vira **VERDADEIRA** e o banco retorna os dados de **TODOS os jogadores/campeões**, vazando todo o servidor!

<!--
Notas para o Instrutor:
- "A matemática básica diz que 1 é igual a 1. Então 'ou o nome tá certo, OU UM É IGUAL A UM'. O banco obedece como se fosse script."
- É o golpe do Script/Drop Hack.
-->

---

## 🛡️ A Solução: Prepared Statements

🕹️ **O Escudo Negro da Morgana**

1. O PDO Prepara os espaços vazios (Placeholders).
2. Você entrega os dados via array (`execute`).
3. O PDO processa o input **100% como TEXTO**, sem dar dano na query.

<!--
Notas para o Instrutor:
- Explique a analogia do escudo: o PDO confere e limpa a string antes de passar pro banco. Se injetarem código SQL ali no meio, o servidor congela as aspas simples e joga tudo fora como se fosse dano bloqueado.
-->

---

## 📖 O READ Seguro (Protegido)

Refazendo a nossa busca Insegura para a **Versão Challenger**:

```php
// 1. Prepara (O Escudo)
$stmt = $pdo->prepare(
    "SELECT * FROM campeoes WHERE nome = :busca"
);

// 2. Entrega/Executa (Casta o Escudo)
$stmt->execute(['busca' => $_GET['busca']]);

$stats = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

<!--
Notas para o Instrutor:
- "Substituímos a variável `$nome` por um placeholder `:busca`. O `prepare` diz pro banco: 'Deixe o espaço em branco por enquanto'. O `execute` crava os dados inofensivamente."
-->

---

## 🔨 CREATE (Comprar Campeão)

Gastando Essência Azul de forma Segura:

```php
$stmt = $pdo->prepare(
    "INSERT INTO campeoes (nome, maestria) 
     VALUES (:nome, :maestria)"
);

$stmt->execute([
    'nome'     => 'Teemo',
    'maestria' => 7
]);
```

<!--
Notas para o Instrutor:
- Relembre que a dinâmica de `prepare` -> `execute(array)` será a mesma para qualquer operação. Esse é o meta atual do desenvolvimento.
-->

---

## 🔧 UPDATE (Subir Maestria)

Buffando a conta mono-champ:

```php
$stmt = $pdo->prepare(
    "UPDATE campeoes SET maestria = :maestria 
     WHERE id = :id"
);

$stmt->execute([
    'maestria' => 7,
    'id'       => 42
]);
```

<!--
Notas para o Instrutor:
- ALERTA: "Se esquecer o WHERE, todos os campeões do jogo do jogador ganham Maestria 7 e a conta é banida pelo sistema da Riot... cuidado!"
-->

---

## 🗑️ DELETE (Apagando Conta Toxica)

Deletando jogador que quitou da partida de forma segura:

```php
$stmt = $pdo->prepare(
    "DELETE FROM campeoes WHERE id = :id"
);

$stmt->execute(['id' => 999]);
```

<!--
Notas para o Instrutor:
- Relembre que esquecer o 'WHERE' no DELETE é assinar o disband do server inteiro!
-->

---

## 🛠️ Hands-on: Lore de Runeterra

🎯 **Desafio:** Criar o Catálogo de **Regiões** de Runeterra.

**Missões (C-R-U-D 100% PDO):**
1. 🔨 `INSERT`: Registrar nova Região (Shurima, Zaun, Piltover).
2. 📖 `SELECT`: Listar o mapa e as lores históricas.
3. 🔧 `UPDATE`: Editar os detalhes bélicos/culturais.
4. 🗑️ `DELETE`: Destruir a região corrompida pelo Vazio.

<!--
Notas para o Instrutor:
- "A base de vocês está sólida. Usem as táticas do PDO para construir a fundação da Lore do League of Legends."
- Prática livre, ande pelos alunos e veja se eles não esqueceram do escudo do Execute.
-->

---

## 🚀 Resumo do Boss (Vitória!)

* 🛡️ Conexões seguras impedem o FF aos 15.
* 💥 O perigo mora nas **variáveis brutas** expostas no código.
* 🤝 **Prepared Statements** ignoram os Scripts inimigos.
* 🎉 **Missão Cumprida:** Sistema livre de Bans!

**Parabéns, PDL Adquirido!** 💪

<!--
Notas para o Instrutor:
- Recompense o foco dos alunos: eles pegaram o Challenger do backend hoje.
- Abra espaço de perguntas sobre as Regiões de Runeterra!
-->
