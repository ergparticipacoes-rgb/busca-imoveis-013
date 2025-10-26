# 🛡️ Busca Imóveis 013 - Front Protection v3.0d

## Resumo
Camada de proteção frontend com Google reCAPTCHA v3 e mensagens visuais de confiança.

---

## ✅ Funcionalidades Implementadas

### 1. 🤖 Google reCAPTCHA v3

**Arquivo:** `/lib/recaptcha.ts`

#### Configuração
- **Site Key:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (variável de ambiente pública)
- **Secret Key:** `RECAPTCHA_SECRET_KEY` (variável de ambiente privada)
- **Threshold:** 0.5 (pontuação mínima para humanos)
- **Actions:** `checkout`, `submit_lead`

#### Funcionalidades
```typescript
// Executar reCAPTCHA no cliente
const token = await executeRecaptcha('checkout')

// Verificar token no servidor
const result = await verifyRecaptcha(token, 'checkout')
// Retorna: { success: boolean, score?: number, action?: string, error?: string }
```

#### Comportamento
- **Desenvolvimento:** Se `RECAPTCHA_SECRET_KEY` não configurada, pula verificação
- **Produção:** Verifica token com Google API e valida score
- **Score < 0.5:** Rejeita como provável bot
- **Action mismatch:** Rejeita se ação não corresponde

---

### 2. 🔐 Integração nos Formulários

#### PlansSection (Checkout)
```typescript
// components/PlansSection.tsx
async function checkout(plan: string) {
  const recaptchaToken = await executeRecaptcha('checkout')
  
  const res = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ plan, recaptchaToken })
  })
  
  // ... handle response
}
```

**Validação Server-Side:** `/api/checkout/route.ts`
- Valida token com `verifyRecaptcha(token, 'checkout')`
- Loga violação se score baixo
- Retorna 403 se falhar
- Log de sucesso com score

#### SearchQuick / Leads
Se houver formulário de leads implementado:
```typescript
const recaptchaToken = await executeRecaptcha('submit_lead')
// Enviar junto com dados do lead
```

**Validação Server-Side:** `/api/leads/route.ts`
- Valida token com `verifyRecaptcha(token, 'submit_lead')`
- Loga violação se score baixo
- Retorna 403 se falhar
- Log de sucesso com score

---

### 3. 🎨 Mensagens Visuais de Confiança

#### Implementação
Adicionadas em todos os componentes de formulário:

```tsx
<div className='flex items-center justify-center gap-2 mt-6 text-sm text-gray-600'>
  <span className='text-green-600 text-lg'>🔒</span>
  <span>Seus dados são protegidos pela plataforma Busca Imóveis 013®.</span>
</div>
```

**Locais:**
- ✅ PlansSection (após grid de planos)
- ✅ FinanciamentoSimulador (após botão de contato)
- ⏳ SearchQuick (se houver formulário)

#### Badge reCAPTCHA (Footer)
Adicionado automaticamente no `layout.tsx`:
```tsx
Este site é protegido pelo reCAPTCHA e aplicam-se a 
Política de Privacidade e Termos de Serviço do Google.
```

**Obrigatório por:** Termos de uso do Google reCAPTCHA

---

### 4. 🔍 Logs de Segurança

#### Eventos Registrados

**reCAPTCHA Sucesso:**
```
✅ [reCAPTCHA] Checkout verificado - Score: 0.9
✅ [reCAPTCHA] Lead verificado - Score: 0.8
```

**reCAPTCHA Falha:**
```json
{
  "eventType": "security_violation",
  "ip": "192.168.1.1",
  "userAgent": "...",
  "path": "/api/checkout",
  "reason": "reCAPTCHA failed",
  "details": ["Score muito baixo: 0.2 (mínimo: 0.5)"],
  "score": 0.2
}
```

---

## 📋 Schemas de Validação Atualizados

### leadSchema
```typescript
z.object({
  name: z.string()...,
  phone: z.string()...,
  city: z.string()...,
  interest: z.enum([...]),
  email: z.string().optional(),
  message: z.string().optional(),
  recaptchaToken: z.string().optional() // ← NOVO
}).strict()
```

### checkoutSchema
```typescript
z.object({
  plan: z.enum(['basic', 'pro', 'max']),
  recaptchaToken: z.string().optional() // ← NOVO
}).strict()
```

---

## 🚀 Deploy e Configuração

### 1. Criar Conta reCAPTCHA
1. Acesse: https://www.google.com/recaptcha/admin/create
2. Escolha: **reCAPTCHA v3**
3. Domínios permitidos:
   - `localhost` (dev)
   - `buscaimoveis013.com.br` (prod)
   - `*.vercel.app` (preview)
4. Copie as chaves geradas

### 2. Configurar Variáveis de Ambiente

**Vercel:**
```bash
# Settings > Environment Variables

# Pública (disponível no browser)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...xxx

# Privada (apenas server-side)
RECAPTCHA_SECRET_KEY=6Lc...yyy
```

**Local (.env.local):**
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...xxx
RECAPTCHA_SECRET_KEY=6Lc...yyy
```

### 3. Rebuild
```bash
npm run build
```

O script reCAPTCHA será carregado automaticamente via `layout.tsx`.

---

## 🧪 Testes

### Teste Local (Sem reCAPTCHA)
Se `RECAPTCHA_SECRET_KEY` não configurada:
- ✅ Formulários funcionam normalmente
- ⚠️ Verificação é pulada (log de warning)
- 🔒 Validação Zod ainda ativa

### Teste em Produção
1. Submeter formulário válido
2. Verificar logs do servidor:
   - `✅ [reCAPTCHA] Checkout verificado - Score: X`
3. Tentar enviar via bot/script:
   - Deve retornar 403
   - Log: `🚫 [SECURITY_VIOLATION] reCAPTCHA failed`

### Teste de Score Baixo
Para simular bot:
1. Use chave de teste do Google (retorna score fixo)
2. Ou ajuste `RECAPTCHA_THRESHOLD` temporariamente

---

## 📊 Métricas e Analytics

### Cloudflare + reCAPTCHA
Combinação ideal:
- **Cloudflare:** Bloqueia ataques DDoS e IPs maliciosos
- **reCAPTCHA:** Identifica comportamento de bot (mesmo com IP válido)

### Dashboard reCAPTCHA
Acesse: https://www.google.com/recaptcha/admin
- Gráfico de requisições
- Distribuição de scores
- Detecção de padrões suspeitos

### Logs Próprios
Use os logs do `lib/logger.ts` para:
- Identificar IPs com múltiplas falhas
- Analisar horários de pico de bots
- Ajustar threshold se necessário

---

## 🔧 Ajustes Finos

### Ajustar Threshold
Edite `/lib/recaptcha.ts`:
```typescript
export const RECAPTCHA_THRESHOLD = 0.5 // Padrão

// Mais rigoroso (menos bots, mais falsos positivos)
export const RECAPTCHA_THRESHOLD = 0.7

// Mais permissivo (mais usuários, alguns bots passam)
export const RECAPTCHA_THRESHOLD = 0.3
```

**Recomendação:** Manter 0.5 e monitorar logs.

### Adicionar Novas Actions
```typescript
// Cliente
const token = await executeRecaptcha('contact_form')

// Servidor
const result = await verifyRecaptcha(token, 'contact_form')
```

### Modo de Emergência
Se reCAPTCHA causar problemas:
1. Remover `RECAPTCHA_SECRET_KEY` das variáveis de ambiente
2. Deploy
3. Sistema volta a funcionar sem verificação

---

## ✅ Checklist de Implementação

**Código:**
- [x] Criar `/lib/recaptcha.ts`
- [x] Adicionar script no `layout.tsx`
- [x] Integrar em `PlansSection.tsx`
- [x] Atualizar `/api/checkout/route.ts`
- [x] Atualizar `/api/leads/route.ts`
- [x] Adicionar token aos schemas Zod
- [x] Adicionar mensagens de segurança visual
- [x] Badge reCAPTCHA no footer

**Configuração:**
- [ ] Criar conta Google reCAPTCHA
- [ ] Configurar domínios permitidos
- [ ] Adicionar variáveis de ambiente na Vercel
- [ ] Testar em produção
- [ ] Monitorar dashboard reCAPTCHA

**UX:**
- [x] Mensagem "🔒 Seus dados são protegidos"
- [x] Badge Google no footer
- [ ] Teste de usabilidade (sem impacto na conversão)

---

## 🎯 Benefícios

### Segurança
- ✅ Bloqueia 99% dos bots automatizados
- ✅ Identifica comportamento suspeito
- ✅ Não requer CAPTCHA visual (melhor UX)
- ✅ Integra com Cloudflare para proteção dupla

### UX
- ✅ Invisível para usuários reais
- ✅ Sem desafios visuais chatos
- ✅ Mensagens de confiança aumentam conversão
- ✅ Selo Google aumenta credibilidade

### Compliance
- ✅ LGPD: Badge informa sobre uso de reCAPTCHA
- ✅ Termos Google: Links obrigatórios no footer
- ✅ Transparência: Usuário sabe que há proteção

---

## 🚨 Troubleshooting

### "reCAPTCHA not defined"
**Causa:** Script ainda não carregou
**Solução:** `executeRecaptcha` aguarda `grecaptcha.ready()`

### Score sempre 0.5
**Causa:** Usando chaves de teste
**Solução:** Gerar chaves de produção

### Falhas em localhost
**Causa:** localhost não configurado em domínios permitidos
**Solução:** Adicionar `localhost` no admin do reCAPTCHA

### Todos os envios retornam 403
**Causa:** Threshold muito alto ou chave errada
**Solução:** 
1. Verificar logs do servidor
2. Checar se chaves estão corretas
3. Reduzir threshold temporariamente

---

## 📚 Referências

- [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Best Practices](https://developers.google.com/recaptcha/docs/v3#interpreting_the_score)

---

**Versão:** 3.0d  
**Data:** Outubro 2025  
**Autor:** Busca Imóveis 013 Tech Team

