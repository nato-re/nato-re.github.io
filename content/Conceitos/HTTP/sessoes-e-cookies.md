---
title: Sessões e Cookies
tags: [conceitos, http, sessao, cookie]
---

# 🍪 Sessões e Cookies

O protocolo HTTP é **"Stateless"** (sem estado). Isso significa que cada vez que você clica em um link ou envia um formulário, o servidor te esquece completamente. 

Para que o servidor "lembre" de você (por exemplo, que você fez login ou os itens do seu carrinho de compras), usamos **Sessões** e **Cookies**.

## Como Funciona?

```mermaid
sequenceDiagram
    participant C as Navegador
    participant S as Servidor (Laravel)
    
    C->>S: POST /login (Email e Senha)
    S-->>S: Auth::attempt() Sucesso!
    S->>S: Salva Sessão {user_id: 1} (Arquivo/BD)
    S-->>C: Envia Cookie "laravel_session=XYZ123"
    
    C->>S: GET /dashboard (Envia Cookie "XYZ123")
    S-->>S: Lê a sessão XYZ123 -> Sabe que é o User 1
    S-->>C: HTML do Dashboard
```

1. **Sessão:** Os dados reais (quem é você, mensagens de erro flash) ficam guardados **no servidor** (em arquivos ou banco de dados).
2. **Cookie:** O servidor dá ao seu navegador um "Crachá" (uma string aleatória). O navegador guarda no Cookie e apresenta esse crachá em todas as próximas requisições.

## Evitando Ataques (Session Fixation)

No login, é vital destruir o crachá antigo e gerar um novo para impedir que hackers roubem a sessão de um usuário antes dele logar. O Laravel faz isso com:

```php
$request->session()->regenerate();
```

## 📖 Documentação Oficial
- [Laravel Docs: HTTP Session](https://laravel.com/docs/session)
