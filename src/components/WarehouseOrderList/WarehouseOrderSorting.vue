<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20400">
         جمع آوری کالا
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30">
          mdi-chevron-left
        </v-icon>
      </div>
    </div>

    <template v-if="!shelfScan && !sortingDone">
      <div class="h-100 d-flex align-center justify-center" v-if="!shpssDetail">
        <div>
          <div class="d-flex justify-center">
            <v-icon color="black" size="30">
              mdi-barcode-scan
            </v-icon>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
        <span class="text-black t20400">
         شناسه کالا را اسکن کنید.
        </span>
          </div>
          <div class="mt-10 px-2">
            <v-text-field @keyup.enter="getShpssDetail()" :autofocus="true" v-model="qrCode" variant="solo"></v-text-field>
          </div>
          <div class="mt-15 pt-15">
            <v-row justify="center pt-15 mt-15">
              <v-col cols="10">
                <v-btn
                    @click="getShpssDetail()"
                    color="primary500"
                    height="40"
                    width="348"
                    variant="flat"
                    rounded
                    class="px-8 mt-2">
                  تایید
                </v-btn>
              </v-col>

            </v-row>
          </div>
        </div>
      </div>

      <div v-else>
        <v-card class="ma-5 br-15" min-height="196">
          <div class="d-flex justify-center my-3">
          <span class="t20400">
            جایگاه کالا
          </span>
          </div>
          <v-divider/>
          <div v-if="shpssDetail?.sorting_placement">
            <div class="text-center my-5 px-5 d-flex justify-space-between px-10">
              <div>
              <span class="t16400">
               شماره شلف   :
                <span class="text-gray600 number-font">
                 {{ shpssDetail?.sorting_placement }}
                </span>
              </span>
              </div>
            </div>
          </div>
          <div v-else class=" pt-8 px-10 text-center">
        <span class="t16400">
          برای مشخص شدن اطلاعات جایگاه، شناسه شلف را اسکن کنید.
        </span>
          </div>
        </v-card>
        <div class="scan_box">
          <div>
            <div class="px-5">
              <v-card class="mt-2 py-5">
                <div class="d-flex justify-center">
                  <img :src="skuDetail?.image_url" width="150" height="150" alt="">
                </div>
                <div class="text-center my-2">
              <span class="t16400">
                {{ skuDetail?.brand?.label }}
              </span>
                </div>
                <div class="text-center px-10 my-3">
              <span class="text-gray600">
               {{ skuDetail?.label }}
              </span>
                </div>
              </v-card>
            </div>
          </div>
        </div>
        <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
          <v-btn
              @click="shelfScan = true"
              color="primary500"
              height="40"
              width="348"
              variant="flat"
              rounded
              class="px-8 mt-2">
            اسکن شناسه شلف
          </v-btn>
        </div>
      </div>
    </template>
    <template v-else-if="shelfScan && !sortingDone">
      <div class="h-100 d-flex align-center justify-center">
        <div>
          <div class="d-flex justify-center">
            <v-icon color="black" size="30">
              mdi-barcode-scan
            </v-icon>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <span class="text-black t20400">
            شناسه شلف را اسکن کنید.
            </span>
          </div>
          <v-text-field @keyup.enter="sortingShps(qrCode,shelfBarcode)" :autofocus="true" v-model="shelfBarcode" variant="solo"></v-text-field>
        </div>
      </div>

    </template>
    <template v-else-if="!shelfScan && sortingDone">
      <div class="h-100 bg-success d-flex align-center justify-center">
        <div>
          <div class="d-flex justify-center">
            <v-icon color="white" size="30">
              mdi-check-circle
            </v-icon>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <span class="text-white t20400">
           جایگذاری با موفقیت انجام شد.
            </span>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <span class="text-white t18400">
                  جایگذاری کالا با شناسه {{ skuDetail?.id }}
        در جایگاه سورتینگ {{ shelfBarcode }} با موفقیت انجام شد.
            </span>
          </div>
          <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
            <v-btn
                @click="sortingDone = false"
                color="white"
                height="40"
                width="348"
                variant="flat"
                rounded
                class="px-8 mt-2">
              اسکن کالای بعدی
            </v-btn>
          </div>
        </div>
      </div>

    </template>
  </v-card>
</template>
<script>
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
import Placement from '@/composables/Placement'
import Sku from '@/composables/Sku'
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";

export default {
  setup() {
    const {getPlacement, placement} = new Placement()
    const {getShpssDetail, shpssDetail} = new Sku()
    return {
      getPlacement, placement,
      getShpssDetail, shpssDetail
    }
  },
  data() {
    return {
      scanShps: true,
      qrCode: '',
      shpssBarCode: '',
      isPlacement: false,
      shpssDetail: '',
      shelfScan: false,
      sortingDone: false,
      shelfBarcode:''
    }
  },


  methods: {
    async getShpssDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/item?barcode=${this.qrCode}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.shpssDetail = data.data
        if (data.data.sorting_placement) this.sortingShps(data.data.barcode, data.data.sorting_placement)
      }
    },
    async sortingShps(shpsBarcode, placement) {
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('shps_s_barcode', shpsBarcode)
      formData.append('placement_barcode', placement.barcode)
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/sort`
      let data = await AxiosMethod.axios_get()
      if (data) {


      }
    },
    checkCount() {
      if (this.shpssDetail.shps_count < this.placeCount) ++this.placeCount
      else this.placeCount = 0
    }
  },

  components: {
    HandheldDrawer,
    LocatingToast
  },
  computed: {
    skuDetail() {
      try {
        return this.shpssDetail.shps.sku?.sku
      } catch (e) {

      }
    }
  }
}
</script>

<style>
.scan_box {
  height: calc(100% - 390px);

}
</style>