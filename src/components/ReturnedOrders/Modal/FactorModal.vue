<template>
<div class="text-right">
    <v-dialog v-model="returnedOrderFactorModal.dialog" width="1060">
        <v-card class="py-5 px-3">
            <div class="modal__content d--rtl py-3 d-flex justify-star align-center mb-3" style="padding-right:15%;padding-left:15%;">
                <div class="d-flex justify-center align-center pa-2 mb-2 flex-grow-1">
                    <span class="modal__content__title">شناسه سفارش : </span>
                    <span class="modal__content__txt number-font">
                    </span>
                </div>

                <div class="d-flex justify-center align-center pa-2 mb-2 flex-grow-1">
                    <span class="modal__content__title">هزینه پست : </span>
                    <span class="modal__content__txt number-font">
                    </span>
                </div>

                <div class="d-flex justify-center align-center pa-2 flex-grow-1">
                    <span class="modal__content__title">تاریخ ثبت سفارش: </span>
                    <span class="modal__content__txt number-font">
                    </span>
                </div>
            </div>

            <div class="modal__content d--rtl py-3 px-4 mb-3">
                <header class="modal__header d-flex justify-center align-center">
                    <span class="t16 w400 pa-6 pt-3">
                        مشخصات خریدار
                    </span>
                </header>

                <v-divider color="grey" class="mb-2" />

                <v-row class="ma-0">
                    <v-col cols="3" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">نام شخص حقیقی/حقوقی: </span>
                            <span class="modal__content__txt">
                            </span>
                        </div>
                    </v-col>

                    <v-col cols="2" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">استان: </span>
                            <span class="modal__content__txt">
                            </span>
                        </div>
                    </v-col>

                    <v-col cols="2" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">شهر: </span>
                            <span class="modal__content__txt">
                            </span>
                        </div>
                    </v-col>

                    <v-col cols="5" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">آدرس: </span>
                            <span class="modal__content__txt">
                            </span>
                        </div>
                    </v-col>
                </v-row>

                <v-row class="ma-0">
                    <v-col cols="3" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">شماره اقتصادی: </span>
                            <span class="modal__content__txt number-font">
                            </span>
                        </div>
                    </v-col>

                    <v-col cols="2" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">شماره ثبت: </span>
                            <span class="modal__content__txt number-font">
                            </span>
                        </div>
                    </v-col>

                    <v-col cols="2" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">کد پستی: </span>
                            <span class="modal__content__txt number-font">
                            </span>
                        </div>
                    </v-col>

                    <v-col cols="5" class="pa-2">
                        <div class="d-flex align-center">
                            <span class="modal__content__title">شناسه ملی: </span>
                            <span class="modal__content__txt number-font">
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="modal__content d--rtl mb-3">
                <FactorModalTable :header="factorModalHeader" :items="factorDetails" />
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    closeModal
} from "@/assets/js/functions_seller";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import ReturnedOrders from "@/composables/ReturnedOrders";
import FactorModalTable from '@/components/ReturnedOrders/Table/FactorModalTable.vue'

export default {

    data() {
        return {
            dialog: false,
            userDetails: [],
            factorDetails: [],
        }
    },

    computed: {
        returnedOrderFactorModal() {
            try {
                return this.$store.getters['get_returnedOrderFactorModal']
            } catch (error) {
                return ''
            }
        }
    },

    setup(props) {
        const {
            factorModalHeader,
        } = ReturnedOrders();
        return {
            factorModalHeader,
        };
    },

    components: {
        FactorModalTable,
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_returnedOrderFactorModal')
        },

        /**
         * Get order 'Shps' details by order_id
         */
        async getShpsDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.returnedOrderFactorModal.id}`
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store
            let data = await AxiosMethod.axios_get();
            if (data) {
                this.shpsDetails = data.data;
            } else {}
        },

        /**
         * Get order 'User' details by order_id
         */
        async getUserDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall();
            AxiosMethod.using_auth = true;
            AxiosMethod.token = this.$cookies.get('adminToken');
            AxiosMethod.end_point = `admin/order/crud/user/detail/${this.returnedOrderFactorModal.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();

            if (data) {
                if (data.data) {
                    this.userDetails = [{
                            label: 'نام مشتری ',
                            value: data.data.first_name && data.data.last_name ? `${data.data.first_name} ${data.data.last_name}` : '-'
                        },
                        {
                            label: 'استان',
                            value: data.data.addresses && data.data.addresses[0] && data.data.addresses[0].state ? data.data.addresses[0].state.label : '-'
                        },
                        {
                            label: 'شهر',
                            value: data.data.addresses && data.data.addresses[0] && data.data.addresses[0].city ? data.data.addresses[0].city.label : '-'
                        },
                        {
                            label: 'تلفن',
                            value: data.data.phone_number ? data.data.phone_number : '-'
                        },
                        {
                            label: 'موبایل',
                            value: data.data.phone_number ? data.data.phone_number : '-'
                        },
                        {
                            label: 'کد پستی',
                            value: data.data.addresses && data.data.addresses[0] && data.data.addresses[0].postal_code ? data.data.addresses[0].postal_code : '-'
                        },
                        {
                            label: 'آدرس',
                            value: data.data.addresses && data.data.addresses[0] && data.data.addresses[0].address ? data.data.addresses[0].address : '-'
                        },
                    ]
                }
            }
        },

    },

    created() {
        this.$watch(
            () => this.returnedOrderFactorModal.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getUserDetails();
                    this.getShpsDetails();
                }
            }
        );
    },
}
</script>
