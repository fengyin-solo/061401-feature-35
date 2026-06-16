<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { LogCategory } from '@/types/game'
import type { LogEntry } from '@/types/game'

interface Props {
  logs: LogEntry[]
}

const props = defineProps<Props>()

const logContainer = ref<HTMLElement | null>(null)

function getLogColor(category: LogCategory): string {
  switch (category) {
    case 'success':
      return 'text-danger-safe'
    case 'info':
      return 'text-blue-400'
    case 'warning':
      return 'text-danger-warning'
    case 'danger':
      return 'text-danger-danger'
    case 'action':
      return 'text-gray-300'
    case 'event':
      return 'text-yellow-400'
    case 'system':
      return 'text-purple-400'
    default:
      return 'text-gray-300'
  }
}

function getLogBgColor(category: LogCategory): string {
  switch (category) {
    case 'success':
      return 'bg-danger-safe-bg'
    case 'info':
      return 'bg-blue-500/10'
    case 'warning':
      return 'bg-danger-warning-bg'
    case 'danger':
      return 'bg-danger-danger-bg'
    case 'action':
      return 'bg-gray-700/20'
    case 'event':
      return 'bg-yellow-500/10'
    case 'system':
      return 'bg-purple-500/10'
    default:
      return 'bg-transparent'
  }
}

function getLogBorderColor(category: LogCategory): string {
  switch (category) {
    case 'success':
      return 'border-danger-safe/30'
    case 'info':
      return 'border-blue-500/30'
    case 'warning':
      return 'border-danger-warning/40'
    case 'danger':
      return 'border-danger-danger/50'
    case 'action':
      return 'border-gray-600/30'
    case 'event':
      return 'border-yellow-500/30'
    case 'system':
      return 'border-purple-500/30'
    default:
      return 'border-transparent'
  }
}

function getLogIcon(category: LogCategory): string {
  switch (category) {
    case 'success':
      return '✅'
    case 'info':
      return 'ℹ️'
    case 'warning':
      return '⚠️'
    case 'danger':
      return '🚨'
    case 'action':
      return '⚡'
    case 'event':
      return '🎲'
    case 'system':
      return '📢'
    default:
      return '▶️'
  }
}

function getLogLabel(category: LogCategory): string {
  switch (category) {
    case 'success':
      return '成功'
    case 'info':
      return '信息'
    case 'warning':
      return '警告'
    case 'danger':
      return '危险'
    case 'action':
      return '行动'
    case 'event':
      return '事件'
    case 'system':
      return '系统'
    default:
      return '日志'
  }
}

function getLogAnimation(category: LogCategory): string {
  switch (category) {
    case 'danger':
      return 'animate-pulse-danger'
    case 'warning':
      return 'animate-pulse-warning'
    default:
      return ''
  }
}

watch(
  () => props.logs.length,
  async () => {
    await nextTick()
    if (logContainer.value) {
      logContainer.value.scrollTop = 0
    }
  }
)
</script>

<template>
  <div class="bg-game-card rounded-2xl p-6 border border-game-border shadow-xl flex flex-col h-full">
    <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
      <span>📜</span>
      <span>事件日志</span>
    </h2>
    <div
      ref="logContainer"
      class="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      style="max-height: 400px;"
    >
      <div
        v-for="log in logs"
        :key="log.id"
        :class="[
          'animate-slide-up text-sm leading-relaxed flex items-start gap-2 rounded-lg px-3 py-2 border',
          getLogColor(log.category),
          getLogBgColor(log.category),
          getLogBorderColor(log.category),
          getLogAnimation(log.category),
        ]"
      >
        <span class="flex-shrink-0">{{ getLogIcon(log.category) }}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span :class="[getLogColor(log.category), 'text-xs font-bold uppercase tracking-wide opacity-80']">
              {{ getLogLabel(log.category) }}
            </span>
            <span class="text-gray-500 text-xs">
              第 {{ log.turn }} 回合
            </span>
          </div>
          <span class="break-words">{{ log.text }}</span>
        </div>
      </div>
      <div v-if="logs.length === 0" class="text-gray-500 text-sm text-center py-8">
        暂无日志...
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #374151;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #4b5563;
}
</style>
