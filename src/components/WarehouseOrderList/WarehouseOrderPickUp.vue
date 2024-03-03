<template>
  <div class="loading_modal" v-if="loading">
    <v-progress-circular
        indeterminate
        color="purple"
    ></v-progress-circular>
  </div>
  <template v-if="!pickUpIsNull && !pickUpDone">
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
        <v-text-field @keyup.enter="scanQrCode()" :autofocus="true" v-model="shpssBarCode" variant="outlined" ></v-text-field>
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
            </v-card>
          </div>
        </div>
      </div>
    </v-card>
  </template>
  <template v-else-if="pickUpIsNull && !pickUpDone">
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
  <template v-else-if="pickUpIsNull && pickUpDone">
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

    }
  },

  mounted() {
    this.getPickUpShps()
  },
  methods: {
    scanQrCode() {
      this.pickUpshpss(this.shpssBarCode)
    },
    async pickUpshpss(barcode) {
      try {
        this.loading = true
        const AxiosMethod = new AxiosCall()
        const formData = new FormData()
        formData.append('barcode', barcode)
        formData.append('placement_id', this.pickUpShps?.placement.id)
        AxiosMethod.form = formData
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = 'admin/order/pick'
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading = false

          this.getPickUpShps()
        }
        else {
          this.loading = false
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