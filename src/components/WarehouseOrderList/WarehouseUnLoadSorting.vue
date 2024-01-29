<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20400">
         تخلیه جایگاه سورتینگ
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30">
          mdi-chevron-left
        </v-icon>
      </div>
    </div>

    <template v-if="!sortingDone && !errorScan">
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
        <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
          <v-btn
              @click="sortingDone = true"
              color="primary500"
              height="40"
              width="348"
              variant="flat"
              rounded
              class="px-8 mt-2">
            تایید
          </v-btn>
        </div>
      </div>

    </template>
    <template v-else-if="sortingDone && !errorScan">
      <div class="h-100 bg-success d-flex align-center justify-center">
        <div>
          <div class="d-flex justify-center">
            <v-icon color="white" size="30">
              mdi-check-circle
            </v-icon>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <span class="text-white t20400">
           وضعیت جایگاه تغییر کرد.
            </span>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <span class="text-white t18400">
                 سفارش از جایگاه سورتینگ با شناسه شلف ۱۲۳۴۵۶
                  با موفقیت تخلیه شد.
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
              بازگشت
            </v-btn>
          </div>
        </div>
      </div>

    </template>
    <template v-else-if="!sortingDone && errorScan">
      <div class="h-100 bg-scanError d-flex align-center justify-center">
        <div>
          <div class="d-flex justify-center">
            <v-icon color="white" size="30">
              mdi-close-circle
            </v-icon>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <span class="text-white t20400">
           امکان اسکن بارکد وجود ندارد.
            </span>
          </div>
          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <span class="text-white t18400">
                  لطفا بارکد را بررسی کنید و دوباره اسکن کنید.
            </span>
          </div>
          <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
            <v-btn
                @click="errorScan = false"
                color="white"
                height="40"
                width="348"
                variant="flat"
                rounded
                class="px-8 mt-2">
              تلاش مجدد
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
      errorScan:true
    }
  },

  mounted() {
    // this.getPlacement(this.$route.params.placementId)
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
      this.getShpssDetail(this.shpssBarCode)
    },

    async getShpssDetail(qrCode) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/item?barcode=${qrCode}`
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
        this.shpssDetail = data.data
        if (data.data.placement) this.sortingShps()
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