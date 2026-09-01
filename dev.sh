#!/bin/bash
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎓 TPA Wiki — Ambiente de Desenvolvimento"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Matar processos anteriores
fuser -k 8080/tcp 2>/dev/null || true
fuser -k 8090/tcp 2>/dev/null || true
fuser -k 3002/tcp 2>/dev/null || true

# 1. Gerar slides com Marp na pasta slides/
echo "📽️  Gerando slides Marp..."
mkdir -p slides
npx -y @marp-team/marp-cli@latest \
  content/Aulas/Aula01_Slides_FalaQ.md \
  -o slides/Aula01_Slides_FalaQ.html --quiet

# Copiar Reveal.js também
cp content/Aulas/Sprint01_Reveal.html slides/Sprint01_Reveal.html

echo "   ✅ Slides prontos em slides/"

# 2. Servidor de slides (porta 8090) em background
echo ""
echo "🎞️  Subindo servidor de slides na porta 8090..."
npx -y serve slides -l 8090 &
SLIDES_PID=$!

sleep 1

# 3. Subir Quartz com servidor e live reload (porta 8080)
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌐 URLs disponíveis:"
echo ""
echo "  Wiki TPA:"
echo "  → http://localhost:8080"
echo ""
echo "  Slides Marp (Aula 01):"
echo "  → http://localhost:8090/Aula01_Slides_FalaQ.html"
echo ""
echo "  Slides Reveal.js (Sprint 01):"
echo "  → http://localhost:8090/Sprint01_Reveal.html"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Pressione Ctrl+C para parar tudo."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Garantir que o servidor de slides morra junto com o script
trap "kill $SLIDES_PID 2>/dev/null; fuser -k 8090/tcp 2>/dev/null" EXIT

npx quartz build --serve --wsPort 3002
