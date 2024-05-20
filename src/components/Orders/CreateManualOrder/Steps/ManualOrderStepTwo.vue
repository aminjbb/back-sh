<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
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
                        class="text-gray500 t14300 text-right"/>
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
          ref="manualOrderTable"
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
      />

      <v-divider/>
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
      getSkuSeller,
      dataSkuTableLength, addSkuSellerPerPage,  skuSellerPage,
    } = Seller();
    const {
      manualOrderHeader,

      manualOrderList
    } = new Orders
    return {
      getSkuSeller,
      addSkuSellerPerPage,
      skuSellerPage,
      dataSkuTableLength,
      manualOrderHeader,
      manualOrderList,
    };
  },

  data() {
    return {
      skuSearchList: [],
      shpsList: [],
      shps: [],


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



    assignSku(item) {
      const form = {
        base_discount: item?.base_discount,
        cancelled_count: 0,
        count: 1,
        site_price:item?.site_price,
        customer_price: item?.customer_price,
        remained_count: 1,
        shps:{
          id: item?.id,
          site_stock:item?.site_stock,
          sku:{
            label: item?.sku?.label,
            image_url:item?.sku?.image?.image_url
          }
        }
      }

      const formTable = {
        shps: item?.id,
        count : 1
      }
      this.$refs.manualOrderTable.values.push(formTable)
      this.manualOrderList.push(form);
    },





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

    async assignSkuToSeller(id) {

    }
  },

  mounted() {

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
