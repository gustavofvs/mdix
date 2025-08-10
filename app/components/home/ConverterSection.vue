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
        <ConverterCard />
        <ConverterFaqCard />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const converterSection = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(converterSection)
</script>
