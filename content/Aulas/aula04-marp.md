---
marp: true
theme: default
class: lead
backgroundColor: "#1E1E2E"
color: "#CDD6F4"
style: |
  h1, h2, h3 { color: #89B4FA; }
  strong { color: #F38BA8; }
  a { color: #A6E3A1; text-decoration: none; }
  code { background-color: #313244; color: #FAB387; padding: 2px 6px; border-radius: 4px; }
  pre { background-color: #181825; border-left: 4px solid #89B4FA; }
created: 2026-09-22T00:37
updated: 2026-09-22T00:37
---

# 🚀 Aula 04: Revisão de Auth, UI & Feedbacks
## Técnicas de Programação Avançadas (TPA)
**Branch de Partida:** `v4.0-auth-tailwind`

---

## 🧠 Por que Revisar?

A Autenticação (AuthN) é o coração de qualquer aplicação segura. Entender **como** ela funciona é melhor do que apenas instalar pacotes mágicos.

Hoje vamos focar em três pilares:
1. **Segurança de Dados:** Hashes e Sessões.
2. **Design System:** Introdução ao Tailwind CSS.
3. **User Experience (UX):** Validando dados e exibindo erros com `@error`.

---

## 🎨 Bootstrap vs Tailwind

No passado, usávamos frameworks baseados em componentes (ex: `<div class="card">`).

O **Tailwind CSS** é baseado em **Classes Utilitárias**. Você constrói o design direto no HTML, combinando pequenas peças.

```html
<!-- Exemplo Tailwind -->
<button class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
  Salvar
</button>
```
*Não precisamos abrir arquivos `.css`!*

---

## 🔒 O Ciclo da Senha (Hash)

Se um hacker roubar o banco de dados da Cotemig, ele verá sua senha? **Não!**

Sempre criptografamos as senhas usando algoritmos de uma via (como o `Bcrypt`).
O Laravel faz isso com a Facade `Hash`:

```php
use Illuminate\Support\Facades\Hash;

$senhaSegura = Hash::make('123456'); 
// Resultado: $2y$10$wT8Kz... (Impossível reverter!)
```

---

## ⚠️ O Caminho do Erro (Validação)

O que acontece quando o usuário erra a senha ou deixa um campo em branco?

1. O `FormRequest` ou o `validate()` no Controller **falha**.
2. O Laravel interrompe tudo e dá um **Redirect Back**.
3. Ele joga as mensagens de erro dentro da **Sessão** (Flash Data).
4. No Blade, nós "pescamos" esses erros usando a diretiva mágica `@error`.

---

## 🎣 A Diretiva `@error` e `old()`

O Blade possui atalhos maravilhosos para lidar com formulários.

```blade
<input type="text" name="titulo" value="{{ old('titulo') }}">

@error('titulo')
    <span style="color: red;">{{ $message }}</span>
@enderror
```

- `old('campo')`: Preenche o input com o que o usuário tinha acabado de digitar, para ele não perder o texto.
- `$message`: Variável injetada automaticamente pelo Laravel com o texto do erro.

---

## 💻 Hora do Live Coding (Mestre)

**Nossa Missão Agora:**
Construir a tela de **Cadastro de Usuário** do AskLive.
Vamos aplicar o Tailwind, fazer o Hash da senha, e disparar o `@error` caso o usuário tente se cadastrar sem nome!

---

## 🎯 Sua Vez: Sprint 04 (O Aprendiz)

**Ticket #007: Identidade Visual e Validação**

O seu formulário de "Enviar Pergunta" está funcionando, mas está feio e não avisa o usuário se ele tentar enviar uma pergunta vazia!

👉 Entre no Github, veja a Sprint 04 e aplique o Tailwind e o `@error` nas rotas do Aprendiz.
