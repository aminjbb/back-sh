<template>
  <div class="loading_modal" v-if="loading">
    <v-progress-circular
        indeterminate
        color="purple"
    ></v-progress-circular>
  </div>
  <template v-if="!shpsScan && !pickUpDone && !shelfScan">
    <div class="h-100 d-flex align-center justify-center">
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
      </div>
    </div>

  </template>
  <template v-else-if="shpsScan && !pickUpDone && !shelfScan">
    <v-card class="h-100">
      <div class="d-flex justify-space-between align-center">
        <div class="pa-3 d-flex">
          <HandheldDrawer/>
          <span class="t20400">
            جایگذاری تکی
          </span>
        </div>
        <div class="pa-3">
          <v-icon @click="$router.go(-1)"  size="30">
            mdi-chevron-left
          </v-icon>
        </div>
      </div>

      <v-card class="ma-5 br-15" min-height="196">
        <div class="d-flex justify-center my-3">
          <span class="t20400">
            جایگاه کالا
          </span>
        </div>
        <v-divider/>
        <div class="text-right my-5 px-5 d-flex justify-space-between px-10">
          <div>
           <span class="t16400">
           شماره ردیف :
            <span class="text-gray600 number-font">
              {{ pickUpShps?.placement?.row_numbe }}
            </span>
          </span>
          </div>
          <div>
          <span class="t16400">
           شماره قفسه  :
            <span class="text-gray600 number-font">
              {{ pickUpShps?.placement?.placement_number }}
            </span>
          </span>
          </div>
        </div>
        <div class="text-right mt-10 px-5 d-flex justify-space-between px-10">
          <div>
           <span class="t16400">
           شماره طبقه :
            <span class="text-gray600 number-font">
               {{ pickUpShps?.placement?.step_number }}
            </span>
          </span>
          </div>
          <div>
          <span class="t16400">
           شماره شلف   :
            <span class="text-gray600 number-font">
             {{ pickUpShps?.placement?.shelf_number }}
            </span>
          </span>
          </div>
        </div>
      </v-card>
      <div class="scan_box mb-10">
        <div>
          <div class="px-5">
            <v-card class="mt-2 py-5">
              <div class="d-flex justify-center">
                <img src="@/assets/img/productImge.png" width="150" height="150" alt="">
                <!--              <img :src="pickUpShps?.shps?.sku?.image_url" width="150" height="150" alt="">-->
              </div>
              <div class="text-center px-10 my-3">
              <span class="text-gray600">
                {{ pickUpShps?.shps?.sku?.label }}
              </span>
              </div>
            </v-card>
          </div>
        </div>
        <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
          <v-btn
              @click="shelfScan = true ; shpsScan=false"
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
    </v-card>
  </template>
  <template v-else-if="!shpsScan && shelfScan && !pickUpDone">
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
      </div>
    </div>
  </template>
  <template v-else-if="!shelfScan&& !shelfScan && pickUpDone">
    <div class="h-100 bg-success d-flex  justify-center align-center">
      <div>
        <div class="d-flex justify-center">
          <v-icon color="succes" size="30">
            mdi-check-circle
          </v-icon>
        </div>
        <div class="text-center mt-15">
            <span class="t20400">
           جایگاه کالا تغییر کرد.
          </span>
        </div>
        <div class="text-center mt-15">
          <span  class="t18400">
            کالا با شناسه ۱۲۳۴۵۶ به شلف با شناسه ۲۲۳۳۴۴ منصوب شد.
          </span>
        </div>
        <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
          <v-btn
              color="white"
              height="40"
              width="348"
              rounded
              @click="pickUpDone = false"
              class="px-8 mt-5">
            بازگشت
          </v-btn>
        </div>
      </div>

    </div>
  </template>
</template>
<script>
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
import WarehouseOrder from '@/composables/WarehouseOrder'
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";

export default {
  setup() {
    const {getPickUpShps, pickUpShps , loading} = new WarehouseOrder()
    return {
      getPickUpShps, pickUpShps , loading
    }
  },
  data() {
    return {
      error: true,
      qrCode: '',
      shpssBarCode: '',
      placeCount: 0,
      pickUpDone: true,
      shpsScan:false,
      shelfScan:false
    }
  },

  mounted() {
    // this.getPickUpShps()
    var element = document.body // You must specify element here.
    element.addEventListener('keydown', e => {
      if (e.key == 'Enter') this.scanQrCode()
      else this.qrCode += e.key
    });
  },

  methods: {
    scanQrCode() {
      this.shpssBarCode = this.qrCode
      this.qrCode = ''
      this.pickUpshpss(this.shpssBarCode)
    },
    async pickUpshpss(barcode) {
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('barcode', barcode)
      formData.append('placement_id', this.pickUpShps?.placement?.id)
      AxiosMethod.using_auth = true
      AxiosMethod.token = cookies.cookies.get('adminToken')
      AxiosMethod.end_point = 'admin/order/pick'
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.getPickUpShps()
      }
    },
  },

  components: {
    HandheldDrawer,
    LocatingToast
  }
}
</script>

<style>
.scan_box {
  height: calc(100% - 390px);

}
</style>