import {z} from 'zod'

/**
 * Schema de validação para leads/contatos
 * Previne XSS, injeções e campos maliciosos
 */
export const leadSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras')
    .trim(),
  
  phone: z.string()
    .min(10, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .regex(/^[\d\s()\-+]+$/, 'Telefone deve conter apenas números e símbolos permitidos')
    .transform(val => val.replace(/\D/g, '')), // Remove caracteres não numéricos
  
  city: z.string()
    .min(2, 'Cidade deve ter no mínimo 2 caracteres')
    .max(100, 'Cidade muito longa')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Cidade deve conter apenas letras')
    .trim(),
  
  interest: z.enum(['comprar', 'alugar', 'anunciar', 'informacoes']),
  
  // Campos opcionais
  email: z.string()
    .email('E-mail inválido')
    .max(100, 'E-mail muito longo')
    .toLowerCase()
    .trim()
    .optional(),
  
  message: z.string()
    .max(1000, 'Mensagem muito longa')
    .trim()
    .optional(),
  
  recaptchaToken: z.string().optional()
}).strict() // Não permite campos extras

/**
 * Schema de validação para checkout
 * Previne valores maliciosos no plano
 */
export const checkoutSchema = z.object({
  plan: z.enum(['basic', 'pro', 'max']),
  recaptchaToken: z.string().optional()
}).strict()

/**
 * Schema de validação para webhook (opcional)
 * Valida dados do MercadoPago
 */
export const webhookSchema = z.object({
  action: z.string().optional(),
  api_version: z.string().optional(),
  data: z.object({
    id: z.string().optional()
  }).optional(),
  date_created: z.string().optional(),
  id: z.number().or(z.string()).optional(),
  live_mode: z.boolean().optional(),
  type: z.string().optional(),
  user_id: z.string().or(z.number()).optional()
}).passthrough() // Permite campos extras (webhook pode ter muitos campos)

/**
 * Tipo TypeScript inferido dos schemas
 */
export type LeadInput = z.infer<typeof leadSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type WebhookInput = z.infer<typeof webhookSchema>

/**
 * Helper para validar e retornar erros formatados
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true
  data: T
} | {
  success: false
  error: string
  details?: string[]
} {
  try {
    const result = schema.safeParse(data)
    
    if (result.success) {
      return {
        success: true,
        data: result.data
      }
    }
    
    // Formatar erros do Zod
    const errors = result.error.issues.map(err => 
      `${err.path.join('.')}: ${err.message}`
    )
    
    return {
      success: false,
      error: 'Dados inválidos.',
      details: errors
    }
  } catch (error) {
    return {
      success: false,
      error: 'Erro ao validar dados.'
    }
  }
}

