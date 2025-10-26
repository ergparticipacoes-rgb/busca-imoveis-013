/**
 * Sistema de Logging e Auditoria
 * Busca Imóveis 013 - v3.0c
 * 
 * Registra eventos importantes para análise e segurança
 * Preparado para integração com MongoDB, mas funciona com console por padrão
 */

export type LogEventType = 
  | 'lead_created'
  | 'lead_failed'
  | 'checkout_started'
  | 'checkout_failed'
  | 'webhook_received'
  | 'payment_completed'
  | 'security_violation'
  | 'rate_limit_exceeded'
  | 'validation_failed'
  | 'api_error'

export interface LogEventData {
  // Informações do request
  ip?: string
  userAgent?: string
  method?: string
  path?: string
  
  // Dados específicos do evento
  [key: string]: any
}

interface LogEntry {
  timestamp: string
  eventType: LogEventType
  data: LogEventData
  environment: string
  version: string
}

/**
 * Logger principal
 * 
 * Em desenvolvimento: console.log colorido
 * Em produção: pode ser integrado com MongoDB, CloudWatch, Datadog, etc.
 */
class Logger {
  private readonly version = '3.0c'
  private readonly environment = process.env.NODE_ENV || 'development'
  
  /**
   * Registra um evento
   */
  async logEvent(eventType: LogEventType, data: LogEventData = {}): Promise<void> {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      eventType,
      data,
      environment: this.environment,
      version: this.version
    }
    
    // Console log (sempre ativo)
    this.logToConsole(logEntry)
    
    // Database log (se disponível)
    if (this.isDatabaseAvailable()) {
      await this.logToDatabase(logEntry)
    }
    
    // External services (produção)
    if (this.environment === 'production') {
      await this.logToExternalService(logEntry)
    }
  }
  
  /**
   * Log colorido no console
   */
  private logToConsole(entry: LogEntry): void {
    const emoji = this.getEmojiForEvent(entry.eventType)
    const color = this.getColorForEvent(entry.eventType)
    
    // Formatar dados sensíveis
    const sanitizedData = this.sanitizeData(entry.data)
    
    console.log(
      `${emoji} [${entry.timestamp}] [${entry.eventType.toUpperCase()}]`,
      sanitizedData
    )
  }
  
  /**
   * Log no banco de dados (MongoDB, PostgreSQL, etc)
   */
  private async logToDatabase(entry: LogEntry): Promise<void> {
    try {
      // TODO: Implementar quando MongoDB estiver disponível
      // const db = await getDatabase()
      // await db.collection('logs').insertOne(entry)
      
      // Exemplo com MongoDB:
      /*
      import { MongoClient } from 'mongodb'
      const client = new MongoClient(process.env.MONGODB_URI!)
      await client.connect()
      const db = client.db('busca-imoveis')
      await db.collection('logs').insertOne(entry)
      await client.close()
      */
    } catch (error) {
      console.error('❌ [LOGGER] Erro ao salvar no banco:', error)
    }
  }
  
  /**
   * Log em serviço externo (Datadog, CloudWatch, Sentry, etc)
   */
  private async logToExternalService(entry: LogEntry): Promise<void> {
    try {
      // TODO: Implementar integração com serviço de logging
      // Exemplos:
      // - Datadog: await datadogLog(entry)
      // - CloudWatch: await cloudwatchLog(entry)
      // - Sentry: Sentry.captureMessage(entry)
      // - LogRocket: LogRocket.track(entry.eventType, entry.data)
    } catch (error) {
      console.error('❌ [LOGGER] Erro ao enviar para serviço externo:', error)
    }
  }
  
  /**
   * Verifica se o banco de dados está disponível
   */
  private isDatabaseAvailable(): boolean {
    return !!process.env.MONGODB_URI || !!process.env.DATABASE_URL
  }
  
  /**
   * Retorna emoji apropriado para o tipo de evento
   */
  private getEmojiForEvent(eventType: LogEventType): string {
    const emojiMap: Record<LogEventType, string> = {
      lead_created: '📝',
      lead_failed: '❌',
      checkout_started: '💳',
      checkout_failed: '⚠️',
      webhook_received: '🔔',
      payment_completed: '✅',
      security_violation: '🚨',
      rate_limit_exceeded: '⏱️',
      validation_failed: '🚫',
      api_error: '💥'
    }
    return emojiMap[eventType] || '📋'
  }
  
  /**
   * Retorna cor apropriada para o tipo de evento
   */
  private getColorForEvent(eventType: LogEventType): string {
    if (eventType.includes('failed') || eventType.includes('violation') || eventType.includes('error')) {
      return 'red'
    }
    if (eventType.includes('completed') || eventType.includes('created')) {
      return 'green'
    }
    return 'blue'
  }
  
  /**
   * Remove dados sensíveis antes de logar
   */
  private sanitizeData(data: LogEventData): LogEventData {
    const sanitized = { ...data }
    
    // Remover/mascarar campos sensíveis
    const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'creditCard']
    
    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***'
      }
    }
    
    // Mascarar parte do telefone
    if (sanitized.phone && typeof sanitized.phone === 'string') {
      const phone = sanitized.phone
      sanitized.phone = phone.substring(0, 2) + '****' + phone.substring(phone.length - 4)
    }
    
    // Mascarar parte do email
    if (sanitized.email && typeof sanitized.email === 'string') {
      const [local, domain] = sanitized.email.split('@')
      if (local && domain) {
        sanitized.email = `${local.substring(0, 2)}***@${domain}`
      }
    }
    
    return sanitized
  }
  
  /**
   * Helpers para logs específicos
   */
  
  async logLead(action: 'created' | 'failed', data: LogEventData): Promise<void> {
    await this.logEvent(action === 'created' ? 'lead_created' : 'lead_failed', {
      ...data,
      category: 'lead'
    })
  }
  
  async logCheckout(action: 'started' | 'failed', data: LogEventData): Promise<void> {
    await this.logEvent(action === 'started' ? 'checkout_started' : 'checkout_failed', {
      ...data,
      category: 'payment'
    })
  }
  
  async logSecurityEvent(type: 'violation' | 'rate_limit' | 'validation', data: LogEventData): Promise<void> {
    const eventMap = {
      violation: 'security_violation' as const,
      rate_limit: 'rate_limit_exceeded' as const,
      validation: 'validation_failed' as const
    }
    
    await this.logEvent(eventMap[type], {
      ...data,
      category: 'security'
    })
  }
}

// Singleton instance
const logger = new Logger()

/**
 * Função principal de logging (API pública)
 */
export async function logEvent(eventType: LogEventType, data: LogEventData = {}): Promise<void> {
  await logger.logEvent(eventType, data)
}

/**
 * Helpers exportados
 */
export const logLead = logger.logLead.bind(logger)
export const logCheckout = logger.logCheckout.bind(logger)
export const logSecurityEvent = logger.logSecurityEvent.bind(logger)

export default logger

