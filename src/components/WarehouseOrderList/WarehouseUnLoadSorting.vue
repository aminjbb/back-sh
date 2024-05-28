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

          <div class=" mt-8 d-flex justify-center px-10 text-center">
            <v-row justify="center">
              <v-col cols="12">
                <div>
                  <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
                </div>
              </v-col>
              <v-col cols="12">
                <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="shelfScanBarcode"  v-model="shelfBarcode" variant="outlined" :autofocus="true"></v-text-field>
                <v-text-field v-else @keyup.enter="shelfScanBarcode()" :autofocus="true" v-model="shelfBarcode" variant="outlined" ></v-text-field>
              </v-col>

            </v-row>

          </div>
          <div>
            <v-btn
                @click="shelfScanBarcode()"
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
                 سفارش از جایگاه سورتینگ با شناسه شلف {{ shelfBarcode }}
                  با موفقیت تخلیه شد.
            </span>
          </div>
          <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
            <v-btn
                @click="goToStep1()"
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

  data() {
    return {
      shelfScan: false,
      sortingDone: false,
      errorScan:false,
      shelfBarcode:'',
      autoSend :'automate',
      lastBarcode:null
    }
  },

  methods: {
    goToStep1(){
      this.sortingDone = false
      this.shelfBarcode = ''
    },
    shelfScanBarcode() {
      if (this.lastBarcode !== this.shelfBarcode){
        this.lastBarcode = this.shelfBarcode
        this.unloadSorting()
      }

    },
    async unloadSorting() {
     try {
       const formData = new FormData()
       const AxiosMethod = new AxiosCall()
       AxiosMethod.using_auth = true
       AxiosMethod.token = this.$cookies.get('adminToken')
       AxiosMethod.end_point = `warehouse/order/sorting/unload?barcode=${this.shelfBarcode}`
       AxiosMethod.toast_error = true
       AxiosMethod.store = this.$store
       let data = await AxiosMethod.axios_get()
       if (data) {
         this.sortingDone = true
       }
       else {
         this.shelfBarcode= ''

       }
     }catch (e) {
       this.errorScan = true
       this.shelfBarcode = ''
     }
    },

  },

  components: {
    HandheldDrawer,
    LocatingToast
  },

}
</script>

<style>
.scan_box {
  height: calc(100% - 390px);

}
</style>