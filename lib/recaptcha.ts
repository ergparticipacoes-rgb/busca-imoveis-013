/**
 * Google reCAPTCHA v3 Integration
 * Busca Imóveis 013 - v3.0d
 * 
 * Protege formulários contra bots e spam
 */

/**
 * Configuração reCAPTCHA
 */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || ''

/**
 * Threshold de pontuação (0.0 - 1.0)
 * 0.0 = provável bot
 * 1.0 = provável humano
 */
export const RECAPTCHA_THRESHOLD = 0.5

/**
 * Interface do response do Google reCAPTCHA
 */
interface RecaptchaResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  score?: number
  action?: string
  'error-codes'?: string[]
}

/**
 * Executa reCAPTCHA v3 no cliente
 * @param action - Ação sendo executada (ex: 'submit_lead', 'checkout')
 * @returns Token gerado
 */
export async function executeRecaptcha(action: string): Promise<string> {
  if (typeof window === 'undefined' || !window.grecaptcha) {
    console.warn('[reCAPTCHA] grecaptcha não disponível')
    return ''
  }

  try {
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
    return token
  } catch (error) {
    console.error('[reCAPTCHA] Erro ao executar:', error)
    return ''
  }
}

/**
 * Verifica token reCAPTCHA no servidor
 * @param token - Token gerado pelo cliente
 * @param expectedAction - Ação esperada
 * @returns Resultado da verificação
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction?: string
): Promise<{
  success: boolean
  score?: number
  action?: string
  error?: string
}> {
  // Se não há secret key, pular verificação (desenvolvimento)
  if (!RECAPTCHA_SECRET_KEY || RECAPTCHA_SECRET_KEY === 'test') {
    console.warn('[reCAPTCHA] Secret key não configurada, pulando verificação')
    return {
      success: true,
      score: 1.0,
      action: expectedAction
    }
  }

  // Se não há token, rejeitar
  if (!token) {
    return {
      success: false,
      error: 'Token reCAPTCHA ausente'
    }
  }

  try {
    // Verificar token com Google
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    })

    const data: RecaptchaResponse = await response.json()

    // Verificar se houve sucesso
    if (!data.success) {
      return {
        success: false,
        error: `Verificação falhou: ${data['error-codes']?.join(', ')}`
      }
    }

    // Verificar score (v3 específico)
    if (data.score !== undefined && data.score < RECAPTCHA_THRESHOLD) {
      return {
        success: false,
        score: data.score,
        error: `Score muito baixo: ${data.score} (mínimo: ${RECAPTCHA_THRESHOLD})`
      }
    }

    // Verificar ação esperada
    if (expectedAction && data.action !== expectedAction) {
      return {
        success: false,
        action: data.action,
        error: `Ação incorreta: esperado '${expectedAction}', recebido '${data.action}'`
      }
    }

    return {
      success: true,
      score: data.score,
      action: data.action
    }

  } catch (error) {
    console.error('[reCAPTCHA] Erro ao verificar token:', error)
    return {
      success: false,
      error: 'Erro ao verificar reCAPTCHA'
    }
  }
}

/**
 * Hook para carregar reCAPTCHA script
 * Use no componente raiz ou layout
 */
export function loadRecaptchaScript(): void {
  if (typeof window === 'undefined') return
  if (document.getElementById('recaptcha-script')) return

  const script = document.createElement('script')
  script.id = 'recaptcha-script'
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

/**
 * Tipos globais para reCAPTCHA
 */
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

