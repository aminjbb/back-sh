<template>
  <div class="h-100 d-flex flex-column align-stretch sku-seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">

      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6">


          <v-autocomplete
              placeholder="نام کالا یا شماره SHPS را جستجو نمایید"
              variant="outlined"
              prepend-inner-icon-cb="mdi-map-marker"
              rounded="lg"
              v-model="shps"
              :items="skuList"
              item-title="name"
              item-value="value"
              v-debounce="searchSku">

            <template v-slot:item="item">
              <v-list-item>
                <v-row justify="center">

                  <v-col cols="4">

                    <div @click="assignSku(manualOrderList)" class="seller__add-sku-btn d-flex justify-center align-center">
                      <v-icon>mdi-plus</v-icon>
                    </div>

                  </v-col>
                  <v-col cols="8">
                    <text-clamp
                        :text='item?.props?.title'
                        :max-lines='1'
                        autoResize
                        location="start"
                        class="text-gray500 t14300 text-right" />
                  </v-col>
                </v-row>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>


        <v-col cols="6">
          <v-row justify="end">



          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="manualOrderHeader"
          :page="skuSellerPage"
          :perPage="dataSkuTableLength"
          :items="manualOrderList"
          editUrl="/seller/edit/"
          :activePath="`seller/${$route.params.sellerId}/sku/update/activation/`"
          :deletePath="`seller/${$route.params.sellerId}/sku/delete/`"
          changeStatusUrl="seller/crud/update/contract/"
          :loading="loading"
          @updateList="updateList"
          updateUrl="seller/csv/mass-update"
          model="shps" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">

          </v-col>

          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="skuSellerPage"
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
                                v-model="dataSkuTableLength"
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
</template>

<script>
import Table from '@/components/Orders/Table/ManualOrderTable.vue'
import Seller from "@/composables/Seller";
import Orders from "@/composables/Orders";
import {
  openToast
} from "@/assets/js/functions";
import {
  AxiosCall
} from "@/assets/js/axios_call";
export default {
  setup(props) {
    const {
      getSkuSeller ,
     dataSkuTableLength,addSkuSellerPerPage,pageLength , skuSellerPage,
    } = Seller();
    const {
      manualOrderHeader,
      getManualOrderList,
      getManualOrderListGet,
      manualOrderListGet,
      manualOrderList
    } = new Orders
    return {
      getSkuSeller ,addSkuSellerPerPage , pageLength,  skuSellerPage,
     dataSkuTableLength, manualOrderHeader, getManualOrderList, manualOrderList, getManualOrderListGet , manualOrderListGet
    };
  },

  data(){
    return{
      skuSearchList:[],
      shpsList:[],
      shps :null,
    }
  },

  components: {
    Table,
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
    shpsCreatingForm(){
      var formData = new FormData()
      this.$refs.shpsForm2.shpsCreatingForm.forEach((manualOrderListGet , index)=>{
        formData.append(`shps_list[${index}][shps]` ,manualOrderListGet.user_id )
        formData.append(`shps_list[${index}][count]` ,manualOrderListGet.shps_count )
      })
      formData.append(`user_id` , this.$refs.shpsForm2.form.user )
      formData.append(`address_id` , this.manualOrderListGet.address_id )
      formData.append(`sending_method` , this.manualOrderListGet.sending_method )
      formData.append(`parent_id` , this.manualOrderListGet.id )
      formData.append(`description` , this.manualOrderListGet.description )

      this.createManualOrder(formData)
    },


    async createManualOrder(formData) {
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.toast_success = false
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'admin/order/crud/create'
      AxiosMethod.form = formData

      let data = await AxiosMethod.axios_post()
      if (data) {
        await  this.approvedSku()
        this.step = 1
      } else {
        this.loading = false
      }
    },
    async assignSku(manualOrderList) {

      const form = {
        count: 1,
        shps:{
          site_stock: manualOrderList.shps?.site_stock
        },
        site_price: manualOrderList.site_stock,

      }
      console.log(manualOrderList , 'hiiiiiiiii', form)
      this.manualOrderList.push(form)
      console.log(form)

    },
    changeHeaderShow(index, value) {
      this.manualOrderHeader[index].show = value
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

    async assignSkuToSeller(id) {

    }
  },

  mounted() {

    this.getManualOrderList();
  },

  watch: {
    dataSkuTableLength(val) {
      this.addSkuSellerPerPage(val)
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getSkuSeller();
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route(to, from) {
      this.getSkuSeller(to)
    }
  }


}
</script>
