<template>
  <div class="loading_modal" v-if="loading">
    <v-progress-circular
        indeterminate
        color="purple"
    ></v-progress-circular>
  </div>
  <template v-if="!pickUpIsNull && !pickUpDone && !notFound">
    <v-card class="h-100">
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
      <v-card class="mx-5 mb-2 br-15" max-height="116">
        <div class="d-flex justify-center my-3">
          <span class="t12400">
            جایگاه کالا
          </span>
        </div>
        <v-divider/>
        <div class="text-right my-2 px-5 d-flex justify-space-between px-10">
          <div>
           <span class="t12400">
           شماره ردیف :
            <span class="t12400 text-gray600 number-font">
              {{ pickUpShps?.placement?.row_number }}
            </span>
          </span>
          </div>
          <div>
          <span class="t12400">
           شماره قفسه  :
            <span class=" t12400 text-gray600 number-font">
              {{ pickUpShps?.placement?.placement_number }}
            </span>
          </span>
          </div>
        </div>
        <div class="text-right  px-5 d-flex justify-space-between px-10">
          <div>
           <span class="t12400">
           شماره طبقه :
            <span class=" t12400 text-gray600 number-font">
               {{ pickUpShps?.placement?.step_number }}
            </span>
          </span>
          </div>
          <div>
          <span class="t12400">
           شماره شلف   :
            <span class=" t12400 text-gray600 number-font">
             {{ pickUpShps?.placement?.shelf_number }}
            </span>
          </span>
          </div>
        </div>
      </v-card>
      <v-card class="mx-5 mb-1 br-15 pa-2" >
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="scanQrCode"  v-model="shpssBarCode" variant="outlined" :autofocus="true"></v-text-field>
            <v-text-field v-else @keyup.enter="scanQrCode()" :autofocus="true" v-model="shpssBarCode" variant="outlined" ></v-text-field>
          </v-col>
          <v-col cols="6">
            <div>
              <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
            </div>
          </v-col>

        </v-row>
      </v-card>
      <div class="scan_box mb-10">
        <div>
          <div class="px-5">
            <v-card min-height="92" class="d-flex justify-center align-center">
              <v-card class="ml-5 br br__12 d-flex justify-center align-center" height="52" width="52"
                      color="primary500">
            <span class="text-white number-font">
             {{ pickUpCount }}
            </span>
              </v-card>
              <span class="t16400 text-black">عدد مانده</span>
            </v-card>
            <v-card class="mt-2 py-5">
              <div class="d-flex justify-center">
<!--                <img src="@/assets/img/productImge.png" width="150" height="150" alt="">-->
                              <img :src="pickUpShps?.shps?.sku?.image_url" width="100" height="100" alt="">
              </div>
              <div class="text-center px-10 my-3">
                <span class="text-gray600">
                  {{ pickUpShps?.shps?.sku?.label }}
                </span>
              </div>
              <div class="text-center px-10 my-3">
                <span class="text-gray600">
                  {{ pickUpShps?.shps?.id }}
                </span>
              </div>
            </v-card>

            <div class="d-flex justify-center">
              <v-btn
                  color="primary500"
                  height="40"
                  width="348"
                  rounded
                  @click="notFound = true"
                  class="px-8 mt-5">
             <span class="t11500">
                محصولی برای جمع آوری وجود ندارد
             </span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </template>
  <template v-else-if="pickUpIsNull && !pickUpDone && !notFound">
    <div class="h-100 bg-warning d-flex  justify-center align-center">
      <div class=" d-flex justify-center my-3">
          <span class="t20400">
            کالایی برای جمع آوری یافت نشد
          </span>
      </div>
      <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
        <v-btn
            color="white"
            height="40"
            width="348"
            rounded
            @click="$router.push('/locating/dashboard')"
            class="px-8 mt-5">
            بازگشت به داشبورد
        </v-btn>
      </div>
    </div>
  </template>
  <template v-else-if="pickUpIsNull && pickUpDone && !notFound">
    <div class="h-100 bg-success d-flex  justify-center align-center">
      <div>
        <div class="d-flex justify-center">
          <v-icon color="succes" size="30">
            mdi-check-circle
          </v-icon>
        </div>
        <div class="text-center mt-15">
            <span class="t20400">
           جمع آوری کالا با موفقیت به اتمام رسید.
          </span>
        </div>
        <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
          <v-btn
              color="white"
              height="40"
              width="348"
              rounded
              @click="$router.push('/locating/dashboard')"
              class="px-8 mt-5">
            بازگشت به داشبورد
          </v-btn>

        </div>
      </div>

    </div>
  </template>
  <template v-else-if="!pickUpIsNull && !pickUpDone && notFound">
    <div class="h-100 d-flex justify-center align-center">
     <div class="w-100">
       <div class="text-center mb-10">
         شناسه شلف را اسکن کنید
       </div>
       <v-card class="mx-5 mb-1 br-15 pa-2" >
         <v-row justify="center">
           <v-col cols="6">
             <div>
               <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
             </div>
           </v-col>
           <v-col cols="12">
             <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="notFoundTask"  v-model="shelfBarcode" variant="outlined" :autofocus="true"></v-text-field>
             <v-text-field v-else @keyup.enter="notFoundTask()" :autofocus="true" v-model="shelfBarcode" variant="outlined" ></v-text-field>
           </v-col>

         </v-row>

       </v-card>

       <div class="d-flex justify-center">
         <v-btn
             color="primary500"
             height="40"
             width="348"
             rounded
             @click="notFoundTask"
             class="px-8 mt-5">
             <span class="t11500">
                تایید
             </span>
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
    const {getPickUpShps, pickUpShps, pickUpIsNull , loading , pickUpCount} = new WarehouseOrder()
    return {
      getPickUpShps, pickUpShps, pickUpIsNull , loading , pickUpCount
    }
  },
  data() {
    return {
      error: true,
      qrCode: '',
      shpssBarCode: '',
      placeCount: 0,
      pickUpDone: false,
      notFound:false,
      shelfBarcode:'',
      autoSend:'automate',
      lastBarcode:null

    }
  },

  mounted() {
    this.getPickUpShps()
  },
  methods: {
    scanQrCode() {
      if (this.lastBarcode !== this.shpssBarCode){
        this.lastBarcode = this.shpssBarCode
        this.pickUpshpss(this.shpssBarCode)
      }

    },
    async pickUpshpss(barcode) {
      try {
        this.loading = true
        const AxiosMethod = new AxiosCall()
        const formData = new FormData()
        formData.append('barcode', barcode)
        AxiosMethod.form = formData
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = 'warehouse/order/pickup/get'
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false
          this.shpssBarCode = ''
          this.getPickUpShps()
        }
        else {
          this.loading = false
          this.shpssBarCode = ''
        }
      }
      catch (e) {
        this.shpssBarCode = ''
        this.loading = false
      }
    },
    async notFoundTask() {
      try {
        if (this.lastBarcode !== this.shelfBarcode){
          this.lastBarcode = this.shelfBarcode
          this.loading = true
          const AxiosMethod = new AxiosCall()
          AxiosMethod.using_auth = true
          AxiosMethod.toast_error = true
          AxiosMethod.store = this.$store
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = 'warehouse/order/pickup/not-found/'+this.shelfBarcode
          let data = await AxiosMethod.axios_get()
          if (data) {
            this.loading = false
            this.notFound = false
            this.shelfBarcode = ''
            this.getPickUpShps()
          }
          else {
            this.loading = false
          }
        }

      }
      catch (e) {
        this.loading = false
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
  height: calc(100% - 330px);

}
</style>