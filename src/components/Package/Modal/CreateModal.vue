<template>
<div class="text-right">
    <v-btn
        @click="createPackage()"
        color="primary500"
        height="40"
        rounded
        class="px-8">
        <template v-slot:prepend>
            <v-icon>mdi-plus</v-icon>
        </template>
        ساخت بسته
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="468">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16 w400 pa-6">
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

            <div :id="`printableArea-${data.id}`">
                <div class="d-flex flex-column justify-center align-center" style="height: 180px;">
                    <img v-if="data && data.barcode_image" alt="Barcode" :src="`${url}${data.barcode_image}`" width="270" height="103" style="margin:0 auto;display: block;">
                    <br />
                    <div
                        v-if="data && data.barcode"
                        class="number-font text-black t12 w500 mt-2"
                        style="text-align:center">{{ data.barcode }}</div>
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

import {
    openToast
} from '@/assets/js/functions.js'

export default {

    data() {
        return {
            dialog: false,
            data: null,
            url : import.meta.env.VITE_API_BASEURL2,
        }
    },

    methods: {
        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },

        /**
         * Submit form
         */
        async createPackage() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'package/crud/create'
            AxiosMethod.form = formdata;

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.data = data.data;
                openToast(this.$store,
                    'بسته با موفقیت ساخته شد',
                    "success")
                this.updateList('true');
                this.openModal();
                this.loading = false;

            } else {
                this.loading = false
            }
        },

        /**
         * Update list
         * @param {*} status 
         */
        updateList(status) {
            this.$emit('updateList', status);
        },

        /**
         * Print barcode
         */
        print() {
            const printWindow = window.open('about:blank', '_blank');
            printWindow.document.write(document.getElementById(`printableArea-${this.data.id}`).innerHTML)
            printWindow.print();
        },
    }
}
</script>
