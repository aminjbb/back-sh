<template>
<div class="text-right">
    <v-dialog v-model="orderDetailsModal.dialog" width="1060">
        <v-card class="pa-5">
            <div class="accordion mb-5">
                <header class="accordion__header" id="accordion-header-1" @click="openAccordion(1)">
                    <span>
                        اطلاعات کلی
                    </span>

                    <v-icon class="accordion__header__btn" icon="mdi-chevron-down" />
                </header>

                <div class="accordion__content" id="accordion-content-1">
                    <div class="simple-table-parent">
                        <div class="simple-table">
                            <v-row
                                v-for="(item,index) in generalDetails"
                                :key="`general-${index}`"
                                class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion mb-5">
                <header class="accordion__header" id="accordion-header-2" @click="openAccordion(2)">
                    <span>
                        مشخصات گیرنده
                    </span>

                    <v-icon class="accordion__header__btn" icon="mdi-chevron-down" />
                </header>

                <div class="accordion__content" id="accordion-content-2">
                    <div class="simple-table-parent">
                        <div class="simple-table">
                            <v-row
                                v-for="(item,index) in userDetails"
                                :key="`user-${index}`"
                                class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion mb-5">
                <header class="accordion__header" id="accordion-header-3" @click="openAccordion(3)">
                    <span>
                        اطلاعات پرداخت
                    </span>

                    <v-icon class="accordion__header__btn" icon="mdi-chevron-down" />
                </header>

                <div class="accordion__content" id="accordion-content-3">
                    <div class="simple-table-parent">
                        <div class="simple-table">
                            <v-row
                                v-for="(item,index) in paymentDetails"
                                :key="`user-${index}`"
                                class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">{{ item.label }}</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ item.value }}</v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion mb-5">
                <header class="accordion__header" id="accordion-header-4" @click="openAccordion(4)">
                    <span>
                        تخفیف ها
                    </span>

                    <v-icon class="accordion__header__btn" icon="mdi-chevron-down" />
                </header>

                <div class="accordion__content" id="accordion-content-4">
                    <DiscountTable :items="discountDetails" :header="discountModalHeader" />
                </div>
            </div>

            <div class="accordion mb-5">
                <header class="accordion__header" id="accordion-header-5" @click="openAccordion(5)">
                    <span>
                        جزئیات سفارش
                    </span>

                    <v-icon class="accordion__header__btn" icon="mdi-chevron-down" />
                </header>

                <div class="accordion__content" id="accordion-content-5">
                    <ShpsTable :items="shpsDetails" :header="shpsModalHeader" />
                </div>
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
import ShpsTable from '@/components/Orders/Table/ShpsModalTable.vue'
import DiscountTable from '@/components/Orders/Table/DiscountModalTable.vue'

export default {

    data() {
        return {
            dialog: false,
            stockModel: null,
            userDetails: [],
            shpsDetails: [],
            paymentDetails:[],
            generalDetails:[],
            discountDetails:[],
        }
    },

    computed: {
        orderDetailsModal() {
            try {
                return this.$store.getters['get_orderDetailsModal']
            } catch (error) {
                return ''
            }
        }
    },

    setup(props) {
        const {
            shpsModalHeader,
            discountModalHeader
        } = Orders();
        return {
            shpsModalHeader,
            discountModalHeader
        };
    },

    components: {
        ShpsTable,
        DiscountTable
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_orderDetailsModal')
        },

        openAccordion(id) {
            const accordionHeader = document.getElementById(`accordion-header-${id}`);

            accordionHeader.classList.toggle("is-open");
            accordionHeader.children[1].classList.toggle("mdi-chevron-down");
            accordionHeader.children[1].classList.toggle("mdi-chevron-up");
            
            let content = accordionHeader.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        },

         /**
         * Get order 'General' details by order_id
         */
         async getGeneralDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall();
            AxiosMethod.using_auth = true;
            AxiosMethod.token = this.$cookies.get('adminToken');
            AxiosMethod.end_point = `admin/order/crud/get/${this.orderDetailsModal.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();

            if (data) {
                if (data.data) {
                    this.generalDetails = [{
                            label: 'شناسه سفارش',
                            value: data.data.id ? data.data.id : '-'
                        },
                        {
                            label: 'وضعیت سفارش',
                            value: data.data.status ? data.data.status : '-'
                        },
                        {
                            label: 'وضعیت بارگیری',
                            value: data.data.packed_status ? data.data.packed_status : '-'
                        },
                        {
                            label: 'تاریخ ثبت سفارش',
                            value: data.data.submit_date_fa ? data.data.submit_date_fa : '-'
                        },
                        {
                            label: 'تاریخ ارسال سفارش',
                            value: data.data.receive_date_fa ? data.data.receive_date_fa : '-'
                        },
                        {
                            label: 'کد معرف',
                            value: data.data.invitation_code  ? data.data.invitation_code : '-'
                        },
                        {
                            label: 'شناسه بانکی',
                            value: data.data.bank_number ? data.data.bank_number : '-'
                        },
                        {
                            label: 'وضعیت پرداخت',
                            value: data.data.payment_status ? data.data.payment_status : '-'
                        },
                        {
                            label: 'کل مبلغ پرداختی',
                            value: data.data.total_price ? data.data.total_price : '-'
                        },
                        {
                            label: 'مبلغ پرداختی از کیف پول',
                            value: data.data.paid_by_wallet ? data.data.paid_by_wallet : '-'
                        },
                        {
                            label: 'مبلغ پرداختی از درگاه بانکی',
                            value: data.data.paid_by_bank ? data.data.paid_by_bank : '-'
                        },
                        {
                            label: 'مبلغ پرداختی با اعتبار اسنپ پی',
                            value: data.data.paid_by_snapp ? data.data.paid_by_snapp : '-'
                        },
                        {
                            label: 'هزینه ارسال',
                            value: data.data.sending_price ? data.data.sending_price : '-'
                        },
                    ]
                }
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
            AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.orderDetailsModal.id}`
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store
            let data = await AxiosMethod.axios_get();
            if (data) {
                this.shpsDetails = data.data;
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
            AxiosMethod.end_point = `admin/order/crud/payment/detail/${this.orderDetailsModal.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();

            if (data) {
                if (data.data) {
                    this.paymentDetails = [{
                            label: 'وضعیت پرداخت',
                            value: data.data.payment_status ? data.data.payment_status : '-'
                        },
                        {
                            label: 'کد رهگیری',
                            value: data.data.addresses ? data.data.addresses : '-'
                        },
                        {
                            label: 'تاریخ پرداخت',
                            value: data.data.payment_date_fa ? data.data.payment_date_fa : '-'
                        },
                        {
                            label: 'کل مبلغ پرداختی بدون تخفیف',
                            value: data.data.total_price ? data.data.total_price : '-'
                        },
                        {
                            label: 'کل مبلغ پرداختی با تخفیف',
                            value: data.data.paid_price ? data.data.paid_price : '-'
                        },
                        {
                            label: 'مبلغ تخفیف ',
                            value: data.data.total_discount ? data.data.total_discount : '-'
                        },
                        {
                            label: 'مالیات بر ارزش افزوده',
                            value: data.data.tax_amount ? data.data.tax_amount : '-'
                        },
                    ]
                }
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
            AxiosMethod.end_point = `admin/order/crud/user/detail/${this.orderDetailsModal.id}`;
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

        /**
         * Get order 'Discount' details by order_id
         */
         async getDiscountDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `admin/order/crud/discount/detail/${this.orderDetailsModal.id}`
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store
            let data = await AxiosMethod.axios_get();
            if (data) {
                this.discountDetails = data.data;
            } else {}
        },
        
    },

    created() {
        this.$watch(
            () => this.orderDetailsModal.dialog,
            (dialogState) => {
                if (dialogState) {
                    this.getUserDetails();
                    this.getShpsDetails();
                    this.getPaymentDetails();
                    this.getGeneralDetails();
                }
            }
        );
    },
}
</script>
