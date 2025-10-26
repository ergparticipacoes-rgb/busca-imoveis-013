#!/bin/bash

# 🚀 Script de Validação Pré-Deploy - Busca Imóveis 013
# Execute antes de fazer push para produção

set -e

echo "🔍 Iniciando validação pré-deploy..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar Node.js
echo "📦 Verificando versão do Node.js..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18+ é necessário. Versão atual: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) OK${NC}"
echo ""

# 2. Limpar cache
echo "🧹 Limpando cache..."
rm -rf .next node_modules/.cache
echo -e "${GREEN}✅ Cache limpo${NC}"
echo ""

# 3. Instalar dependências
echo "📥 Instalando dependências..."
npm install --silent
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# 4. Lint
echo "🔍 Executando linter..."
npm run lint
echo -e "${GREEN}✅ Linter passou${NC}"
echo ""

# 5. TypeScript
echo "🔷 Verificando TypeScript..."
npx tsc --noEmit
echo -e "${GREEN}✅ TypeScript OK${NC}"
echo ""

# 6. Build
echo "🏗️  Fazendo build de produção..."
npm run build
echo -e "${GREEN}✅ Build concluído com sucesso${NC}"
echo ""

# 7. Verificar variáveis de ambiente (opcional)
echo "🔐 Verificando variáveis de ambiente..."
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env.local não encontrado${NC}"
    echo -e "${YELLOW}   Certifique-se de configurar as variáveis na Vercel${NC}"
else
    echo -e "${GREEN}✅ Arquivo .env.local encontrado${NC}"
fi
echo ""

# 8. Verificar arquivos importantes
echo "📄 Verificando arquivos essenciais..."
FILES=("vercel.json" "package.json" "next.config.mjs" "tsconfig.json")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file não encontrado${NC}"
        exit 1
    fi
done
echo ""

# Sucesso!
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Todas as validações passaram!${NC}"
echo -e "${GREEN}🚀 Pronto para deploy na Vercel!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
echo "Para fazer deploy:"
echo "  1. git add ."
echo "  2. git commit -m 'deploy: nova versão'"
echo "  3. git push origin main"
echo ""
echo "Ou use a Vercel CLI:"
echo "  vercel --prod"

