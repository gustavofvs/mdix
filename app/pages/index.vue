<template>
  <Head>
    <title>MDIX - Conversor Bitcoin para Real</title>
  </Head>
  <div class="min-h-screen bg-white dark:bg-black">
    <LayoutHeader />

    <HomeHeroSection />

    <HomeConverterSection />

    <HomeAboutSection />

    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { useBitcoinPrice } from '~/composables/useBitcoinPrice'
import { usePWAInstall } from '~/composables/usePWAInstall'

// Initialize composables
usePWAInstall()
const { fetchBitcoinPrices } = useBitcoinPrice()

onMounted(() => {
  fetchBitcoinPrices()
})
</script>
