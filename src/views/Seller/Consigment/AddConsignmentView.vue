<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <!--      <AddShpsToSellerConsigment />-->
      <div class="h-100 d-flex flex-column align-stretch ">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="start"
              align="center"
              class="px-10 py-5">
            <v-col cols="6">
              <v-row justify="start">

                <v-autocomplete
                    placeholder="نام کالا یا شماره shps را جستجو نمایید"
                    variant="outlined"
                    prepend-inner-icon-cb="mdi-map-marker"
                    rounded="lg"
                    :items="skuList"
                    item-title="name"
                    item-value="value"
                    v-debounce="searchSku">

                  <template v-slot:item="item">
                    <v-list-item>
                      <v-row justify="center">

                        <v-col cols="4">

                          <div @click="assignSku(item.props.value)"
                               class="seller__add-sku-btn d-flex justify-center align-center">
                            <v-icon>mdi-plus</v-icon>
                          </div>

                        </v-col>
                        <v-col cols="8">
                          <text-clamp
                              :text='item?.props?.title'
                              :max-lines='1'
                              autoResize
                              location="start"
                              class="text-gray500 t14 w300 text-right"/>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-row>
            </v-col>
            <v-col cols="2">
              <ModalGroupAdd
                  getEndPoint="cargo/csv/get/template"
                  uploadEndpoint="cargo/csv/bulk"
                  :updateShps="updateShps"
                  :isRetail="true"
              />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              :deleteFunction="deleteSku"
              ref="retailShipmentShps"
              class="flex-grow-1"
              :header="headerConsigment"
              :items="shpsList"
              editUrl="/seller/edit/"
              activePath="seller/crud/update/activation/"
              deletePath="seller/crud/update/activation/"
              changeStatusUrl="seller/crud/update/contract/"
              :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
              :loading="loading"
              @updateList="updateList"
              updateUrl="seller/csv/mass-update"
              model="sellerConsigment"/>

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start">

              </v-col>

              <v-col cols="6" class="d-flex justify-center">

              </v-col>

              <v-col cols="3" class="d-flex justify-end">
                <div class="d-flex align-center">
                  <v-btn
                      rounded
                      variant="text"
                      width="115"
                  >
                <span class="t14 w300">
                انصراف
              </span>
                  </v-btn>
                  <v-btn
                      :loading="loadingBtn"
                      rounded
                      color="primary500"
                      variant="elevated"
                      width="115"
                      @click="sendShps()"
                  >

                <span class="t14 w300">
                تایید
              </span>
                  </v-btn>


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
// const AddShpsToSellerConsigment = defineAsyncComponent(()=> import ('@/components/Seller/Consigment/AddShpsToSellerConsigment.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/RetailShipment/Table/RetailShipmentShpsTable.vue'
import RetailShipment from "@/composables/RetailShipment";
import Seller from "@/composables/Seller";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast } from "@/assets/js/functions";
import { AxiosCall } from "@/assets/js/axios_call";

export default {
  setup(props) {
    const {
      retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps
    } = RetailShipment();
    const {
      headerConsigment
    } = Seller();

    return {
      retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps ,
      headerConsigment
    };
  },

  data(){
    return{
      skuSearchList:[],
      shpsList:[],
      loadingBtn:false
    }
  },

  components: {
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(skuSearch => {
          const form = {
            name: skuSearch.sku?.label + '(' + skuSearch.id + ')',
            value: skuSearch
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    },
  },

  methods: {
    updateShps(shps){
      shps.forEach(element => {
        const object = {
          sku :{
            label:element.sku
          },
          id:element.shps
        }
        this.assignSku(object)
      })
    },

    updateList(status) {
      if (status === 'true') {
        this.getSkuSeller();
      }
    },

    async searchSku(search) {
      this.skuSearchList = []
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `seller/sku/search?q=${search}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.skuSearchList = data.data.data
      }
    },
    async sendShps(){
      try {
        this.loadingBtn = true
        const formData = new FormData()
        this.$refs.retailShipmentShps.form.forEach((shps , index) => {
          formData.append(`shps_list[${index}][shps]`, shps.shps.id)
          formData.append(`shps_list[${index}][count]`, shps.count)
          formData.append(`shps_list[${index}][max_tolerance]` , 100)
          formData.append(`shps_list[${index}][min_tolerance]` , 0)
        })
        formData.append('seller_id' , this.$route.params.sellerId)

        formData.append('type' , 'consignment')
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `shipment/consignment/crud/create`
        AxiosMethod.form = formData
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loadingBtn = false
          openToast(
              this.$store,
              'محموله با موفقیت ایجاد گردید.',
              "success"
          );
          this.$router.go(-1)
        }
        else {
          this.loadingBtn = false
        }
      }
      catch (e) {
        this.loadingBtn = false
      }
    },
    async assignSku(shps) {
      const form = {
        shps : shps,
        maxTolerance :'100',
        minTolerance :'0',
        count:'0'
      }
      this.$refs.retailShipmentShps.form.push(form)
      this.shpsList.push(shps)

    },
    deleteSku(shps){
      const index = this.shpsList.findIndex(skuShps => skuShps.id === shps)
      if (index > -1) this.shpsList.splice(index , 1)
    }
  },

  watch: {
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getSellerList();
          openToast(
              this.$store,
              'انبار با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route(to, from) {
      this.getSkuSeller()
    }
  }
}
</script>


