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
        <div class="d-flex justify-center px-10">
          <v-radio-group v-model="autoSend" inline @update:model-value="dialog = true">
            <v-radio label="اتوماتیک" :value="true"></v-radio>
            <v-radio label="دستی" :value="false"></v-radio>
          </v-radio-group>
        </div>
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
        <div class=" mt-3 d-flex justify-center px-10 text-center">
          <v-text-field v-if="autoSend" v-debounce="shpsDetail" v-model="shpssSingeLocate" variant="outlined" :autofocus="true"/>
          <v-text-field v-else @keyup.enter="shpsDetail()" v-model="shpssSingeLocate" variant="outlined" :autofocus="true"/>
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
          <v-icon @click="$router.go(-1)" size="30">
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
        <template v-if="pickUpShps.placement">
          <div class="text-right my-5 px-5 d-flex justify-space-between px-10">
            <div>
           <span class="t16400">
           شماره ردیف :
            <span class="text-gray600 number-font">
              {{ pickUpShps?.placement?.row_number }}
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
        </template>
        <template v-else>
          <div class="text-right my-5 px-5 d-flex justify-center px-10">
            <span>
              جایگاهی برای این کالا وجود ندارد
            </span>
          </div>

        </template>
      </v-card>
      <div class="scan_box mb-10">
        <div>
          <div class="px-5">
            <v-card class="mt-2 py-5">
              <div class="d-flex justify-center">
                <img :src="pickUpShps?.shps?.sku?.sku?.image_url" width="150" height="150" alt="">
              </div>
              <div class="text-center px-10 my-3">
              <span class="text-gray600">
                {{ pickUpShps?.shps?.sku?.sku?.label }}
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
        <div>
          <v-radio-group v-model="autoSend" inline @update:model-value="dialog = true">
            <v-radio label="اتوماتیک" :value="true"></v-radio>
            <v-radio label="دستی" :value="false"></v-radio>
          </v-radio-group>
        </div>
        <div class=" mt-8 d-flex justify-center px-10 text-center">
          <span class="text-black t20400">
         شناسه شلف را اسکن کنید.
          </span>
        </div>
        <div class=" mt-3 d-flex justify-center px-10 text-center">
          <v-text-field @keyup.enter="placementScan()" v-model="placementBarcode" variant="outlined" :autofocus="true"/>
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="!shelfScan&& !shpsScan && pickUpDone">
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
          <span class="t18400 dir-rtl">
            کالا با شناسه {{ shpssSingeLocate }} به شلف با شناسه {{ placementSplitId }} منصوب شد.
          </span>
        </div>
        <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
          <v-btn
              color="white"
              height="40"
              width="348"
              rounded
              @click="clearPage()"
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
    const {getPickUpShps, pickUpShps, loading} = new WarehouseOrder()
    return {
      getPickUpShps, pickUpShps, loading
    }
  },
  data() {
    return {
      shpssBarCode: '',
      placeCount: 0,
      pickUpDone: false,
      shpsScan: false,
      shelfScan: false,
      shpssSingeLocate: null,
      placementBarcode: null,
      placementSplitId: null,
      autoSend:true
    }
  },

  methods: {
    clearPage() {
      this.pickUpDone = false
      this.shpsScan = false
      this.shelfScan = false
      this.shpssSingeLocate = null
      this.placementBarcode = null
      this.placementSplitId = null
    },
    async placementScan() {
      try {
        const barcodeSplit = this.placementBarcode.split('-')
        if (barcodeSplit[1]) {
          this.placementSplitId = barcodeSplit[1]
          await this.singularLocate(barcodeSplit[1])
        } else {
          this.placementSplitId = this.placementBarcode
          await this.singularLocate(this.placementBarcode)
        }
      } catch (e) {

      }
    },
    async singularLocate(placement) {
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('placement_id', placement)
        formData.append('barcode', this.shpssSingeLocate)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = 'shps/item/singular/locate'
        AxiosMethod.form = formData
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.shelfScan = false
          this.shpsScan = false
          this.pickUpDone = true
          this.loading = false
        } else {
          this.loading = false
        }
      } catch (e) {
        this.loading = false
        this.shpssBarCode = ''
      }
    },
    async shpsDetail() {
      try {
        if (this.shpssSingeLocate){
          this.loading = true
          const AxiosMethod = new AxiosCall()
          AxiosMethod.using_auth = true
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = 'shps/item/detail?barcode=' + this.shpssSingeLocate
          let data = await AxiosMethod.axios_get()
          if (data) {
            this.pickUpShps = data.data
            this.shpsScan = true
            this.loading = false
          } else {
            this.loading = false
          }
        }
      } catch (e) {
        this.loading = false
        this.shpssBarCode = ''
      }
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