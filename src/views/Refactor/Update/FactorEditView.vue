<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header />

            <div class="mh-100">
                <v-card class="ma-5 br--12 pa-10 position__relative" min-height="600">
                    <FactorForm ref="FactorForm" :factor="factor"/>

                    <v-row justify="end" class="position__absolute bottom left">
                        <v-btn
                            :loading="loading"
                            @click="validate()"
                            color="primary500"
                            height="40"
                            rounded
                            class="px-8 mt-1">
                            <template v-slot:prepend>
                                <v-icon>mdi-plus</v-icon>
                            </template>
                            تایید
                        </v-btn>

                        <v-btn
                            @click="$router.go(-1)"
                            variant="outlined"
                            height="40"
                            rounded
                            class="px-8 mt-1 mr-5">
                            <template v-slot:prepend>
                                <v-icon>mdi-cancel</v-icon>
                            </template>
                            انصراف
                        </v-btn>
                    </v-row>
                </v-card>
            </div>

        </v-main>
    </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

import FactorForm from '@/components/Factor/FactorForm.vue'
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from '@/assets/js/axios_call.js'

export default {
    components: {
        DashboardLayout,
        Header,
        FactorForm
    },

    data() {
        return {
            loading: false,
            factor: null,
        }
    },

    methods: {
        /**
         * validate Form
         */
        validate() {
            this.$refs.BrandForm.$refs.FactorForm.validate()
            if (this.$refs.BrandForm.valid) {
                this.submitForm()
            }
        },

        /**
         * Submit form
         */
        async submitForm() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'factor/crud/create'
            AxiosMethod.form = formdata
            formdata.append('supplier_id', this.$refs.FactorForm.form.supplier_id)
            formdata.append('factor_number', this.$refs.FactorForm.form.factor_number)
            formdata.append(`pre_factor_number`, this.$refs.FactorForm.form.pre_factor_number)
            formdata.append('status', this.$refs.FactorForm.form.status)

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/factor/index');
                openToast(
                    this.$store,
                    'فاکتور با موفقیت ایجاد شد.',
                    "success"
                );

            } else {
                this.loading = false
            }
        }
    },

    /**
     * Get brans
     */
    async getFactor() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'factor/crud/get/' + this.$route.params.id
        AxiosMethod.toast_error = true
        let data = await AxiosMethod.axios_get()
        if (data) {
            this.factor = data.data
        }

    }
}
</script>
