import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import "vuetify/styles";
import './assets/scss/Styles.scss'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from 'vuetify/lib/util/colors'
import VueCookies from 'vue3-cookies'
import TextClamp from 'vue3-text-clamp'
import VueClipboard from 'vue3-clipboard'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import { vue3Debounce } from 'vue-debounce'
import { useCookies } from "vue3-cookies";
import axios from 'axios'
import { mixin } from '@/assets/js/helpers.js'

import Pusher from "pusher-js"
window.Pusher = Pusher
const cookies = useCookies()
const app = createApp(App)

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        rtl: true,
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.red.darken1, // #E53935
                    primary600: '#EC407A', // #E53935
                    primary500: '#E91E63', // #E53935
                    primary700: '#2196F3', // #E53935
                    primary300: '#9c5788', // #E53935
                    primary400: '#FCE4EC',
                    secondary: colors.red.lighten4, // #FFCDD2
                    gray: '#F7F8FA',
                    gray2: '#E0E0E0',
                    gray90: '#FBFBFC',
                    gray200: '#EEEEEE',
                    gray500: '#9E9E9E',
                    gray600: '#757575',
                    gray700: '#FAFAFA',
                    Slate: '#110833',
                    DarkJungle: '#212121',
                    CharcoalGrey: '#424242',
                    success:'#4CAF50',
                    disableRow:'#FFEBEE',
                    notSorted:'#FFEBEE',
                    warningRow:'#FFF3E0',
                    successRow:'#E8F5E9',
                    scanError:'#EF5350',
                    scanSuccess: '#43A047',
                    Orange600: '#FB8C00',
                    Purple500: '#673AB7',
                    Orange400:'#FFA726'
                }
            },
        },
    },
    components,
    directives,
});
app.mixin(mixin)
app.use(router)
app.use(store)
app.use(vuetify)
app.use(VueCookies)
app.use(TextClamp)
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
})
app.component('DatePicker', Vue3PersianDatetimePicker)
app.directive('debounce', vue3Debounce({ lock: true , defaultTime: '1000ms',}))

app.mount('#app')