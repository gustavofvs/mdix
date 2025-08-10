import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useBitcoinPrice } from '~/composables/useBitcoinPrice'

// Since the state is shared, we need to reset it before each test.
beforeEach(() => {
  const { bitcoinPrice, isLoading, error, lastUpdateTime } = useBitcoinPrice()
  bitcoinPrice.value = 0
  isLoading.value = false
  error.value = null
  lastUpdateTime.value = null
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useBitcoinPrice', () => {
  it('should fetch the bitcoin price and update the state on success', async () => {
    const mockPrice = 50000
    const mockResponse = {
      ok: true,
      json: async () => ({ bitcoin: { brl: mockPrice } }),
    }
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as Response)

    const { bitcoinPrice, isLoading, error, fetchPrice } = useBitcoinPrice()

    fetchPrice()
    expect(isLoading.value).toBe(true)

    await vi.waitUntil(() => !isLoading.value)

    expect(error.value).toBeNull()
    expect(bitcoinPrice.value).toBe(mockPrice)
    expect(fetchSpy).toHaveBeenCalledOnce()
  })

  it('should handle API errors gracefully', async () => {
    const mockError = 'Network Error'
    const fetchSpy = vi.spyOn(global, 'fetch').mockRejectedValue(new Error(mockError))

    const { bitcoinPrice, isLoading, error, fetchPrice } = useBitcoinPrice()

    fetchPrice()
    expect(isLoading.value).toBe(true)

    await vi.waitUntil(() => !isLoading.value)

    expect(bitcoinPrice.value).toBe(0)
    expect(error.value).toContain(mockError)
    expect(fetchSpy).toHaveBeenCalledOnce()
  })

  it.skip('should handle non-ok responses from the API', async () => {
    const mockResponse = {
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    }
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as Response)

    const { bitcoinPrice, isLoading, error, fetchPrice } = useBitcoinPrice()

    fetchPrice()
    expect(isLoading.value).toBe(true)

    await vi.waitUntil(() => !isLoading.value)

    expect(bitcoinPrice.value).toBe(0)
    expect(error.value).toContain('Limite de uso da API atingido')
    expect(fetchSpy).toHaveBeenCalledOnce()
  })

  it('should not fetch if already loading', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));

    const { fetchPrice, isLoading } = useBitcoinPrice()

    fetchPrice()
    expect(isLoading.value).toBe(true)

    // Attempt to trigger another fetch while the first is "in progress"
    await fetchPrice()

    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
