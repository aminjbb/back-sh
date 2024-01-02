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
                        اطلاعات پرداخت
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
            /* shpsDetails: [], */
            shpsDetails: [{
                    "id": 19,
                    "shps": {
                        "sku": {
                            "id": 1,
                            "label": "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  آبرسانی 1 عدد",
                            "seller": {
                                "id": 2,
                                "shopping_name": "فروشگاه نکین اسدی3ثث"
                            }
                        }
                    },
                    "price": 2250000,
                    "count": 10,
                    "base_discount": 1000,
                    "marketing_discount": 9000
                },
                {
                    "id": 19,
                    "shps": {
                        "sku": {
                            "id": 1,
                            "label": " خشک دارای خاصیت  آبرسانی 1",
                            "seller": {
                                "id": 2,
                                "shopping_name": "فروشگاه نکین اسدی3ثث"
                            }
                        }
                    },
                    "price": 2250000,
                    "count": 10,
                    "base_discount": 1000,
                    "marketing_discount": 9000
                }
            ],
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
            AxiosMethod.end_point = `admin/order/crud/user/detail/${this.orderDetailsModal.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();
            //TODO : After set api delete userMocketData and user data insted of userMocketData

            if (data) {
                if (data.data) {
                    this.userDetails = [{
                            label: 'شناسه سفارش',
                            value: data.data.first_name && data.data.last_name ? `${data.data.first_name} ${data.data.last_name}` : '-'
                        },
                        {
                            label: 'وضعیت سفارش',
                            value: data.data.addresses && data.data.addresses ? data.data.addresses.label : '-'
                        },
                        {
                            label: 'وضعیت بارگیری',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].city : '-'
                        },
                        {
                            label: 'تاریخ ثبت سفارش',
                            value: data.data.phone_number ? data.data.phone_number : '-'
                        },
                        {
                            label: 'تاریخ ارسال سفارش',
                            value: data.data.phone_number ? data.data.phone_number : '-'
                        },
                        {
                            label: 'کد معرف',
                            value: data.data.addresses && data.data.addresses[0].postal_code ? data.data.addresses[0].postal_code : '-'
                        },
                        {
                            label: 'آدرس',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
                        },
                        {
                            label: 'شناسه بانکی',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
                        },
                        {
                            label: 'وضعیت پرداخت',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
                        },
                        {
                            label: 'کل مبلغ پرداختی',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
                        },
                        {
                            label: 'مبلغ پرداختی از کیف پول',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
                        },
                        {
                            label: 'مبلغ پرداختی از درگاه بانکی',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
                        },
                        {
                            label: 'مبلغ پرداختی با اعتبار اسنپ پی',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
                        },
                        {
                            label: 'هزینه ارسال',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
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
                //TODO : After set api delete shpsDetails and user data insted of shpsDetails
                /* this.shpsDetails = data.data; */
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
            AxiosMethod.end_point = `admin/order/crud/user/detail/${this.orderDetailsModal.id}`;
            AxiosMethod.form = formdata;
            AxiosMethod.store = this.$store;
            let data = await AxiosMethod.axios_get();
            //TODO : After set api delete userMocketData and user data insted of userMocketData

            if (data) {
                if (data.data) {
                    this.userDetails = [{
                            label: 'وضعیت پرداخت',
                            value: data.data.first_name && data.data.last_name ? `${data.data.first_name} ${data.data.last_name}` : '-'
                        },
                        {
                            label: 'کد رهگیری',
                            value: data.data.addresses && data.data.addresses ? data.data.addresses.label : '-'
                        },
                        {
                            label: 'تاریخ پرداخت',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].city : '-'
                        },
                        {
                            label: 'کل مبلغ پرداختی بدون تخفیف',
                            value: data.data.phone_number ? data.data.phone_number : '-'
                        },
                        {
                            label: 'کل مبلغ پرداختی با تخفیف',
                            value: data.data.phone_number ? data.data.phone_number : '-'
                        },
                        {
                            label: 'مبلغ تخفیف ',
                            value: data.data.addresses && data.data.addresses[0].postal_code ? data.data.addresses[0].postal_code : '-'
                        },
                        {
                            label: 'مالیات بر ارزش افزوده',
                            value: data.data.addresses && data.data.addresses[0] ? data.data.addresses[0].address : '-'
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
            //TODO : After set api delete userMocketData and user data insted of userMocketData
            const userMocketData = {
                "data": {
                    "id": 3,
                    "first_name": "اویس",
                    "last_name": "اویس",
                    "national_code": null,
                    "phone_number": "09301370911",
                    "email": "rostami.ov@gmail.com",
                    "role_id": 4,
                    "birth_date": null,
                    "is_ban": 0,
                    "avatar": "http://localhost:8000/storage/shavaz/user/user-logo.jpg",
                    "created_at": "2023-11-01T12:00:39.000000Z",
                    "updated_at": "2023-11-05T12:00:39.000000Z",
                    "created_at_fa": "1402/08/10",
                    "updated_at_fa": "1402/08/14",
                    "birth_date_fa": null,
                    "addresses": [{
                        "id": 1,
                        "user_id": 3,
                        "first_name": "حانیه",
                        "last_name": "عاصمی",
                        "address": "کوی ارم خیابان بهار شمالی ",
                        "state_id": 1,
                        "city_id": 1,
                        "postal_code": "443787920",
                        "number": "14",
                        "unit": "520",
                        "phone_number": "09905042769",
                        "am_i": 1,
                        "created_at": null,
                        "updated_at": null,
                        "state": {
                            "id": 1,
                            "name": "fars",
                            "label": "فارس",
                            "priority": "5",
                            "is_active": 1,
                            "created_at": null,
                            "updated_at": null
                        },
                        "city": {
                            "id": 1,
                            "name": null,
                            "label": "شیراز",
                            "priority": "1",
                            "state_id": 1,
                            "is_active": 1,
                            "created_at": null,
                            "updated_at": null
                        }
                    }]
                }
            };

            if (userMocketData) {
                if (userMocketData.data) {
                    this.userDetails = [{
                            label: 'نام مشتری ',
                            value: userMocketData.data.first_name && userMocketData.data.last_name ? `${userMocketData.data.first_name} ${userMocketData.data.last_name}` : '-'
                        },
                        {
                            label: 'استان',
                            value: userMocketData.data.addresses && userMocketData.data.addresses[0] && userMocketData.data.addresses[0].state ? userMocketData.data.addresses[0].state.label : '-'
                        },
                        {
                            label: 'شهر',
                            value: userMocketData.data.addresses && userMocketData.data.addresses[0] && userMocketData.data.addresses[0].city ? userMocketData.data.addresses[0].city.label : '-'
                        },
                        {
                            label: 'تلفن',
                            value: userMocketData.data.phone_number ? userMocketData.data.phone_number : '-'
                        },
                        {
                            label: 'موبایل',
                            value: userMocketData.data.phone_number ? userMocketData.data.phone_number : '-'
                        },
                        {
                            label: 'کد پستی',
                            value: userMocketData.data.addresses && userMocketData.data.addresses[0] && userMocketData.data.addresses[0].postal_code ? userMocketData.data.addresses[0].postal_code : '-'
                        },
                        {
                            label: 'آدرس',
                            value: userMocketData.data.addresses && userMocketData.data.addresses[0] && userMocketData.data.addresses[0].address ? userMocketData.data.addresses[0].address : '-'
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
                //TODO : After set api delete shpsDetails and user data insted of shpsDetails
                /* this.discountDetails = data.data; */
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
                }
            }
        );
    },
}
</script>
