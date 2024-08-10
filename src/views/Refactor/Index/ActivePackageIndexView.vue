<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 pt-3">
            <v-col cols="6" />

            <v-col cols="6" class="d-flex justify-end ">
              <PanelFilter
                  @resetPage="resetPage"
                  path="active-package/index"
                  :filterField="filterField"
                  :typeItems="typeList"
                  :statusItems="statusListPackage"/>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">
            <template v-slot:customSlot="item">
              <span class="t13500 text-black py-5 expanded-background" style="background-color: #F5F5F5;">
               {{ renameStatus(item.data.custom) }}
              </span>
            </template>
          </ShTable>

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

<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ActivePackage from "@/composables/ActivePackage";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  data() {
    return {
      perPageFilter:false,
      itemListTable: []
    }
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
    const statusListPackage = [
      {
        label: 'خالی',
        value: 'empty'
      },
      {
        label: 'لودینگ',
        value: 'loading'
      },
      {
        label: 'در حال بارگیری',
        value: 'luggage'
      },
      {
        label: 'انتقال به انبار اصلی',
        value: 'sent_to_warehouse'
      },
      {
        label: 'رسیده به انبار اصلی',
        value: 'received_by_warehouse'
      }
    ]
    const {
      pageLength,
      getPackageList,
      packageList,
      filterField,
      dataTableLength,
      page,
      header,
      loading
    } = ActivePackage();
    return {
      pageLength,
      getPackageList,
      packageList,
      filterField,
      dataTableLength,
      page,
      header,
      loading,
      typeList,
      statusListPackage
    }
  },

  components: {
    PanelFilter,
    Header,
    DashboardLayout,
    ShTable
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    updateList(status) {
      if (status === 'true') {
        this.getPackageList()
      }
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    renameStatus(status) {
      if (status === 'loading') {
        return 'لودینگ'
      } else if (status === 'luggage') {
        return 'در حال بارگیری'
      } else if (status === 'sent_to_warehouse') {
        return 'انتقال به انبار اصلی'
      } else if (status === 'received_by_warehouse') {
        return 'رسیده به انبار اصلی'
      }
      else if (status === 'completed') {
        return 'پر شده'
      } else {
        return 'خالی';
      }

    },

    getPackageType(type){
      if(type === 'bulk'){
        return 'بالک'
      }else{
        return 'پالت'
      }
    },
  },

  mounted() {
    this.getPackageList()
  },

  watch: {
    packageList(){
      this.itemListTable = []

      this.packageList.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                type: item.type? this.getPackageType(item.type) : '---',
                shps_count: item.shps_count ? item.shps_count : '---',
                custom: item.status,
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

    page(){
      if (!this.perPageFilter){
        this.getPackageList()
      }
    },

    $route(){
      this.getPackageList()
    }
  }
}
</script>