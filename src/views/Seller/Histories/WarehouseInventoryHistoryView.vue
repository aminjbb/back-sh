<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <!--      <WarehouseInventoryHistoryList />-->
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
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="headerWarehouseInventoryHistory"/>

                <PanelFilter
                    path="seller/index"
                    :filterField="filterField"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              :header="headerWarehouseInventoryHistory"
              :items="[]"
              :page="page"
              :perPage="dataTableLength"
              editUrl="/seller/edit/"
              activePath="seller/crud/update/activation/"
              changeStatusUrl="seller/crud/update/contract/"
              :loading="loading"
              @updateList="updateList"
              updateUrl="seller/csv/mass-update"
              model="seller"/>

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">
                <ModalExcelDownload getEndPoint="seller/csv/get/export"/>
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
                      next-icon="mdi-chevron-left"/>
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
import Table from "@/components/Seller/Sku/Histories/Table/HistoriesTable.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import Seller from "@/composables/Seller";
import {openToast} from "@/assets/js/functions";

// const WarehouseInventoryHistoryList = defineAsyncComponent(() => import ('@/components/Seller/Sku/Histories/WarehouseInventoryHistoryList.vue'))
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
export default {
  setup() {
    const {
      pageLength,
      sellerList,
      filterField,
      dataTableLength,
      page,
      headerWarehouseInventoryHistory,
      addPerPage,
      loading
    } = Seller();
    return {
      pageLength,
      sellerList,
      filterField,
      dataTableLength,
      page,
      headerWarehouseInventoryHistory,
      addPerPage,
      loading
    };
  },

  components: {
    PanelFilter,
    Table,
    ModalColumnFilter,
    ModalExcelDownload,
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
  },

  mounted() {

  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
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
  }
}

</script>

