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
            <v-col cols="6">
              <ModalCreatePackage @updateList="updateList"/>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <PanelFilter
                    @resetPage="resetPage"
                    path="package/index"
                    :filterField="filterField"
                    :typeItems="typeList"
                    :statusItems="statusListPackage"
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
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              :activePath="'warehouse/crud/update/activation/'">
            <template v-slot:customSlot="item">
              <span class="t13500 text-black py-5 expanded-background" style="background-color: #F5F5F5;">
                {{ renameStatus(item.data.custom) }}
              </span>
            </template>

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
                      <div class="ma-3 pointer d--rtl" @click="printBarcode(item.data.id)">
                        <v-icon class="text-grey-darken-1">mdi-printer-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">پرینت برچسب</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-3 pointer d--rtl" @click="$router.push(`/package/history/${item.data.id}`)">
                        <v-icon class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">مشاهده تاریخچه</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-trash-can-outline
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
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
      <ModalPrint />
    </v-main>
  </v-layout>
</template>
<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalPrint from '@/components/Package/Modal/PrintModal.vue'
import Package from "@/composables/Package";
import ModalCreatePackage from '@/components/Package/Modal/CreateModal.vue'
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import { openToast, openConfirm } from "@/assets/js/functions";
import { openModal} from "@/assets/js/functions_seller";

export default {
  components: {
    PanelFilter,
    ModalCreatePackage,
    DashboardLayout,
    Header,
    ShTable,
    ModalPrint
  },

  data() {
    return {
      perPageFilter: false,
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "package/crud/delete/",
      },
      itemListTable: []
    }
  },

  setup() {
    const typeList = [
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
    } = Package();
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
    };
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
        this.getPackageList();
      }
    },

    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

    getPackageType(type){
      if(type === 'bulk'){
        return 'بالک'
      }
      else{
        return 'پالت'
      }
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

    printBarcode(id) {
      openModal(this.$store, 'set_printModal', id, true)
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  mounted() {
    this.getPackageList();
  },

  watch: {
    packageList(){
      this.itemListTable = []

      this.packageList.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                type: this.getPackageType(item.type),
                shps_count: item.shps_count,
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
      } else {
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
          this.getPackageList();
          openToast(this.$store, 'آیتم با موفقیت حذف شد', "success");
          localStorage.removeItem('deleteObject')
        }
      }
    },

    page() {
      if (!this.perPageFilter) {
        this.getPackageList()
      }
    },

    $route() {
      this.getPackageList()
    }
  }
}
</script>