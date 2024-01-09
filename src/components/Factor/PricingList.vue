<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="pricingHeader"
            :items="priceList.shps_list"
            :page="page"
            :perPage="dataTableLength"
            @updateList="updateList"
            @showSave="showSave"
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
                        <template v-if="priceList && priceList.total_shps_count >= 0">
                            {{priceList.total_shps_count}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="priceList && priceList.total_buying_price >= 0">
                            {{splitChar(priceList.total_buying_price)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="priceList && priceList.total_customer_price >= 0">
                            {{splitChar(priceList.total_customer_price)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="priceList && priceList.sum_total_buying_price >= 0">
                            {{splitChar(priceList.sum_total_buying_price)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="priceList && priceList.sum_total_customer_price >= 0">
                            {{splitChar(priceList.sum_total_customer_price)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div class="text-center c-table__header__item t12500 text-black number-font" style="width:10.1111%;padding:15px 10px">
                        <template v-if="priceList && priceList.total_profit">
                            {{formatProfit(priceList.total_profit)}}
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
                    @click="$router.push('/factor/index')"
                    color="primary500"
                    height="40"
                    :disabled="showSaveButton === true ? false : true"
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
import {
    splitChar
} from "@/assets/js/functions";
import Table from '@/components/Factor/Table/PricingTable.vue'
import Factor from "@/composables/Factor";
export default {
    data() {
        return {
            showSaveButton: false,
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
        }
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
