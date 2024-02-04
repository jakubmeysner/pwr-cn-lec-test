<script lang="ts" setup>
import { useStore } from "@/stores/store"
import { ref } from "vue"

const store = useStore()
const resetDialog = ref(false)

function reset() {
    store.$reset()
    resetDialog.value = false
}
</script>

<template>
    <v-btn
        icon="mdi-source-branch"
        title="Kod źrodłowy"
        href="https://github.com/jakubmeysner/pwr-cn-lec-test"
        target="_blank"
        rel="noopener noreferrer"
        class="mr-1"
    />

    <v-btn icon title="Zresetuj postępy">
        <v-icon>mdi-restart-alert</v-icon>

        <v-dialog activator="parent" v-model="resetDialog" max-width="500">
            <v-card
                title="Reset postępów"
                text="Czy na pewno chcesz zresetować swoje postępy?"
            >
                <template #actions>
                    <v-spacer />

                    <v-btn
                        text="Zresetuj postępy"
                        color="error"
                        @click="reset"
                    />

                    <v-btn
                        text="Anuluj"
                        @click="resetDialog = false"
                    />
                </template>
            </v-card>
        </v-dialog>
    </v-btn>
</template>
