

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <ExportDataTable/>-->
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card
            height="100"
            class="ma-5 br--12 stretch-card-header-100"
        >
          <FilterExport/>
        </v-card>

        <v-card
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580"
        >
          <Table
              class="flex-grow-1"
              model="export"
              deletePath="export/crud/delete/"
              :header="header"
              :items="exports.data"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
          />

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="3">
                <ModalExcelDownload/>
              </v-col>

              <v-col cols="6">
                <div class="text-center" >
                  <v-pagination
                      v-model="page"
                      :length="pageLength"
                      rounded="circle"
                      size="40"
                      :total-visible="7"
                      prev-icon="mdi-chevron-right"
                      next-icon="mdi-chevron-left"
                  />
                </div>
              </v-col>

              <v-col cols="3">
                <div
                    align="center"
                    id="rowSection"
                    class="d-flex align-center"
                >
                            <span class="ml-5">
                                تعداد سطر در هر صفحه
                            </span>

                  <span class="mt-2"  id="row-selector">
                                <v-select
                                    v-model="dataTableLength  "
                                    class="t1330"
                                    variant="outlined"
                                    :items="[25,50,100]"
                                />
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
import Table from "@/components/Public/Table.vue";
import FilterExport from "@/components/Export/FilterExport.vue";
import Export from "@/composables/Export";
import {openToast} from "@/assets/js/functions";
const ExportDataTable = defineAsyncComponent(()=> import ('../../components/Export/ExportDataTable.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  components:{
    Header,DashboardLayout,ExportDataTable,
    FilterExport,
    Table,
  },

  setup() {
    const { date, pageLength, exports, getExports, dataTableLength, page, header, item, filterField ,loading} = Export();
    return { date, pageLength, exports, getExports, dataTableLength, page, header, item, filterField ,loading };
  },

  mounted() {
    const filter = {
      order: 'created_at',
      order_type: 'desc',
      per_page: 25
    }
    this.getExports(filter)
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
    $route(val) {
      this.getExports(this.$route.query, this.$cookies.get('adminToken'))
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          const filter = {
            order: 'created_at',
            order_type: 'desc',
            per_page: 25
          }
          this.getExports(filter)
          openToast(
              this.$store,
              'آیتم با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>
 