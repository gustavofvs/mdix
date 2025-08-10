import { ref, watch, readonly } from 'vue'
import { useBitcoinPrice } from './useBitcoinPrice'
import { formatCurrency } from '~/utils/format'

/**
 * @module useConverterForm
 * A composable that encapsulates all the business logic for the currency conversion form.
 * This includes input validation, cooldowns, conversion limits, and the conversion calculation itself.
 */
export function useConverterForm() {
  const { bitcoinPrice, fetchPrice: fetchBitcoinPrices } = useBitcoinPrice()

  // Form state
  const bitcoinAmount = ref('')
  const conversionResult = ref('')
  const error = ref('')
  const isInputFocused = ref(false)

  // UX Feature: Cooldown and rate limiting state
  const MAX_CONVERSIONS = 10
  const COOLDOWN_MS = 2000
  const conversionCount = ref(0)
  const cooldownActive = ref(false)
  const cooldownTimer = ref(0)
  let cooldownTimeout: ReturnType<typeof setTimeout> | null = null

  // Input validation and sanitization watcher
  watch(bitcoinAmount, (newValue, oldValue) => {
    let sanitizedValue = newValue.replace(/[^0-9.]/g, '')
    const parts = sanitizedValue.split('.')
    if (parts.length > 2) {
      sanitizedValue = parts[0] + '.' + parts.slice(1).join('')
    }
    const MAX_BTC = 1000000
    if (parseFloat(sanitizedValue) > MAX_BTC) {
      sanitizedValue = oldValue
    }
    if (sanitizedValue.length > 1 && sanitizedValue.startsWith('0') && !sanitizedValue.startsWith('0.')) {
      sanitizedValue = sanitizedValue.substring(1)
    }
    if (sanitizedValue !== newValue) {
      bitcoinAmount.value = sanitizedValue
    }
  })

  /**
   * Performs the currency conversion.
   * Handles validation, cooldowns, and API calls.
   */
  const convertCurrency = async () => {
    if (cooldownActive.value) {
      error.value = 'Aguarde um instante antes de converter novamente.'
      return
    }
    if (conversionCount.value >= MAX_CONVERSIONS) {
      error.value = 'Limite de conversões atingido nesta sessão.'
      return
    }
    if (!bitcoinAmount.value || parseFloat(bitcoinAmount.value) <= 0) {
      error.value = 'Por favor, insira um valor válido de Bitcoin.'
      return
    }

    error.value = ''
    conversionResult.value = ''
    cooldownActive.value = true
    cooldownTimer.value = COOLDOWN_MS / 1000

    if (cooldownTimeout) clearTimeout(cooldownTimeout)
    cooldownTimeout = setTimeout(() => {
      cooldownActive.value = false
      cooldownTimer.value = 0
    }, COOLDOWN_MS)

    const interval = setInterval(() => {
      if (cooldownTimer.value > 0) {
        cooldownTimer.value--
      }
      if (cooldownTimer.value <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    try {
      const amount = parseFloat(bitcoinAmount.value)
      const price = bitcoinPrice.value
      if (price && price > 0) {
        const result = amount * price
        conversionResult.value = formatCurrency(result)
        conversionCount.value++
      } else {
        await fetchBitcoinPrices()
        if (bitcoinPrice.value > 0) {
          const result = amount * bitcoinPrice.value
          conversionResult.value = formatCurrency(result)
          conversionCount.value++
        } else {
          error.value = 'Não foi possível obter o preço atual do Bitcoin. Tente novamente.'
        }
      }
    } catch (err) {
      console.error('Erro na conversão:', err)
      error.value = 'Erro ao realizar conversão. Tente novamente.'
    }
  }

  return {
    bitcoinAmount,
    conversionResult: readonly(conversionResult),
    error: readonly(error),
    isInputFocused,
    cooldownActive: readonly(cooldownActive),
    cooldownTimer: readonly(cooldownTimer),
    conversionCount: readonly(conversionCount),
    convertCurrency,
  }
}
