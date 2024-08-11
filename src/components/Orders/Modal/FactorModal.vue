<template>
<div class="text-right">
  <div class="ma-3 pointer d--rtl" @click="dialog = true">
    <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
    <span class="mr-2 text-grey-darken-1 t14 w300">
                                        نمایش فاکتور مالی
                                    </span>
  </div>
    <v-dialog v-model="dialog" width="1060">
        <v-card class="py-5 px-3">
          <div>
            <div class="modal__content d--rtl py-3 d-flex justify-star align-center mb-3" style="padding-right:15%;padding-left:15%;">
              <div class="d-flex justify-center align-center pa-2 mb-2 flex-grow-1">
                <span class="modal__content__title">شناسه سفارش : </span>
                <span class="modal__content__txt number-font">
                      {{orderDetail?.id}}
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
                      {{orderDetail?.submit_date_fa}}
                    </span>
              </div>
            </div>

            <div class="modal__content d--rtl py-3 px-4 mb-3">
              <header class="modal__header d-flex justify-center align-center">
                    <span class="t16400 pa-6 pt-3">
                        مشخصات خریدار
                    </span>
              </header>

              <v-divider color="grey" class="mb-2" />

              <v-row class="ma-0">
                <v-col cols="3" class="pa-2">
                  <div class="d-flex align-center">
                    <span class="modal__content__title">نام شخص حقیقی/حقوقی: </span>
                    <span class="modal__content__txt">
                              {{orderDetail?.user?.first_name}} {{orderDetail?.user.last_name}}
                            </span>
                  </div>
                </v-col>

                <v-col cols="2" class="pa-2">
                  <div class="d-flex align-center">
                    <span class="modal__content__title">استان: </span>
                    <span class="modal__content__txt">
                              {{orderDetail?.state?.label}}
                            </span>
                  </div>
                </v-col>

                <v-col cols="2" class="pa-2">
                  <div class="d-flex align-center">
                    <span class="modal__content__title">شهر: </span>
                    <span class="modal__content__txt">
                               {{orderDetail?.city?.label}}
                            </span>
                  </div>
                </v-col>

                <v-col cols="5" class="pa-2">
                  <div class="d-flex align-center">
                    <span class="modal__content__title">آدرس: </span>
                    <span class="modal__content__txt">
                                {{orderDetail?.state?.label}} ،
                                {{orderDetail?.city?.label}} ،
                                {{orderDetail?.receiver_address}}
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
                               {{orderDetail?.receiver_postal_code}}
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
            <v-card min-height="500" class="d--rtl mt-2" >
              <FactorModalTable :perPage="10000" :page="1" :header="factorModalHeader" :items="factorDetails" />
            </v-card>

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
import Orders from "@/composables/Orders";
import FactorModalTable from '@/components/Orders/Table/FactorModalTable.vue'

export default {

    data() {
        return {
            dialog: false,
            generalDetails: null,
            userDetails: null,
            factorDetails: [],
            orderDetail:null
        }
    },
  props:{
    id:null
  },

    computed: {
        orderFactorModal() {
            try {
                return this.$store.getters['get_orderFactorModal']
            } catch (error) {
                return ''
            }
        }
    },

    setup(props) {
        const {
            factorModalHeader,
        } = Orders();
        return {
            factorModalHeader,
        };
    },

    components: {
        FactorModalTable,
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_orderFactorModal')
        },


        /**
         * Get order 'General' details by order_id
         */
        async getGeneralDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall();
            AxiosMethod.using_auth = true;
            AxiosMethod.token = this.$cookies.get('adminToken');
            AxiosMethod.end_point = `admin/order/crud/get/${this.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();

            if (data) {
              this.orderDetail = data.data
            }
        },

        /**
         * Get order 'Shps' details by order_id
         */
        async getShpsDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.id}`
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store
            let data = await AxiosMethod.axios_get();
            if (data) {
                this.factorDetails = data.data;
            } else {}
        },

        /**
         * Get order 'Payment' details by order_id
         */
        async getPaymentDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall();
            AxiosMethod.using_auth = true;
            AxiosMethod.token = this.$cookies.get('adminToken');
            AxiosMethod.end_point = `admin/order/crud/payment/detail/${this.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();

            if (data) {
              this.paymentDetails = data.data
            }
        },

        /**
         * Get order 'User' details by order_id
         */
        async getUserDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall();
            AxiosMethod.using_auth = true;
            AxiosMethod.token = this.$cookies.get('adminToken');
            AxiosMethod.end_point = `admin/order/crud/user/detail/${this.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();

            if (data) {
              this.userDetails = data.data
            }
        },

    },

    created() {
        this.$watch(
            () => this.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getUserDetails();
                    this.getShpsDetails();
                    this.getGeneralDetails();
                    this.getPaymentDetails();
                }
            }
        );
    },
}
</script>
