
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <DriverManagementList/>-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-3">
            <v-col cols="6">

              <sh-btn
                  title="افزودن"
                  prepend-icon="mdi-plus"
                  color="primary500"
                  :height="40"
                  :to="'/driver-management/create'"
                  rounded="xl"
                  :width="120"
                  :hasIcon="true"
                  class="mt-1"

              />
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <PanelFilter
                    @resetPage="resetPage"
                    path="driver-management/index"
                    :filterField="filterField"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="headerDriver"
              :items="itemsListTable"
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
                      <div class="ma-5 pointer" @click="$router.push(`/driver-management/update/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-pen
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                        ویرایش
                                        </span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="small" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                                حذف
                                            </span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>
          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">
                <ModalExcelDownload getEndPoint="cargo/csv/requested/cargo/export"/>
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
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import shBtn from "@/components/Components/Kits/Buttons/sh-btn.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import DriverManagement from "@/composables/DriverManagement";
import Table from "@/components/DriverManagement/Table/Table.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
// const DriverManagementList = defineAsyncComponent(()=> import ('@/components/DriverManagement/DriverManagementList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  data() {
    return {
      perPageFilter: false,
      removeTableItem: {
        text: "با حذف راننده دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟",
        title: "حذف راننده",
        path: "driver/crud/delete/",
      },
      itemsListTable: [],
    }
  },
  setup() {
    const {
      pageLength,
      getDriverList,
      DriverManagementList,
      filterField,
      dataTableLength,
      page,
      headerDriver,
      addPagination,
      addPerPage,
      loading,
      consignmentPrintList,
      headerConsignmentShipmentList,
    } = DriverManagement();
    return {
      pageLength,
      getDriverList,
      DriverManagementList,
      filterField,
      dataTableLength,
      page,
      headerDriver,
      addPagination,
      addPerPage,
      loading,
      consignmentPrintList,
      headerConsignmentShipmentList,
    };
  },
  components: {
    shBtn,
    PanelFilter,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
    Header,
    DashboardLayout,
  },
  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },
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
    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },
  mounted() {
    this.getDriverList();
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
          },
        })
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          },
        })
      }
      this.perPageFilter = false
    },
    page() {
      if (!this.perPageFilter) {
        this.getDriverList()
      }
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getDriverList();
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success",
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route() {
      this.getDriverList();
    },

    DriverManagementList() {
      this.itemsListTable = []

      this.DriverManagementList.data.forEach((item) =>
          this.itemsListTable.push(
              {
                id: item.id,
                full_name: item.full_name,
                identification_code: item.identification_code,
                phone_number: item.phone_number,
                created_at: item.created_at,
                created_at_fa: item.created_at_fa,
                updated_at_fa: item.updated_at_fa,
              },
          ),
      )
    },
  },
}
</script>

 