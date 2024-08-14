<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <PlacementList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 pt-3">
            <v-col cols="6"/>

            <v-col cols="6" class="mt-3">
              <v-row justify="end">
                <PanelFilter
                    @resetPage="resetPage"
                    path="placement/index"
                    :filterField="filterField"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
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
                  <v-list-item-title>
                    <div class="ma-5 pointer d--rtl" @click="$router.push(`/placement/${item.data.id}/shpss`)">
                      <v-icon class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                      <span class="mr-2 text-grey-darken-1 t14300">
                                    مدیریت کالاها
                              </span>
                    </div>
                  </v-list-item-title>

                  <v-list-item-title>
                    <ModalPrint :id="item.data.id" />
                  </v-list-item-title>
                </v-list>
              </v-menu>
            </template>
          </ShTable>
          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start"/>

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
// const PlacementList = defineAsyncComponent(()=> import ('@/components/Placement/PlacementList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalPrint from "@/components/Placement/Modal/PrintModal.vue";
import Placement from "@/composables/Placement";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  data() {
    return {
      perPageFilter: false,
      itemListTable: []
    }
  },
  setup() {
    const {
      pageLength,
      getPlacementList,
      placementList,
      filterField,
      dataTableLength,
      page,
      header,
      loading
    } = Placement();
    return {
      pageLength,
      getPlacementList,
      placementList,
      filterField,
      dataTableLength,
      page,
      header,
      loading
    };
  },

  components: {
    PanelFilter,
    DashboardLayout,
    Header,
    ShTable,
    ModalPrint,
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
        this.getPlacementList();
      }
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
    this.getPlacementList();
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
    page() {
      if (!this.perPageFilter) {
        this.getPlacementList()
      }
    },
    $route() {
      this.getPlacementList()
    },

    placementList() {
      if(this.placementList.data) {

        this.itemListTable = []
        this.placementList.data.forEach((item) => {
          this.itemListTable.push(
              {
                data: item,
                id: item.id,
                row_number: item.row_number ? item.row_number : '-',
                placement_number: item.placement_number ? item.placement_number : '-',
                step_number: item.step_number ? item.step_number : '-',
                shelf_number: item.shelf_number ? item.shelf_number : '-',
                created_at_fa: item.created_at_fa ? item.created_at_fa : '-',
              }
          )
        })
      }
    },
  }
}
</script>
