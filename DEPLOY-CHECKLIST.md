# ✅ Checklist de Deploy - Busca Imóveis 013

Use este checklist antes de fazer deploy para produção.

---

## 📋 Pré-Deploy

### 1. Código
- [ ] Todas as alterações commitadas
- [ ] Branch atualizada com `main`
- [ ] Sem `console.log()` desnecessários
- [ ] Sem TODOs críticos no código
- [ ] Versão atualizada no `package.json`

### 2. Testes Locais
- [ ] `npm install` sem erros
- [ ] `npm run lint` passou
- [ ] `npm run type-check` passou
- [ ] `npm run build` concluído com sucesso
- [ ] `npm start` funcionando corretamente
- [ ] Testado em diferentes navegadores

### 3. Variáveis de Ambiente
- [ ] `.env.example` atualizado
- [ ] Variáveis configuradas na Vercel:
  - [ ] `MERCADOPAGO_ACCESS_TOKEN`
  - [ ] `MERCADOPAGO_PUBLIC_KEY`
  - [ ] `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
  - [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - [ ] `RECAPTCHA_SECRET_KEY`
  - [ ] `NEXT_PUBLIC_APP_URL`

### 4. Segurança
- [ ] Headers de segurança configurados no `vercel.json`
- [ ] CSP (Content Security Policy) revisado
- [ ] reCAPTCHA v3 funcionando
- [ ] Validação de formulários implementada
- [ ] Rate limiting configurado

### 5. Performance
- [ ] Imagens otimizadas
- [ ] Fontes carregando corretamente
- [ ] Bundle size aceitável (< 200KB First Load JS)
- [ ] Lazy loading implementado onde necessário

---

## 🚀 Durante o Deploy

### 1. GitHub Actions
- [ ] Workflow executando sem erros
- [ ] Lint passou
- [ ] Build passou
- [ ] Deploy iniciou automaticamente

### 2. Vercel Dashboard
- [ ] Build status: Success ✅
- [ ] Functions deployed: 3/3
- [ ] No errors in logs
- [ ] Preview URL acessível

---

## ✅ Pós-Deploy

### 1. Validação Funcional
- [ ] Site acessível na URL de produção
- [ ] Todas as páginas carregando
- [ ] Formulários funcionando
- [ ] APIs respondendo corretamente
- [ ] Pagamento MercadoPago funcionando

### 2. Performance
- [ ] Lighthouse Score > 90
- [ ] Core Web Vitals no verde
- [ ] Tempo de carregamento < 3s
- [ ] Mobile responsivo

### 3. SEO
- [ ] Meta tags presentes
- [ ] Open Graph configurado
- [ ] Sitemap acessível
- [ ] robots.txt configurado

### 4. Monitoramento
- [ ] Vercel Analytics ativado
- [ ] Error tracking configurado
- [ ] Logs sendo coletados

### 5. Rollback Plan
- [ ] URL da versão anterior salva
- [ ] Saber como fazer rollback manual
- [ ] Backup do banco de dados (se aplicável)

---

## 🆘 Em Caso de Problemas

### Build Falhou
```bash
# Limpar e reconstruir localmente
npm run clean
npm install
npm run build
```

### Deploy Falhou
```bash
# Verificar logs
vercel logs --follow

# Fazer rollback
vercel rollback [deployment-url]
```

### Performance Ruim
- Verificar Lighthouse Report
- Analisar Vercel Speed Insights
- Revisar bundle size

---

## 📞 Contatos de Emergência

- **Suporte Vercel:** [vercel.com/support](https://vercel.com/support)
- **Status Vercel:** [vercel-status.com](https://www.vercel-status.com/)
- **Docs Next.js:** [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎯 Comandos Rápidos

```bash
# Validação pré-deploy
npm run pre-deploy

# Deploy para preview
npm run deploy:preview

# Deploy para produção
npm run deploy:prod

# Ver logs em tempo real
vercel logs --follow

# Rollback rápido
vercel rollback
```

---

**✅ Tudo certo? Faça o deploy com confiança!** 🚀

