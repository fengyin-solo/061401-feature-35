<script setup lang="ts">
import { computed } from 'vue'
import type { DangerLevel } from '@/types/game'

interface StatItem {
  label: string
  value: number
  max: number
  icon: string
  baseColor: string
  baseBarColor: string
  isReverse?: boolean
}

interface Props {
  health: number
  hunger: number
  thirst: number
  wood: number
  stone: number
}

const props = defineProps<Props>()

const stats = computed<StatItem[]>(() => [
  {
    label: '生命值',
    value: props.health,
    max: 100,
    icon: '❤️',
    baseColor: 'text-red-400',
    baseBarColor: 'bg-red-500',
  },
  {
    label: '饥饿值',
    value: props.hunger,
    max: 100,
    icon: '🍖',
    baseColor: 'text-orange-400',
    baseBarColor: 'bg-orange-500',
    isReverse: true,
  },
  {
    label: '口渴值',
    value: props.thirst,
    max: 100,
    icon: '💧',
    baseColor: 'text-blue-400',
    baseBarColor: 'bg-blue-500',
    isReverse: true,
  },
  {
    label: '木材',
    value: props.wood,
    max: 100,
    icon: '🪵',
    baseColor: 'text-amber-600',
    baseBarColor: 'bg-amber-600',
  },
  {
    label: '石头',
    value: props.stone,
    max: 100,
    icon: '🪨',
    baseColor: 'text-gray-400',
    baseBarColor: 'bg-gray-400',
  },
])

function getDangerLevel(value: number, max: number, isReverse?: boolean): DangerLevel {
  const percent = (value / max) * 100
  if (isReverse) {
    if (percent >= 95) return 'critical'
    if (percent >= 85) return 'danger'
    if (percent >= 70) return 'warning'
    if (percent >= 50) return 'caution'
    return 'safe'
  } else {
    if (percent <= 5) return 'critical'
    if (percent <= 15) return 'danger'
    if (percent <= 30) return 'warning'
    if (percent <= 50) return 'caution'
    return 'safe'
  }
}

function getDangerLabel(level: DangerLevel): string {
  switch (level) {
    case 'safe': return '正常'
    case 'caution': return '注意'
    case 'warning': return '警告'
    case 'danger': return '危险'
    case 'critical': return '危急'
  }
}

function getDangerTextColor(level: DangerLevel): string {
  switch (level) {
    case 'safe': return 'text-danger-safe'
    case 'caution': return 'text-danger-caution'
    case 'warning': return 'text-danger-warning'
    case 'danger': return 'text-danger-danger'
    case 'critical': return 'text-danger-critical'
  }
}

function getDangerBarColor(level: DangerLevel): string {
  switch (level) {
    case 'safe': return 'bg-danger-safe'
    case 'caution': return 'bg-danger-caution'
    case 'warning': return 'bg-danger-warning'
    case 'danger': return 'bg-danger-danger'
    case 'critical': return 'bg-danger-critical'
  }
}

function getDangerBgColor(level: DangerLevel): string {
  switch (level) {
    case 'safe': return 'bg-danger-safe-bg'
    case 'caution': return 'bg-danger-caution-bg'
    case 'warning': return 'bg-danger-warning-bg'
    case 'danger': return 'bg-danger-danger-bg'
    case 'critical': return 'bg-danger-critical-bg'
  }
}

function getDangerBorderColor(level: DangerLevel): string {
  switch (level) {
    case 'safe': return 'border-transparent'
    case 'caution': return 'border-danger-caution/40'
    case 'warning': return 'border-danger-warning/50'
    case 'danger': return 'border-danger-danger/60'
    case 'critical': return 'border-danger-critical/80'
  }
}

function getDangerAnimation(level: DangerLevel): string {
  switch (level) {
    case 'safe': return ''
    case 'caution': return 'animate-pulse-soft'
    case 'warning': return 'animate-pulse-warning'
    case 'danger': return 'animate-pulse-danger animate-shake-danger'
    case 'critical': return 'animate-pulse-critical animate-glow-critical animate-shake-danger'
  }
}

function getBarWidth(value: number, max: number): string {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))
  return `${percent}%`
}

function showDangerBadge(level: DangerLevel): boolean {
  return level !== 'safe'
}
</script>

<template>
  <div class="bg-game-card rounded-2xl p-6 border border-game-border shadow-xl">
    <h2 class="text-xl font-bold text-white mb-5 flex items-center gap-2">
      <span>📊</span>
      <span>生存状态</span>
    </h2>
    <div class="space-y-3">
      <div
        v-for="stat in stats"
        :key="stat.label"
        :class="[
          'group rounded-xl p-3 border transition-all duration-300',
          getDangerBgColor(getDangerLevel(stat.value, stat.max, stat.isReverse)),
          getDangerBorderColor(getDangerLevel(stat.value, stat.max, stat.isReverse)),
          getDangerAnimation(getDangerLevel(stat.value, stat.max, stat.isReverse)),
        ]"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ stat.icon }}</span>
            <span :class="[stat.baseColor, 'font-medium text-sm']">{{ stat.label }}</span>
            <span
              v-if="showDangerBadge(getDangerLevel(stat.value, stat.max, stat.isReverse))"
              :class="[
                'text-xs px-2 py-0.5 rounded-full font-bold',
                getDangerTextColor(getDangerLevel(stat.value, stat.max, stat.isReverse)),
                getDangerBgColor(getDangerLevel(stat.value, stat.max, stat.isReverse)),
                'border',
                getDangerBorderColor(getDangerLevel(stat.value, stat.max, stat.isReverse)),
              ]"
            >
              {{ getDangerLabel(getDangerLevel(stat.value, stat.max, stat.isReverse)) }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span
              :class="[
                'font-bold text-sm tabular-nums',
                getDangerTextColor(getDangerLevel(stat.value, stat.max, stat.isReverse)),
              ]"
            >
              {{ Math.round(stat.value) }}
            </span>
            <span class="text-gray-500 text-xs tabular-nums">/ {{ stat.max }}</span>
          </div>
        </div>
        <div class="h-2.5 bg-gray-800/80 rounded-full overflow-hidden">
          <div
            :class="[
              getDangerBarColor(getDangerLevel(stat.value, stat.max, stat.isReverse)),
              'h-full rounded-full transition-all duration-300 ease-out',
            ]"
            :style="{ width: getBarWidth(stat.value, stat.max) }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
