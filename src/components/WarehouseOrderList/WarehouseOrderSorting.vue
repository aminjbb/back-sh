<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20400">
         سورتینگ
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
            <v-row justify="center">
              <v-col cols="6">
                <div>
                  <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
                </div>
              </v-col>
              <v-col cols="12">
                <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="getShpssDetail"  v-model="qrCode" variant="outlined" :autofocus="true"></v-text-field>
                <v-text-field v-else @keyup.enter="getShpssDetail()" :autofocus="true" v-model="qrCode" variant="outlined" ></v-text-field>
              </v-col>

            </v-row>
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
          <v-row justify="center">
            <v-col cols="6">
              <div>
                <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
              </div>
            </v-col>
            <v-col cols="12">
              <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="sortingShps"  v-model="shelfBarcode" variant="outlined" :autofocus="true"></v-text-field>
              <v-text-field v-else @keyup.enter="sortingShps()" :autofocus="true" v-model="shelfBarcode" variant="outlined" ></v-text-field>
            </v-col>

          </v-row>
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
            <span class="text-white t18400 d--rtl">
                  جایگذاری کالا با بارکد
              <span class=" d--ltr">
              {{ qrCode }}
            </span>
        در جایگاه سورتینگ {{ shelfBarcode }} با موفقیت انجام شد.
            </span>
          </div>
          <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
            <v-btn
                @click="reScan()"
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
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";

export default {
  data() {
    return {
      scanShps: true,
      qrCode: '',
      shpssBarCode: '',
      isPlacement: false,
      shpssDetail: '',
      shelfScan: false,
      sortingDone: false,
      shelfBarcode:'',
      autoSend:'automate'
    }
  },


  methods: {
    async getShpssDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/order/sorting/get-item?barcode=${this.qrCode}`
      AxiosMethod.toast_error = true
      AxiosMethod.store = this.$store
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.shpssDetail = data.data
      }
    },
    async sortingShps() {
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('shps_s_barcode', this.qrCode)
      formData.append('placement_barcode', this.shelfBarcode)
      AxiosMethod.form = formData
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      AxiosMethod.store = this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/order/sorting/put-sort`
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.shelfScan = false
        this.sortingDone = true
      }
    },
    reScan() {
      this.sortingDone = false
      this.shpssDetail = ''
      this.qrCode = ''
      this.shelfBarcode = ''
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