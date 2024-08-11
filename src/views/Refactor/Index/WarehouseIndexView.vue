<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">
                <v-btn
                    @click="$router.push('/warehouse/create')"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                  افزودن انبار جدید
                </v-btn>

              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end" />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              :activePath="'warehouse/crud/update/activation/'">
            <template v-slot:customSlot="item">
              <template v-for="(volume,i) in item.data.custom" :key="i">
                {{ getType(volume.type) }}
              </template>
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
                      <div class="ma-5 pointer" @click="$router.push(`/warehouse/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-pen
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">ویرایش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push('/warehouse/special-capacity/' + item.data.id )">
                        <v-icon class="text-grey-darken-1">mdi-timer-sand</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">ظرفیت ویژه</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push('/warehouse/special-exit-capacity/' + item.data.id )">
                        <v-icon class="text-grey-darken-1">mdi-exit-to-app</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">ظرفیت ویژه خروج</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-trash-can-outline
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">حذف</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>

          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="pr-5">
              <v-col cols="3">
                <ModalExcelDownload getEndPoint="warehouse/csv/get/export" />
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

<script >
import {defineAsyncComponent} from "vue";
const WarehouseList = defineAsyncComponent(()=> import ('@/components/Warehouse/WarehouseList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import Warehouse from "@/composables/Warehouse";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast, openConfirm } from "@/assets/js/functions";

export default {
  components: {
    ModalExcelDownload,
    Header,
    DashboardLayout,
    ShTable
  },

  setup() {
    const {
      pageLength,
      getWarehouseList,
      warehouseList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = Warehouse();
    return {
      pageLength,
      getWarehouseList,
      warehouseList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    };
  },

  data() {
    return {
      perPageFilter:false,
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "warehouse/crud/delete/",
      },
      itemListTable: []
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    getType(type) {
      if (type == 'receiver') {
        return 'دریافت کننده';
      }
      if (type == 'sender') {
        return 'ارسال کننده';
      }
      return 'نامعلوم';
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  mounted() {
    this.getWarehouseList();
  },

  watch: {
    warehouseList(){
      this.itemListTable = []

      this.warehouseList.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                name: item.name,
                address: item.address,
                phone_number: item.phone_number,
                custom: item.types,
                market_storage_count: item.market_storage_count,
                retail_storage_count: item.retail_storage_count,
                is_active: item.is_active,
                is_active_id: item.id,
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

    $route(){
      this.getWarehouseList()
    },

    page(){
      if (!this.perPageFilter){
        this.getWarehouseList()
      }
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getWarehouseList();
          openToast(this.$store, 'انبار با موفقیت حذف شد', "success");
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>