---
title: "Aula 01: Onboarding e Manutenção (Validações e Paginação)"
tags:
  - cotemig
  - laravel
  - slides
  - etapa3
marp: true
theme: default
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
  :root { --color-bg:#0f1117; --color-accent:#7c6af7; --color-accent2:#4ade80; --font:'Inter',sans-serif; --mono:'JetBrains Mono',monospace; }
  section { background:#0f1117; color:#e2e8f0; font-family:var(--font); font-size:28px; padding:60px 80px; }
  h1 { font-size:2.2em; font-weight:700; color:#fff; letter-spacing:-0.02em; line-height:1.15; }
  h2 { font-size:1.4em; font-weight:600; color:var(--color-accent); margin-bottom:0.4em; }
  h3 { font-size:1em; font-weight:600; color:var(--color-accent2); text-transform:uppercase; letter-spacing:.08em; }
  p, li { color:#94a3b8; }
  strong { color:#fff; }
  em { color:var(--color-accent); font-style:normal; }
  code { font-family:var(--mono); background:#1e2130; color:#a5f3fc; padding:.1em .4em; border-radius:4px; font-size:.8em; }
  pre { background:#1e2130; border-left:3px solid var(--color-accent); border-radius:8px; padding:1em 1.4em; }
  pre code { background:none; color:#e2e8f0; font-size:.75em; line-height:1.7; }
  blockquote { background:#1a1d27; border-left:4px solid var(--color-accent); border-radius:0 8px 8px 0; padding:.8em 1.2em; color:#94a3b8; font-style:normal; }
  section.lead blockquote { display: none; }
  section.lead h1 { background:linear-gradient(135deg,#a78bfa,#7c6af7,#4ade80); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  section::after { color:#2e3347; font-size:.6em; }
  table { width:100%; border-collapse:collapse; font-size:.85em; }
  th { background:#252836; color:var(--color-accent); padding:.5em 1em; border-bottom:2px solid var(--color-accent); text-transform:uppercase; font-size:.8em; letter-spacing:.05em; }
  td { padding:.45em 1em; border-bottom:1px solid #2e3347; }
paginate: true
class: lead
created: 2026-08-31T19:02
updated: 2026-08-31T23:56
---

> [!TIP] Apresentação
> 📽️ **<a href="/slides/aula01-marp.html" data-router-ignore target="_blank">Abrir Slides (Marp)</a>** — Versão para projeção em sala de aula.
> 🎞️ **<a href="/slides/aula01-reveal.html" data-router-ignore target="_blank">Abrir Slides (Reveal.js)</a>** — Versão com animações e tela cheia.


# 🚀 Bem-vindos à FalaQ-Eu_T_3scuto!
**Onboarding de Desenvolvedores Backend Júnior**
*3ª Etapa - TPA Laravel*

---

## 📋 Agenda do Nosso 1º Dia
1. **Onboarding:** Conhecendo a Empresa e o Produto
2. **Revisão:** O Fluxo MVC no nosso ecossistema
3. **Ticket #001 (Segurança):** Bloqueando spam com FormRequests
4. **Ticket #002 (Performance):** Consertando queries pesadas (`where`, `sort`, `paginate`)

---

# 🏢 1. Onboarding

---

## O Produto: FalaQ-Eu_T_3scuto
- Uma plataforma web para **interação em tempo real** durante palestras e eventos.
- O público acessa pelo celular, digita uma pergunta, e ela aparece no telão.
- **O status atual:** O MVP (Produto Mínimo Viável) foi um sucesso. Temos milhares de acessos simultâneos.

---

## O Nosso Problema (O Legado)
- O código que está rodando em produção foi feito **às pressas** por uma agência terceira.
- O sistema funciona, mas está cheio de:
  - 🚨 Brechas de segurança.
  - 🐌 Gargalos de performance.
  - 🍝 Código mal estruturado (o famoso "código espaguete").

---

## O Seu Papel Aqui
- Na FalaQ-Eu_T_3scuto, você **não vai** criar projetos do zero (`laravel new`).
- Você foi contratado para dar **manutenção** e evoluir o produto.
- 90% do tempo de um dev profissional é lendo código existente. **Essa é a habilidade que vamos treinar.**

---

# 🧠 2. Revisão: O Fluxo MVC

---

## Como o nosso Laravel funciona?
A cada clique do usuário, um ciclo se inicia:

1. 🌐 **Rota (`web.php`):** Recebe o clique/URL.
2. 🛡️ **Request:** Filtra e valida os dados de entrada.
3. 🧠 **Controller:** O maestro. Decide o que fazer.
4. 🗄️ **Model (Eloquent):** Conversa com o Banco de Dados.
5. 🖥️ **View (Blade):** Monta o HTML e devolve pro usuário.

---

# 🎫 3. Ticket #001: Segurança

---

## O Relato do Suporte
> "Durante a palestra de ontem, um grupo de engraçadinhos começou a floodar o telão enviando perguntas vazias, ou com apenas uma letra ('k', 'a'). O banco de dados encheu de lixo!"

---

## O Que é Validação de Dados?
- Nunca devemos confiar no que vem do usuário (Frontend).
- O HTML pode ter `required`, mas um hacker burla isso facilmente via *DevTools* ou *Postman*.
- A validação **real** acontece no Backend.

---

## Como NÃO Fazer (O que o dev antigo fez)
Fazer validação no *Controller* suja o código e fere a separação de responsabilidades (SOLID).

```php
// Ruim ❌
public function store(Request $request) {
    $request->validate([
        'conteudo' => 'required'
    ]);
    // Salva no banco...
}
```

---

## Como Fazer (Form Requests)
O Laravel possui classes dedicadas apenas para regras de validação.

```php
// Bom ✅ (No arquivo PerguntaRequest.php)
public function rules() {
    return [
        'conteudo' => ['required', 'string', 'min:5', 'max:255']
    ];
}
```

---

## 🛠️ Hands-on: Resolvendo o Ticket #001
1. Abram o arquivo `app/Http/Requests/StorePerguntaRequest.php`.
2. Apliquem regras estritas (`min:10`).
3. Abram a interface e tentem burlar a regra.
4. Usem a aba **Network** do navegador para observar a falha.

---

## O Status 422
Quando a validação falha no Laravel, ele barra a execução e retorna o código HTTP:
**`422 Unprocessable Content`**
*(Os dados chegaram, o formato está certo, mas o conteúdo é inaceitável).*

---

# 🎫 4. Ticket #002: Performance

---

## O Relato do Suporte
> "Se um evento tem mais de 2.000 perguntas, a página congela o navegador do usuário. Além disso, as perguntas antigas estão aparecendo primeiro, e às vezes aparecem perguntas de OUTROS eventos misturadas!"

---

## Dissecando o Problema
Três erros graves cometidos na mesma query pelo Dev anterior:
1. **Mistura:** Faltou a cláusula `WHERE`.
2. **Ordem Invertida:** Faltou a cláusula `ORDER BY`.
3. **Travamento:** Trouxe todos os dados de uma vez (Faltou Paginação).

---

## O Código Culpado
Lá no `EventoController`, encontramos o culpado:

```php
public function show($id) {
    $evento = Evento::findOrFail($id);
    
    // O perigo mortal 💀
    $perguntas = Pergunta::all(); 

    return view('eventos.show', compact('evento', 'perguntas'));
}
```

---

## A Solução: Eloquent Ninja
```php
$perguntas = Pergunta::where('evento_id', $evento->id) 
                     ->orderBy('created_at', 'desc')   
                     ->paginate(10);                   
```
*(Não esqueçam de colocar `{{ $perguntas->links() }}` no Blade!)*
