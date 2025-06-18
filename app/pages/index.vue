<template>
  <Head>
    <title>MDIX - Conversor Bitcoin para Real</title>
  </Head>
  <div class="min-h-screen bg-white dark:bg-black">
    <!-- Botão flutuante para instalar PWA -->
    <UButton
      v-if="canInstall"
      icon="i-lucide-download"
      color="primary"
      variant="outline"
      class="fixed bottom-6 right-6 z-50 shadow-xl"
      @click="installPWA"
    >
      Adicionar à tela inicial
    </UButton>
    <div v-if="showIosTip" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm">
      <UIcon name="i-lucide-info" class="w-4 h-4 text-primary-400" />
      Para instalar, toque em <span class="font-bold">Compartilhar</span> e depois <span class="font-bold">Adicionar à Tela de Início</span>.
      <button class="ml-2 text-primary-400 underline" @click="showIosTip = false">Fechar</button>
    </div>
    <!-- Header minimalista -->
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
          <a href="#converter" class="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Converter</a>
          <a href="#about" class="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Sobre</a>
          <a href="https://github.com/gustavofvs" target="_blank" class="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8">
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
              {{ formatCurrency(bitcoinPrice.brl) }}
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

    <!-- Divisor Visual -->
    <div class="relative py-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-neutral-200 dark:border-neutral-800"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white dark:bg-black px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <UIcon name="i-lucide-arrow-down" class="w-4 h-4" />
            <span class="font-medium">Converter</span>
            <UIcon name="i-lucide-arrow-down" class="w-4 h-4" />
          </div>
        </span>
              </div>
            </div>

    <!-- Converter Section -->
    <section id="converter" class="py-24 px-4 sm:px-6 lg:px-8">
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
            
            <!-- Background pattern sutil -->
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
                    <!-- Input minimalista com animações -->
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

                <!-- Botão converter apenas com borda -->
                <div class="relative group">
                  <button
                    type="submit"
                    :disabled="!bitcoinAmount || bitcoinAmount <= 0 || cooldownActive || conversionCount >= MAX_CONVERSIONS"
                    class="w-full h-10 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-primary-400 dark:hover:border-primary-400 focus:border-primary-500 dark:focus:border-primary-500 disabled:border-neutral-200 dark:disabled:border-neutral-700 disabled:text-neutral-400 dark:disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 bg-transparent"
                    :class="{ 'border-green-500 text-green-600 dark:text-green-400': bitcoinAmount && bitcoinAmount > 0 }"
                  >
                    <!-- Conteúdo do botão -->
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
                      
                      <!-- Texto animado -->
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

                <!-- Preço atual com design melhorado -->
                <div class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm shadow-sm">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <UIcon name="i-lucide-clock" class="w-4 h-4" />
                      <span>Preço atual:</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="text-lg font-semibold text-neutral-900 dark:text-white font-mono animate-fade-in-up bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                        R$ {{ formatCurrency(bitcoinPrice.brl) }}
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

                <!-- Resultado com animações elegantes -->
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

                <!-- Erro com animação -->
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0 transform translate-y-2"
                  enter-to-class="opacity-100 transform translate-y-0"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 transform translate-y-0"
                  leave-to-class="opacity-0 transform translate-y-2"
                >
              <UAlert
                v-if="error"
                color="red"
                variant="soft"
                :title="error"
                icon="i-lucide-alert-circle"
                    class="animate-shake"
              />
                </Transition>
            </form>
            </div>
            
            <!-- Badge e informações adicionais -->
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

    <!-- Divisor Visual -->
    <div class="relative py-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-neutral-200 dark:border-neutral-800"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white dark:bg-black px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <UIcon name="i-lucide-info" class="w-4 h-4" />
            <span class="font-medium">Sobre o projeto</span>
            <UIcon name="i-lucide-info" class="w-4 h-4" />
          </div>
        </span>
      </div>
    </div>

    <!-- About Section -->
    <section id="about" class="py-24 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Sobre o projeto
            </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            MDIX é um conversor de Bitcoin para Real desenvolvido como projeto de portfólio, 
            focado em design minimalista e experiência do usuário.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Card Tecnologias -->
          <div class="relative group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent shadow-none hover:shadow-2xl hover:border-primary-400/60 dark:hover:border-primary-400/40 transition-all duration-300 p-7 flex flex-col items-center text-center min-h-[240px] backdrop-blur-[2px] overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-primary-400/30 via-transparent to-primary-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div class="flex items-center justify-center mb-4">
              <span class="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-400/10 border border-primary-400/20 backdrop-blur-[2px]">
                <UIcon name="i-lucide-code" class="h-7 w-7 text-primary-500" />
              </span>
                  </div>
            <h3 class="text-xl font-bold tracking-wide text-neutral-900 dark:text-white mb-2">Tecnologias</h3>
            <ul class="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm mb-4">
              <li><span class="font-medium">Nuxt 3</span> & <span class="font-medium">Vue 3</span></li>
              <li><span class="font-medium">Tailwind CSS</span> & <span class="font-medium">Nuxt UI</span></li>
              <li><span class="font-medium">TypeScript</span></li>
              <li><span class="font-medium">CoinGecko API</span> <span class="inline-block ml-1 px-2 py-0.5 rounded border border-primary-400/30 text-xs text-primary-600 dark:text-primary-300 bg-primary-400/10">tempo real</span></li>
            </ul>
            <div class="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-auto pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 w-full">
              <UIcon name="i-lucide-cpu" class="w-4 h-4" />
              <span>Stack moderna</span>
                </div>
            <span class="absolute right-4 top-4 bg-primary-400/10 text-primary-500 text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm border border-primary-400/20 select-none pointer-events-none">Atual</span>
                </div>

          <!-- Card Open Source -->
          <div class="relative group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent shadow-none hover:shadow-2xl hover:border-yellow-400/60 dark:hover:border-yellow-400/40 transition-all duration-300 p-7 flex flex-col items-center text-center min-h-[240px] backdrop-blur-[2px] overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-yellow-400/30 via-transparent to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div class="flex items-center justify-center mb-4">
              <span class="inline-flex items-center justify-center h-14 w-14 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-[2px]">
                <UIcon name="i-lucide-github" class="h-7 w-7 text-yellow-500" />
              </span>
                  </div>
            <h3 class="text-xl font-bold tracking-wide text-neutral-900 dark:text-white mb-2">Open Source</h3>
            <p class="text-neutral-700 dark:text-neutral-300 text-sm mb-4">Código aberto sob licença <span class="font-semibold">MIT</span>. Contribuições são bem-vindas no GitHub.</p>
            <a href="https://github.com/gustavofvs/mdix" target="_blank" class="inline-flex items-center gap-1 px-3 py-1 rounded border border-yellow-400/30 text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-400/10 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors mb-4">
              <UIcon name="i-lucide-github" class="w-4 h-4" />
              github.com/gustavofvs/mdix
            </a>
            <div class="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-auto pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 w-full">
              <UIcon name="i-lucide-lock-open" class="w-4 h-4" />
              <span>MIT License</span>
                </div>
            <span class="absolute right-4 top-4 bg-yellow-400/10 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm border border-yellow-400/20 select-none pointer-events-none">Aberto</span>
                </div>

          <!-- Card Desenvolvedor com GitHub API -->
          <div class="relative group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-transparent shadow-none hover:shadow-2xl hover:border-indigo-400/60 dark:hover:border-indigo-400/40 transition-all duration-300 p-7 flex flex-col items-center text-center min-h-[240px] backdrop-blur-[2px] overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-indigo-400/30 via-transparent to-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div class="flex items-center justify-center mb-4">
              <span class="inline-flex items-center justify-center h-14 w-14 rounded-full bg-indigo-400/10 border border-indigo-400/20 backdrop-blur-[2px]">
                <img v-if="githubProfile" :src="githubProfile.avatar_url" :alt="githubProfile.name || githubProfile.login" class="w-10 h-10 rounded-full object-cover" />
                <UIcon v-else name="i-lucide-user" class="h-7 w-7 text-indigo-500" />
              </span>
                  </div>
            <h3 class="text-xl font-bold tracking-wide text-neutral-900 dark:text-white mb-1">Desenvolvedor</h3>
            <a v-if="githubProfile" :href="githubProfile.html_url" target="_blank" class="text-sm text-indigo-600 dark:text-indigo-300 hover:underline flex items-center justify-center gap-1 mb-1">
              <UIcon name="i-lucide-github" class="w-4 h-4" />
              {{ githubProfile.login }}
            </a>
            <div v-if="githubProfile" class="text-neutral-900 dark:text-white font-medium text-base mb-1">{{ githubProfile.name }}</div>
            <div v-if="githubProfile" class="text-neutral-600 dark:text-neutral-400 text-xs mb-2">{{ githubProfile.bio }}</div>
            <div v-if="githubProfile" class="flex items-center justify-center gap-4 mt-2 text-xs text-neutral-500 dark:text-neutral-500 mb-2">
              <span><UIcon name="i-lucide-users" class="inline w-4 h-4 mr-1" />{{ githubProfile.followers }} seguidores</span>
              <span><UIcon name="i-lucide-book" class="inline w-4 h-4 mr-1" />{{ githubProfile.public_repos }} repositórios</span>
                </div>
            <div v-else class="text-neutral-400 text-sm italic mb-2">Carregando perfil do GitHub...</div>
            <div class="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-auto pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 w-full">
              <UIcon name="i-lucide-user" class="w-4 h-4" />
              <span>Portfólio pessoal</span>
                  </div>
            <span class="absolute right-4 top-4 bg-indigo-400/10 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm border border-indigo-400/20 select-none pointer-events-none">Perfil</span>
          </div>
          </div>
        </div>
      </section>

    <!-- Footer -->
    <footer class="border-t border-neutral-200 dark:border-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div class="flex items-center space-x-2">
            <div class="h-6 w-6 rounded bg-neutral-900 dark:bg-white flex items-center justify-center">
              <span class="text-xs font-semibold text-white dark:text-black">M</span>
            </div>
            <span class="text-sm font-medium text-neutral-900 dark:text-white">MDIX</span>
          </div>

          <div class="flex items-center space-x-6">
            <a href="https://github.com/gustavofvs" target="_blank" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              GitHub
            </a>
            <span class="text-sm text-neutral-500 dark:text-neutral-500">
              © 2025 MDIX. Todos os direitos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const bitcoinAmount = ref('')
const conversionResult = ref('')
const error = ref('')
const isLoading = ref(false)
const bitcoinPrice = ref({ brl: 0 })
const lastUpdateTime = ref('')
const mobileMenuOpen = ref(false)
const githubProfile = ref<any>(null)
const isInputFocused = ref(false)
const canInstall = ref(false)
const showIosTip = ref(false)
let deferredPrompt: any = null

// Proteção: Limite de conversões e cooldown
const MAX_CONVERSIONS = 10
const COOLDOWN_MS = 2000
const conversionCount = ref(0)
const cooldownActive = ref(false)
const cooldownTimer = ref(0)
let cooldownTimeout: ReturnType<typeof setTimeout> | null = null

// Buscar preço do Bitcoin
const fetchBitcoinPrices = async () => {
  try {
    isLoading.value = true
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MDIX-Bitcoin-Converter'
      }
    })
    
    if (response.status === 429) {
      error.value = 'Limite de uso da API atingido. Aguarde alguns minutos e tente novamente.'
      bitcoinPrice.value = { brl: 0 }
      return
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.bitcoin && data.bitcoin.brl) {
      bitcoinPrice.value = data.bitcoin
      lastUpdateTime.value = new Date().toLocaleString('pt-BR')
      error.value = '' // Limpar erro anterior
    } else {
      throw new Error('Dados do Bitcoin não encontrados')
    }
  } catch (err) {
    console.error('Erro ao buscar preços:', err)
    error.value = 'Erro ao carregar preços. Verifique sua conexão e tente novamente.'
    bitcoinPrice.value = { brl: 0 }
  } finally {
    isLoading.value = false
  }
}

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
  if (!bitcoinAmount.value || bitcoinAmount.value <= 0) {
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
    await fetchBitcoinPrices()
    const amount = parseFloat(bitcoinAmount.value)
    const price = bitcoinPrice.value.brl
    if (price && price > 0) {
      const result = amount * price
      conversionResult.value = formatCurrency(result, 'brl')
      conversionCount.value++
    } else {
      error.value = 'Não foi possível obter o preço atual do Bitcoin. Tente novamente.'
    }
  } catch (err) {
    console.error('Erro na conversão:', err)
    error.value = 'Erro ao realizar conversão. Tente novamente.'
  }
}

// Formatar moeda
const formatCurrency = (value: number, currency = 'brl') => {
  if (!value) return '0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const fetchGithubProfile = async () => {
  try {
    const response = await fetch('https://api.github.com/users/gustavofvs')
    if (!response.ok) throw new Error('Erro ao buscar perfil do GitHub')
    githubProfile.value = await response.json()
  } catch (e) {
    githubProfile.value = null
  }
}

onMounted(() => {
  fetchBitcoinPrices()
  fetchGithubProfile()
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

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-x {
  animation: gradient-x 2s ease infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>