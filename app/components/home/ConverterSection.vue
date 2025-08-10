<template>
  <section
    id="converter"
    ref="converterSection"
    :class="['py-24 px-4 sm:px-6 lg:px-8', { 'scroll-animation is-visible': isVisible }]"
  >
    <div class="container mx-auto max-w-6xl">
      <!-- Título da seção -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-400/10 border border-primary-400/20 backdrop-blur-[2px] mb-6">
          <UIcon name="i-lucide-bitcoin" class="h-8 w-8 text-primary-500" />
        </div>
        <h2 class="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Conversor em Tempo Real
        </h2>
        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Converta Bitcoin para Real brasileiro instantaneamente com dados atualizados da CoinGecko API
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Conversor -->
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent shadow-none hover:shadow-2xl hover:border-primary-400/60 dark:hover:border-primary-400/40 transition-all duration-300 p-8 flex flex-col items-center text-center min-h-[480px] backdrop-blur-[2px]">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-primary-400/30 via-transparent to-primary-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

          <!-- Background -->
          <div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div class="absolute top-4 right-4 w-24 h-24 bg-primary-500 rounded-full"></div>
            <div class="absolute bottom-4 left-4 w-16 h-16 bg-primary-400 rounded-full"></div>
        </div>

          <div class="flex items-center justify-center mb-6">
            <span class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-400/10 border border-primary-400/20 backdrop-blur-[2px]">
              <UIcon name="i-lucide-bitcoin" class="h-8 w-8 text-primary-500" />
            </span>
          </div>
          <h3 class="text-2xl font-bold tracking-wide text-neutral-900 dark:text-white mb-6">Bitcoin → Real</h3>

          <div class="w-full flex flex-col items-center">
            <form @submit.prevent="convertCurrency" class="space-y-6 w-full">
              <div class="space-y-3">
                <label for="btc" class="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                  <UIcon name="i-lucide-coins" class="w-4 h-4" />
                  Quantidade de Bitcoin
                </label>
                <div class="relative group">
                  <!-- Input -->
                  <div class="relative">
                    <div class="flex items-center border-2 border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-2 transition-all duration-500 group-hover:border-primary-400 dark:group-hover:border-primary-400 focus-within:border-green-500 dark:focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500/20">
                      <UIcon name="i-lucide-bitcoin" class="w-4 h-4 text-neutral-400 mr-2 transition-colors duration-300" :class="{ 'text-green-500 animate-pulse': isInputFocused, 'text-green-500': conversionResult }" />
                      <input
                        id="btc"
                  v-model="bitcoinAmount"
                  type="number"
                  placeholder="0.5"
                  step="0.00000001"
                  min="0"
                        class="flex-1 bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-300"
                        :class="{ 'text-green-600 dark:text-green-400 animate-fade-in': conversionResult }"
                        @focus="isInputFocused = true"
                        @blur="isInputFocused = false"
                      />
                      <!-- Animação de digitação -->
                      <div v-if="isInputFocused && bitcoinAmount" class="ml-2 w-0.5 h-4 bg-green-500 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Botão converter -->
              <div class="relative group">
                <button
                  type="submit"
                  :disabled="!bitcoinAmount || bitcoinAmount <= 0 || cooldownActive || conversionCount >= MAX_CONVERSIONS"
                  class="w-full h-10 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-primary-400 dark:hover:border-primary-400 focus:border-primary-500 dark:focus:border-primary-500 disabled:border-neutral-200 dark:disabled:border-neutral-700 disabled:text-neutral-400 dark:disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 bg-transparent"
                  :class="{ 'border-green-500 text-green-600 dark:text-green-400': bitcoinAmount && bitcoinAmount > 0 }"
                >
                  <!-- Conteudo do botão -->
                  <div class="relative flex items-center gap-2">
                    <div v-if="isLoading" class="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                    <UIcon v-else name="i-lucide-calculator" class="w-4 h-4" />
                    <span>Converter</span>
                  </div>
                </button>
              </div>

              <!-- Animação de "Procurando dados" -->
              <Transition
                enter-active-class="transition-all duration-500 ease-out"
                enter-from-class="opacity-0 transform translate-y-4 scale-95"
                enter-to-class="opacity-100 transform translate-y-0 scale-100"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="opacity-100 transform translate-y-0 scale-100"
                leave-to-class="opacity-0 transform translate-y-4 scale-95"
              >
                <div v-if="isLoading" class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 relative overflow-hidden">
                  <div class="relative flex items-center justify-center gap-3">
                    <!-- Loading spinner -->
                    <div class="relative">
                      <div class="w-6 h-6 border-2 border-blue-200 dark:border-blue-700 rounded-full"></div>
                      <div class="absolute inset-0 w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>

                    <!-- Texto Procurando DAdosa -->
                    <div class="flex items-center gap-1">
                      <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Procurando dados</span>
                      <div class="flex gap-1">
                        <div class="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                        <div class="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                        <div class="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>

                    <!-- Ícone de busca -->
                    <UIcon name="i-lucide-search" class="w-4 h-4 text-blue-500 animate-pulse" />
                  </div>
                </div>
              </Transition>

              <!-- Preço atual -->
              <div class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm shadow-sm">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <UIcon name="i-lucide-clock" class="w-4 h-4" />
                    <span>Preço atual:</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-lg font-semibold text-neutral-900 dark:text-white font-mono animate-fade-in-up bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                      R$ {{ formatCurrency(bitcoinPrice) }}
                    </span>
                    <button
                      @click="fetchBitcoinPrices"
                      :disabled="isLoading"
                      class="p-2 rounded-lg hover:bg-primary-400/10 hover:text-primary-500 transition-all duration-300 disabled:opacity-50"
                      title="Atualizar preço"
                    >
                      <UIcon name="i-lucide-refresh-cw" class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Resultado -->
              <Transition
                enter-active-class="transition-all duration-500 ease-out"
                enter-from-class="opacity-0 transform translate-y-4 scale-95"
                enter-to-class="opacity-100 transform translate-y-0 scale-100"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="opacity-100 transform translate-y-0 scale-100"
                leave-to-class="opacity-0 transform translate-y-4 scale-95"
              >
                <div v-if="conversionResult" class="mt-4 mb-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 backdrop-blur-sm shadow-lg">
                  <div class="relative text-center">
                    <div class="flex items-center justify-center space-x-2 mb-3">
                      <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span class="text-sm font-medium text-green-700 dark:text-green-300">Conversão realizada</span>
                    </div>
                    <div class="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2 animate-fade-in-up bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent break-words w-full text-balance text-center" style="word-break: break-word;">
                      {{ conversionResult }}
                    </div>
                    <div class="flex items-center justify-center space-x-4 text-xs text-neutral-500 dark:text-neutral-500">
                      <div class="flex items-center space-x-1">
                        <UIcon name="i-lucide-clock" class="w-3 h-3" />
                        <span>{{ lastUpdateTime }}</span>
                      </div>
                      <div class="w-1 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full"></div>
                      <div class="flex items-center space-x-1">
                        <UIcon name="i-lucide-refresh-cw" class="w-3 h-3" />
                        <span>Tempo real</span>
                      </div>
                    </div>
              </div>
            </div>
              </Transition>

              <!-- Erro -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 transform translate-y-2"
                enter-to-class="opacity-100 transform translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 transform translate-y-2"
              >
            <UAlert
              v-if="error || apiError"
              color="red"
              variant="soft"
              :title="error || apiError"
              icon="i-lucide-alert-circle"
                  class="animate-shake"
            />
              </Transition>
          </form>
          </div>

          <!-- Badge e informações adicionaiss -->
          <div class="absolute right-4 top-4 bg-primary-400/10 text-primary-500 text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm border border-primary-400/20 select-none pointer-events-none">
            Ativo
          </div>

          <div class="absolute left-4 bottom-4 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <UIcon name="i-lucide-zap" class="w-3 h-3" />
            <span>Tempo real</span>
          </div>
        </div>

        <!-- Explicação / FAQ -->
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent shadow-none hover:shadow-2xl hover:border-blue-400/60 dark:hover:border-blue-400/40 transition-all duration-300 p-8 flex flex-col items-center text-center min-h-[480px] backdrop-blur-[2px]">
          <div class="flex items-center justify-center mb-6">
            <span class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-400/10 border border-blue-400/20 backdrop-blur-[2px]">
              <UIcon name="i-lucide-info" class="h-8 w-8 text-blue-500" />
            </span>
          </div>
          <h3 class="text-2xl font-bold tracking-wide text-neutral-900 dark:text-white mb-6">Como funciona?</h3>
          <ul class="space-y-4 text-neutral-700 dark:text-neutral-300 text-sm mb-6 text-left">
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-zap" class="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
              <div><span class="font-semibold">Conversão instantânea:</span> Digite a quantidade de Bitcoin e clique em Converter para ver o valor em Real com base no preço mais recente.</div>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-database" class="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div><span class="font-semibold">Fonte dos dados:</span> Os preços são obtidos em tempo real da <a href="https://www.coingecko.com/pt/api" target="_blank" rel="noopener noreferrer" class="underline text-primary-500 hover:text-primary-600 transition-colors duration-200">CoinGecko API</a>, referência global em cripto.</div>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-shield" class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div><span class="font-semibold">Limite de uso:</span> Para proteger o site, há um limite de conversões por sessão e um pequeno tempo de espera entre cada conversão.</div>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-lock" class="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <div><span class="font-semibold">Privacidade:</span> Nenhum dado é salvo. Tudo acontece no seu navegador.</div>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-github" class="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div><span class="font-semibold">Open Source:</span> O código é aberto e disponível no <a href="https://github.com/gustavofvs/mdix" target="_blank" rel="noopener noreferrer" class="underline text-primary-500 hover:text-primary-600 transition-colors duration-200">GitHub</a>.</div>
            </li>
          </ul>
          <div class="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-auto pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 w-full">
            <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-green-500" />
            <span>Segurança garantida</span>
          </div>
          <span class="absolute right-4 top-4 bg-blue-400/10 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm border border-blue-400/20 select-none pointer-events-none">
            Info
          </span>
        </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBitcoinPrice } from '~/composables/useBitcoinPrice'
import { formatCurrency } from '~/utils/format'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { bitcoinPrice, isLoading, error: apiError, lastUpdateTime, fetchPrice: fetchBitcoinPrices } = useBitcoinPrice()

const converterSection = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(converterSection)

const bitcoinAmount = ref('')
const conversionResult = ref('')
const error = ref('')
const isInputFocused = ref(false)

const MAX_CONVERSIONS = 10
const COOLDOWN_MS = 2000
const conversionCount = ref(0)
const cooldownActive = ref(false)
const cooldownTimer = ref(0)
let cooldownTimeout: ReturnType<typeof setTimeout> | null = null

// Converter
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

  // Inicia cooldown
  if (cooldownTimeout) clearTimeout(cooldownTimeout)
  cooldownTimeout = setTimeout(() => {
    cooldownActive.value = false
    cooldownTimer.value = 0
  }, COOLDOWN_MS)

  // Timer visual
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
</script>
