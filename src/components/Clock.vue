<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue"

const props = defineProps<{
    startedAt: Date
    endedAt: Date | null
}>()

const now = ref(new Date())

const updateNowIntervalId = window.setInterval(() => {
    now.value = new Date()
}, 100)

onUnmounted(() => {
    window.clearInterval(updateNowIntervalId)
})

const duration = computed(
    () => (props.endedAt?.getTime() ?? now.value.getTime()) - props.startedAt.getTime()
)

const minutes = computed(() => Math.floor(duration.value / 60e3))
const seconds = computed(() => Math.floor((duration.value - minutes.value * 60e3) / 1e3))
const minutesString = computed(() => minutes.value.toString())
const secondsString = computed(() => seconds.value.toString().padStart(2, "0"))
</script>

<template>
    <div class="text-body-1">
        {{ minutesString }}:{{ secondsString }}
    </div>
</template>
