<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="pricingHeader"
            :items="data.shps_list"
            :page="page"
            :perPage="dataTableLength"
            @updateList="updateList"
            :loading="loading"
            model="factor" />

        <v-divider />

        <div class="pb-3 d-block" style="min-height: 135px;">
            <div class="px-8 w-100">
                <div class="d-flex justify-between align-center">
                    <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding:15px 10px">
                        جمع:
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px"></div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px"></div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="data && data.total_shps_count >= 0">
                            {{data.total_shps_count}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="data && data.total_buying_price >= 0">
                            {{data.total_buying_price}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="data && data.sum_total_buying_price >= 0">
                            {{data.sum_total_buying_price}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="data && data.total_customer_price >= 0">
                            {{data.total_customer_price}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="data && data.sum_total_customer_price >= 0">
                            {{data.sum_total_customer_price}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="data && data.total_profit >= 0">
                            {{data.total_profit}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>

                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px"></div>
                </div>
            </div>

            <v-divider class="mb-5 mt-2" />

            <v-row justify="end" class="px-8 w-100">
                <v-btn
                    @click="$router.go(-1)"
                    variant="outlined"
                    height="40"
                    rounded
                    class="px-8 mt-1 ml-5">
                    انصراف
                </v-btn>

                <v-btn
                    @click="savePrice"
                    color="primary500"
                    height="40"
                    :disabled="showSave === true ? false : true"
                    rounded
                    class="px-8 mt-1">
                    ذخیره
                </v-btn>
            </v-row>
        </div>
    </v-card>
</div>
</template>

<script>
import Table from '@/components/Factor/Table/PricingTable.vue'
import Factor from "@/composables/Factor";
export default {
    data() {
        return {
            showSave:false,
            "data": {
                "shps_list": [{
                        "shps": 2,
                        "sku": "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  آبرسانی 1 باکس",
                        "shps_count": 100,
                        "buying_price": null,
                        "customer_price": 120000,
                        "sum_buying_price": 0,
                        "sum_customer_price": 12000000,
                        "profit": 100
                    },
                    {
                        "shps": 8,
                        "sku": "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  آبرسانی 1 عدد",
                        "shps_count": 101,
                        "buying_price": null,
                        "customer_price": null,
                        "sum_buying_price": 0,
                        "sum_customer_price": 0,
                        "profit": 0
                    },
                    {
                        "shps": 1,
                        "sku": "کرم پودر شون رنگ  بژ مناسب برای پوست  خشک دارای خاصیت  نرم کنندگی 1 عدد",
                        "shps_count": 202,
                        "buying_price": 10000,
                        "customer_price": 20000,
                        "sum_buying_price": 2020000,
                        "sum_customer_price": 4040000,
                        "profit": 50
                    }
                ],
                "total_shps_count": 403,
                "total_buying_price": 10000,
                "sum_total_buying_price": 2020000,
                "total_customer_price": 140000,
                "sum_total_customer_price": 16040000,
                "total_profit": 87.4064837905237
            }
        }
    },
    setup(props) {
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

    components: {
        Table,
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        }
    },

    methods: {
        changeHeaderShow(index, value) {
            this.header[index].show = value
        },

        updateList(status) {
            if (status === 'true') {
                this.getFactorList();
                this.showSave =  true;
            }
        },
    },

    mounted() {
        this.getPricingList();
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },
    }
}
</script>
