<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <SiteInventoryHistoryList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <div class="d-flex justify-start align-center">
                <div>
                        <span>
                            شناسه کالا :
                        </span>

                  <span>
                            {{sku?.id}}
                        </span>
                </div>
                <div class="mr-5">
                        <span>
                            نام کالا :
                        </span>

                  <span>
                            {{sku?.label}}
                        </span>
                </div>
              </div>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="headerWarehouseInventoryHistory" />

                <PanelFilter
                    :path="`seller/sku/${$route.params.sellerId}/history/site-inventory/${$route.params.skuId}`"
                    :filterField="filterInventorySite"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="headerWarehouseInventoryHistory"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
          >
            <template v-slot:customSlot="item">
              <div class="d-flex align-center justify-center w-100">
                            <span class="t14 w300 text-center py-5 number-font" :class="item.data.change_type === 'increase' ? 'text-success' : 'text-error'">
                                {{splitChar(item.data.change_amount)}}
                            </span>
                <span v-if="item.data.change_type === 'increase'" class="text-success text-center">
                                +
                        </span>
                <span v-else class="text-error text-center">
                                +
                        </span>
              </div>
            </template>
          </ShTable>
          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">
                <ModalExcelDownload :getEndPoint="`seller/${$route.params.sellerId}/sku/${$route.params.skuId}/history/stock/site/csv/get/export`" />
              </v-col>

              <v-col cols="6" class="d-flex justify-center">
                <div class="text-center">
                  <v-pagination
                      v-model="siteHistoryPage"
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
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const SiteInventoryHistoryList = defineAsyncComponent(()=> import ('@/components/Seller/Sku/Histories/SiteInventoryHistoryList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Seller from "@/composables/Seller";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast } from "@/assets/js/functions";
import Sku from "@/composables/Sku";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  data(){
    return{
      itemListTable: []
    }
  },
  setup(props) {
    const {
      getSkue,
      sku
    } = new Sku()
    const {
      pageLength,
      filterInventorySite,
      dataTableLength,
      siteHistoryPage,
      headerWarehouseInventoryHistory,
      addPagination,
      addPerPage,
      loading,
      getSiteInventoryHistory,
      siteInventoryHistory
    } = Seller();
    return {
      pageLength,
      filterInventorySite,
      dataTableLength,
      siteHistoryPage,
      headerWarehouseInventoryHistory,
      addPagination,
      addPerPage,
      loading,
      getSiteInventoryHistory,
      siteInventoryHistory,
      getSkue,
      sku
    };
  },

  components: {
    PanelFilter,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
    DashboardLayout,
    Header
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
        this.getSellerList();
      }
    },
    splitChar,
    convertDateToJalai,

  },

  mounted() {
    this.getSiteInventoryHistory()
    this.getSkue()
  },

  watch: {
    dataTableLength(val) {
      this.getSiteInventoryHistory()
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getSellerList();
          openToast(
              this.$store,
              'انبار با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
    siteHistoryPage(){
      this.getSiteInventoryHistory()
    },

    siteInventoryHistory() {
      if(this.siteInventoryHistory.data) {

        this.itemListTable = []
        this.siteInventoryHistory.data.forEach((item) => {
          this.itemListTable.push(
              {
                id: item.id,
                previous_site_stock: item.previous_site_stock ? this.splitChar(item.previous_site_stock) : '-',
                site_stock: item.site_stock ?  this.splitChar(item.site_stock) : '-',
                created_at: item.created_at ?  this.convertDateToJalai(item.created_at ,'-' , true) : '-',
                change_amount:this.splitChar(item.change_amount) ,
                change_type: item.change_type ,
              }
          )
        })
      }
    },
  }
}
</script>


