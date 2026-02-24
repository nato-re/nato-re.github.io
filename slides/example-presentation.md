# Example Presentation

> This is an example presentation to demonstrate the Marp + React setup

---

## Welcome

This is your first slide!

---

## Features

- 📊 Marp for beautiful presentations
- ⚛️ React for dynamic content
- 🚀 Automated GitHub Pages deployment
- 📱 Responsive design

---

## Getting Started

1. Add `.md` files to the `slides/` directory
2. Run `npm run build` to compile everything
3. Push to `main` branch to deploy automatically

---

## Example Code

```javascript
const greet = (name) => {
  console.log(`Hello, ${name}!`)
}

greet('NATO-RE')
```

---

## Thank You!

Questions? Check the README for more info.

---

## test

```php
<?php

// ============================================================
// AULA 3 - EXEMPLOS EM PHP
// ============================================================

echo "=== PHP - EXEMPLOS PRÁTICOS ===\n\n";

// ============================================================
// 1. LINGUAGEM PHP - SINTAXE BÁSICA
// ============================================================
echo "1. LINGUAGEM PHP - SINTAXE BÁSICA\n";
echo "-----------------------------------\n";

// Comentários em PHP
// Comentário de uma linha
/* 
 * Comentário de múltiplas linhas
 */

// Saída de dados
echo "Olá, Mundo!\n"; // Usando echo
print "Usando print\n"; // Usando print

// Estrutura básica
$mensagem = "PHP é uma linguagem de script no servidor!";
echo $mensagem . "\n";
echo "\n";

// ============================================================
// 2. TIPOS DE DADOS
// ============================================================
echo "2. TIPOS DE DADOS\n";
echo "-----------------\n";

// String
$nome = "João";
$sobrenome = 'Silva';
echo "String: $nome $sobrenome\n";

// Integer (número inteiro)
$idade = 25;
$temperatura = -15;
echo "Integer: Idade = $idade, Temperatura = $temperatura\n";

// Float (número decimal)
$altura = 1.75;
$preco = 29.99;
echo "Float: Altura = $altura, Preço = R$ $preco\n";

// Boolean (verdadeiro/falso)
$ativo = true;
$deletado = false;
echo "Boolean: Ativo = " . ($ativo ? "verdadeiro" : "falso") . "\n";

// Array (índice numérico)
$frutas = array("Maçã", "Banana", "Laranja");
echo "Array indexado: " . $frutas[0] . ", " . $frutas[1] . "\n";

// Array associativo
$pessoa = array(
    "nome" => "Maria",
    "idade" => 30,
    "cidade" => "São Paulo"
);
echo "Array associativo: " . $pessoa["nome"] . " tem " . $pessoa["idade"] . " anos\n";

// NULL
$valor_nulo = NULL;
echo "NULL: valor_nulo é " . (is_null($valor_nulo) ? "nulo" : "não nulo") . "\n";

// Verificar tipo
echo "Tipo de \$idade: " . gettype($idade) . "\n";
echo "Tipo de \$altura: " . gettype($altura) . "\n";
echo "\n";

// ============================================================
// 3. VARIÁVEIS
// ============================================================
echo "3. VARIÁVEIS\n";
echo "------------\n";

// Declaração e inicialização
$numero = 42;
$texto = "Olá";
$lista = [1, 2, 3, 4, 5];

echo "Número: $numero\n";
echo "Texto: $texto\n";
echo "Lista: " . implode(", ", $lista) . "\n";

// Variáveis dinâmicas
$resultado = "resultado";
$resultado = 100; // Cria $resultado = 100
echo "Variável dinâmica \$resultado = $resultado\n";

// Escopo global
$global = "Sou global";

function testar_escopo() {
    global $global;
    echo "Dentro da função: $global\n";
}
testar_escopo();

// Superglobais (pré-definidas)
echo "PHP versão: " . phpversion() . "\n";
echo "Sistema operacional: " . php_uname() . "\n";
echo "\n";

// ============================================================
// 4. ESTRUTURAS CONDICIONAIS
// ============================================================
echo "4. ESTRUTURAS CONDICIONAIS\n";
echo "---------------------------\n";

// if/else
$idade_user = 18;
if ($idade_user >= 18) {
    echo "Maior de idade\n";
} else {
    echo "Menor de idade\n";
}

// if/elseif/else
$nota = 85;
if ($nota >= 90) {
    echo "Conceito: A\n";
} elseif ($nota >= 80) {
    echo "Conceito: B\n";
} elseif ($nota >= 70) {
    echo "Conceito: C\n";
} else {
    echo "Conceito: D\n";
}

// switch/case
$dia = 3;
switch ($dia) {
    case 1:
        echo "Segunda-feira\n";
        break;
    case 2:
        echo "Terça-feira\n";
        break;
    case 3:
        echo "Quarta-feira\n";
        break;
    default:
        echo "Outro dia\n";
}

// Operador ternário
$status = ($idade_user >= 18) ? "Adulto" : "Menor";
echo "Status: $status\n";

// Operador null coalescing
$cor = null;
$cor_final = $cor ?? "Azul"; // Se $cor for null, usa "Azul"
echo "Cor final: $cor_final\n";
echo "\n";

// ============================================================
// 5. ESTRUTURAS DE REPETIÇÃO
// ============================================================
echo "5. ESTRUTURAS DE REPETIÇÃO\n";
echo "--------------------------\n";

// while
echo "While loop: ";
$contador = 0;
while ($contador < 3) {
    echo $contador . " ";
    $contador++;
}
echo "\n";

// do...while
echo "Do-while loop: ";
$contador = 0;
do {
    echo $contador . " ";
    $contador++;
} while ($contador < 3);
echo "\n";

// for
echo "For loop: ";
for ($i = 0; $i < 5; $i++) {
    echo $i . " ";
}
echo "\n";

// foreach (para arrays)
$cores = ["Vermelho", "Verde", "Azul"];
echo "Foreach (array indexado): ";
foreach ($cores as $cor) {
    echo $cor . " ";
}
echo "\n";

// foreach (array associativo)
$dados = ["nome" => "Ana", "idade" => 28, "profissao" => "Engenheira"];
echo "Foreach (array associativo): ";
foreach ($dados as $chave => $valor) {
    echo "$chave=$valor ";
}
echo "\n";

// break e continue
echo "Loop com break e continue: ";
for ($i = 0; $i < 10; $i++) {
    if ($i == 3) {
        continue; // Pula a iteração
    }
    if ($i == 7) {
        break; // Sai do loop
    }
    echo $i . " ";
}
echo "\n";
echo "\n";

// ============================================================
// 6. OPERADORES MATEMÁTICOS
// ============================================================
echo "6. OPERADORES MATEMÁTICOS\n";
echo "---------------------------\n";

$a = 10;
$b = 3;

echo "Adição: $a + $b = " . ($a + $b) . "\n";
echo "Subtração: $a - $b = " . ($a - $b) . "\n";
echo "Multiplicação: $a * $b = " . ($a * $b) . "\n";
echo "Divisão: $a / $b = " . ($a / $b) . "\n";
echo "Resto (módulo): $a % $b = " . ($a % $b) . "\n";
echo "Potência: $a ** 2 = " . ($a ** 2) . "\n";

// Incremento e Decremento
$valor = 5;
echo "Valor inicial: $valor\n";
echo "Pré-incremento: ++\$valor = " . (++$valor) . "\n";
echo "Pós-incremento: \$valor++ = " . ($valor++) . " (após: $valor)\n";
echo "Pré-decremento: --\$valor = " . (--$valor) . "\n";
echo "Pós-decremento: \$valor-- = " . ($valor--) . " (após: $valor)\n";

// Operadores de atribuição
$x = 10;
$x += 5;  // $x = $x + 5
echo "x += 5: $x\n";
$x -= 3;  // $x = $x - 3
echo "x -= 3: $x\n";
$x *= 2;  // $x = $x * 2
echo "x *= 2: $x\n";
echo "\n";

// ============================================================
// 7. OPERADORES LÓGICOS
// ============================================================
echo "7. OPERADORES LÓGICOS\n";
echo "---------------------\n";

// AND (&&) e (and)
$condicao1 = true;
$condicao2 = false;
echo "true AND false = " . ($condicao1 && $condicao2 ? "verdadeiro" : "falso") . "\n";

// OR (||) e (or)
echo "true OR false = " . ($condicao1 || $condicao2 ? "verdadeiro" : "falso") . "\n";

// XOR (xor) - verdadeiro quando exatamente um é verdadeiro
echo "true XOR false = " . ($condicao1 xor $condicao2 ? "verdadeiro" : "falso") . "\n";

// NOT (!)
echo "NOT true = " . (!$condicao1 ? "verdadeiro" : "falso") . "\n";

// Operadores de comparação
$num1 = 5;
$num2 = 10;

echo "\nOperadores de Comparação:\n";
echo "5 == 10: " . ($num1 == $num2 ? "verdadeiro" : "falso") . "\n";
echo "5 != 10: " . ($num1 != $num2 ? "verdadeiro" : "falso") . "\n";
echo "5 < 10: " . ($num1 < $num2 ? "verdadeiro" : "falso") . "\n";
echo "5 > 10: " . ($num1 > $num2 ? "verdadeiro" : "falso") . "\n";
echo "5 <= 10: " . ($num1 <= $num2 ? "verdadeiro" : "falso") . "\n";
echo "5 >= 10: " . ($num1 >= $num2 ? "verdadeiro" : "falso") . "\n";

// Comparação com tipo (===)
$var1 = "5";
$var2 = 5;
echo "\n'5' == 5: " . ($var1 == $var2 ? "verdadeiro" : "falso") . " (compara valor)\n";
echo "'5' === 5: " . ($var1 === $var2 ? "verdadeiro" : "falso") . " (compara tipo também)\n";

// Exemplos práticos
echo "\nExemplos Práticos:\n";
$idade = 25;
$tem_carteira = true;
$velocidade = 80;
$limite_velocidade = 60;

if ($idade >= 18 && $tem_carteira) {
    echo "Pode dirigir (tem idade e carteira)\n";
}

if ($velocidade > $limite_velocidade) {
    echo "Velocidade acima do limite!\n";
}

$usuario_valido = ($idade >= 18 && !empty($nome)) || $tem_carteira;
if ($usuario_valido) {
    echo "Usuário válido para acesso\n";
}

echo "\n=== FIM DOS EXEMPLOS ===\n";

?>

```

---
