<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header />

            <div class="h-100 d-flex flex-column align-stretch seller">
                <v-card
                    height="70"
                    class="ma-5 br-12 stretch-card-header-70"
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
                    <Table
                        @resetPage="resetPage"
                        class="flex-grow-1"
                        :header="pricingHeader"
                        :items="priceList.shps_list"
                        :page="1"
                        :perPage="dataTableLength"
                        @updateList="updateList"
                        @showSave="showSave"
                        :loading="loading"
                        model="factor" />

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

import {
    splitChar
} from "@/assets/js/functions";
import Table from '@/components/Factor/Table/PricingTable.vue'
import Factor from "@/composables/Factor";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
export default {
    components: {
        DashboardLayout,
        Header,
        ModalGroupAdd,
        ModalExcelDownload,
        Table,
    },

    data() {
        return {
            showSaveButton: false,
            perPageFilter:false
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

        updateList(status) {
            if (status === 'true') {
                this.getPricingList();
            }
        },

        showSave(status) {
            if (status === 'true') {
                this.showSaveButton = true;
            }
        },

        formatProfit(num) {
            return Number(num.toFixed(2));
        },

        resetPage(){
            this.perPageFilter = true
            this.page = 1
            setTimeout(()=>{
                this.perPageFilter = false
            }, 1000)
        }
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
    }
}
</script>
