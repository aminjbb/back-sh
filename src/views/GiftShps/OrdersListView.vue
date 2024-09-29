<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />

      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <div class="d-flex justify-end px-5 mt-3">
            <PanelFilter
                @resetPage="resetPage"
                path="admin/index"
                :filterField="filterFieldOrdersList"
                :page="page"
                :perPage="dataTableLength"/>
          </div>
          <v-row
              justify="space-between"
              align="end"
              class="py-5">

            <v-col cols="12">

            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="headerOrdersList"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading" />

          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="3">
                <ModalExcelDownload getEndPoint="admin/csv/get/export" />
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
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))
import GiftShps from "@/composables/GiftShps";

import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import {convertDateToJalai, openConfirm, openToast} from "@/assets/js/functions";

export default {
  name: "GiftShpsView",
  components: {
    ModalColumnFilter,
    ShTable,
    ModalExcelDownload,
    DashboardLayout,
    Header,
    PanelFilter
  },

  setup() {
    const {
      pageLength,
      filterFieldOrdersList,
      dataTableLength ,
      page,
      headerOrdersList,
      loading,
      getGiftList
    } = GiftShps()

    return {
      pageLength,
      filterFieldOrdersList,
      dataTableLength ,
      page,
      headerOrdersList,
      loading,
      getGiftList
    }
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: `admin/crud/delete/`,
      },
    }
  },

  // mounted() {
  //   this.getGiftList()
  // },

  methods:{
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
    // adminList() {
    //   this.itemListTable = []
    //
    //   this.adminList.forEach((item) =>
    //       this.itemListTable.push(
    //           {
    //             id: item.id,
    //             first_name:item.first_name,
    //             last_name:item.last_name,
    //             phone_number:item.phone_number,
    //             role: item.role.label,
    //             created_at: convertDateToJalai(item.created_at , '-' , true),
    //             email:item.email,
    //             switch: item.is_ban,
    //           },
    //       ),
    //   )
    // },

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

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getGiftList();
          openToast(
              this.$store,
              'ادمین با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    $route(){
      // this.getGiftList()
    },

    page(){
      if (!this.perPageFilter){
        // this.getGiftList()
      }
    }
  }
}
</script>