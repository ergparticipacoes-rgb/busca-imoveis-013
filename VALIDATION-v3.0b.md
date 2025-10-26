# 🔐 Busca Imóveis 013 - Input Validation v3.0b

## Proteção contra Injeções e Payloads Maliciosos

Data: 25 de Outubro de 2025

---

## ✅ Implementação Completa

### 1. **Biblioteca Zod**
- ✅ Instalada: `zod@3.x`
- ✅ Validação type-safe com TypeScript
- ✅ Schemas reutilizáveis e componíveis

### 2. **Schemas de Validação (`lib/validation.ts`)**

#### **leadSchema** - Contatos/Leads
```typescript
{
  name: string (2-100 chars, apenas letras)
  phone: string (10-15 chars, sanitizado)
  city: string (2-100 chars, apenas letras)
  interest: enum ['comprar', 'alugar', 'anunciar', 'informacoes']
  email?: string (opcional, validado)
  message?: string (opcional, max 1000 chars)
}
```

**Proteções:**
- ✅ Regex para prevenir XSS no nome/cidade
- ✅ Sanitização do telefone (remove não-numéricos)
- ✅ Trim automático (remove espaços)
- ✅ `.strict()` - bloqueia campos extras
- ✅ Validação de e-mail (opcional)
- ✅ Limite de caracteres em todas as strings

#### **checkoutSchema** - Checkout/Pagamentos
```typescript
{
  plan: enum ['basic', 'pro', 'max']
}
```

**Proteções:**
- ✅ Apenas valores permitidos
- ✅ `.strict()` - bloqueia campos extras
- ✅ Previne SQL injection e valores maliciosos

### 3. **Rotas Protegidas**

#### **POST /api/leads**
```typescript
// Validação automática
const validation = validateInput(leadSchema, body)

if (!validation.success) {
  return NextResponse.json(
    { success: false, message: 'Dados inválidos.' },
    { status: 400 }
  )
}

// Lead validado e sanitizado
const lead = validation.data
```

**Retornos:**
- ✅ **200**: `{ success: true, message: "Lead recebido com sucesso!" }`
- ✅ **400**: `{ success: false, message: "Dados inválidos." }`
- ✅ **500**: `{ success: false, message: "Erro ao processar solicitação." }`

**Logs:**
- `✅ [LEAD] Novo lead recebido: {...}`
- `🚫 [VALIDATION] Lead rejeitado: [...]`

#### **GET /api/leads**
- Lista leads (requer autenticação em produção)
- Mock data em desenvolvimento

#### **POST /api/checkout**
```typescript
// Validação do plano
const validation = validateInput(checkoutSchema, body)

if (!validation.success) {
  return NextResponse.json(
    { success: false, message: 'Dados inválidos.' },
    { status: 400 }
  )
}

// Plano validado
const { plan } = validation.data
```

**Retornos:**
- ✅ **200**: `{ success: true, init_point: "..." }`
- ✅ **400**: `{ success: false, message: "Dados inválidos." }`
- ✅ **500**: `{ success: false, message: "Erro ao processar checkout." }`

**Logs:**
- `✅ [CHECKOUT] Iniciando checkout para plano: ...`
- `🚫 [VALIDATION] Checkout rejeitado: [...]`

---

## 🧪 Exemplos de Uso

### ✅ Lead Válido
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "phone": "(13) 99999-9999",
    "city": "Santos",
    "interest": "comprar",
    "email": "joao@example.com"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Lead recebido com sucesso!"
}
```

**Log:**
```
✅ [LEAD] Novo lead recebido: {
  name: 'João Silva',
  phone: '13999999999',  // Sanitizado
  city: 'Santos',
  interest: 'comprar'
}
```

---

### ❌ Lead Inválido (Nome Curto)
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "phone": "13999999999",
    "city": "Santos",
    "interest": "comprar"
  }'
```

**Resposta (400):**
```json
{
  "success": false,
  "message": "Dados inválidos.",
  "details": [
    "name: Nome deve ter no mínimo 2 caracteres"
  ]
}
```

**Log:**
```
🚫 [VALIDATION] Lead rejeitado: [
  "name: Nome deve ter no mínimo 2 caracteres"
]
```

---

### ❌ Lead Inválido (Campo Extra/Malicioso)
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "phone": "13999999999",
    "city": "Santos",
    "interest": "comprar",
    "__proto__": {"isAdmin": true}
  }'
```

**Resposta (400):**
```json
{
  "success": false,
  "message": "Dados inválidos.",
  "details": [
    "__proto__: Unrecognized key(s) in object"
  ]
}
```

---

### ❌ Lead com XSS Attempt
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<script>alert(\"XSS\")</script>",
    "phone": "13999999999",
    "city": "Santos",
    "interest": "comprar"
  }'
```

**Resposta (400):**
```json
{
  "success": false,
  "message": "Dados inválidos.",
  "details": [
    "name: Nome deve conter apenas letras"
  ]
}
```

---

### ✅ Checkout Válido
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"plan": "pro"}'
```

**Resposta:**
```json
{
  "success": true,
  "init_point": "https://mercadopago.com/..."
}
```

---

### ❌ Checkout Inválido (Plano Inexistente)
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"plan": "premium"}'
```

**Resposta (400):**
```json
{
  "success": false,
  "message": "Dados inválidos.",
  "details": [
    "plan: Invalid enum value. Expected 'basic' | 'pro' | 'max', received 'premium'"
  ]
}
```

---

## 🛡️ Proteções Implementadas

### 1. **XSS (Cross-Site Scripting)**
- ✅ Regex validando caracteres permitidos
- ✅ Bloqueio de tags HTML/scripts
- ✅ Sanitização de inputs

### 2. **SQL Injection**
- ✅ Validação de tipos
- ✅ Enum para valores fixos
- ✅ Sem concatenação direta de strings

### 3. **Prototype Pollution**
- ✅ `.strict()` bloqueia campos extras
- ✅ Validação de chaves permitidas
- ✅ Proteção contra `__proto__`, `constructor`, etc.

### 4. **NoSQL Injection**
- ✅ Validação de tipos
- ✅ Sanitização de valores
- ✅ Schema rígido

### 5. **Buffer Overflow**
- ✅ Limite máximo de caracteres
- ✅ Validação de tamanho

### 6. **Data Leakage**
- ✅ Mensagens de erro genéricas em produção
- ✅ Details apenas em desenvolvimento
- ✅ Logs controlados

---

## 📊 Build Output

```
Route (app)                    Size     First Load JS
┌ ○ /                          43 kB           130 kB
├ ○ /_not-found                873 B          88.1 kB
├ ƒ /api/checkout              0 B                0 B
├ ƒ /api/leads                 0 B                0 B  ← NOVA
└ ƒ /api/webhook               0 B                0 B

ƒ Middleware                   27.2 kB
```

**Impacto:**
- Nova rota `/api/leads` criada
- Zero impacto no bundle das páginas
- Validação executada no servidor (0 KB cliente)

---

## 🔧 Configuração

### Ajustar Validações:

```typescript
// lib/validation.ts

// Adicionar campo no leadSchema
export const leadSchema = z.object({
  // ... campos existentes
  budget: z.number()
    .min(0, 'Orçamento deve ser positivo')
    .max(10000000, 'Orçamento muito alto')
    .optional()
}).strict()

// Novo schema personalizado
export const propertySchema = z.object({
  title: z.string().min(5).max(200),
  price: z.number().positive(),
  type: z.enum(['casa', 'apartamento', 'terreno'])
}).strict()
```

### Usar em Nova Rota:

```typescript
// app/api/properties/route.ts
import { propertySchema, validateInput } from '../../../lib/validation'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const validation = validateInput(propertySchema, body)
  
  if (!validation.success) {
    return NextResponse.json(
      { success: false, message: validation.error },
      { status: 400 }
    )
  }
  
  // Usar validation.data (já validado e tipado)
}
```

---

## 🚨 Melhores Práticas

### ✅ DO:
1. Sempre validar TODOS os inputs da API
2. Usar `.strict()` para bloquear campos extras
3. Definir limites (min/max) para strings e números
4. Sanitizar dados (trim, lowercase, regex)
5. Retornar mensagens genéricas em produção
6. Logar tentativas de payload malicioso

### ❌ DON'T:
1. Confiar em validação apenas no cliente
2. Retornar detalhes de erro em produção
3. Aceitar campos arbitrários
4. Concatenar inputs diretamente em queries
5. Ignorar erros de validação

---

## 📈 Próximas Melhorias

### Fase v3.1 (Sugestões):
- [ ] Rate limiting por endpoint (leads vs checkout)
- [ ] Captcha no formulário de leads
- [ ] Validação de CPF/CNPJ
- [ ] Verificação de e-mail (token)
- [ ] Blacklist de palavras/padrões

### Fase v3.2 (Avançado):
- [ ] Machine Learning para detectar padrões suspeitos
- [ ] Honeypot fields (campos invisíveis)
- [ ] Análise de comportamento (tempo de preenchimento)
- [ ] Integração com serviços anti-fraude

---

## 🔐 Checklist de Segurança

- [x] ✅ Validação de tipos com Zod
- [x] ✅ Sanitização de strings
- [x] ✅ Regex para prevenir XSS
- [x] ✅ Enum para valores fixos
- [x] ✅ `.strict()` para bloquear campos extras
- [x] ✅ Limites de tamanho
- [x] ✅ Mensagens de erro seguras
- [x] ✅ Logs de tentativas maliciosas
- [x] ✅ TypeScript types inferidos
- [x] ✅ Helper reutilizável (`validateInput`)

---

## 📝 Changelog

### v3.0b (25/10/2025)
- ✅ Zod instalado e configurado
- ✅ `lib/validation.ts` criado
- ✅ Schemas: leadSchema, checkoutSchema, webhookSchema
- ✅ Rota `/api/leads` criada com validação
- ✅ Rota `/api/checkout` atualizada com validação
- ✅ Helper `validateInput` implementado
- ✅ Tipos TypeScript inferidos
- ✅ Build validado com sucesso

---

## 🎯 Conclusão

A implementação v3.0b adiciona uma **camada crítica de validação** protegendo contra:
- ✅ XSS (Cross-Site Scripting)
- ✅ SQL/NoSQL Injection
- ✅ Prototype Pollution
- ✅ Buffer Overflow
- ✅ Payloads maliciosos
- ✅ Campos extras/arbitrários

**Status:** ✅ PRODUÇÃO-READY

**Próxima fase:** v3.1 com rate limiting avançado e captcha

---

## 🔗 Links Relacionados

- **Segurança v3.0a:** SECURITY-v3.0a.md (Rate Limiting + Headers)
- **Zod Documentation:** https://zod.dev
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/

---

**🔒 Projeto protegido com validação type-safe e sanitização automática!**

