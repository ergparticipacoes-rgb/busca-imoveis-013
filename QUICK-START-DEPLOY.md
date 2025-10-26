# ⚡ Quick Start - Deploy Vercel

## 🚀 Deploy em 3 Passos

### 1️⃣ Configure Variáveis na Vercel

Acesse: **[Vercel Dashboard](https://vercel.com) → Settings → Environment Variables**

```env
MERCADOPAGO_ACCESS_TOKEN=seu_token
MERCADOPAGO_PUBLIC_KEY=sua_chave
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_chave
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_site_key
RECAPTCHA_SECRET_KEY=sua_secret_key
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
```

---

### 2️⃣ Conecte o Repositório

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Selecione seu repositório
4. Clique em **"Deploy"**

✅ Pronto! A Vercel detecta automaticamente Next.js e usa o `vercel.json`

---

### 3️⃣ Monitore o Deploy

```bash
# Via CLI (opcional)
vercel logs --follow
```

Ou acesse: **Dashboard → Deployments**

---

## 📊 Status da Configuração

```
✅ vercel.json configurado
✅ Headers de segurança (9 headers)
✅ Region: São Paulo (gru1)
✅ Clean URLs: habilitado
✅ Rollback automático: habilitado
✅ GitHub Actions: configurado
✅ ESLint: configurado
✅ Build: validado (145KB)
✅ TypeScript: OK
✅ Lint: OK (apenas warnings)
```

---

## 🎯 Comandos Úteis

```bash
# Validar antes de fazer push
npm run pre-deploy

# Deploy manual
npm run deploy:prod

# Ver logs
vercel logs --follow

# Rollback
vercel rollback
```

---

## 🔐 GitHub Secrets Necessários (para CI/CD)

Configure em: **GitHub → Settings → Secrets and variables → Actions**

```
VERCEL_TOKEN=seu_token_vercel
VERCEL_ORG_ID=seu_org_id
VERCEL_PROJECT_ID=seu_project_id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_site_key
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
```

---

## ✅ Checklist Rápido

- [ ] Variáveis configuradas na Vercel
- [ ] Repositório importado na Vercel
- [ ] Deploy bem-sucedido
- [ ] Site acessível
- [ ] Formulários funcionando
- [ ] MercadoPago funcionando

---

## 🆘 Problemas?

### Build Failed
```bash
npm run clean
npm install
npm run build
```

### Ver Logs
```bash
vercel logs --follow
```

### Rollback
```bash
vercel rollback
```

---

## 📚 Documentação Completa

- **DEPLOY-CONFIG-SUMMARY.md** - Resumo completo da configuração
- **README-DEPLOY.md** - Guia detalhado de deploy
- **DEPLOY-CHECKLIST.md** - Checklist completo

---

**🚀 Pronto para deploy! Qualquer dúvida, consulte a documentação completa.**

