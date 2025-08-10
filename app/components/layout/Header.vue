<template>
  <header class="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="h-8 w-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center">
            <span class="text-sm font-semibold text-white dark:text-black">M</span>
          </div>
          <span class="text-lg font-semibold text-neutral-900 dark:text-white">MDIX</span>
        </div>

        <nav class="hidden md:flex items-center space-x-6">
          <a href="#converter" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Converter</a>
          <a href="#about" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Sobre</a>
          <a href="https://github.com/gustavofvs" target="_blank" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
          <UButton v-if="canInstall" @click="installPWA" icon="i-lucide-download" size="sm" color="primary" variant="soft">Instalar App</UButton>
        </nav>

        <UButton
          icon="i-lucide-menu"
          color="gray"
          variant="ghost"
          class="md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div class="px-4 py-2 space-y-1">
        <a href="#converter" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Converter</a>
        <a href="#about" @click="mobileMenuOpen = false" class="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Sobre</a>
        <a href="https://github.com/gustavofvs" @click="mobileMenuOpen = false" target="_blank" class="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
          <div v-if="canInstall" class="p-2">
            <UButton @click="installPWA" icon="i-lucide-download" size="sm" color="primary" variant="soft" block>Instalar App</UButton>
          </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePWAInstall } from '~/composables/usePWAInstall'

const mobileMenuOpen = ref(false)
const { canInstall, installPWA } = usePWAInstall()
</script>
