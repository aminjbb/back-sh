<template>
    <v-dialog width="470px" v-model="dialogSendingMethod">
        <v-card class="px-10 pt-4 pb-2">

            <div class="mb-3">
                <v-icon @click="dialogSendingMethod=false" class="float-left  pointer align-center pt-1">
                    mdi-close
                </v-icon>
                <div class="text-center t18800 text-black">
                    تغییر روش ارسال
                </div>
            </div>
            <v-divider :thickness="2"></v-divider>

            <div class=" my-5 ">
                    <div class="text-center text-grey-darken-1 t15500 mb-7 w-100" >
                        آیا می خواهید روش ارسال را تغییر دهید؟
                    </div>

                <v-row>
                    <v-spacer></v-spacer>
                    <v-radio-group   v-model="currentMethod" inline class="me-7 t12300" >
                        <v-radio v-for="(method, i) in sendingMethods" :key="i"     :label="method.title" :value="method.value"  class="ms-5"></v-radio>
                    </v-radio-group>
                    <v-spacer></v-spacer>
                </v-row>
            </div>

            <v-divider :thickness="2"></v-divider>
            <v-card-actions class="mt-3">
                <v-row justify="space-between" no-gutters>
                    <v-btn
                        :loading="loading"
                        @click="switchMethod"
                        height="40"
                        rounded
                        class= " bg-primary500 px-8 "
                    >
                        تایید
                    </v-btn>

                    <v-btn
                        @click="dialogSendingMethod = false"
                        height="40"
                        rounded
                        class="px-8 "
                    >
                        انصراف
                    </v-btn>
                </v-row>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
import { AxiosCall } from '@/assets/js/axios_call.js'
import {closeToast, openToast} from "@/assets/js/functions";

export default {
    props:{
        currentSendingMethod:null,
        sendingMethods: [],
        orderId: null
    },
    data(){
        return{
            dialogSendingMethod: false,
            loading: false,
            currentMethod: null
        }
    },
    methods:{
        async switchMethod(){
            this.loading = true
            var formdata = new FormData();
            formdata.append('sending_method', this.currentMethod)

            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `warehouse/order/packaging/update-sending-method/${this.orderId}`
            AxiosMethod.form = formdata
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                console.log(data?.data)
                this.loading = false
                this.dialogSendingMethod = false
                this.currentMethod = null
                if (data?.data?.is_completed) {
                    window.open(`${import.meta.env.VITE_API_SITEURL}order-packaging/${data?.data?.order?.id}/print`, '_blank');
                }
                else {
                    openToast(
                        this.$store,
                        'خطا در دریافت بارکد.',
                        "error",
                    );
                    console.log(data?.data?.is_completed)
                }
            }
            else {

                this.loading = false
                this.dialogSendingMethod = false
                this.currentMethod = null
                this.orderId = null

            }
        },
    },
    watch:{
        dialogSendingMethod(newVal){
            if (newVal === true){
                this.currentMethod = this.currentSendingMethod
            }
        }
    },
}
</script>

<style scoped>

</style>
