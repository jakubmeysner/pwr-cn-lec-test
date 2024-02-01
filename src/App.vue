<script setup lang="ts">
import AppBar from "@/components/AppBar.vue"
import { useStore } from "@/stores/store"
import Home from "@/components/Home.vue"
import Question from "@/components/Question.vue"
import Stats from "@/components/Stats.vue"

const store = useStore()
</script>

<template>
    <v-app>
        <app-bar />

        <v-main>
            <v-container style="max-width: 1000px">
                <home v-if="store.questionId === null" />
                <question v-else />

                <stats class="mt-4" />
            </v-container>
        </v-main>
    </v-app>
</template>
