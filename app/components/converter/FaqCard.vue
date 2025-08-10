<template>
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
</template>

<script setup lang="ts">
// This is a purely presentational component.
</script>
