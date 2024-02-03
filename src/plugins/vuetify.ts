import "vuetify/styles"
import { createVuetify } from "vuetify"
import "@mdi/font/css/materialdesignicons.css"
import colors from "vuetify/util/colors"

export default createVuetify({
    theme: {
        defaultTheme: "dark",
        themes: {
            dark: {
                colors: {
                    primary: colors.indigo.accent4,
                },
            },
        },
    },
})
