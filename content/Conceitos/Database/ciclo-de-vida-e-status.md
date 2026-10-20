---
title: Ciclo de Vida do Dado e Máquinas de Estado
tags:
  - conceito
  - database
  - migrations
  - regras-de-negocio
  - laravel
created: 2026-10-06T14:00
updated: 2026-10-06T14:00
---

# 🔄 Ciclo de Vida do Dado & Colunas de Estado (Status)

Em aplicações reais, os registros raramente são estáticos. Eles passam por etapas, como um pedido de e-commerce (`pendente` $\rightarrow$ `pago` $\rightarrow$ `enviado` $\rightarrow$ `entregue`) ou uma pergunta em um evento ao vivo (`analisando` $\rightarrow$ `aprovada` $\rightarrow$ `rejeitada`).

Modelar o **Ciclo de Vida do Dado** de forma limpa evita bugs graves de segurança e inconsistências de banco.

---

## 🚫 A Armadilha do Booleano (`is_active` ou `is_approved`)

No início dos estudos, muitos desenvolvedores têm a tentação de usar colunas booleanas simples:
```php
$table->boolean('is_approved')->default(false);
```

**Por que isso quebra quando o sistema cresce?**
1. **Falta de granularidade:** O que acontece quando o item não está nem aprovado nem rejeitado, mas *"em análise sob suspeita"*?
2. **Proliferação de colunas:** O banco vira uma salada: `is_approved`, `is_rejected`, `is_pending`, `is_archived` gerando estados impossíveis (ex: um registro com `is_approved = true` e `is_rejected = true` ao mesmo tempo!).
3. **A Solução:** Use uma única coluna de texto descritivo `status` com valores finitos e bem definidos.

---

## 🛡️ Modelando no Laravel com Valor Padrão (`default`)

Na sua Migration, defina a coluna com o valor inicial que todo registro deve receber no momento da criação:

```php
Schema::create('moderacoes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('pergunta_id')->constrained()->cascadeOnDelete();
    $table->text('motivo');
    
    // Todo registro nasce em análise automaticamente!
    $table->string('status')->default('analisando');
    
    $table->timestamps();
});
```

> **Regra de Ouro:** O formulário do usuário **nunca** deve enviar o status inicial. Quem define o ponto de partida do ciclo de vida é o banco de dados via `->default()`, protegendo contra manipulação externa no payload da requisição.

---

## 🕹️ Controlando Transições no Controller

Em vez de permitir que o usuário envie qualquer texto para o campo status, crie rotas ou métodos dedicados para aplicar transições seguras:

```php
public function aprovar(Moderacao $moderacao)
{
    // Apenas moderadores autorizados podem aprovar
    $this->authorize('moderate', $moderacao);

    $moderacao->update([
        'status' => 'aprovado'
    ]);

    return back()->with('status', 'Pergunta aprovada com sucesso!');
}
```

---

## 🔍 Consultando por Estado com Scopes no Model

No Model Eloquent, você pode criar métodos helpers para verificar o estado ou filtrar consultas:

```php
// app/Models/Moderacao.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Moderacao extends Model
{
    protected $fillable = ['pergunta_id', 'motivo', 'status'];

    public function isAprovado(): bool
    {
        return $this->status === 'aprovado';
    }

    public function isPendente(): bool
    {
        return $this->status === 'analisando';
    }
}
```

Para buscar apenas as perguntas que já passaram pelo crivo da moderação:
```php
$perguntasAprovadas = Pergunta::whereHas('moderacoes', function ($query) {
    $query->where('status', 'aprovado');
})->get();
```

---

## 🔗 Conceitos Relacionados
- [[Conceitos/Arquitetura/engenharia-de-requisitos|Engenharia de Requisitos]]
- [[Conceitos/Database/model|Model Eloquent e Fillable]]
- [[Conceitos/Database/filtro-where|Filtros com where()]]
