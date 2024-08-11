<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card
            height="70"
            class="ma-5 br-12 stretch-card-header-70"
        >
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start pt-2">
                <CreateCargo :getCargoList="getCargoList"/>
              </v-row>
            </v-col>

            <v-col cols="6" />
          </v-row>
        </v-card>

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">
            <template v-slot:customSlot="item">
              <div class="retail-status-box d-flex align-center pr-2">
                <span class="t12 w500 text-gray500 py-5 ">{{renameStatus(item.data.custom)}}</span>
              </div>
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/cargo-management/${item.data.id}/package`)">
                        <v-icon class="text-grey-darken-1" size="small">mdi-package-variant-closed</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">بسته های کارگو</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class=" pointer" @click="print(item.data.id)">
                        <v-icon class="text-grey-darken-1" size="small">mdi-printer-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">پرینت بسته های کارگو</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="xsmall" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">حذف</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>

          <v-divider/>

          <v-card-actions class="pb-3" >
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
                  <span class="mt-2" id="row-selector">
                <v-select
                    v-model="dataTableLength"
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

<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import CreateCargo from '@/components/Cargo/Modal/CreateCargo.vue'
import Cargo from '@/composables/Cargo';
import {openToast, openConfirm} from "@/assets/js/functions";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  components: {
    CreateCargo,
    ModalColumnFilter,
    DashboardLayout,
    Header,
    ShTable
  },

  setup() {
    const {
      pageLength,
      cargoList,
      addPerPage,
      getCargoList,
      dataTableLength ,
      page  ,
      header ,
      item ,
      loading,
      filterField
    } = Cargo();
    return {
      pageLength,
      cargoList,
      addPerPage,
      getCargoList,
      dataTableLength ,
      page,
      header,
      item,
      loading,
      filterField
    }
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "cargo/crud/delete/",
      },
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

    print(id) {
      window.open(`${ import.meta.env.VITE_API_SITEURL}cargo-management/${id}/print`, '_blank');
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  mounted() {
    this.getCargoList()
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
    cargoList(){
      this.itemListTable = []

      this.cargoList.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                vehicle_type: item.vehicle?.vehicle_type,
                license: item.vehicle?.license,
                driver_name: item.driver?.full_name,
                phone_number: item.driver?.phone_number,
                package_count: item.package_count,
                created_at_fa: item.created_at_fa,
                updated_at_fa: item.updated_at_fa,
                custom: item.status ,
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
      this.getCargoList()
    },

    page(){
      if (!this.perPageFilter){
        this.getHomePageBanner()
      }
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getCargoList();
          openToast(this.$store, 'محصول با موفقیت حذف شد', "success")
          localStorage.removeItem('deleteObject')
        }
      }
    }
  }
}

</script>