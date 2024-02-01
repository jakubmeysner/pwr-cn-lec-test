<script lang="ts" setup>
import { useStore } from "@/stores/store"
import { computed, ref, watch } from "vue"
import questions from "@/assets/questions"
import { shuffle } from "@/util/random"

const store = useStore()

const question = computed(
    () => questions.find(question => question.id === store.questionId)!,
)

const answers = computed(
    () => question.value.noAnswerShuffle ? question.value.answers : shuffle([...question.value.answers]),
)

const answerId = ref<number | null>(null)

function answerQuestion(id: number, correct?: boolean) {
    if (answerId.value === null) {
        answerId.value = id

        if (correct) {
            store.questionProgress[question.value.id] = (
                store.questionProgress[question.value.id] ?? 0
            ) + 1
        } else {
            store.questionProgress[question.value.id] = (
                store.questionProgress[question.value.id] ?? 0
            ) - 1
        }
    }
}

watch(() => store.questionId, () => {
    answerId.value = null
})
</script>

<template>
    <v-card title="Pytanie">
        <template #text>
            <p class="text-body-1">{{ question.question }}</p>

            <v-list class="mt-2">
                <v-list-item
                    v-for="answer in answers"
                    :key="answer.id"
                    :active="answer.id === answerId"
                    :base-color="answerId !== null ? (answer.correct ? 'success' : 'error') : undefined"
                    @click="answerQuestion(answer.id, answer.correct)"
                >
                    <v-list-item-title class="text-wrap">
                        {{ answer.answer }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>

            <v-img
                v-if="question.image !== undefined"
                :src="question.image"
                class="mt-2 mb-6"
            />

            <v-btn
                v-if="answerId !== null"
                :block="true"
                class="mt-2"
                color="primary"
                text="Następne pytanie"
                @click="store.nextQuestion()"
            />
        </template>
    </v-card>
</template>
