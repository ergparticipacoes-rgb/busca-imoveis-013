import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// Rate limiting storage (em produção, use Redis ou similar)
const rateLimitMap = new Map<string, {count: number; resetTime: number}>()

// Configuração
const RATE_LIMIT_MAX = 50 // requisições
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minuto em ms

// Métodos HTTP permitidos por rota
const ALLOWED_METHODS: Record<string, string[]> = {
  '/api/checkout': ['POST'],
  '/api/webhook': ['POST'],
  '/api/leads': ['GET', 'POST']
}

function getRateLimitKey(request: NextRequest): string {
  // Pega o IP real considerando proxies (Vercel, Cloudflare, etc)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'
  return `ratelimit:${ip}`
}

function checkRateLimit(key: string): {allowed: boolean; remaining: number} {
  const now = Date.now()
  const record = rateLimitMap.get(key)
  
  // Se não existe registro ou passou do tempo, resetar
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    return {allowed: true, remaining: RATE_LIMIT_MAX - 1}
  }
  
  // Se ultrapassou o limite
  if (record.count >= RATE_LIMIT_MAX) {
    return {allowed: false, remaining: 0}
  }
  
  // Incrementar contador
  record.count++
  rateLimitMap.set(key, record)
  
  return {allowed: true, remaining: RATE_LIMIT_MAX - record.count}
}

// Limpar registros antigos a cada 5 minutos
setInterval(() => {
  const now = Date.now()
  const entries = Array.from(rateLimitMap.entries())
  for (const [key, record] of entries) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl
  
  // Aplicar apenas em rotas /api/*
  if (pathname.startsWith('/api/')) {
    
    // 1. VERIFICAR MÉTODO HTTP
    const method = request.method
    const allowedMethods = ALLOWED_METHODS[pathname] || ['GET', 'POST']
    
    if (!allowedMethods.includes(method)) {
      console.log(`🚫 [SECURITY] Método ${method} bloqueado em ${pathname}`)
      return NextResponse.json(
        {error: 'Method not allowed', allowed: allowedMethods},
        {status: 405}
      )
    }
    
    // 2. VERIFICAR RATE LIMIT
    const rateLimitKey = getRateLimitKey(request)
    const {allowed, remaining} = checkRateLimit(rateLimitKey)
    
    if (!allowed) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                 request.headers.get('x-real-ip') || 'unknown'
      console.log(`🚨 [RATE LIMIT] IP ${ip} bloqueado em ${pathname} - Limite excedido`)
      
      return NextResponse.json(
        {error: 'Too many requests', retryAfter: 60},
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 60)
          }
        }
      )
    }
    
    // 3. CRIAR RESPONSE COM HEADERS DE SEGURANÇA
    const response = NextResponse.next()
    
    // Rate limit headers
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX))
    response.headers.set('X-RateLimit-Remaining', String(remaining))
    
    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    
    // CORS básico (ajustar conforme necessidade)
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', allowedMethods.join(', '))
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return response
  }
  
  // Para rotas não-API, apenas adicionar headers de segurança básicos
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

// Configurar quais rotas o middleware deve processar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}

