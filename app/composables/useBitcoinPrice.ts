import { ref, readonly } from 'vue'

/**
 * @module useBitcoinPrice
 * A composable for fetching and managing the real-time price of Bitcoin in BRL.
 * The state is shared across all components that use this composable (singleton pattern).
 */

// Reactive state is defined in the module scope to be shared.
const bitcoinPrice = ref(0)
const isLoading = ref(false)
const error = ref<string | null>(null)
const lastUpdateTime = ref<string | null>(null)

/**
 * [TEST-ONLY] Resets the shared state of the composable.
 * This function is exported only for use in the testing environment and will be tree-shaken from the production bundle.
 */
export function _resetBitcoinPriceState() {
  bitcoinPrice.value = 0
  isLoading.value = false
  error.value = null
  lastUpdateTime.value = null
}

export const useBitcoinPrice = () => {
  /**
   * Fetches the latest Bitcoin price from the CoinGecko API.
   * Updates the shared state with the new price, loading status, and any errors.
   */
  const fetchPrice = async () => {
    if (isLoading.value) return

    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl', {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MDIX-Bitcoin-Converter'
        }
      })

      if (response.status === 429) {
        throw new Error('Limite de uso da API atingido. Tente novamente mais tarde.')
      }
      if (!response.ok) {
        throw new Error(`Erro na rede: ${response.statusText}`)
      }

      const data = await response.json()
      if (data.bitcoin && data.bitcoin.brl) {
        bitcoinPrice.value = data.bitcoin.brl
        lastUpdateTime.value = new Date().toLocaleString('pt-BR')
      } else {
        throw new Error('Formato de resposta da API inesperado.')
      }
    } catch (err: any) {
      error.value = err.message || 'Falha ao buscar o preço do Bitcoin.'
      bitcoinPrice.value = 0
    } finally {
      isLoading.value = false
    }
  }

  // Only fetch automatically when the app loads in the browser.
  // This prevents automatic fetching during tests (SSR/SSG or Vitest env).
  if (typeof window !== 'undefined' && !import.meta.vitest) {
    if (bitcoinPrice.value === 0 && !isLoading.value) {
      fetchPrice()
    }
  }

  return {
    bitcoinPrice: readonly(bitcoinPrice),
    isLoading: readonly(isLoading),
    error: readonly(error),
    lastUpdateTime: readonly(lastUpdateTime),
    fetchPrice,
  }
}
