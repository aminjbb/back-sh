<template>
  <div class="h-100 d-flex flex-column align-stretch ">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
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

                      <div @click="assignSku(item.props.value)" class="seller__add-sku-btn d-flex justify-center align-center">
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
        <v-col cols="2">

        </v-col>
      </v-row>
    </v-card>
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          ref="retailShipmentShps"
          class="flex-grow-1"
          :header="headerShps"
          :items="retailShipment?.shps_list"
          editUrl="/seller/edit/"
          activePath="seller/crud/update/activation/"
          :deletePath="`shipment/consignment/${$route.params.retailId}/detach/shps/`"
          changeStatusUrl="seller/crud/update/contract/"
          :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
          :loading="loading"
          @updateList="updateList"
          updateUrl="seller/csv/mass-update"
          :objectStatus="retailShipment?.status"
          model="editShpsRetail" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">

          </v-col>

          <v-col cols="6" class="d-flex justify-center">

          </v-col>

          <v-col cols="3" class="d-flex justify-end">
            <div  class="d-flex align-center">
              <v-btn
                  :loading="loading"
                  rounded
                  variant="text"
                  width="115"
                  @click="$router.go(-1)"
              >
                <span class="t14300">
                انصراف
              </span>
              </v-btn>
              <v-btn
                  :loading="loading"
                  rounded
                  color="primary500"
                  variant="elevated"
                  width="115"
                  @click="$router.go(-1)"
              >

                <span class="t14300">
                تایید
              </span>
              </v-btn>


            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Table from '@/components/RetailShipment/Table/RetailShipmentShpsTable.vue'
import RetailShipment from "@/composables/RetailShipment";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
  openToast
} from "@/assets/js/functions";
import {
  AxiosCall
} from "@/assets/js/axios_call";

export default {
  setup() {
    const {
      retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps
    } = RetailShipment();

    return {
      retailShipments, pageLength, filterField ,addPerPage, dataTableLength, page, header, loading ,headerShps
    };
  },

  data(){
    return{
      skuSearchList:[],
      shpsList:[],
      loading:false,
      retailShipment:null
    }
  },

  components: {
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
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
    async getRetailShipmentDetail(item) {

      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/consignment/crud/get/${this.$route.params.retailId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.retailShipment =data.data
      }

    },
    async assignSku(shps) {
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      AxiosMethod.using_auth = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/consignment/${ this.$route.params.retailId }/attach/shps`
      formData.append('shps' , shps.id)
      formData.append('count' , 1)
      formData.append('min_tolerance' , 1)
      formData.append('max_tolerance' , 100)
      AxiosMethod.form = formData
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = true
        const form = {
          shps : shps.id,
          maxTolerance :100,
          minTolerance :1,
          count:1
        }
        this.$refs.retailShipmentShps.form.push(form)
        this.getRetailShipmentDetail()
        openToast(
            this.$store,
            'محموله با موفقیت ایجاد گردید.',
            "success"
        );
      }
      else {
        this.loading = true
      }

    }
  },

  mounted() {
    this.getRetailShipmentDetail()
  },

  watch: {
    dataSkuTableLength(val) {
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getRetailShipmentDetail();
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
      this.getSkuSeller()
    }
  }
}
</script>
