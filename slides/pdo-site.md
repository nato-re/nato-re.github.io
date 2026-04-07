---
marp: true
theme: default
class: invert
paginate: true
backgroundColor: #1e1e2e
color: #cdd6f4
style: |
  section { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 32px; }
  h1 { font-size: 56px; color: #89b4fa; }
  h2 { font-size: 44px; color: #a6e3a1; }
  code { color: #fab387; background: #313244; }
  pre { background: #11111b; border: 1px solid #313244; }
---

# 🎮 Criando seu Site de League of Legends!
### Entendendo como conectar o Form ao Banco de Dados (sem dor de cabeça)

---

## 🏗️ Como a magia acontece?

Quando você clica em "Salvar Campeão", a informação viaja por 4 lugares:

1. **View (A Tela)**: Onde você digita o nome e vê as imagens.
2. **Process (O Entregador)**: O código invisível que pega o que você digitou.
3. **Entidade (A Caixa)**: O pacote onde guardamos os dados.
4. **DAO (O Estoquista)**: Quem guarda a caixa no Banco de Dados.

---

## 1️⃣ View: A Tela (`champion.create.view.php`)

Aqui usamos **HTML puro** para fazer o formulário.
Nada de mistério, apenas os campos onde o usuário digita:

```html
<form action="champion.create.process.php" method="POST">
    <input type="text" name="nome" placeholder="Nome do Campeão">
    <!-- botão salvar -->
</form>
```
> O `action` avisa a tela para onde enviar as informações!

---

## 2️⃣ Process: Pegando os dados (`champion.create.process.php`)

Esse arquivo **não tem HTML!**
A missão dele é apenas *"pegar a encomenda e chamar o estoquista"*.

```php
// Pega o que o usuário digitou na tela:
$nome = $_POST["nome"];

// Montamos o nosso pacote (A Entidade):
$campeao = new Champion(null, $nome, $funcao, $imagem);

// Chamamos o Estoquista (O DAO):
$dao->save($campeao);
```

---

## 3️⃣ DAO: O Estoquista (`ChampionDAO.php`)

O DAO (Data Access Object) é o único cara do time que sabe falar com o Banco de Dados (SQL).

```php
class ChampionDAO {
    public function save(Champion $c) {
        $sql = "INSERT INTO champions (nome) VALUES (:nome)";
        // ... preparo a query e salvo no banco!
    }
}
```

---

## 🔗 O que é o `require_once`?

Você vai ver muito isso no topo dos arquivos:
```php
require_once "classes/ChampionDAO.php";
```
É como dizer pro PHP: *"Ei, pra esse código funcionar, eu **preciso** que você puxe as ferramentas do ChampionDAO!"*
Sem isso, o PHP não sabe o que é um DAO ou como conectar no banco!

---

## 🚀 Resumo (O Ciclo da Vida)

1. A **View** desenha na tela.
2. O usuário preenche e o **Process** recebe usando `$_POST`.
3. O Process cria a **Entidade** (o pacote).
4. O Process passa a Entidade pro **DAO**.
5. O DAO grita o SQL no Banco e tudo fica salvo! 🎉

**GG WP!** Bora codar isso e mostrar os campeões reais na tela!

---

## ⚔️ O Grande Desafio (Sua vez de jogar!)

**Missão:** Criar do zero um CRUD para as **Regiões** de Runeterra (Demacia, Noxus, Ionia, etc).

1. **Banco de Dados**: Crie um novo script SQL montando a tabela `regioes` (`id`, `nome`, `estilo_governo`, e `imagem_bandeira`).
2. **Setup Inicial**: Crie a Entidade `Region.php` e seu `RegionDAO.php`.
3. **Formulário**: Crie sua `region.create.view.php`. Lembre-se do `action="region.create.process.php"`!
4. **O Entregador**: Programe o arquivo Process para pegar os dados do Post e enviar para o DAO.
5. **A Tela Principal**: Crie a `region.list.view.php` exibindo as bandeiras das regiões em uma tabela estilizada!

Será que você consegue platinar esse desafio? GLHF! (Good Luck, Have Fun!)
