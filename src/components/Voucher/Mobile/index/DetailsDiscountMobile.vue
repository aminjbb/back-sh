<template>
    <v-bottom-sheet v-model="detailsModal" >
            <v-card class="rounded-t-lg px-5 ">
                <div class="d-flex justify-space-between t16500  py-6">
                    <v-icon   @click="detailsModal = false"  class="bg-grey-lighten-3 rounded-circle" color="grey-darken-1">
                        mdi-close
                    </v-icon>
                    <span >اطلاعات کد تخفیف</span>
                </div>

                    <v-list >
                        <template v-if="voucherDetail?.order_count">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.order_count}}
                                </span>
                                    <div>
                                        <span > تعداد استفاده سفارش </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.user_limit">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.user_limit}}
                                </span>
                                    <div>
                                        <span > تعداد استفاده مشتری </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.min_order_price">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.min_order_price}}
                                </span>
                                    <div>
                                        <span > حداقل هزینه سفارش </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.order_limit">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.order_limit}}
                                </span>
                                    <div>
                                        <span > چندمین سفارش </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.order_limit">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.order_limit}}
                                </span>
                                    <div>
                                        <span > چندمین سفارش </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.start_time_fa">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.start_time_fa}}
                                </span>
                                    <div>
                                        <span > تاریخ شروع </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.end_time_fa">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.end_time_fa}}
                                </span>
                                    <div>
                                        <span > تاریخ پایان </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.state?.label">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1">
                                     {{voucherDetail?.state?.label}}
                                </span>
                                    <div>
                                        <span > استان </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.sending_price">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    <span v-if="voucherDetail?.sending_price === 'free' "> رایگان </span>
                                    <span v-if="voucherDetail?.sending_price === 'default' "> عادی </span>
                                </span>
                                    <div>
                                        <span > هزینه ارسال </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                        <template v-if="voucherDetail?.max_discount">
                            <v-list-item-title>
                                <div class="d-flex justify-space-between t12500 my-4">
                                <span class="text-grey-lighten-1 number-font">
                                    {{voucherDetail?.max_discount}}
                                </span>
                                    <div>
                                        <span > سقف اعمال تخفیف </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-divider/>
                        </template>

                    <!-- change status -->
                            <v-list-item-title>
                                <div class="d-flex justify-space-between align-center t12500 my-4">

                                    <v-switch  v-model="status" @change="changeStatus" inset  hide-details  color="success"></v-switch>
                                    <div>
                                        <span > وضعیت </span>
                                        <v-icon>mdi-circle-small</v-icon>
                                    </div>
                                </div>
                            </v-list-item-title>
                    </v-list>

            </v-card>
    </v-bottom-sheet>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    data(){
        return {
            detailsModal: false,
            voucherDetail: null,
            id: Number,
            status: false
        }
    },

    methods: {
        async getVoucherDetail() {

            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `voucher/crud/get/${this.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.voucherDetail = data.data
            }
        },
        async changeStatus(){

            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = "voucher/activation/" + this.id
            if (this.status) formdata.append('is_active', 1)
            else formdata.append('is_active', 0)

            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.$emit('updateVoucherList')
                this.detailsModal = false
            }
        }
    },

    watch:{
        detailsModal(val){
            if(this.detailsModal){
                this.getVoucherDetail()
            }
        },
        voucherDetail(val){
            if (this.voucherDetail.is_active == 1){
                this.status = true
            }else {
                this.status = false
            }
        },
    }
}
</script>

