<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />

      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <div class="d-flex justify-end px-5 mt-3">
            <PanelFilter
                @resetPage="resetPage"
                :path="`gift-shps/${$route.params.id}/orders`"
                :filterField="filterFieldOrdersList"
                :page="page"
                :perPage="dataTableLength"/>
          </div>
          <v-row
              justify="space-between"
              align="end"
              class="py-5">

            <v-col cols="12">

            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="headerOrdersList"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading" />

          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="3">
                <ModalExcelDownload :getEndPoint="`gift/${$route.params.id}/orders/export`" />
              </v-col>

              <v-col cols="6">
                <div class="text-center">
                  <v-pagination
                      v-model="page"
                      :length="pageLength"
                      rounded="circle"
                      size="40"
                      :total-visible="7"
                      prev-icon="mdi-chevron-right"
                      next-icon="mdi-chevron-left" />
                </div>
              </v-col>

              <v-col cols="3">
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
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))
import GiftShps from "@/composables/GiftShps";

import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";

export default {
  name: "GiftShpsView",
  components: {
    ModalColumnFilter,
    ShTable,
    ModalExcelDownload,
    DashboardLayout,
    Header,
    PanelFilter
  },

  setup() {
    const {
      pageLength,
      filterFieldOrdersList,
      dataTableLength ,
      page,
      headerOrdersList,
      loading,
      getOrders,
      ordersList
    } = GiftShps()

    return {
      pageLength,
      filterFieldOrdersList,
      dataTableLength ,
      page,
      headerOrdersList,
      loading,
      getOrders,
      ordersList
    }
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: []
    }
  },

  mounted() {
    this.getOrders()
  },

  methods:{
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    }
  },

  watch: {
    ordersList() {
      this.itemListTable = []

      this.ordersList.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                first_name:item.user.first_name ? item.user.first_name : '-',
                last_name:item.user.last_name ? item.user.last_name : '-',
                phone_number:item.user.phone_number ? item.user.phone_number : '-',
                voucher_code: item.voucher_code ? item.voucher_code : '-',
                order_number:item.order_number ? item.order_number : '-',
                details_count:item.details_count ? item.details_count : '-',
                paid_price: item.paid_price ? this.splitChar(item.paid_price) : '-',
                created_at: item.created_at_fa ?  item.created_at.split('T')[1].split('.')[0] + ' ' + item.created_at_fa : '-',
              },
          ),
      )
    },

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
      this.getOrders()
    },

    page(){
      if (!this.perPageFilter){
        this.getOrders()
      }
    }
  }
}
</script>