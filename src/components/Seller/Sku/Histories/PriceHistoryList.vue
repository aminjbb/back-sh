<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <div class="d-flex justify-start align-center pt-1">
                    <div>
                        <span class="t12 w500">
                            شناسه کالا :
                        </span>

                        <span class="t12 w500 text-grey number-font">
                            {{sku?.id}}
                        </span>
                    </div>
                    <div class="mr-5">
                        <span class="t12 w500">
                            نام کالا :
                        </span>

                        <span class="t12 w500 text-grey">
                            {{sku?.label}}
                        </span>
                    </div>
                </div>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="headerPriceHistory" />

                    <PanelFilter :path="`seller/sku/${$route.params.sellerId}/history/price/${$route.params.skuId}`" :filterField="filterPriceHistory" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <ShTable
            @resetPage="resetPage"
            class="flex-grow-1"
            :headers="headerPriceHistory"
            :items="itemListTable"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
             />

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
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import Seller from "@/composables/Seller";
import Sku from "@/composables/Sku";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {splitChar} from "@/assets/js/functions";

export default {

  setup() {
    const {getSkue, sku} = new Sku()
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
    ModalColumnFilter,
    ModalExcelDownload,
    PanelFilter,
    ShTable
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: []
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.headerPriceHistory[index].show = value
    },
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },
    splitChar
  },

  mounted() {
    this.getPriceHistory()
    this.getSkue()
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
      this.getPriceHistory()
    },
    page(){
      if (!this.perPageFilter){
        this.getPriceHistory()
      }
    },

      priceHistory() {
          if(this.priceHistory.data) {

              this.itemListTable = []
              this.priceHistory.data.forEach((item) => {
                  this.itemListTable.push(
                      {
                          customer_price: this.splitChar(item.customer_price),
                          base_discount: item.base_discount,
                          marketing_discount: item.marketing_discount,
                          site_price: this.splitChar(item.site_price),
                          created_at_fa: item.created_at_fa,
                      }
                  )
              })
          }
      },
  }
}
</script>
