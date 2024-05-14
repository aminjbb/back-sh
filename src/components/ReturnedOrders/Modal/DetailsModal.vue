<template>
<div class="text-right">
    <v-dialog v-model="returnedOrderDetailsModal.dialog" width="1060">
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

            <div class="accordion mb-5">
                <header class="accordion__header" id="accordion-header-6" @click="openAccordion(6)">
                    <span>
                        جزئیات کالاهای مرجوعی
                    </span>

                    <v-icon class="accordion__header__btn" icon="mdi-chevron-down" />
                </header>

                <div class="accordion__content" id="accordion-content-6">
                    <returnedShpsTable :items="returnedShpsDetails" :header="returnedShpsModalHeader" />
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
import ReturnedOrders from "@/composables/ReturnedOrders";
import ShpsTable from '@/components/ReturnedOrders/Table/ShpsModalTable.vue'
import DiscountTable from '@/components/ReturnedOrders/Table/DiscountModalTable.vue'
import returnedShpsTable from '@/components/ReturnedOrders/Table/returnedShpsModalTable.vue'

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
            returnedShpsDetails: [],
        }
    },

    computed: {
        returnedOrderDetailsModal() {
            try {
                return this.$store.getters['get_returnedOrderDetailsModal']
            } catch (error) {
                return ''
            }
        }
    },

    setup(props) {
        const {
            shpsModalHeader,
            discountModalHeader,
            returnedShpsModalHeader
        } = ReturnedOrders();
        return {
            shpsModalHeader,
            discountModalHeader,
            returnedShpsModalHeader
        };
    },

    components: {
        ShpsTable,
        DiscountTable,
        returnedShpsTable
    },

    methods: {
        close() {
            closeModal(this.$store, 'set_returnedOrderDetailsModal')
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
         * Get order 'Shps' details by order_id
         */
        async getShpsDetails() {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `admin/order/crud/shps/detail/${this.returnedOrderDetailsModal.id}`
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
            AxiosMethod.end_point = `admin/order/crud/user/detail/${this.returnedOrderDetailsModal.id}`;
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
            () => this.returnedOrderDetailsModal.dialog,
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
