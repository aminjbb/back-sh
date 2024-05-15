<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <div class="d-flex justify-start align-center pt-1">
                    <div>
                        <span class="t12500">
                            شناسه کالا :
                        </span>

                        <span class="t12500 text-grey number-font">
                            {{sku?.id}}
                        </span>
                    </div>
                    <div class="mr-5">
                        <span class="t12500">
                            نام کالا :
                        </span>

                        <span class="t12500 text-grey">
                            {{sku?.label}}
                        </span>
                    </div>
                </div>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="headerPriceHistory" />

                    <ModalTableFilter :path="`seller/sku/${$route.params.sellerId}/history/price/${$route.params.skuId}`" :filterField="filterPriceHistory" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="headerPriceHistory"
            :items="priceHistory.data"
            :page="page"
            :perPage="dataTableLength"
            editUrl="/seller/edit/"
            activePath="seller/crud/update/activation/"
            changeStatusUrl="seller/crud/update/contract/"
            :loading="loading"
            @updateList="updateList"
            updateUrl="seller/csv/mass-update"
            model="price" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start">
                    <ModalExcelDownload :getEndPoint="`seller/${$route.params.sellerId}/sku/${$route.params.skuId}/history/price/csv/get/export`" />
                </v-col>

                <v-col cols="6" class="d-flex justify-center">
                    <div class="text-center">
                        <v-pagination
                            v-model="priceHistoryPage"
                            :length="pageLength"
                            rounded="circle"
                            size="40"
                            :total-visible="7"
                            prev-icon="mdi-chevron-right"
                            next-icon="mdi-chevron-left" />
                    </div>
                </v-col>

                <v-col cols="3" class="d-flex justify-end">
                    <div
                        align="center"
                        id="rowSection"
                        class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
                        <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]" />
                        </span>
                    </div>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import Table from '@/components/Seller/Sku/Histories/Table/HistoriesTable.vue'
import Seller from "@/composables/Seller";
import Sku from "@/composables/Sku";
import ModalTableFilter from '@/components/Seller/Sku/Histories/Filter/HistoryFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
export default {
    setup(props) {
        const {
            getSkue,
            sku
        } = new Sku()
        const {
            pageLength,
            priceHistory,
            filterPriceHistory,
            dataTableLength,
            priceHistoryPage,
            headerPriceHistory,
            addPerPage,
            loading,
            getPriceHistory
        } = Seller();
        return {
            pageLength,
            priceHistory,
            filterPriceHistory,
            dataTableLength,
            priceHistoryPage,
            headerPriceHistory,
            addPerPage,
            loading,
            getPriceHistory,
            getSkue,
            sku
        };
    },

    components: {
        Table,
        ModalTableFilter,
        ModalColumnFilter,
        ModalExcelDownload,
    },

    computed: {
    },

    methods: {
        changeHeaderShow(index, value) {
            this.headerPriceHistory[index].show = value
        },

        updateList(status) {
            if (status === 'true') {
                this.getPriceHistory();
            }
        },
    },

    mounted() {
        this.getPriceHistory()
        this.getSkue()
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },
    }
}
</script>
