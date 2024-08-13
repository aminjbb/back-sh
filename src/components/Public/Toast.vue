<template>
<v-snackbar v-model="toast" left bottom color="black" min-width="400">
    <v-row class="ma-0" align="center" justify="space-between">
      <v-icon  @click="close()">
        mdi-close
      </v-icon>

        <v-row justify="end" class="pr-4" align="center">
            <span class="t14 w300 mr-3 ml-4">
                {{ text }}
            </span>

            <img v-if="status == 'success'" src="@/assets/img/success.svg" alt="shavaz image">
            <img v-else-if="status == 'error'" src="@/assets/img/error.svg" alt="shavaz image">
        </v-row>
    </v-row>

</v-snackbar>
</template>

<script>
import {
    useStore
} from "vuex";
export default {
    data: () => ({
        store: useStore()
    }),

    methods: {
        close() {
            let form = {
                toast: false,
                toastText: "",
                toastStatus: "",
            };
            this.$store.commit('set_toast', form)
        }
    },
    computed: {
        toast() {
            return this.store.getters.get_toast;
        },

        text() {
            return this.store.getters.get_toastText;
        },

        status() {
            return this.store.getters.get_toastStatus
        }
    }
}
</script>
