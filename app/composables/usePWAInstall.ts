import { ref, onMounted } from 'vue'

const canInstall = ref(false)
let deferredPrompt: any = null

export const usePWAInstall = () => {
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

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      canInstall.value = true
    })
  })

  return {
    canInstall,
    installPWA
  }
}
