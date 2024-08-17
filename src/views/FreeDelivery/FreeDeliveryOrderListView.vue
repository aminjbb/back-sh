<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
<!--      <FreeDeliveryOrderList/>-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br--12 pt-5" max-height="70">
          <div class="d-flex align-center justify-lg-space-evenly">
            <div>
              <span class="t14 w500">عنوان:</span>
              <span class="t14 w500 text-gray500">{{ detailData?.name }}</span>
            </div>
            <div>
              <span class="t14 w500">روش ارسال:</span>
              <span v-if="detailData?.tipax" class="t14 w500 text-gray500">تیپاکس</span>
              &nbsp
              <span v-if="detailData?.post" class="t14 w500 text-gray500">پست</span>
              &nbsp
              <span v-if="detailData?.pishtaz" class="t14 w500 text-gray500">پیشتاز </span>
              &nbsp
              <span v-if="detailData?.nafis" class="t14 w500 text-gray500">نفیس اکسپرس</span>
            </div>
          </div>
        </v-card>
        <v-card height="70" class="mx-5 br--12" max-height="70">
          <v-row
              justify="end"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="end">
                <PanelFilter
                    :path="`free-delivery/${$route.params.freeDeliveryId}/orderList`"
                    :filterField="filterFieldCOrderList"
                    :page="page"
                    :perPage="dataTableLength"/>
              </v-row>
            </v-col>

          </v-row>
        </v-card>

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="headerOrderList"
              :items="itemListTable"
              :page="page"
              :perPage="pageLength"
          />

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="3">
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
                      next-icon="mdi-chevron-left"/>
                </div>
              </v-col>

              <v-col cols="3">
                <div
                    align="center"
                    id="rowSection"
                    class="d-flex align-center">
                  <span class="ml-5">تعداد سطر در هر صفحه</span>
                  <span class="mt-2" id="row-selector">
                <v-select
                    v-model="dataTableLength"
                    class="t1330"
                    variant="outlined"
                    :items="[25,50,100]"/>
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
// const FreeDeliveryOrderList = defineAsyncComponent(()=> import ('@/components/FreeDelivery/FreeDeliveryOrderList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import FreeDelivery from '@/composables/FreeDelivery'
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  setup() {
    const {
      getVoucherShps,
      voucher,
      dataTableLength,
      headerOrderList,
      geOrderList,
      orderList,
      getDetail,
      filterFieldCOrderList,
      detailData,
      pageLength,
      page,
      getVoucherDetail,
      voucherDetail
    } = new FreeDelivery()

    return {
      getVoucherShps,
      voucher,
      dataTableLength,
      headerOrderList,
      geOrderList,
      orderList,
      filterFieldCOrderList,
      pageLength,
      page,
      getVoucherDetail,
      voucherDetail,
      getDetail,
      detailData
    }
  },

  data() {
    return{
      freeDeliveryId:this.$route.params.freeDeliveryId,
      perPageFilter:false,
      itemListTable: []

    }
  },

  components: {
    PanelFilter,
    ShTable,
    DashboardLayout,
    Header
  },

  mounted() {
    this.geOrderList()
    this.getDetail()
  },

  watch:{
    $route(){
      this.geOrderList()
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
    page(){
      if (!this.perPageFilter){
        this.geOrderList()
      }
    },

    orderList() {
      this.itemListTable = []
      this.orderList.forEach((item) => {
        this.itemListTable.push(
            {
              data: item,
              id: item.id ? item.id : '---',
              first_name: item.user.first_name ? item.user.first_name : '---',
              last_name: item.user.last_name ? item.user.last_name : '---',
              phone_number: item.user.phone_number ? item.user.phone_number : '---',
              order_number: item.order_number ? item.order_number : '---',
              details_count: item.details_count ? item.details_count : '---',
              paid_price: item.paid_price ? item.paid_price : '---',
              created_at_fa: item.created_at_fa ? item.created_at_fa : '---',
            }
        )
      })
    },
  }
}
</script>
