<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <ReportBugTask/>-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <!-- filter-->
        <v-card
            height="70"
            class="ma-5 br--12 stretch-card-header-70 d-flex justify-end pa-4">
          <PanelFilter
              @resetPage="resetPage"
              path="report-bug-task/index"
              :filterField="filterField"/>
        </v-card>
        <!-- table -->
        <v-card
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580">
          <Table
              @reload-reports="getReports()"
              class="flex-grow-1"
              :header="header"
              :items="ReportBugs"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
          />

          <v-divider/>
          <!-- card action-->
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
                      :total-visible="5"
                      prev-icon="mdi-chevron-right"
                      next-icon="mdi-chevron-left"/>
                </div>
              </v-col>
              <v-col cols="3">
            <span  id="rowSection" class="d-flex align-center justify-end pe-10">
              <span class="ml-5">
                  تعداد سطر در هر صفحه
              </span>
              <span class="mt-2 " id="row-selector">
                  <v-select
                      v-model="dataTableLength"
                      class="t1330"
                      variant="outlined"
                      :items="[25,50,100]"
                  />
              </span>
            </span>
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
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Table = defineAsyncComponent(()=> import ('@/components/ReportBugTask/ReportBugTaskTable.vue'))
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ReportBugTaskComp from '@/composables/ReportBugTask.js';
// const ReportBugTask = defineAsyncComponent(()=> import ('@/components/ReportBugTask/ReportBugTask.vue'))

export default {
  data() {
    return {
      perPageFilter: false,
      modal: false,
    }
  },

  components: {
    PanelFilter,
    Table,
    Header,
    DashboardLayout
  },

  setup(){
    const {
      header, filterField, page, pageLength, dataTableLength, loading, getReports, ReportBugs
    } = ReportBugTaskComp();
    return {
      header, filterField, page, pageLength, dataTableLength, loading, getReports, ReportBugs,
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    }
  },

  mounted() {
    this.getReports()
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
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },
    $route() {
      this.getReports()
    },
    page() {
      if (!this.perPageFilter) {
        this.getReports()
      }
    }
  }

}
</script >
