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
created: 2026-09-14T22:19
updated: 2026-09-22T00:36
---

# 🚀 Aula 03: Autenticação & Status Público
## Técnicas de Programação Avançadas (TPA)
**Startup:** AskLive (FalaQ)
**Branch de Partida:** `v3.0-authN-public`

---

## 📅 Recap da Última Aula

Na **Aula 02 (Sprint 02)**, nós:
- Criamos o relacionamento **N:1** entre `Pergunta` e `User`.
- Compreendemos o terrível **Problema N+1**.
- Resolvemos o gargalo usando **Eager Loading** (`with('user')`).

**O Problema Atual:**
O sistema está funcional, mas **qualquer pessoa** na internet pode digitar nossa URL e criar um Evento sem ter uma conta! Precisamos colocar um **Segurança** na porta.

---

## 🔑 AuthN vs AuthZ

Antes de colocar a mão no código, precisamos separar dois conceitos que andam juntos, mas são diferentes:

1. **Autenticação (AuthN):** *Quem é você?* 
   - Provar sua identidade. (Ex: Apresentar a identidade na porta da boate).
   - Ferramenta: Login, Senha, Sessões.

2. **Autorização (AuthZ):** *O que você pode fazer?*
   - Verificar as permissões. (Ex: Você tem ingresso para a Área VIP?).
   - Ferramenta: Middlewares, Policies e Gates. *(Tema da próxima aula!)*

---

## 🛡️ O Conceito de Middleware

No Laravel, o **Middleware** é o "Segurança da Balada".

Toda requisição HTTP que sai das Rotas (Router) passa por ele antes de chegar no Controller.

![w:700](https://mermaid.ink/img/pako:eNp1UcluwjAQ_RXL5wT0gByoCAUJVGkPe7HNYDBrjR3ZblQp4t9rQ4HQHq7e8-ZN5nlhFStABa2fHlqKXTZ1nQjTj8u1QdIeGvP5p_mYtP7wz6F2XG5Wv7nOOSfWJ8_pDEc2yM8g2gL-rP6N33lXhZ2T284G_BwH2w1U1B-s-1z0Q0Qj-O76i_A190zY456-MvC7a8NOfp2w11qQ99mO8Lg9E-Qn9z17_gP9oQc8FwY7QO1R4U1N8b6i1CooO7_9z-6L_wN_6gGPhcH2UJvM0P41n_A8z_O8yA380A-CwPf9s326K2uK9xWltgRl55X_2f3n_4E_9cBlYbA11AZV2v_MJ3y-XN_9l9vS_wN_6oHLwmB7qPVz3P2P7P7p_6E_d4HnwmAHqP0cZ__D_9_d70V0tQ==)

---

## 🔑 A Facade `Auth`

O Laravel nos fornece a ferramenta mágica estática `Auth` para lidar com toda a lógica pesada de checar credenciais contra o banco de dados e gerenciar cookies de sessão.

```php
// Tentar fazer login manualmente
Auth::attempt(['email' => $email, 'password' => $senha]);

// Perguntar: O usuário atual está logado?
Auth::check();

// Quem é o usuário atual? (Retorna o Model User ou null)
$usuario = Auth::user(); 

// Deslogar
Auth::logout();
```

---

## 💻 Live Coding (O Mestre)

Vamos construir juntos o fluxo de **Gestão de Eventos** do AskLive:

1. **Criar a Lógica de Autenticação Manual:**
   - Vamos criar o Formulário de Login (Blade).
   - Vamos criar o `LoginController` e usar `Auth::attempt()`.
2. **Aplicar o Middleware `auth`:**
   - Bloquear as rotas de criação de eventos em `web.php` para usuários anônimos.
3. **Visibilidade (Bônus):**
   - Eventos agora podem ser criados como "Rascunho". Vamos usar a cláusula `where('is_draft', false)` para esconder rascunhos do público na página inicial.

---

## 🎯 Sua Vez: Sprint 03 (O Aprendiz)

Agora é com vocês! Acessem a Wiki do projeto.

**Ticket #005 e #006 (Área VIP):**
- O sistema precisa aplicar o mesmo conceito do middleware `auth` para bloquear a **criação de Perguntas** no mural.
- O organizador quer que o sistema só exiba perguntas cuja coluna `is_public` for `true`.

Leia os conceitos atômicos gerados na Wiki:
👉 `[[HTTP/middleware]]` e `[[Seguranca/auth-facade]]`.
