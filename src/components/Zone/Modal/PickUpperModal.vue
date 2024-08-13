<template>
<div class="text-right">
    <v-dialog v-model="dialog" width="580" @input="dialogToggle">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16 w400 pa-6">
                    مدیریت ناحیه بندی
                </span>

                <v-btn class="modal__header__btn" @click="closeModal()" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="mt-2 mb-2 px-5">
                <v-divider />
            </div>
            <div class="d-flex justify-center align-center mt-5">
                
                <div style="width:80%">
                    <v-autocomplete density="compact" variant="outlined" single-line multiple placeholder="انتخاب ناحیه انبار" :items="rowList" v-model="values">
                    </v-autocomplete>
                </div>
            </div>

            <div class="mt-3 mb-3 px-5">
                <v-divider />
            </div>

            <v-row justify="space-between" align="center" class="pb-4 ma-0">
                <v-col cols="6" class="">
                    <div class="text-left">
                        <v-btn :loading="loading" @click="addRow()" color="primary500" height="40" rounded class="px-5 mt-1 mr-5">
                            اعمال تغییرات
                        </v-btn>
                    </div>
                </v-col>

                <v-col cols="6" class="text-right">
                    <v-btn @click="closeModal()" variant="text" height="40" rounded class="px-5 mt-1 mr-5">
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
import { openToast } from "@/assets/js/functions";

export default {

    data() {
        return {
            dialog: false,
            data: null,
            loading: false,
            url: import.meta.env.VITE_API_BASEURL2,
            values: []
        }
    },

    props: {
        id: String,
        name: String,
        rowList: Array,
    },

    methods: {

        /**
         * Get placement by id
         */
        async getZone() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `warehouse/zone/get/${this.id}`
            AxiosMethod.form = formdata;

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.data = data.data.placements
                if (this.data && this.data.length) {
                    this.data.forEach(item => {
                        if (!this.values.includes(item.row_number)) {
                            this.values.push(item.row_number);
                        }
                    })
                }
            } else {}
        },

        closeModal() {
            this.dialog = false;
          this.values = []
        },

        openModal() {
            this.dialog = true;
        },

        async addRow() {
            this.loading = true
            let formData = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `warehouse/zone/update`
            formData.append('zone_id', this.id)

            this.values.forEach((value, index) => {
                formData.append(`row_ids[${index}]`, value)
            });

            AxiosMethod.form = formData
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false;
                openToast(
                    this.$store,
                    'ناحیه با موفقیت ویرایش شد.',
                    "success"
                );
                this.closeModal();

            } else {
                this.loading = false
            }
        }
    },

    created() {
        this.$watch(
            () => this.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getZone();
                }
            }
        );
    },
}
</script>
