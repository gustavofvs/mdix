<template>
  <section
    ref="heroSection"
    :class="['py-24 px-4 sm:px-6 lg:px-8', { 'scroll-animation is-visible': isVisible }]"
  >
    <div class="container mx-auto max-w-4xl text-center">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
        Conversor Bitcoin
        <span class="block text-neutral-600 dark:text-neutral-400">para Real</span>
      </h1>
      <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
        Converta Bitcoin para Real brasileiro com preços em tempo real.
        Interface minimalista e elegante para suas necessidades de conversão.
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        <div class="text-center">
          <div class="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            {{ formatCurrency(bitcoinPrice) }}
          </div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">Preço atual do Bitcoin</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-neutral-900 dark:text-white mb-2">24/7</div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">Atualizações em tempo real</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-neutral-900 dark:text-white mb-2">0%</div>
          <div class="text-sm text-neutral-600 dark:text-neutral-400">Taxas de conversão</div>
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

const { bitcoinPrice } = useBitcoinPrice()

const heroSection = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(heroSection)
</script>
