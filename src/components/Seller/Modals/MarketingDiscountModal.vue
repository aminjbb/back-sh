<template>
<div class="text-center">
    <v-dialog
        v-model="marketingDiscountModal.dialog"
        width="908">
        <v-card>
            <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                    تخفیف مارکتینگ
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
                <div v-if="calculatedData !== null" class="modal__content modal__content--cols d--rtl py-3 px-4 d-flex justify-star align-center">
                    <div class="d-flex justify-star align-center pa-2 mb-2">
                        <span class="modal__content__title">قیمت مصرف کننده: </span>
                        <span v-if="calculatedData.customer_price !== null" class="modal__content__txt number-font">
                            {{calculatedData.customer_price}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2 mb-2">
                        <span class="modal__content__title">تخفیف پایه: </span>
                        <span v-if="calculatedData.base_discount !== null" class="modal__content__txt number-font">
                            {{calculatedData.base_discount}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">تخفیف مارکتینگ: </span>
                        <span v-if="calculatedData.marketing_discount !== null" class="modal__content__txt number-font">
                            {{calculatedData.marketing_discount}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">قیمت فروش: </span>
                        <span v-if="calculatedData.site_price !== null" class="modal__content__txt number-font">
                            {{calculatedData.site_price}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">زمان شروع تخفیف مارکتینگ: </span>
                        <span v-if="calculatedData.marketing_discount_start_time !== null" class="modal__content__txt number-font">
                            {{convertDate(calculatedData.marketing_discount_start_time)}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">زمان پایان تخفیف مارکتینگ : </span>
                        <span v-if="calculatedData.marketing_discount_end_time !== null" class="modal__content__txt number-font">
                            {{convertDate(calculatedData.marketing_discount_end_time)}}
                        </span>
                    </div>
                </div>

                <div v-else class="modal__content modal__content--cols d--rtl py-3 px-4 d-flex justify-star align-center">
                    <div class="d-flex justify-star align-center pa-2 mb-2">
                        <span class="modal__content__title">قیمت مصرف کننده: </span>
                        <span v-if="data && data.customer_price !== null" class="modal__content__txt number-font">
                            {{data.customer_price}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2 mb-2">
                        <span class="modal__content__title">تخفیف پایه: </span>
                        <span v-if="data && data.base_discount !== null" class="modal__content__txt number-font">
                            {{data.base_discount}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">تخفیف مارکتینگ: </span>
                        <span v-if="data && data.marketing_discount !== null" class="modal__content__txt number-font">
                            {{data.marketing_discount}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">قیمت فروش: </span>
                        <span v-if="data && data.site_price !== null" class="modal__content__txt number-font">
                            {{data.site_price}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">زمان شروع تخفیف مارکتینگ: </span>
                        <span v-if="data && data.marketing_discount_start_time !== null" class="modal__content__txt number-font">
                            {{convertDate(data.marketing_discount_start_time)}}
                        </span>
                    </div>

                    <div class="d-flex justify-star align-center pa-2">
                        <span class="modal__content__title">زمان پایان تخفیف مارکتینگ : </span>
                        <span v-if="data && data.marketing_discount_end_time !== null" class="modal__content__txt number-font">
                            {{convertDate(data.marketing_discount_end_time)}}
                        </span>
                    </div>
                </div>
            </div>

            <v-row class="mt-1 d--rtl">
                <v-col cols="6">
                    <div class="text-right px-5">
                        <span class="t12 w300 modal__label">
                            تاریخ شروع
                        </span>
                        <div align="center" class="d--ltr d-flex pb-5 align-center">
                            <date-picker
                                range
                                clearable
                                type="datetime"
                                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                format="jYYYY-jMM-jDD HH:mm"
                                display-format="jYYYY-jMM-jDD HH:mm"
                                v-model="createdAtModel"
                                variant="outlined" />
                        </div>
                    </div>
                </v-col>

                <v-col cols="6">
                    <div class="text-right px-5">
                        <span class="t12 w300 modal__label">
                            تاریخ پایان
                        </span>
                        <div align="center" class="d--ltr d-flex pb-5 align-center">
                            <date-picker
                                range
                                type="datetime"
                                class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                format="jYYYY-jMM-jDD HH:mm"
                                display-format="jYYYY-jMM-jDD HH:mm"
                                v-model="endedAtModel"
                                variant="outlined" />
                        </div>
                    </div>
                </v-col>

                <v-col cols="6">
                    <div class="text-right px-5">
                        <span class="t12 w300 modal__label">
                            نوع تخفیف
                        </span>
                        <v-select
                            :items="discountTypeData"
                            density="compact"
                            variant="outlined"
                            single-line
                            item-title="label"
                            item-value="value"
                            v-model="discountTypeModel" />
                    </div>
                </v-col>

                <v-col cols="6">
                    <div class="text-right px-5">
                        <span class="t12 w300 modal__label">
                            مقدار تخفیف
                        </span>
                        <v-text-field
                            class="w-100"
                            type="number"
                            density="compact"
                            variant="outlined"
                            :disabled="discountTypeModel == null ?  true : false"
                            single-line
                            v-model="discountModel"
                            v-debounce="calculateMarketingDiscount"
                            :rules="rule" />
                    </div>
                </v-col>
            </v-row>

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
                    @click="updateMarketingDiscount()"
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
} from '@/assets/js/axios_call.js'
import {
    openToast,
    jalaliToGregorian,
    gregorian_to_jalali
} from "@/assets/js/functions";
export default {
    data() {
        return {
            loading: false,
            rule: [v => !!v || 'این فیلد الزامی است'],

            discountTypeData: [{
                    label: 'درصدی',
                    value: 'percent',
                },
                {
                    label: 'ریالی',
                    value: 'rial',
                }
            ],

            createdAtModel: null,
            endedAtModel: null,
            discountModel: null,
            discountTypeModel: null,

            gregorianCreateDate: null,
            gregorianEndDate: null,

            data: null,
            calculatedData: null,

        }
    },

    computed: {
        marketingDiscountModal() {
            try {
                return this.$store.getters['get_marketingDiscountModal']
            } catch (error) {
                return ''
            }
        },

        createdAt() {
            if (this.createdAtModel) {
                const splitDate = this.createdAtModel[0].split('-')
                const splitDateTime = splitDate[2].split(' ')
                const date = jalaliToGregorian(splitDate[0], splitDate[1], splitDateTime[0])

                this.gregorianCreateDate = date + ' ' + splitDateTime[1] + ':00';
            }
            return this.gregorianCreateDate;
        },

        endedAt() {
            if (this.endedAtModel) {
                const splitDate = this.endedAtModel[0].split('-')
                const splitDateTime = splitDate[2].split(' ')
                const date = jalaliToGregorian(splitDate[0], splitDate[1], splitDateTime[0])

                this.gregorianEndDate = date + ' ' + splitDateTime[1] + ':00';
            }
            return this.gregorianEndDate;
        },
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_marketingDiscountModal')
            this.calculatedData = null;
            this.createdAtModel= null;
            this.endedAtModel= null;
            this.discountModel= null;
            this.discountTypeModel= null;
        },

        async getShps() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/get/${this.marketingDiscountModal?.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.data = data.data;
            }
        },

        async updateMarketingDiscount() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/update/marketing_discount/${this.marketingDiscountModal?.id}`
            AxiosMethod.form = formdata

            formdata.append('marketing_discount', this.discountModel !== null ? this.discountModel : this.data.marketing_discount)
            formdata.append('marketing_discount_type', this.discountTypeModel !== null ? this.discountTypeModel : this.data.marketing_discount_type)
            formdata.append('marketing_discount_start_time', this.createdAt !== null ? this.createdAt : this.data.marketing_discount_start_time)
            formdata.append('marketing_discount_end_time', this.endedAt !== null ? this.endedAt : this.data.marketing_discount_end_time)
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
        },

        async calculateMarketingDiscount() {
            this.calculatedData = null;
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/sku/update/marketing_discount/${this.marketingDiscountModal?.id}`
            AxiosMethod.form = formdata

            formdata.append('marketing_discount', this.discountModel !== null ? this.discountModel : this.data.marketing_discount)
            formdata.append('marketing_discount_type', this.discountTypeModel !== null ? this.discountTypeModel : this.data.marketing_discount_type)
            formdata.append('marketing_discount_start_time', this.createdAt !== null ? this.createdAt : this.data.marketing_discount_start_time)
            formdata.append('marketing_discount_end_time', this.endedAt !== null ? this.endedAt : this.data.marketing_discount_end_time)
            formdata.append('step', 'calculate')

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.calculatedData = data.data;
            }
            else{
                openToast(
                    this.$store,
                    'ویرایش با مشکل مواجه شد',
                    "error"
                );
            }
        },

        /**
         * Update list
         * @param {*} status 
         */
        updateList(status) {
            this.$emit('updateList', status);
        },

        /**
         * Convert date
         * @param {*} dateTime 
         */
        convertDate(dateTime) {
            try {
                const splitDate = dateTime.split('-')
                const splitDateTime = splitDate[2].split(' ')
                const date = gregorian_to_jalali(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDateTime[0]))

                const finalDate = date + ' ' + splitDateTime[1];
                return finalDate;
            } catch (e) {
                return e
            }
        },
    },

    created() {
        this.$watch(
            () => this.marketingDiscountModal.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getShps();
                }
            }
        );
    },
}
</script>
