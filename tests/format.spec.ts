import { describe, it, expect } from 'vitest'
import { formatCurrency } from '~/utils/format'

describe('formatCurrency', () => {
  it('should format a positive number correctly', () => {
    expect(formatCurrency(1234.56)).toBe('R$\xa01.234,56') // \xa0 is a non-breaking space
  })

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('R$\xa00,00')
  })

  it('should format a negative number correctly', () => {
    expect(formatCurrency(-500)).toBe('-R$\xa0500,00')
  })

  it('should handle large numbers correctly', () => {
    expect(formatCurrency(1000000)).toBe('R$\xa01.000.000,00')
  })

  it('should handle numbers with more than two decimal places by rounding', () => {
    expect(formatCurrency(99.995)).toBe('R$\xa0100,00') // .995 rounds up
  })

  it('should handle invalid input gracefully', () => {
    // @ts-expect-error - Testing invalid input
    expect(formatCurrency(null)).toBe('R$\xa00,00')
    // @ts-expect-error - Testing invalid input
    expect(formatCurrency(undefined)).toBe('R$\xa00,00')
    // @ts-expect-error - Testing invalid input
    expect(formatCurrency('abc')).toBe('R$\xa00,00')
    expect(formatCurrency(NaN)).toBe('R$\xa00,00')
  })
})
