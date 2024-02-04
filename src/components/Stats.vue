<script lang="ts" setup>
import { useStore } from "@/stores/store"
import { computed } from "vue"
import questions from "@/assets/questions"

const store = useStore()

const learnedCount = computed(
    () => Object.values(store.questionProgress).filter(n => n >= 2).length,
)

const partiallyLearnedCount = computed(
    () => Object.values(store.questionProgress).filter(n => n == 1).length,
)

const learningCount = computed(
    () => Object.keys(store.questionProgress).length - learnedCount.value - partiallyLearnedCount.value
)

const notLearnedCount = computed(
    () => questions.length - Object.keys(store.questionProgress).length,
)
</script>

<template>
    <v-card title="Statystyki">
        <template #text>
            <v-table density="comfortable">
                <tbody>
                    <tr>
                        <td>Nauczono</td>
                        <td>{{ learnedCount }}</td>
                    </tr>

                    <tr>
                        <td>Częściowo nauczono</td>
                        <td>{{ partiallyLearnedCount }}</td>
                    </tr>

                    <tr>
                        <td>W trakcie nauki</td>
                        <td>{{ learningCount }}</td>
                    </tr>

                    <tr>
                        <td>Nie nauczono</td>
                        <td>{{ notLearnedCount }}</td>
                    </tr>
                </tbody>
            </v-table>
        </template>
    </v-card>
</template>
