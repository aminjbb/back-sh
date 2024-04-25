<template>
  <div class="h-100">
    <v-card height="70" class="ma-5 br-12">
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
                      <div
                          @click="assignSku(item.item.raw.id, item.item.title, item.item.raw.image, item.item.raw.customerPrice, item.item.raw.sitePrice, item.item.raw.siteStock)"
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
                          class="text-gray500 t14300 text-right" />
                    </v-col>
                  </v-row>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="br-12 d-flex flex-column align-stretch" height="600">
      <Table
          class="flex-grow-1"
          :header="headerSelectProduct"
          :items="shpsList"
          editUrl="/seller/edit/"
          :deletePath="`page/home/section/slider/${$route.params.specialId}/sku/detach/`"
          changeStatusUrl="seller/crud/update/contract/"
          :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
          :loading="loading"
          @updateList="updateList"
          updateUrl="seller/csv/mass-update"
          model="sku" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row justify="start" class="px-8">
          <v-col cols="5">
            <span class="text-center">جمع:</span>
          </v-col>
          <v-col cols="1" class="text-center number-font">{{getTotal('customerPrice')}}</v-col>
          <v-col cols="1" class="text-center number-font">{{getTotal('sitePrice')}}</v-col>
          <v-col cols="2" class="text-center number-font">{{getTotal('siteStock')}}</v-col>
          <v-col cols="2" class="text-center number-font">{{getTotal('count')}}</v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Table from '@/components/ManualOrder/ManualOrderTable/SelectOrderTable.vue'
import Seller from "@/composables/Seller";
import Home from "@/composables/Home";
import SkuModalTableFilter from '@/components/Seller/Sku/Filter/SkuSellerFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
  AxiosCall
} from "@/assets/js/axios_call";
import ManualOrders from "@/composables/ManualOrders";
import {th} from "vuetify/locale";

export default {
  setup(props) {
    const { headerSelectProduct } = ManualOrders()
    const {
      getSkuSeller,
      sellerSku,
      headerSku,
      filterFieldSku ,
      skuPage ,
      dataSkuTableLength,
      addSkuPerPage,
      pageLength,
      loading
    } = Seller();

    const {
      homePageSingleSlider ,
      getHomePageSingleSlider ,
      homePageSkuHeader
    } = new Home()

    return {
      getSkuSeller ,
      sellerSku,
      headerSku,
      filterFieldSku,
      addSkuPerPage,
      pageLength,
      headerSelectProduct,
      skuPage ,
      dataSkuTableLength ,
      homePageSingleSlider ,
      getHomePageSingleSlider,
      homePageSkuHeader,
      loading
    };
  },

  data(){
    return{
      skuSearchList:[],
      shpsList:[],
    }
  },

  components: {
    Table,
    ModalGroupAdd,
    SkuModalTableFilter,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    skuList() {
      try {
        let sku = []
        this.skuSearchList.forEach(permission => {
          const form = {
            name: permission?.sku?.label + '(' + permission?.id + ')',
            id: permission?.id,
            image: permission?.sku?.image?.file?.url,
            customerPrice: permission?.customer_price,
            sitePrice: permission?.site_price,
            siteStock: permission?.site_stock
          }
          sku.push(form)
        })
        return sku
      } catch (e) {
        return []
      }
    }
  },

  methods: {
    updateList(status) {
      if (status === 'true') {
        this.shpsList();
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

    async assignSku(id, label, image, customerPrice, sitePrice, siteStock) {
      const form = {
        id: id,
        label : label,
        count:0,
        image: image,
        customerPrice: customerPrice,
        sitePrice: sitePrice,
        siteStock: siteStock,
      }
      this.shpsList.push(form)
      this.$emit('shpsListUpdated', this.shpsList)
    },

    getTotal(property) {
      return this.shpsList.reduce((total, item)=>parseInt(item[property])+total, 0)
    }
  }
}
</script>
