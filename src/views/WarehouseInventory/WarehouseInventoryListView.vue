<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <WarehouseInventoryList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 pt-3">
            <v-col cols="6" />

            <v-col cols="6" class="mt-3">
              <v-row justify="end">
                <PanelFilter
                    path="warehouse_inventory/index"
                    :filterField="filterField"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              :header="header"
              :items="itemList.data"
              :page="page"
              :perPage="dataTableLength"
              @updateList = "updateList"
              :loading="loading"
              model="warehouseInventory" />

          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start" />

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
// const WarehouseInventoryList = defineAsyncComponent(()=> import ('@/components/WarehouseInventory/WarehouseInventoryList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/WarehouseInventory/Table/Table.vue'
import WarehouseInventory from "@/composables/WarehouseInventory"
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue"

export default {
  data() {
    return {
      perPageFilter:false
    }
  },
  components: {
    PanelFilter,
    Table,
    DashboardLayout,
    Header
  },

  setup() {
    const {
      pageLength,
      getWarehouseInventoryList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      loading
    } = WarehouseInventory();
    return {
      pageLength,
      getWarehouseInventoryList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      loading
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    updateList(status) {
      if (status === 'true') {
        this.getWarehouseInventoryList();
      }
    },
  },

  mounted() {
    this.getWarehouseInventoryList();
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
        this.getWarehouseInventoryList()
      }
    },
    $route(){
      this.getWarehouseInventoryList()
    }
  }
}
</script>
