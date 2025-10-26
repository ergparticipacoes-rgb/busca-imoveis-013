// Utilitários gerais

/**
 * Formata valor em Real Brasileiro
 * @param value - Valor numérico
 * @returns String formatada em R$
 */
export const brl = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Formata número sem casas decimais
 * @param value - Valor numérico
 * @returns String formatada
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value)
}

