<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <!--      <WalletUser />-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card
            height="70"
            class="ma-5 br--12 stretch-card-header-70"
        >
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5"
          >
            <v-col cols="6">
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <PanelFilter
                    @resetPage="resetPage"
                    :path="`wallet/index`"
                    :filterField="filterField"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580">
          <ShTable
              class="flex-grow-1"
              :headers="requestListHeader"
              :items="[]"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">
            <template v-slot:customSlot="item">
              <span v-if="item.data.type == 'withdraw'"
                    class="t14 w300 text-error py-5 number-font">  {{ splitChar(item.data.custom) }} - </span>
              <span v-else class="t14 w300 text-black py-5 number-font">  --- </span>
            </template>

            <template v-slot:customSlot2="item">
              <span v-if="item.data.type == 'deposit'"
                    class="t14 w300 text-success py-5 number-font d--ltr">  {{ splitChar(item.data.custom) }} +</span>
              <span v-else class="t14 w300 text-black py-5 number-font">  --- </span>
            </template>
          </ShTable>

          <v-divider/>

        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>
<script>
import {defineAsyncComponent} from "vue";

const ModalExcelDownload = defineAsyncComponent(() => import ('@/components/Public/ModalExcelDownload.vue'))
const ModalColumnFilter = defineAsyncComponent(() => import ('@/components/Public/ModalColumnFilter.vue'))
const ShTable = defineAsyncComponent(() => import ('@/components/Components/Table/sh-table.vue'))
const PanelFilter = defineAsyncComponent(() => import ('@/components/PanelFilter/PanelFilter.vue'))
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
import SellerCartable from '@/composables/SellerCartable.js'

export default {
  setup() {
    const {
      pageLength, filterField,
      dataTableLength, page, requestListHeader,
      loading, sellers, sellerRequests,
      getSellersRequest, isFilterPage
    } = new SellerCartable()
    return {
      pageLength, filterField,
      dataTableLength, page, requestListHeader,
      loading, sellers, sellerRequests,
      getSellersRequest, isFilterPage
    }
  },
  components: {
    ModalExcelDownload,
    ModalColumnFilter,
    ShTable,
    PanelFilter,
    DashboardLayout,
    Header,
  },

  methods:{
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },
  }
}
</script>