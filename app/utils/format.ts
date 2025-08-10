/**
 * Formats a number into a Brazilian Real (BRL) currency string.
 * @param value The number to format.
 * @returns A formatted currency string, e.g., "R$ 1.234,56". Returns "R$ 0,00" if the value is not a finite number.
 */
export const formatCurrency = (value: number): string => {
  const options = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return new Intl.NumberFormat('pt-BR', options).format(0)
  }

  return new Intl.NumberFormat('pt-BR', options).format(value)
}
