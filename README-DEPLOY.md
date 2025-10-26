# 🚀 Guia de Deploy - Busca Imóveis 013

## 📋 Pré-requisitos

- ✅ Conta na [Vercel](https://vercel.com)
- ✅ Repositório Git (GitHub, GitLab ou Bitbucket)
- ✅ Node.js 18.17.0 ou superior
- ✅ Credenciais do MercadoPago
- ✅ Credenciais do Google reCAPTCHA v3

---

## 🔧 Configuração Inicial

### 1. Configure as Variáveis de Ambiente

Na dashboard da Vercel, vá em **Settings → Environment Variables** e adicione:

#### **MercadoPago:**
```env
MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui
MERCADOPAGO_PUBLIC_KEY=sua_chave_publica_aqui
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_chave_publica_aqui
```

#### **Google reCAPTCHA v3:**
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_site_key_aqui
RECAPTCHA_SECRET_KEY=sua_secret_key_aqui
```

#### **App Configuration:**
```env
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NODE_ENV=production
```

---

## 🚀 Deploy Automático

### Método 1: Deploy via Dashboard Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe seu repositório Git
3. Configure as variáveis de ambiente
4. Clique em **Deploy**

### Método 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy para produção
vercel --prod
```

---

## 🔄 Deploy Automático via Git

Após configurar na Vercel, cada push para a branch principal fará deploy automaticamente:

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

**Branches de desenvolvimento** geram **Preview Deployments** automaticamente.

---

## 🛡️ Segurança Configurada

O arquivo `vercel.json` já inclui:

- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options (DENY)
- ✅ X-Content-Type-Options (nosniff)
- ✅ X-XSS-Protection
- ✅ Strict Transport Security (HSTS)
- ✅ Referrer Policy
- ✅ Permissions Policy

---

## 🔧 Configurações Avançadas

### Rollback Automático

O projeto está configurado com `automaticRollbackOnFailure`. Se o build falhar, a Vercel automaticamente fará rollback para a versão anterior estável.

### Região Otimizada

- **Região primária:** `gru1` (São Paulo, Brasil)
- Ideal para usuários na Baixada Santista

### Performance

- ✅ Clean URLs habilitado
- ✅ Trailing slash desabilitado
- ✅ Funções serverless otimizadas (timeout: 10s)

---

## 📊 Monitoramento

Após o deploy, monitore:

1. **Analytics:** [vercel.com/dashboard/analytics](https://vercel.com/dashboard/analytics)
2. **Logs:** `vercel logs --follow`
3. **Performance:** Vercel Speed Insights (ative nas configurações)

---

## 🐛 Troubleshooting

### Build Failed

```bash
# Teste localmente antes
npm run build

# Limpe cache e tente novamente
rm -rf .next node_modules
npm install
npm run build
```

### Variáveis de Ambiente

```bash
# Verificar variáveis na Vercel CLI
vercel env ls

# Adicionar variável
vercel env add NOME_VARIAVEL
```

### Logs de Erro

```bash
# Ver logs em tempo real
vercel logs --follow

# Ver logs de uma função específica
vercel logs api/webhook
```

---

## 🔄 Comandos Úteis

```bash
# Deploy para preview
vercel

# Deploy para produção
vercel --prod

# Ver lista de deployments
vercel ls

# Ver informações do projeto
vercel inspect

# Remover deployment
vercel remove [deployment-url]

# Alias para domínio customizado
vercel alias set deployment-url seu-dominio.com
```

---

## 🎯 Próximos Passos

1. ✅ Configure um **domínio customizado**
2. ✅ Ative **Vercel Analytics** e **Speed Insights**
3. ✅ Configure **Vercel Edge Config** para feature flags
4. ✅ Adicione **Vercel Cron Jobs** para tarefas agendadas
5. ✅ Configure **Vercel KV** para cache distribuído (Redis)

---

## 📞 Suporte

- **Documentação Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Status da Vercel:** [vercel-status.com](https://www.vercel-status.com/)

---

**🏡 Busca Imóveis 013® — Deploy Configurado e Pronto!**

