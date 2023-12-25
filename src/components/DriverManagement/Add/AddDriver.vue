<template lang="">
    <div class="mh-100">
        <v-card class="ma-5 br-12 pa-10 position__relative" min-height="600">
            <DriverManagementForm ref="DriverManagementForm" />
    
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
    </template>
    
    <script>
    import DriverManagementForm from '@/components/DriverManagement/DriverManagementForm.vue'
    
    import {
        openToast
    } from "@/assets/js/functions";
    import {
        AxiosCall
    } from '@/assets/js/axios_call.js'
    
    export default {
        components: {
            DriverManagementForm
        },
    
        data() {
            return {
                loading: false,
            }
        },
    
        methods: {
            /**
             * validate Form
             */
            validate() {
                this.$refs.DriverManagementForm.$refs.addFactor.validate()
                if (this.$refs.DriverManagementForm.valid) {
                    this.submitForm()
                }
            },
    
            /**
             * Submit form
             */
            async submitForm() {
                console.log(this.$refs.DriverManagementForm.form);
                this.loading = true
                var formdata = new FormData();
                const AxiosMethod = new AxiosCall()
                AxiosMethod.end_point = 'driver/crud/create'
                AxiosMethod.form = formdata
                formdata.append('full_name', this.$refs.DriverManagementForm.form.full_name)
                formdata.append('identification_code', this.$refs.DriverManagementForm.form.identification_code)
                formdata.append(`phone_number`, this.$refs.DriverManagementForm.form.phone_number)
                
    
                AxiosMethod.store = this.$store
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                let data = await AxiosMethod.axios_post()
                if (data) {
                    this.loading = false
                    this.$router.push('/driver-management/index');
                    openToast(
                        this.$store,
                        ' اطلاعات راننده با موفقیت ذخیره شد.',
                        "success"
                    );
    
                } else {
                    this.loading = false
                }
            }
        }
    }
    </script>
    