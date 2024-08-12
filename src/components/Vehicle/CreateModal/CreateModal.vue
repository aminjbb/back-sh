<template>
<div class="text-right">

    <v-btn
        @click="openModal()"
        color="primary500"
        height="40"
        rounded
        class="px-8">
        <template v-slot:prepend>
            <v-icon>mdi-plus</v-icon>
        </template>
        افزودن
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="468">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16 w400 pa-6">
                    افزودن خودرو
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

            <div>
                <v-row
                    justify="center"
                    align="center"
                    class="px-5">
                    <v-col cols="12">
                        <div class="text-right mt-4 mb-2">
                            <span class="t12 w300">
                                نوع خودرو
                            </span>
                        </div>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            single-line
                            placeholder="برای مثال : وانت سواری"
                            v-model="form.vehicle_type" />
                    </v-col>

                    <v-col cols="12">
                        <div class="text-right mt-4 mb-2">
                            <span class="t12 w300">
                                شماره پلاک
                            </span>
                        </div>
                        <v-row class="d--rtl">
                            <v-col cols="4">
                                <v-text-field
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    placeholder="۱۱"
                                    prefix="ایران-"
                                    v-model="license1" />
                            </v-col>

                            <v-col cols="3">
                                <v-text-field
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    placeholder="۸۸۸"
                                    v-model="license[0]" />
                            </v-col>

                            <v-col cols="2">
                                <v-text-field
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    placeholder="ب"
                                    v-model="license[1]" />
                            </v-col>

                            <v-col cols="3">
                                <v-text-field
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    placeholder="۲۶"
                                    v-model="license[2]" />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
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
                            @click="createVehicle()"
                            color="primary500"
                            height="40"
                            rounded
                            class="px-5 mt-1 mr-5">
                            تایید
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
    openToast
} from "@/assets/js/functions";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {

    data() {
        return {
            dialog: false,
            form: {
                vehicle_type: '',
                license: '',
            },
            license1: null,
            license: [],
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
        async createVehicle() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'vehicle/crud/create'
            AxiosMethod.form = formdata;
            const licensePart2 = this.license.join('');
            const finalLicense = `${this.license1}-${licensePart2}`

            formdata.append('vehicle_type', this.form.vehicle_type)
            formdata.append('license', finalLicense);

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/vehicle/index');
                this.updateList('true');
                openToast(this.$store,
                    'خودرو با موفقیت ایجاد شد.',
                    "success");
                this.closeModal();
               this.form.vehicle_type = '';
               this.form.license = ''
               this.license1= null;
               this.license= [];

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
    }
}
</script>
