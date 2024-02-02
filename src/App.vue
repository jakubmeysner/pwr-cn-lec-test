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
            <v-container fluid>
                <v-row>
                    <v-col cols="12" md="6">
                        <home v-if="store.questionId === null" />
                        <question v-else />
                        <stats class="mt-4" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <!-- Place your iframe here -->
                        <iframe width="512" height="288" 
                            src="https://www.youtube-nocookie.com/embed/7ghSziUQnhs?autoplay=1&mute=1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>

                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

