<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <CrossDockList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6" >
              <v-btn
                  @click="$router.push(`/seller/${$route.params.sellerId}/cross-dock/add`)"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 ">
                <template v-slot:prepend>
                  <v-icon>mdi-plus</v-icon>
                </template>
                ساخت محموله
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="header" />

                <PanelFilter
                    :path="`seller/${$route.params.sellerId}/cross-dock/index`"
                    :filterField="filterFieldAllRetail"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <!-- last tabel was used from ShipmentRequest old table, so debugging will recommended after available api data       -->
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading"
              activePath="page/crud/update/activation/"
          >
            <template v-slot:customSlot="item">
              <div v-if="item.data.custom === 'in_review'" class="factor-dropdown">
                <div
                    class="factor-dropdown__selected"
                    @click="showDropDown(item.index)"
                    :style="{ backgroundColor: BgSelected(item.data.custom) }">
                  <span class="t10 w400">{{ factorSelectedTitle(item.data.custom) }}</span>
                  <v-icon icon="mdi-chevron-down"></v-icon>
                </div>
                <div class="factor-dropdown__items  align-center pr-2" :id="`factor-dropdown__items-${item.index}`">
                  <div
                      class="factor-dropdown__item my-2 t10 w400"
                      id="factor-dropdown__item--1">
                    {{ translateType(item.data.custom) }}
                  </div>
                  <div
                      class="factor-dropdown__item my-2 t10 w400"
                      id="factor-dropdown__item--2"
                      @click="openRejectModal(item.data.data)">
                    رد شده
                  </div>
                  <div
                      class="factor-dropdown__item retail-status-box my-2 t10 w400"
                      id="factor-dropdown__item--3"
                      @click="updateStatus(item.index,'approved',item.data.id)">
                    تایید شده
                  </div>
                </div>
              </div>
              <div v-else class="expanded-background" :style="{ backgroundColor: BgSelected(item.data.custom) }">
                {{ factorSelectedTitle(item.data.custom) }}
              </div>
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
                      <div class="ma-3 pointer" @click="print(item.data.id)">
                        <v-icon size="x-small" class="text-grey-darken-1">mdi-eye-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                        نمایش جزئیات
                                  </span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </ShTable>
          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">
                <ModalExcelDownload getEndPoint="cargo/csv/requested/cargo/export" />
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
                      next-icon="mdi-chevron-left" />
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
                     :items="[25,50,100]" />
              </span>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>

        <!--
              <ModalRejectRequestShipment :getShipmentRequestsList="getShipmentRequestsList"/>
        -->
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const CrossDockList = defineAsyncComponent(()=> import ('@/components/Seller/CrossDock/CrossDockList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import CrossDock from "@/composables/CrossDock";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalRejectRequestShipment from "@/components/ShipmentRequests/Modal/ModalRejectRequestShipment.vue";

export default {
  data(){
    return{
      itemListTable: []
    }
  },
  setup(props) {
    const {
      pageLength,
      getCrossDockListing,
      crossDock,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading,
      filterFieldAllRetail
    } = CrossDock();
    return {
      pageLength,
      getCrossDockListing,
      crossDock,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading,
      filterFieldAllRetail
    };
  },

  components: {
    PanelFilter,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable,
    ModalRejectRequestShipment,
    DashboardLayout,
    Header
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

    print(id) {
      window.open(`${ import.meta.env.VITE_API_SITEURL}shipment-requests/${id}/print-detail`, '_blank');
    },
    translateType(type) {
      const translations = {
        'consignment': 'انبارش',
        'in_review': 'در حال بررسی'
      };
      return translations[type] || type;
    },
    BgSelected(status) {
      if (status === 'in_review') {
        return '#EDE7F6';  // Light purple
      }
      if (status === 'approved') {
        return '#E8F5E9';  // Light green
      }
      if (status === 'rejected') {
        return '#FFEBEE';  // Light red
      }
      return 'transparent';  // Default background
    },
    factorSelectedTitle(status) {
      if (status === 'in_review') {
        return 'در حال بررسی '
      }
      if (status === 'approved') {
        return '  تایید شده'
      }
      if (status === 'rejected') {
        return '  رد شده '
      }

    },
    showDropDown(index) {
      const itemDropdown = document.getElementById(`factor-dropdown__items-${index}`);
      itemDropdown.classList.toggle('active');
    },
    openRejectModal(item){
      const form = {
        dialog :true,
        object : item
      }
      this.$store.commit('set_modalRejectRequestShipment' , form)
    },
    async updateStatus(status, id) {
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      formdata.append('status', status)
      AxiosMethod.end_point = 'shipment/consignment/crud/update/status/' + id
      AxiosMethod.store = this.$store
      AxiosMethod.form = formdata

      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()

      if (data.status === 'Success') {

        this.getShipmentRequestsList()

        openToast(
            this.$store,
            'وضعیت با موفقیت ویرایش شد.',
            "success"
        );
        this.$router.push(`/shipment-requests/index`)
      }
      else {
        this.loading = true
      }
    },
  },

  mounted() {
    this.getCrossDockListing()
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getPageList();
          openToast(
              this.$store,
              'صفحه مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route(){
      this.getCrossDockListing();
    },

    crossDock() {
      this.itemListTable = []
      this.crossDock.forEach((item) => {
        this.itemListTable.push(
            {
              data: item,
              id: item.id,
              type: item.id ? this.translateType(item.type) : 'نامعلوم',
              shps_count: item.shps_count ? item.shps_count : 'نامعلوم',
              shps_variety: item.shps_variety ? item.shps_variety : 'نامعلوم',
              shopping_name: item.seller ? item.seller.shopping_name : item.seller === null ? 'شاواز' : 'نامعلوم',
              creator: item.creator ? item.creator.first_name + ' ' + item.creator.last_name : 'نامعلوم',
              created_at_fa: item.created_at_fa ? item.created_at_fa : 'نامعلوم',
              updated_at_fa: item.updated_at_fa ? item.updated_at_fa : 'نامعلوم',
              custom: item.status ,

            }
        )
      })
    },
  }
}
</script>


