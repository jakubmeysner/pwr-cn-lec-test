<script lang="ts" setup>
import { useStore } from "@/stores/store"

const store = useStore()
</script>

<template>
    <v-card title="AK Test">
        <template #text>
            <v-btn
                :block="true"
                color="primary"
                text="Rozpocznij"
                @click="store.nextQuestion()"
            />
        </template>
    </v-card>
</template>
