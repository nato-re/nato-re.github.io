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

# 🚀 Missão: Sistema de Inventário de Mundos

**Contexto:** Uma Wiki de games contratou você para desenvolver o módulo de gerenciamento de cenários. Você deve permitir que usuários cadastrem locais icônicos e os visualizem em uma galeria.

### 📋 Requisitos de Dados
Cada cenário deve conter:
* **Nome** (Ex: *Lost Izalith*)
* **Descrição** (Ex: *Uma cidade submersa em lava...*)
* **Nome do Jogo** (Ex: *Dark Souls*)
* **Imagem** (URL de uma imagem do cenário)

---

# 📂 Mapa do Projeto (Arquivos Necessários)

Para platinar este desafio, você deve criar os seguintes arquivos seguindo o padrão **DAO**:

### 1. 🗄️ Database & Conexão
* `banco.sql`: Script de criação da tabela `cenarios`.
* `Connection.php`: Classe responsável pela conexão via **PDO**.

### 2. 🏛️ Estrutura e Lógica (Core)
* `Cenario.php`: **Entidade** (Classe com atributos e getters/setters).
* `CenarioDAO.php`: **Objeto de Acesso a Dados** (Contém as funções de `INSERT` e `SELECT`).

---

# 📂 Mapa do Projeto (Arquivos Necessários)

### 3. 🎨 Interface (Views)
* `cenario.create.view.php`: Formulário HTML para entrada de dados.
* `cenario.list.view.php`: Tabela ou Grid de cards exibindo os dados e a imagem.

### 4. ⚙️ Engrenagem (Process)
* `cenario.create.process.php`: Recebe o `$_POST`, instancia o DAO e redireciona o usuário.

---

# 🎯 Critérios de Sucesso

Ao final da aula, seu projeto deve ser capaz de:

1.  **Persistir:** Salvar um cenário no banco de dados e ele não sumir ao dar F5.
2.  **Renderizar:** Exibir a imagem do cenário diretamente na lista (`<img src="...">`).
3.  **Organizar:** Não ter código SQL dentro dos arquivos de View. Tudo deve passar pelo **DAO**.

> 💡 **Dica de Pro:** Use o **Bootstrap** ou **Tailwind** para deixar sua galeria de mundos com cara de site profissional!

**Bom código, player 1!**
