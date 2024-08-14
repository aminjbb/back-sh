<template>
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
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
      >
          <template v-slot:actionSlot="item">
              <div class="text-center">
                  <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                      mdi-dots-vertical
                  </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                  <v-list class="c-table__more-options">
                      <v-list-item>
                          <v-list-item-title>
                              <div >
                                  <v-icon class="text-grey-darken-1 pointer"  >mdi-close-octagon-outline</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300 pointer" @click="openReportDialog">
                                        توقف اختصاص به پیک آپر
                                  </span>
                              </div>
                          <!-- Modal-->
                              <ReportDialog  ref="ReportDialog" :id="item.data.id" @reload-reports="getReports()" />

                          </v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
          </template>
      </ShTable>
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
</template>

<script >
import ReportBugTaskComp from '@/composables/ReportBugTask.js';
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ReportDialog from "@/components/ReportBugTask/ReportDialog.vue";


export default {
  data() {
    return {
      perPageFilter: false,
      modal: false,
      itemListTable: []
    }
  },

  components: {
    PanelFilter,
    ShTable,
    ReportDialog,
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
    },

      openReportDialog(){
        this.$refs.ReportDialog.dialog = true
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
    },

    ReportBugs() {
          this.itemListTable = []
          this.ReportBugs.forEach((item) => {
              this.itemListTable.push(
                  {
                      id: item.id,
                      shps: item.shps ? item.shps : '-',
                      sku_label: item.sku_label ? item.sku_label : '-',
                      count: item.count ? item.count : '-',
                      picked_count: item.picked_count ? item.picked_count : '-',
                      pick_upper: item.pick_upper ? item.pick_upper : '-',
                      updated_at_fa: item.updated_at_fa ? item.updated_at_fa : '-',
                  }
              )
          })
      },
    },
}

</script>