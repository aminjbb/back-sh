<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />

      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">
                <v-btn
                    @click="$router.push('/gift-shps/create')"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                  افزودن
                </v-btn>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                <PanelFilter
                    @resetPage="resetPage"
                    path="admin/index"
                    :filterField="filterField"
                    :page="page"
                    :perPage="dataTableLength"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading">
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
                      <div class="ma-5 pointer" @click="$router.push(`/admin/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-eye-outline
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">نمایش کاربر ها</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/admin/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-text-box-multiple-outline
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">لیست سفارشات</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="xsmall" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
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
      filterField,
      dataTableLength ,
      page,
      header,
      loading,
      getGiftList,
      giftList
    } = GiftShps()

    return {
      pageLength,
      filterField,
      dataTableLength ,
      page,
      header,
      loading,
      getGiftList,
      giftList
    }
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: [
        {
          title:'شامپو هدیه' ,
          shps_id:123 ,
          image:'' ,
          shps_count:3 ,
          order_limit:3 ,
          user_limit:3 ,
          created_at: '1402/06/12 11:24:52',
          last_login: '1402/06/12 11:24:52',
          is_active: 1,
        },
        {
          title:'شامپو هدیه' ,
          shps_id:123 ,
          image:'' ,
          shps_count:3 ,
          order_limit:3 ,
          user_limit:3 ,
          created_at: '1402/06/12 11:24:52',
          last_login: '1402/06/12 11:24:52',
          is_active: 0,
        }
      ],
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
    giftList() {
      this.itemListTable = []

      this.giftList.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                title: item,
                shps_id: item,
                image: item,
                shps_count: item,
                order_count: item,
                order_limit: item,
                user_limit: item,
                created_at: item,
                last_login: item,
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