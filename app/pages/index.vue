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
import { formatCurrency } from '~/utils/format'

// Fetch initial price for the hero section, etc.
const { fetchBitcoinPrices } = useBitcoinPrice()

const canInstall = ref(false)
const showIosTip = ref(false)
let deferredPrompt: any = null

onMounted(() => {
  fetchBitcoinPrices()
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    canInstall.value = true
  })
})

const installPWA = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      canInstall.value = false
      deferredPrompt = null
    }
  }
}
</script>
