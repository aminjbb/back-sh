<template>
<div class="text-center">
    <v-dialog
        v-model="consumerPriceModal.dialog"
        width="468">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                    قیمت مصرف کننده
                </span>

                <v-btn
                    class="modal__header__btn"
                    @click="close()"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>
            <div class="mb-5 px-5">
                <v-divider />
            </div>

            <div class="pa-4">
                <div class="modal__content modal__content--cols d--rtl py-3 px-4 d-flex justify-star align-center">
                    <div class="d-flex justify-star align-center pa-2 mb-2">
                        <span class="modal__content__title">قیمت مصرف کننده: </span>
                        <span v-if="priceInfo && priceInfo.customer_price !== null" class="modal__content__txt number-font">{{priceInfo.customer_price}}</span>
                    </div>
                    <div class="d-flex justify-star align-center pa-2 mb-2">
                        <span class="modal__content__title">تخفیف پایه: </span>
                        <span v-if="priceInfo && priceInfo.base_discount !== null" class="modal__content__txt number-font">{{priceInfo.base_discount}}</span>
                    </div>
                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">تخفیف مارکتینگ: </span>
                        <span v-if="priceInfo && priceInfo.marketing_discount !== null" class="modal__content__txt number-font">{{priceInfo.marketing_discount}}</span>
                    </div>
                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">قیمت فروش: </span>
                        <span v-if="priceInfo && priceInfo.site_price !== null" class="modal__content__txt number-font">{{priceInfo.site_price}}</span>
                    </div>
                </div>
            </div>

            <div class="text-right pa-5">
                <span class="t12300 modal__label">
                    قیمت مصرف کننده (ریال)
                </span>
                <v-text-field
                    class="w-100"
                    type="number"
                    density="compact"
                    variant="outlined"
                    single-line
                    v-model="priceModel"
                    :rules="rule"
                    v-debounce="calculateCustomerPrice" />
            </div>

            <div class="mt-5 px-5">
                <v-divider />
            </div>

            <footer class="d--rtl d-flex justify-between align-center pa-4 pt-3">
                <v-btn
                    @click="close()"
                    variant="text"
                    height="40"
                    rounded
                    class="px-5 mt-1">
                    انصراف
                </v-btn>

                <v-btn
                    :loading="loading"
                    color="primary500"
                    @click="updateCustomerPrice()"
                    height="40"
                    rounded
                    class="px-5 mt-1">
                    <span>
                        تایید
                    </span>
                </v-btn>
            </footer>
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
} from '@/assets/js/axios_call.js';
import {
    openToast
} from "@/assets/js/functions";
export default {
    data() {
        return {
            loading: false,
            rule: [v => !!v || 'این فیلد الزامی است'],
            priceModel: null,
            priceInfo: {},
        }
    },

    computed: {
        consumerPriceModal() {
            try {
                return this.$store.getters['get_consumerPriceModal']
            } catch (error) {
                return ''
            }
        }
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_consumerPriceModal');
            this.priceModel = null;
        },

        async getShps() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/get/${this.consumerPriceModal?.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.priceInfo = data.data;
            }
        },

        async updateCustomerPrice() {
           try {
             this.loading = true
             var formdata = new FormData();
             const AxiosMethod = new AxiosCall()
             AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/update/customer_price/${this.consumerPriceModal?.id}`
             AxiosMethod.form = formdata
             formdata.append('customer_price', this.priceModel)
             formdata.append('step', 'update')

             AxiosMethod.store = this.$store
             AxiosMethod.using_auth = true
             AxiosMethod.token = this.$cookies.get('adminToken')
             let data = await AxiosMethod.axios_post()
             if (data) {
               this.loading = false;
               this.close();
               openToast(
                   this.$store,
                   'کالای فروشنده با موفقیت ویرایش گردید',
                   "success"
               );
               this.updateList('true');
             } else {
               this.loading = false;
               openToast(
                   this.$store,
                   'ویرایش با مشکل مواجه شد',
                   "error"
               );
             }
           }
           catch (e) {
             this.loading = false;
           }
        },

        async calculateCustomerPrice() {
            this.priceInfo = {};
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/update/customer_price/${this.consumerPriceModal?.id}`
            AxiosMethod.form = formdata
            formdata.append('customer_price', this.priceModel)
            formdata.append('step', 'calculate')

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.priceInfo = data.data;
            }
        },

        /**
         * Update list
         * @param {*} status 
         */
         updateList(status) {
            this.$emit('updateList', status);
        },
    },

    created() {
        this.$watch(
            () => this.consumerPriceModal.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getShps();
                }
            }
        );
    },
}
</script>
