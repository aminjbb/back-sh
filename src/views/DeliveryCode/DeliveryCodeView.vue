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

                <ModalGroupAdd
                    title="افزودن"
                    btnColor="primary500"
                    btnVariant="flat"
                    :plusIcon="true"
                    :isDeliveryCode="true"
                    @updateList="updateDeliveryCodeList"
                    :getEndPoint="'admin/order/delivery/barcode/template'"
                    :uploadEndpoint="'admin/order/delivery/barcode/bulk'"/>

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

<!--                <PanelFilter-->
<!--                    @resetPage="resetPage"-->
<!--                    path="delivery-code/index"-->
<!--                    :filterField="filterField"-->
<!--                    :page="page"-->
<!--                    :perPage="dataTableLength"/>-->
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="deliveryList"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">

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
                      <div class="ma-5 pointer">
                        <SingleEditModal :deliveryItem="item.data"/>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItemDeliveryCode(item.index)">
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

          <v-divider />

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
const ShTable = defineAsyncComponent(() => import ('@/components/Components/Table/sh-table.vue'))
const ModalExcelDownload = defineAsyncComponent(() => import ('@/components/Public/ModalExcelDownload.vue'))
const SingleEditModal = defineAsyncComponent(() => import ('@/components/DeliveryCode/Modal/SingleEditModal.vue'))
import {AxiosCall} from "@/assets/js/axios_call";

import DeliveryCode from "@/composables/DeliveryCode"
import {openToast} from "@/assets/js/functions";

export default {
  name: "DeliveryCodeView",

  components: {
    ShTable,
    SingleEditModal,
    DashboardLayout,
    Header,
    ModalGroupAdd,
    ModalColumnFilter,
    PanelFilter,
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
      editDeliveryCodeLoading: false,
      statuses: []
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

    changeStatus(index , text){
      this.statuses[index] = text
    },

    async editAllDeliveryCode() {
      try {
        this.editDeliveryCodeLoading = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'admin/order/delivery/barcode/import'
        this.deliveryList.forEach((element , index)=>{
          if (element.badge == 'normal'){
            formData.append(`barcode_list[${index}][new_barcode]`, element?.new_barcode)
            formData.append(`barcode_list[${index}][old_barcode]`, element?.old_barcode)
            formData.append(`barcode_list[${index}][new_sending_method]`, element?.new_sending_method)
          }

        })
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.form = formData
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data){
          this.editDeliveryCodeLoading = false
          openToast(this.$store, 'آپدیت بارکد ها با موفقیت انجام شد', "success");
        }
        else{
          this.editDeliveryCodeLoading = false

        }
      }
      catch (e) {
        console.log(e)
        this.editDeliveryCodeLoading = false

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