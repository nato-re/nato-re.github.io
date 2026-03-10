---
theme: nato-re-theme
marp: true
class: invert
---

# Exercício: Cadastro de Usuário em PHP

## Objetivo

Desenvolver um sistema de cadastro de usuários com validações simples utilizando PHP.

---

## Descrição do Problema

Você foi contratado para desenvolver um formulário de cadastro de usuários para um sistema web. O formulário deve coletar informações básicas e validar os dados antes de processá-los.

---

## Requisitos Funcionais

### 1. Formulário HTML

Crie um formulário com os seguintes campos:

- **Nome completo** (campo de texto)
- **E-mail** (campo de e-mail)
- **Senha** (campo de senha)
- **Confirmar senha** (campo de senha)
- **Data de nascimento** (campo de data)
- **Telefone** (campo de texto)
- **Botão de envio**

---

## Requisitos de Validação

### 2. Validações Obrigatórias

Implemente as seguintes validações no lado do servidor (PHP):

1. **Nome completo:**
   - Não pode estar vazio
   - Deve ter no mínimo 3 caracteres
   - Deve conter pelo menos um espaço (nome e sobrenome)

2. **E-mail:**
   - Não pode estar vazio
   - Deve ser um e-mail válido
   - Deve conter @ e um domínio válido

---

## Requisitos de Validação (continuação)

3. **Senha:**
   - Não pode estar vazia
   - Deve ter no mínimo 6 caracteres
   - Deve conter pelo menos uma letra maiúscula
   - Deve conter pelo menos um número

4. **Confirmar senha:**
   - Deve ser igual ao campo senha

5. **Data de nascimento:**
   - Não pode estar vazia
   - Usuário deve ter no mínimo 18 anos

---

## Requisitos de Validação (continuação)

6. **Telefone:**
   - Não pode estar vazio
   - Deve conter apenas números, espaços, parênteses e hífen
   - Deve ter entre 10 e 15 caracteres (sem contar formatação)

---

## Requisitos Técnicos

### 3. Estrutura do Projeto

Organize seu projeto da seguinte forma:

```
cadastro/
├── index.php          # Formulário HTML
├── processar.php      # Processamento e validação
└── style.css          # Estilização (opcional)
```

---

## Requisitos Técnicos (continuação)

### 4. Processamento

- Use o método **POST** para enviar os dados
- Valide todos os campos no arquivo `processar.php`
- Armazene as mensagens de erro em um array
- Se houver erros, redirecione de volta ao formulário exibindo as mensagens
- Se não houver erros, exiba uma mensagem de sucesso com os dados cadastrados

---

## Exemplo de Saída

### Caso de Sucesso

```
✓ Cadastro realizado com sucesso!

Dados cadastrados:
- Nome: João Silva Santos
- E-mail: joao.silva@email.com
- Data de nascimento: 15/03/1995
- Telefone: (11) 98765-4321
```

---

## Exemplo de Saída (continuação)

### Caso de Erro

```
✗ Erro no cadastro. Corrija os seguintes problemas:

- O nome deve conter nome e sobrenome
- A senha deve ter no mínimo 6 caracteres
- A senha deve conter pelo menos uma letra maiúscula
- As senhas não conferem
```

---

## Dicas de Implementação

### Funções PHP Úteis

- `empty()` - verifica se uma variável está vazia
- `strlen()` - retorna o tamanho de uma string
- `filter_var()` - valida e filtra dados
- `preg_match()` - verifica padrões com regex
- `password_hash()` - criptografa senhas (bônus)
- `DateTime` - manipula datas

---

## Dicas de Implementação (continuação)

### Exemplo de Validação de E-mail

```php
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros[] = "E-mail inválido";
}
```

### Exemplo de Validação de Senha

```php
if (!preg_match('/[A-Z]/', $senha)) {
    $erros[] = "A senha deve conter pelo menos uma letra maiúscula";
}

if (!preg_match('/[0-9]/', $senha)) {
    $erros[] = "A senha deve conter pelo menos um número";
}
```

---

## Critérios de Avaliação

Seu exercício será avaliado considerando:

- ✅ **Funcionalidade**: Todas as validações implementadas corretamente
- ✅ **Organização do código**: Código limpo e bem estruturado
- ✅ **Tratamento de erros**: Mensagens claras e específicas
- ✅ **Interface**: Formulário organizado e legível
- ✅ **Boas práticas**: Uso adequado de funções PHP e segurança básica

---

## Desafios Extras (Opcional)

Para quem quiser ir além:

1. **Sanitização de dados:** Use `htmlspecialchars()` para prevenir XSS
2. **Criptografia de senha:** Use `password_hash()` antes de armazenar
3. **Validação com JavaScript:** Adicione validação no front-end
4. **Persistência:** Salve os dados em um arquivo JSON ou banco de dados
5. **Upload de foto:** Adicione campo para foto de perfil com validação
6. **CPF:** Adicione campo de CPF com validação do dígito verificador

---

## Entrega

- **Formato:** Arquivo ZIP contendo todos os arquivos do projeto
- **Nome do arquivo:** `cadastro_usuario_[seu_nome].zip`

---

## Recursos de Apoio

### Documentação Oficial

- [PHP Manual - Validação de Dados](https://www.php.net/manual/pt_BR/filter.examples.validation.php)
- [PHP Manual - Expressões Regulares](https://www.php.net/manual/pt_BR/book.pcre.php)
- [PHP Manual - Funções de String](https://www.php.net/manual/pt_BR/ref.strings.php)

### Tutoriais Recomendados

- W3Schools PHP Forms
- PHP The Right Way

---

## Bom Trabalho! 🚀

Lembre-se:

- Teste todas as validações
- Pense em casos extremos
- Mantenha o código organizado
- Comente partes complexas
- Não copie código sem entender

**Dúvidas? Consulte o professor ou monitores!**
