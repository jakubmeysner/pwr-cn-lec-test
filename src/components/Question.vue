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

const answerIds = ref<number[]>([])
const answered = ref<boolean>(false)
const answeredCorrectly = ref<boolean>(false)

function toggleAnswer(id: number) {
    if (answered.value) {
        return
    }

    if (answerIds.value.includes(id)) {
        const index = answerIds.value.indexOf(id)
        answerIds.value.splice(index, 1)
    } else {
        if (question.value.selectAll) {
            answerIds.value.push(id)
        } else {
            answerIds.value = [id]
        }
    }
}

function confirm() {
    const correctAnswerIdsSet = new Set(
        question.value.answers
            .filter((answer) => answer.correct)
            .map((answer) => answer.id)
    )

    if (question.value.selectAll) {
        answeredCorrectly.value = answerIds.value.length === correctAnswerIdsSet.size
            && answerIds.value.every((id) => correctAnswerIdsSet.has(id));
    } else {
        answeredCorrectly.value = correctAnswerIdsSet.has(answerIds.value[0]);
    }

    if (answeredCorrectly.value) {
        store.questionProgress[question.value.id] = (
            store.questionProgress[question.value.id] ?? 0
        ) + 1
    } else {
        store.questionProgress[question.value.id] = (
            store.questionProgress[question.value.id] ?? 0
        ) - 1
    }

    answered.value = true
}

watch(() => store.questionId, () => {
    answerIds.value = []
    answered.value = false
    answeredCorrectly.value = false
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
                    :active="answerIds.includes(answer.id)"
                    :base-color="answered ? (answer.correct ? 'success' : 'error') : undefined"
                    :prepend-icon="
                        question.selectAll
                            ? (answerIds.includes(answer.id) ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline')
                            : (answerIds[0] === answer.id ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank')
                    "
                    @click="toggleAnswer(answer.id)"
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
                v-if="answered"
                :block="true"
                class="mt-2"
                :color="answeredCorrectly ? 'success' : 'error'"
                text="Następne pytanie"
                @click="store.nextQuestion()"
            />

            <v-btn
                v-else
                :block="true"
                class="mt-2"
                color="primary"
                text="Potwierdź"
                @click="confirm()"
            />
        </template>
    </v-card>
</template>
