<script lang="ts" setup>
import { useStore } from "@/stores/store"

const store = useStore()
</script>

<template>
    <v-btn icon>
        <v-icon>mdi-dots-horizontal</v-icon>

        <v-menu activator="parent">
            <v-list>
                <v-list-item
                    title="Reset"
                    @click="store.$reset()"
                />
            </v-list>
        </v-menu>
    </v-btn>
</template>
