<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <!--      <PeerToPeerVoucherList/>-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">


        <v-card height="120" class="ma-5 br--12 " max-height="120">
          <div class="d-flex br--12 pt-5 pb-2 align-center justify-lg-space-evenly t14 w500">اطلاعات تخفیف</div>
          <v-divider></v-divider>

          <div class="d-flex align-center pt-5 justify-lg-space-evenly">
            <div>
          <span class="t14 w500">
             عنوان:
          </span>
              <span class="t14 w500 text-gray500">
             {{ voucherDetail?.name }}
          </span>
            </div>
            <div>
          <span class="t14 w500">
             کد تخفیف:
          </span>
              <span class="t14 w500 text-gray500">
             {{ voucherDetail?.code }}
          </span>
            </div>
            <div class="d-flex">
          <span class="t14 w500">
             نوع تخفیف:
          </span>
              <div>
            <span class="t14 w500 text-gray500" v-if="voucherDetail?.voucher_type === 'percent'">
              درصدی
            </span>
                <span class="t14 w500 text-gray500" v-else>
              ریالی
            </span>
              </div>
            </div>
            <div>
          <span class="t14 w500">
             مقدار تخفیف:
          </span>
              <span class="t14 w500 text-gray500 number-font" v-if="voucherDetail?.discount_type === 'percent'">
              {{ voucherDetail?.discount }} %
          </span> <span class="t14 w500 text-gray500 number-font" v-else>
              {{ voucherDetail?.discount }} ریال
          </span>
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
                    :path="`voucher/${$route.params.voucherId}/peer`"
                    :filterField="filterFieldPeerToPeer" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">

          <ShTable
              class="flex-grow-1"
              :headers="headerPeerToPeerVoucherList"
              :items="itemListTable"
              :page="page"
              :perPage="pageLength"
          />

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">

              <v-col cols="3" class="d-flex justify-start">
                <ModalExcelDownload :getEndPoint="`voucher/crud/export/children/${voucherId}`" />
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
// const PeerToPeerVoucherList = defineAsyncComponent(()=> import ('@/components/Voucher/PeerToPeerVoucherList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const ModalExcelDownload = defineAsyncComponent(()=> import ("@/components/Public/ModalExcelDownload.vue"))
const PanelFilter = defineAsyncComponent(()=> import ("@/components/PanelFilter/PanelFilter.vue"))
import ShTable from "@/components/Components/Table/sh-table.vue";
import Voucher from '@/composables/Voucher';

export default {
  data() {
    return {
      voucherId: this.$route.params.voucherId,
      itemListTable: []
    }
  },
  setup() {
    const {
      getVoucherShps, voucher, dataTableLength,filterField , filterFieldPeerToPeer,
      pageLength, page, getVoucherDetail, voucherDetail, getVoucherGroup, voucherGroup, headerPeerToPeerVoucherLis, headerShps,
      headerPeerToPeerVoucherList , headerPublicVoucherList
    } = new Voucher()

    return {
      headerShps,
      getVoucherShps,
      voucher,
      dataTableLength,
      headerPublicVoucherList,
      filterField ,
      filterFieldPeerToPeer,
      pageLength,
      page,
      getVoucherDetail,
      voucherDetail,
      getVoucherGroup,
      voucherGroup ,
      headerPeerToPeerVoucherList,

    }
  },
  components: {
    PanelFilter,
    ModalExcelDownload,
    ShTable,
    DashboardLayout,
    Header
  },
  mounted() {
    this.getVoucherShps()
    this.getVoucherDetail()
    this.getVoucherGroup()
  },
  watch:{
    $route(){
      this.getVoucherGroup()
    },

    voucherGroup() {
      this.itemListTable = []
      this.voucherGroup.forEach((item) => {
        this.itemListTable.push(
            {
              voucherCode: item.code,
              phone_number: item.users.length !== 0 ? item.users.phone_number : '-',
              first_name: item.users.length !== 0 ? item.users.first_name : '-',
              last_name: item.users.length  ? item.users.last_name : '-',
            }
        )
      })
    }
  }
}
</script>
