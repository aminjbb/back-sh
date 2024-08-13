<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card max-height="400" class="mx-5 pb-15">
          <div class="text-center my-3">
        <span>
          پردازش محموله
        </span>
          </div>
          <v-divider/>
          <v-row align="center" class="px-3 my-5">
            <v-col cols="6">
              <div class="text-right">
                <span class="text-gray600 t14 w500">شناسه محموله</span>
                <span class="text-error">*</span>
              </div>
              <div>
                <v-text-field
                    variant="outlined"
                    :rules="rule"
                    :autofocus="true"
                    v-model="shipmentId"/>
              </div>
            </v-col>
            <v-col cols="6">
              <v-row>
                <ModalDetaiShipment :shipmentId="splitShipmentId" class="ml-2 mt-4"/>
                <v-btn
                    :loading="loading"
                    :disabled="!splitShipmentId"
                    @click="validate()"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-5">
                  پردازش
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="6" />

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                <PanelFilter @resetPage="resetPage" path="up-coming/index" :filterField="filterField" :statusItems="statusItems"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">
            <template v-slot:customSlot="item">
              <div
                  class="factor-dropdown__selected"
                  :style="{ backgroundColor: BgSelected(item.data.custom) }">
                <span style="font-size: 9px " > در حال ارسال به انبار</span>
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
                      <div class="ma-5 pointer" @click="$router.push(`/processing-shipment/${item.data.id}/shps-list`)">
                        <v-icon size="small" class="text-grey-darken-1">mdi-comment-processing-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">
                        پردازش محموله
                      </span>
                      </div>

                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class=" pointer" @click="print(item.data.id)">
                        <v-icon size="small" class="text-grey-darken-1">mdi-printer-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">
                         پرینت محموله
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
      </div>
    </v-main>
  </v-layout>

</template>

<script>
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ShTable from "@/components/Components/Table/sh-table.vue";
import UpComing from "@/composables/UpComing"
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue"
import { openToast, convertDateToJalai } from "@/assets/js/functions"
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue"
import ModalDetaiShipment from "@/components/ProcessingShipment/Modal/ModalDetaiShipment.vue";

export default {
  data() {
    return {
      perPageFilter:false,
      loading: false,
      shipmentId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: true,
      itemListTable: []
    }
  },

  setup() {
    const statusItems= [
      {
        label: 'در انتظار',
        value: 'waiting',
      },
      {
        label: 'در حال بررسی',
        value: 'in_review',
      },
      {
        label: 'رد شده',
        value: 'rejected',
      }
    ]
    const {
      pageLength,
      filterField,
      upComingList,
      getUpComingList,
      dataTableLength,
      page,
      header,
      loading
    } = UpComing();
    return {
      pageLength,
      filterField,
      upComingList ,
      getUpComingList,
      dataTableLength,
      page,
      header,
      loading,
      statusItems
    }
  },

  components: {
    ModalDetaiShipment,
    PanelFilter,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header,
    ShTable
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },
    splitShipmentId() {
      try {
        const splitData = this.shipmentId.split('-')
        if (splitData[1]) return splitData[1]
        else {
          return this.shipmentId
        }
      }
      catch (e) {
        return ''
      }
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
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

    validate() {
      this.$router.push(`/processing-shipment/${this.splitShipmentId}/shps-list`)
    },

    print(id) {
      window.open(`${ import.meta.env.VITE_API_SITEURL}up-coming/${id}/print`, '_blank');
    },
  },

  mounted() {
    this.getUpComingList();
  },

  watch: {
    upComingList(){
      this.itemListTable = []

      this.upComingList.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                type: item.type,
                shps_count: item.shps_count,
                shps_variety: item.shps_variety,
                shopping_name: item.seller? item.seller.shopping_name : 'شاواز',
                supplier_name: item?.factor?.supplier?.shopping_name,
                creator_name:  item.creator.first_name + ' ' + item.creator.last_name,
                sent_at: convertDateToJalai(item.sent_to_warehouse_at , '-' , false),
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

    page(){
      if (!this.perPageFilter){
        this.getUpComingList()
      }
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

    $route(to){
      this.getUpComingList(to);
    }
  }
}
</script>