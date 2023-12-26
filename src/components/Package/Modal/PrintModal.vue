<template>
<div class="text-right">
    <div class="ma-3 pointer d--rtl" @click="openModal()">
        <v-icon class="text-grey-darken-1">mdi-printer-outline</v-icon>
        <span class="mr-2 text-grey-darken-1 t14300">
            پرینت برچسب
        </span>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="468">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                    پرینت برچسب
                </span>

                <v-btn
                    class="modal__header__btn"
                    @click="closeModal()"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="mt-2 mb-2 px-5">
                <v-divider />
            </div>

            <div
                v-if="data"
                class="d-flex justify-center align-center"
                style="height: 180px;">
                <div>
                    <img v-if="data.barcode_image" alt="Barcode" :src="data.barcode_image" width="199" height="103">
                    <span v-if="data.barcode" class="number-font text-black t12500 mt-2">{{ data.barcode }}</span>
                </div>
            </div>

            <div class="mt-3 mb-3 px-5">
                <v-divider />
            </div>

            <v-row
                justify="space-between"
                align="center"
                class="pb-4 ma-0">
                <v-col cols="6" class="">
                    <div class="text-left">
                        <v-btn
                            @click="print()"
                            color="white"
                            height="40"
                            rounded
                            class="px-5 mt-1 mr-5">
                            پرینت برچسب
                        </v-btn>
                    </div>
                </v-col>

                <v-col cols="6" class="text-right">
                    <v-btn
                    @click="closeModal()"
                        variant="text"
                        height="40"
                        rounded
                        class="px-5 mt-1 mr-5">
                        انصراف
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {

    data() {
        return {
            dialog: false,
            data: null,
        }
    },

    props: {
        id: String
    },

    methods: {
        openModal() {
            this.getPackage();
        },


        /**
         * Get package by id
         */
        async getPackage() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `package/crud/get/${this.id}`
            AxiosMethod.form = formdata;

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.data = data.data
            } else {}
        },

        /**
         * Print barcode
         */
        print(){
            //Add print modal
        }
    }
}
</script>
