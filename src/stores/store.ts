import { defineStore } from "pinia"
import questions from "@/assets/questions"
import { getRandomInt } from "@/util/random"

export const useStore = defineStore("store", {
    state: () => ({
        questionId: null as number | null,
        questionProgress: {} as Record<number, number>,
    }),
    actions: {
        nextQuestion() {
            const qs = questions.filter(
                (question) => (this.questionProgress[question.id] === undefined ||
                    this.questionProgress[question.id] < 2) && question.id !== this.questionId,
            )

            if (qs.length !== 0) {
                const nextQuestion = qs[getRandomInt(0, qs.length)]
                this.questionId = nextQuestion.id
            } else {
                this.questionId = null
            }
        },
    },
    persist: {
        paths: [
            "questionProgress",
        ],
    },
})
