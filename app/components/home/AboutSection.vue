<template>
  <section
    id="about"
    ref="aboutSection"
    :class="['py-24 px-4 sm:px-6 lg:px-8', { 'scroll-animation is-visible': isVisible }]"
  >
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const aboutSection = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(aboutSection)

const githubProfile = ref<any>(null)

const appConfig = useAppConfig()

const fetchGithubProfile = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${appConfig.githubUsername}`)
    if (!response.ok) throw new Error('Erro ao buscar perfil do GitHub')
    githubProfile.value = await response.json()
  } catch (e) {
    githubProfile.value = null
  }
}

onMounted(() => {
  fetchGithubProfile()
})
</script>
