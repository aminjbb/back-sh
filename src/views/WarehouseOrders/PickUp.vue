<template>
    <v-layout style="background: #F7F8FA">
        <v-main class="vh-100 ">
            <template class="loading_modal" v-if="loadingProgress">
                <v-progress-circular
                    indeterminate
                    color="purple">
                </v-progress-circular>
            </template>
<!-- main -->
            <template v-if="mainPickUp">
                <div class="d-flex justify-space-between align-center">
                    <div class="pa-3 d-flex">
                        <HandheldDrawer/>
                        <span class="t20400">
                         جمع آوری کالا
                        </span>
                    </div>
                    <div class="pa-3">
                        <v-icon size="30" @click="$router.push('/locating/dashboard')">
                            mdi-chevron-left
                        </v-icon>
                    </div>
                </div>


                <div class="h-100 mx-8">

                    <v-card class="mt-3 pa-3 t16500 rounded-t-lg rounded-b-0"  height="50" flat  >
                        <v-row no-gutters>
                            <v-col cols="3"></v-col>
                            <v-col cols="6">
                                <div class="text-center">
                                    شناسه سفارش
                                </div>
                            </v-col>
                            <v-col cols="3">
                                <span class="py-1 px-5 bg-primary500 rounded-pill ms-auto">
                                    {{}}1/3
                                </span>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card class="mt-1 pa-3 t16400 rounded-b-lg rounded-t-0 text-center number-font text-grey"  height="50" flat  >
                        1111
                    </v-card>

                    <v-card class="mt-3 pa-3 t16500 rounded-t-lg rounded-b-0 text-center"  height="50" flat  >
                        جایگاه کالا
                    </v-card>
                    <v-card class="mt-1 pa-3 t16400 rounded-b-lg rounded-t-0 text-center number-font text-grey"  height="50" flat  >
                        1-1-1-1
                    </v-card>

                    <v-card class="my-3 pa-3 t16500 rounded-lg text-center number-font"  height="50" flat  >
                        <span class=" me-2 py-2 px-3 ps-4 bg-primary500 rounded number-font">
                            {{}}4
                        </span>
                        عدد از {{}} آیتم باقی مانده
                    </v-card>


                    <v-card class="my-3 pa-3 t16500 rounded-lg d-flex align-center"  min-height="75" flat  >
                            <v-text-field v-if="autoSendBarcode === 'automate'" v-debounce:150ms="scanShpss" v-model="shpssBarcode" variant="outlined" :autofocus="true" bg-color="white"/>
                            <v-text-field v-else @keyup.enter="scanShpss()" v-model="shpssBarcode" variant="outlined" :autofocus="true" bg-color="white"/>
                            <v-switch class="me-3 mb-3" flat :ripple="false"   label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSendBarcode" color="success"></v-switch>
                    </v-card>

                    <v-card class="my-3 pa-3 t16500 rounded-lg"  min-height="245" flat  >
                        <div class=" text-center ">
                            <v-img  src="" width="100" height="100"></v-img>
                        </div>
                        <div class="mt-2 mb-3 t20400 text-center number-font ">
                            12345
                        </div>
                        <div class="mx-10 t16500 text-center number-font text-grey">
                            سرم روشن کننده پوست پرایم مدل C_Prime ظرفیت ۳۰ میلی لیتر
                        </div>
                    </v-card>

                </div>

                <div class="mx-10 mb-5 bottom-0 right-0 left-0 position-absolute">
                    <v-btn
                        color="primary500"
                        :loading="loading"
                        height="40"
                        block
                        rounded
                        @click="goToShelfScan()"
                    >
                        محصولی برای جمع آوری وجود ندارد
                    </v-btn>
                </div>
            </template>
<!-- scan shelf -->
            <template v-if="shelf">

                <div class="d-flex justify-space-between align-center">
                    <div class="pa-3 d-flex">
                        <HandheldDrawer/>
                        <span class="t20400">
                         جمع آوری کالا
                        </span>
                    </div>
                    <div class="pa-3">
                        <v-icon size="30" @click="goToPickUp">
                            mdi-chevron-left
                        </v-icon>
                    </div>
                </div>


                <div class="h-100 mx-10 d-flex align-center justify-center">
                    <div style="width :100%">
                        <div class="text-center">
                            <v-icon  size="50">
                                mdi-barcode-scan
                            </v-icon>
                        </div>

                        <div class=" mt-8 text-center t20400">
                          شناسه شلف را اسکن کنید.
                        </div>

                        <div class=" mt-7 d-flex justify-center">
                            <v-text-field v-if="autoSendShelf === 'automate'" v-debounce:150ms="scanShelf" v-model="shelfBarcode" variant="outlined" :autofocus="true" bg-color="white"/>
                            <v-text-field v-else @keyup.enter="scanShelf()" v-model="shelfBarcode" variant="outlined" :autofocus="true" bg-color="white"/>
                        </div>

                        <div>
                            <v-switch flat :ripple="false" label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSendShelf" color="success"></v-switch>
                        </div>
                    </div>
                </div>

                <div class="mx-10 mb-5 bottom-0 right-0 left-0 position-absolute">
                    <v-btn
                        color="primary500"
                        :loading="loading"
                        height="40"
                        block
                        rounded
                        @click="scanShelf()"
                    >
                        تایید
                    </v-btn>
                </div>
            </template>
<!--Result Pages-->
            <template v-if="FailedPickUp">
                <div class="h-100 bg-warning d-flex justify-center align-center" >

                    <div class=" text-center mx-15">
                        <v-icon size="40">
                            mdi-alert-circle
                        </v-icon>
                        <div class="mt-15 mb-7 t20700">
                            جمع آوری سفارش انجام نشد.
                        </div>
                        <div class="t20400">
                            کالایی برای جمع آوری یافت نشد.
                        </div>
                    </div>

                    <div class="px-5 d-flex justify-center t16500" style="  position: absolute; bottom: 30px; left: 0;right: 0;">
                        <v-btn
                            variant="outlined"
                            height="40"
                            width="40%"
                            rounded
                            @click="$router.push('/locating/dashboard')"
                            class="px-8 mt-5 me-3">
                            بازگشت به داشبورد
                        </v-btn>

                        <v-btn
                            height="40"
                            width="40%"
                            flat
                            rounded
                            @click="getNextTask()"
                            class="px-8 mt-5 ms-3">
                            سفارش بعدی
                        </v-btn>
                    </div>

                </div>
            </template>
            <template v-if="LackPickUp">
                <div class="h-100 bg-yellow-custom d-flex justify-center align-center" >

                    <div class=" text-center text-black mx-15">
                        <v-icon size="40" color="black">
                            mdi-check-circle
                        </v-icon>
                        <div class="mt-15 mb-7 t20700">
                            جمع آوری سفارش با کسری بسته شد.
                        </div>
                        <div class="t20400">
                            جمع آوری سفارش با شناسه {{  }} با کسری انجام شد.
                        </div>
                    </div>

                    <div class="px-5 d-flex justify-center t16500" style="  position: absolute; bottom: 30px; left: 0;right: 0;">
                        <v-btn
                            variant="outlined"
                            height="40"
                            width="40%"
                            rounded
                            @click="$router.push('/locating/dashboard')"
                            class="px-8 mt-5 me-3">
                            بازگشت به داشبورد
                        </v-btn>

                        <v-btn
                            height="40"
                            width="40%"
                            flat
                            rounded
                            @click="getNextTask()"
                            class="px-8 mt-5 ms-3">
                            سفارش بعدی
                        </v-btn>
                    </div>

                </div>
            </template>
            <template v-if="DonePickUp">
                    <div class="h-100 bg-success d-flex justify-center align-center" >

                        <div class=" text-center mx-15">
                                <v-icon size="40">
                                    mdi-check-circle
                                </v-icon>
                                <div class="mt-15 mb-7 t20700">
                                    جمع آوری با موفقیت انجام شد.
                                </div>
                                <div class="t20400">
                                    جمع آوری سفارش با شناسه {{  }} با موفقیت انجام شد.
                                </div>
                        </div>

                        <div class="px-5 d-flex justify-center t16500" style="  position: absolute; bottom: 30px; left: 0;right: 0;">
                            <v-btn
                                variant="outlined"
                                height="40"
                                width="40%"
                                rounded
                                @click="$router.push('/locating/dashboard')"
                                class="px-8 mt-5 me-3">
                                بازگشت به داشبورد
                            </v-btn>

                            <v-btn
                                height="40"
                                width="40%"
                                flat
                                rounded
                                @click="getNextTask()"
                                class="px-8 mt-5 ms-3">
                                سفارش بعدی
                            </v-btn>
                        </div>

                    </div>
                </template>
            <template v-if="NotFoundPickUp">
                <div class="h-100 bg-warning d-flex justify-center align-center" >

                    <div class=" text-center mx-15">
                        <v-icon size="40">
                            mdi-alert-circle
                        </v-icon>
                        <div class="mt-15 t20700">
                            کالایی برای جمع آوری یافت نشد.
                        </div>
                    </div>

                    <div class="px-15 d-flex justify-center t16500" style="  position: absolute; bottom: 30px; left: 0;right: 0;">
                        <v-btn
                            height="40"
                            flat
                            block
                            rounded
                            @click="$router.push('/locating/dashboard')"
                            class="px-8 mt-5 me-3">
                            بازگشت به داشبورد
                        </v-btn>
                    </div>

                </div>
            </template>

        </v-main>
    </v-layout>
</template>

<script >
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import WarehouseOrder from '@/composables/WarehouseOrder'
import {openToast} from "@/assets/js/functions";
import { AxiosCall } from '@/assets/js/axios_call.js'
import axios from "axios";


export default{
    components:{
        HandheldDrawer
    },

    data() {
        return {
            test: false,
            autoSendBarcode: 'automate',
            autoSendShelf: 'automate',

            loadingProgress: false,
            shelf: false,
            mainPickUp: false,
            NotFoundPickUp: false,
            DonePickUp: false,
            FailedPickUp: false,
            LackPickUp: false,
            NullPickUp: false,
            loading: false,

            testPickUpCount: Number,
            pickUpShps: null,
            pickUpCount: null,
            lastBarcode: null,
            shpssBarcode: '',
            shelfBarcode: '',
        }
    },

    methods: {
        async getNextTask(){
            await this.getPickUpShps()
            this.pickUpDone = false
        },

        async scanShpss(){
            try {
                if (this.lastBarcode !== this.shpssBarCode) {
                    this.lastBarcode = this.shpssBarCode

                    this.loadingProgress = true
                    const formData = new FormData()
                    formData.append('barcode', this.shpssBarcode)
                    await axios
                        .post(`${import.meta.env.VITE_API_BASEURL}/v1/warehouse/order/pickup/get`, formData, {
                            headers: {
                                Authorization:
                                    "Bearer " + this.$cookies.get('adminToken')
                            },
                        })
                        .then((response) => {
                            this.loadingProgress = false
                            this.shpssBarCode = ''
                            if (this.testPickUpCount > 1) {
                                this.getPickUpShps()
                            } else {
                                this.pickUpDone = true
                            }
                        })
                        .catch((err) => {
                            if (err.response.status == 401) {
                                this.$router.push('/login')
                            } else if (err.response.status == 403) {
                                openToast(
                                    this.$store,
                                    'مجاز به عملیات نیستید',
                                    "error"
                                );
                            } else if (err.response.status == 418) {
                                openToast(
                                    this.$store,
                                    err.response.data.message,
                                    "error"
                                );
                                setTimeout(() => {
                                    window.location.reload()
                                }, 4000)
                            } else {
                                openToast(
                                    this.$store,
                                    err.response.data.message,
                                    "error"
                                );
                            }
                        });
                }
            }
            catch (error) {
                this.shpssBarCode = ''
                this.loadingProgress = false
            }
        },

        async getPickUpShps(){
            this.loadingProgress = true
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `warehouse/order/pickup/my-tasks`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.loadingProgress = false
                if (data.data.length === 0) this.NullPickUp = true
                this.pickUpShps = data.data
                this.pickUpCount = parseInt(data.data.count) - parseInt(data.data.picked_count)
            }

            else {
                this.loadingProgress = false
            }
        },


        async scanShelf(){
            try{
                if (this.lastBarcode !== this.shelfBarcode) {
                    this.lastBarcode = this.shelfBarcode

                    this.loadingProgress = true
                    const AxiosMethod = new AxiosCall()
                    AxiosMethod.using_auth = true
                    AxiosMethod.toast_error = true
                    AxiosMethod.store = this.$store
                    AxiosMethod.token = this.$cookies.get('adminToken')
                    AxiosMethod.end_point = 'warehouse/order/pickup/not-found/' + this.shelfBarcode
                    let data = await AxiosMethod.axios_get()
                    if (data) {
                        this.loadingProgress = false
                        this.shelf = false
                        this.shelfBarcode = ''
                        this.getPickUpShps()
                    }
                    else {
                        this.loadingProgress = false
                    }
                }
            }
            catch (e) {
            this.loadingProgress = false
            }
        },

        goToShelfScan(){
            this.lastBarcode = ''
            this.shpssBarcode= ''
            this.mainPickUp = false
            this.shelf = true
        },

        async goToPickUp(){
            this.lastBarcode = ''
            this.shelfBarcode = ''

            await this.getPickUpShps()
            this.Shelf = false
            this.mainPickUp = true
        },

        toasts(){
            openToast(
                this.$store,
                'این کالا با کالای مورد نیاز در تسک مطابقت ندارد.',
                "error"
            )
            openToast(
                this.$store,
                'این کالا قبلا جمع آوری شده است.',
                "error"
            )
            openToast(
                this.$store,
                'لطفا تا اتمام پردازش سیستم صبر کنید',
                "info"
            )
            openToast(
                this.$store,
                'در حال دریافت اطلاعات',
                "info"
            )
            openToast(
                this.$store,
                'این کالا قبلا جمع آوری شده است.',
                "success"
            )
        }
    },

    mounted() {
        this.getPickUpShps()
    },
}
</script>

<style>
.bg-yellow-custom{
    background: #FDDF42;
}
</style>