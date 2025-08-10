<template>
  <div
    :class="[
      'relative group rounded-2xl border bg-transparent shadow-none hover:shadow-2xl transition-all duration-300 p-7 flex flex-col items-center text-center min-h-[240px] backdrop-blur-[2px] overflow-hidden',
      borderColorClass
    ]"
  >
    <div
      :class="[
        'absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full',
        gradientFromClass,
        gradientToClass
      ]"
    />
    <div class="flex items-center justify-center mb-4">
      <span
        :class="[
          'inline-flex items-center justify-center h-14 w-14 rounded-full border backdrop-blur-[2px]',
          iconBgClass,
          iconBorderClass
        ]"
      >
        <UIcon :name="icon" :class="['h-7 w-7', iconColorClass]" />
      </span>
    </div>
    <h3 class="text-xl font-bold tracking-wide text-neutral-900 dark:text-white mb-2">{{ title }}</h3>
    <div class="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
      <slot />
    </div>
    <div class="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-auto pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 w-full">
      <UIcon v-if="footerIcon" :name="footerIcon" class="w-4 h-4" />
      <span>{{ footerText }}</span>
    </div>
    <span
      v-if="badgeText"
      :class="[
        'absolute right-4 top-4 text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm border select-none pointer-events-none',
        badgeBgClass,
        badgeTextColorClass,
        badgeBorderClass
      ]"
    >
      {{ badgeText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  footerIcon: {
    type: String,
    default: ''
  },
  footerText: {
    type: String,
    required: true
  },
  badgeText: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'yellow', 'indigo'].includes(value)
  }
})

const colorMap = {
  primary: {
    border: 'hover:border-primary-400/60 dark:hover:border-primary-400/40',
    gradientFrom: 'from-primary-400/30',
    gradientTo: 'to-primary-400/30',
    iconBg: 'bg-primary-400/10',
    iconBorder: 'border-primary-400/20',
    iconColor: 'text-primary-500',
    badgeBg: 'bg-primary-400/10',
    badgeText: 'text-primary-500',
    badgeBorder: 'border-primary-400/20'
  },
  yellow: {
    border: 'hover:border-yellow-400/60 dark:hover:border-yellow-400/40',
    gradientFrom: 'from-yellow-400/30',
    gradientTo: 'to-yellow-400/30',
    iconBg: 'bg-yellow-400/10',
    iconBorder: 'border-yellow-400/20',
    iconColor: 'text-yellow-500',
    badgeBg: 'bg-yellow-400/10',
    badgeText: 'text-yellow-700',
    badgeBorder: 'border-yellow-400/20'
  },
  indigo: {
    border: 'hover:border-indigo-400/60 dark:hover:border-indigo-400/40',
    gradientFrom: 'from-indigo-400/30',
    gradientTo: 'to-indigo-400/30',
    iconBg: 'bg-indigo-400/10',
    iconBorder: 'border-indigo-400/20',
    iconColor: 'text-indigo-500',
    badgeBg: 'bg-indigo-400/10',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-400/20'
  }
}

const borderColorClass = computed(() => colorMap[props.color].border)
const gradientFromClass = computed(() => colorMap[props.color].gradientFrom)
const gradientToClass = computed(() => colorMap[props.color].gradientTo)
const iconBgClass = computed(() => colorMap[props.color].iconBg)
const iconBorderClass = computed(() => colorMap[props.color].iconBorder)
const iconColorClass = computed(() => colorMap[props.color].iconColor)
const badgeBgClass = computed(() => colorMap[props.color].badgeBg)
const badgeTextColorClass = computed(() => colorMap[props.color].badgeText)
const badgeBorderClass = computed(() => colorMap[props.color].badgeBorder)
</script>
