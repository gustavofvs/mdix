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
          <AboutInfoCard
            icon="i-lucide-code"
            title="Tecnologias"
            footer-icon="i-lucide-cpu"
            footer-text="Stack moderna"
            badge-text="Atual"
            color="primary"
          >
            <ul class="space-y-1">
              <li><span class="font-medium">Nuxt 3</span> & <span class="font-medium">Vue 3</span></li>
              <li><span class="font-medium">Tailwind CSS</span> & <span class="font-medium">Nuxt UI</span></li>
              <li><span class="font-medium">TypeScript</span></li>
              <li><span class="font-medium">CoinGecko API</span> <span class="inline-block ml-1 px-2 py-0.5 rounded border border-primary-400/30 text-xs text-primary-600 dark:text-primary-300 bg-primary-400/10">tempo real</span></li>
            </ul>
          </AboutInfoCard>

          <!-- Card Open Source -->
          <AboutInfoCard
            icon="i-lucide-github"
            title="Open Source"
            footer-icon="i-lucide-lock-open"
            footer-text="MIT License"
            badge-text="Aberto"
            color="yellow"
          >
            <p>Código aberto sob licença <span class="font-semibold">MIT</span>. Contribuições são bem-vindas no GitHub.</p>
            <a href="https://github.com/gustavofvs/mdix" target="_blank" class="inline-flex items-center gap-1 px-3 py-1 rounded border border-yellow-400/30 text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-400/10 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors mt-2">
              <UIcon name="i-lucide-github" class="w-4 h-4" />
              github.com/gustavofvs/mdix
            </a>
          </AboutInfoCard>

          <!-- Card Desenvolvedor -->
          <AboutInfoCard
            :icon="githubProfile ? '' : 'i-lucide-user'"
            title="Desenvolvedor"
            footer-icon="i-lucide-user"
            footer-text="Portfólio pessoal"
            badge-text="Perfil"
            color="indigo"
          >
            <!-- Custom content for the developer card using slot -->
            <template #icon>
              <NuxtImg v-if="githubProfile" :src="githubProfile.avatar_url" :alt="githubProfile.name || githubProfile.login" width="40" height="40" class="w-10 h-10 rounded-full object-cover" densities="1x 2x" format="webp" />
              <UIcon v-else name="i-lucide-user" class="h-7 w-7 text-indigo-500" />
            </template>

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
            <div v-else class="text-neutral-400 text-sm italic">Carregando perfil do GitHub...</div>
          </AboutInfoCard>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { useAppConfig } from '#imports'

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
