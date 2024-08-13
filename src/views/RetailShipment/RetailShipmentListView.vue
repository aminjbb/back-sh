<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <RetailShipmentList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">

            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="header" />

                <PanelFilter
                    @resetPage="resetPage"
                    :factorId="$route.query.factor_id"
                    path="retail-shipment/index"
                    :filterField="filterFieldAllRetail"
                    :statusItems="status" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              :getRetailShipmentList="getRetailShipmentList"
              class="flex-grow-1"
              :header="header"
              :items="retailShipments"
              :page="page"
              :perPage="dataTableLength"
              deletePath="shipment/consignment/crud/delete/"
              :loading="loading"
              updateUrl="seller/csv/mass-update"
              model="seller" />
          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">
                <!--            <ModalExcelDownload getEndPoint="cargo/csv/export" />-->
              </v-col>
              <v-col cols="6" class="d-flex justify-center">
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
// const RetailShipmentList = defineAsyncComponent(()=> import ('@/components/RetailShipment/RetailShipmentList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/RetailShipment/Table/RetailShipmentTable.vue'
import RetailShipment from "@/composables/RetailShipment";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
import ModalRetailShipmentDetail from "@/components/RetailShipment/Modal/ModalRetailShipmentDetail.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  components: {
    PanelFilter,
    ModalRetailShipmentDetail,
    Table,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header
  },

  setup() {
    const status= [
      {
        label: 'همه',
        value: '',
      },
      {
        label: 'در انتظار',
        value: 'waiting',
      },
      {
        label: 'در حال بررسی',
        value: 'in_review',
      },
      {
        label: 'رد شده',
        value: 'rejected',
      },
      {
        label: 'تایید شده',
        value: 'approved',
      },
      {
        label: 'در حال ارسال به انبار',
        value: 'sending_warehouse',
      },
      {
        label: 'رسیده به انبار',
        value: 'received_by_warehouse',
      },
      {
        label: 'در حال شمارش',
        value: 'counting',
      },
      {
        label: 'تایید شده انبار',
        value: 'approved_by_warehouse',
      },
      {
        label: 'به سمت انبار اصلی',
        value: 'sending_base_warehouse',
      },
      {
        label: 'رسیده به انبار اصلی',
        value: 'received_base_warehouse',
      },
      {
        label: 'در حال جایگذاری',
        value: 'locating',
      },
      {
        label: 'موجود شده در انبار',
        value: 'located',
      },
    ]
    const {
      filterFieldAllRetail,
      getRetailShipmentList,
      retailShipments,
      pageLength,
      dataTableLength,
      page,
      header,
      loading
    } = RetailShipment()

    return {
      filterFieldAllRetail,
      getRetailShipmentList,
      retailShipments,
      pageLength,
      dataTableLength,
      page,
      header,
      loading,
      status
    }
  },

  data() {
    return {
      perPageFilter:false
    }
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
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    }
  },

  mounted() {
    this.getRetailShipmentList()
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

    page(){
      if (!this.perPageFilter){
        this.getRetailShipmentList()
      }
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getRetailShipmentList();
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route(){
      this.getRetailShipmentList()
    }
  }
}
</script>
