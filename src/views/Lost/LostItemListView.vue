<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header />
      <!--      <LostItemList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 pt-3">


            <v-col cols="12">
              <v-row justify="end pa-3">
                <PanelFilter
                    @resetPage="resetPage"
                    path="lost/index"
                    :filterField="filterField"
                    :typeItems="typeList"
                    :shipmentTypeItems="shipmentTypes"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch">
          <Table
              class="flex-grow-1"
              :header="header"
              :items="itemList"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
              @updateList="updateList"
              deletePath="report/crud/delete/"
              model="report" />


          <v-divider />

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
import { defineAsyncComponent } from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
// const LostItemList = defineAsyncComponent(() => import('@/components/Lost/LostItemList.vue'));
const Table = defineAsyncComponent(()=> import('@/components/Lost/Table/Table.vue'))
import Lost from "@/composables/Lost";
const PanelFilter = defineAsyncComponent(() => import('@/components/PanelFilter/PanelFilter.vue'));

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
    const typeList= [
      {
        label: 'پالت',
        value: 'pallet'
      },
      {
        label: 'بالک',
        value: 'bulk'
      },
    ]
    const shipmentTypes= [
      {
        label: 'کراس داک فروشندگان',
        value: 'cross_dock_marketplace'
      },
      {
        label: 'محموله های شاواز',
        value: 'consignment_shavaz'
      },
      {
        label: 'محموله های فروشندگان',
        value: 'consignment_marketplace'
      }
    ]
    const {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = Lost();
    return {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading,
      typeList,
      shipmentTypes
    };
  },


  methods: {
    updateList(status) {
      if (status === 'true') {
        this.getWasteAndLostList();
      }
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
    this.getWasteAndLostList();
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
        this.getWasteAndLostList()
      }
    },

    $route(){
      this.getWasteAndLostList()
    }
  }
}

</script>
