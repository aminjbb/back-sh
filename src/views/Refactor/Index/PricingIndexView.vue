<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header />

            <div class="h-100 d-flex flex-column align-stretch seller">
                <v-card
                    height="70"
                    class="ma-5 br--12 stretch-card-header-70"
                >
                    <v-row
                        justify="start"
                        align="center"
                        class="px-10 py-5"
                    >
                        <v-col cols="2">
                            <ModalGroupAdd

                                getEndPoint="factor/csv/get/template"
                                :uploadEndpoint="`factor/csv/bulk/update/${$route.params.id}`"
                            />
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
                    <ShTable
                        class="flex-grow-1"
                        :headers="pricingHeader"
                        :items="itemListTable"
                        :page="1"
                        :perPage="dataTableLength"
                        :loading="loading"
                    >
                        <template v-slot:customSlot="item">
                            <v-text-field  v-model="item.data.custom"  hide-details  variant="outlined"  class="number-font"  type="number" />
                        </template>
                        <template v-slot:customSlot2="item">
                            <v-text-field  v-model="item.data.custom2"  hide-details  variant="outlined"  class="number-font"  type="number" />
                        </template>
                        <template v-slot:customSlot3="item">
                            <div class="seller__add-sku-btn d-flex justify-center align-center pointer"
                                @click="updatePricing(item.data)">
                                <v-icon size="15">{{item.data.custom3}}</v-icon>
                            </div>
                        </template>
                    </ShTable>
                    <v-divider />
                    <div class="pb-3 d-block" style="min-height: 135px;">
                        <div class="px-8 w-100">
                            <div class="d-flex justify-between align-center">
                                <div class="text-center c-table__header__item t12 w500 text-black" style="width:10.1111%;padding:15px 10px">
                                    جمع:
                                </div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px"></div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px"></div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_shps_count >= 0">
                                        {{priceList.total_shps_count}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_buying_price >= 0">
                                        {{splitChar(priceList.total_buying_price)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_customer_price >= 0">
                                        {{splitChar(priceList.total_customer_price)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>

                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_requested_buying_price_sum >= 0">
                                        {{splitChar(priceList.total_requested_buying_price_sum)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_received_buying_price_sum >= 0">
                                        {{splitChar(priceList.total_received_buying_price_sum)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>

                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_requested_customer_price_sum >= 0">
                                        {{splitChar(priceList.total_requested_customer_price_sum)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>

                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_received_customer_price_sum >= 0">
                                        {{splitChar(priceList.total_received_customer_price_sum)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.sum_total_buying_price >= 0">
                                        {{splitChar(priceList.sum_total_buying_price)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.sum_total_customer_price >= 0">
                                        {{splitChar(priceList.sum_total_customer_price)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>
                                <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                                    <template v-if="priceList && priceList.total_profit">
                                        {{formatProfit(priceList.total_profit)}}
                                    </template>
                                    <template v-else>
                                        -
                                    </template>
                                </div>

                                <!--                    <div class="text-center c-table__header__item t12 w500 text-black number-font" style="width:10.1111%;padding:15px 10px"></div>-->
                            </div>
                        </div>

                        <v-divider class="mb-5 mt-2" />

                        <v-row justify="space-between" class="px-8 w-100">
                            <v-col cols="3">
                                <ModalExcelDownload :getEndPoint="`factor/csv/get/shps/${$route.params.id}`" />
                            </v-col>
                            <v-btn
                                @click="$router.go(-1)"
                                variant="outlined"
                                height="40"
                                rounded
                                class="px-8 mt-1 ml-5">
                                بازگشت
                            </v-btn>
                        </v-row>
                    </div>
                </v-card>
            </div>

        </v-main>
    </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

import {openToast, splitChar} from "@/assets/js/functions";
import Factor from "@/composables/Factor";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    components: {
        DashboardLayout,
        Header,
        ModalGroupAdd,
        ModalExcelDownload,
        ShTable,
    },

    data() {
        return {
            showSaveButton: false,
            perPageFilter:false,
            itemListTable: []
        }
    },

    setup() {
        const {
            getPricingList,
            priceList,
            filterField,
            dataTableLength,
            pricingHeader,
            loading
        } = Factor();
        return {
            getPricingList,
            priceList,
            filterField,
            dataTableLength,
            pricingHeader,
            loading
        };
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        }
    },

    methods: {
        splitChar,
        formatProfit(num) {
            return Number(num.toFixed(2));
        },
        resetPage(){
            this.perPageFilter = true
            this.page = 1
            setTimeout(()=>{
                this.perPageFilter = false
            }, 1000)
        },

        async updatePricing(item) {
            const formData = new FormData()
            formData.append('buying_price', item.custom)
            formData.append('customer_price', item.custom2)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.form = formData
            AxiosMethod.store = this.$store;
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `factor/crud/update/${this.$route.params.id}/shps/price/${item.shps}`
            let data = await AxiosMethod.axios_post();

            if (data) {
                openToast(
                    this.$store,
                    'اطلاعات با موفقیت ویرایش شد',
                    'success');

                await this.getPricingList();
            } else {
                openToast(
                    this.$store,
                    'عملیات با خطا مواجه شد.',
                    'error');
            }
        },

    },

    mounted() {
        this.getPricingList();
    },

    watch: {
        dataTableLength() {
            this.perPageFilter = true
            this.page = 1
            let query = this.$route.query
            if (query) {
                this.$router.replace({
                    query: {
                        ...query,
                        per_page: this.dataTableLength,
                    }
                })
            }
            else {
                this.$router.push({
                    query: {
                        per_page: this.dataTableLength,
                    }
                })
            }
            this.perPageFilter = false
        },
        $route(){
            this.getPricingList()
        },
        page(){
            if (!this.perPageFilter){
                this.getPricingList()
            }
        },

        priceList() {
            if(this.priceList.shps_list) {

                this.itemListTable = []
                this.priceList.shps_list.forEach((item) => {
                    this.itemListTable.push(
                        {

                            /*custom: buying_price
                              custom2: customer_price
                              custom3: icon
                              */
                            data: item,
                            shps: item.shps,
                            sku: item.sku ? item.sku : '-',
                            shps_requested_count: item.shps_requested_count ? item.shps_requested_count : '-',
                            shps_received_count: item.shps_received_count ? item.shps_received_count: '-',
                            custom: item.buying_price,
                            custom2: item.customer_price,
                            requested_buying_price_sum: splitChar(item.requested_buying_price_sum),
                            received_buying_price_sum: splitChar(item.received_buying_price_sum),
                            requested_customer_price_sum: splitChar(item.requested_customer_price_sum),
                            received_customer_price_sum: splitChar(item.received_customer_price_sum),
                            sum_buying_price: item.sum_buying_price || item.sum_buying_price === 0 ? splitChar(item.sum_buying_price) : '-',
                            sum_customer_price: item.sum_customer_price || item.sum_customer_price === 0 ? splitChar(item.sum_customer_price) : '-',
                            requested_profit_percent : item.requested_profit_percent || item.requested_profit_percent === 0 ? item.requested_profit_percent : '-',
                            custom3: 'mdi-plus'
                        }
                    )
                })
            }
        },
    }
}
</script>
