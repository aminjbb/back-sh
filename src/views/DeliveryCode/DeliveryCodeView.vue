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

                <ModalGroupAdd
                    title="افزودن"
                    btnColor="primary500"
                    btnVariant="flat"
                    :plusIcon="true"
                    :isDeliveryCode="true"
                    @updateList="updateDeliveryCodeList"
                    :getEndPoint="'admin/order/delivery/barcode/template'"
                    :uploadEndpoint="'/admin/order/delivery/barcode/bulk'"/>

                <v-btn
                    color="primary500"
                    variant="outlined"
                    height="40"
                    rounded
                    class="px-8 mt-1 mr-5"
                    :loading="editDeliveryCodeLoading"
                    @click="editAllDeliveryCode()">
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                 ویرایش همه
                </v-btn>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                <PanelFilter
                    @resetPage="resetPage"
                    path="delivery-code/index"
                    :filterField="filterField"
                    :page="page"
                    :perPage="dataTableLength"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              @remove="removeItemDeliveryCode"
              :header="header"
              :items="deliveryList"
              :page="1"
              :perPage="100"
              ref="deliveryCodeTable" />

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
import { defineAsyncComponent } from "vue";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const ModalGroupAdd = defineAsyncComponent(() => import ('@/components/Public/ModalGroupAdd.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))
const ModalColumnFilter = defineAsyncComponent(()=> import('@/components/Public/ModalColumnFilter.vue'))
const Table = defineAsyncComponent(() => import ('@/components/DeliveryCode/Table/Table.vue'))
const ModalExcelDownload = defineAsyncComponent(() => import ('@/components/Public/ModalExcelDownload.vue'))
const SingleEditModal = defineAsyncComponent(() => import ('@/components/DeliveryCode/Modal/SingleEditModal.vue'))
import DeliveryCode from "@/composables/DeliveryCode"

export default {
  name: "DeliveryCodeView",

  components: {
    SingleEditModal,
    DashboardLayout,
    Header,
    ModalGroupAdd,
    ModalColumnFilter,
    PanelFilter,
    Table,
    ModalExcelDownload
  },

  setup() {
    const {
      pageLength,
      filterField,
      dataTableLength,
      page,
      header,
      loading,
    } = DeliveryCode()
    return {
      pageLength,
      filterField,
      dataTableLength,
      page,
      header,
      loading
    }
  },

  data(){
    return{
      deliveryList: [],
      editDeliveryCodeLoading: false
    }
  },

  methods: {
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

    updateDeliveryCodeList(data) {
      this.deliveryList = data
    },

    removeItemDeliveryCode(index){
      this.deliveryList.splice(index , 1)
    },

    async editAllDeliveryCode() {
      try {
        this.editDeliveryCodeLoading = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'admin/order/delivery/barcode/import'
        this.deliveryList.forEach((element , index)=>{
          formData.append(`barcode_list[${index}][new_barcode]`, element?.new_barcode)
          formData.append(`barcode_list[${index}][old_barcode]`, element?.old_barcode)
          formData.append(`barcode_list[${index}][new_sending_method]`, element?.new_sending_method)
        })
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.form = formData
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data){
          this.editDeliveryCodeLoading = false
          this.deliveryList.forEach((element , index)=>{
            this.$refs.deliveryCodeTable.changeStatus(index , 'موفق')
          })
        }
        else{
          this.editDeliveryCodeLoading = false
          this.deliveryList.forEach((element , index)=>{
            this.$refs.deliveryCodeTable.changeStatus(index , 'ناموفق')
          })
        }
      }
      catch (e) {
        this.editDeliveryCodeLoading = false
        this.deliveryList.forEach((element , index)=>{
          this.$refs.deliveryCodeTable.changeStatus(index , 'ناموفق')
        })
      }
    }
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
      this.updateDeliveryCodeList()
    },

    page(){
      if (!this.perPageFilter){
        this.updateDeliveryCodeList()
      }
    }
  }
}
</script>

<style scoped>

</style>