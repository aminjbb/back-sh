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
    <div class="scan_box">
      <div>
        <div class="px-5">
          <v-card min-height="92" class="d-flex justify-center align-center">
            <v-card class="ml-5 br br__12 d-flex justify-center align-center" height="52" width="52" color="primary500">
            <span class="text-white number-font">
             {{ pickUpShps?.count }}
            </span>
            </v-card>
            <span class="t16400 text-black">عدد مانده</span>
          </v-card>
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
    </div>
<!--    <v-card-actions>-->
<!--      <v-row justify="center">-->
<!--        <v-col cols="10">-->
<!--          <v-btn-->
<!--              color="primary500"-->
<!--              height="40"-->
<!--              width="348"-->
<!--              variant="flat"-->
<!--              rounded-->
<!--              class="px-8 mt-2">-->
<!--            بازگشت به لیست-->
<!--          </v-btn>-->
<!--        </v-col>-->

<!--      </v-row>-->
<!--    </v-card-actions>-->
<!--    <LocatingToast/>-->
  </v-card>
</template>
<script>
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
import WarehouseOrder from '@/composables/WarehouseOrder'
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
export default {
  setup(){
    const { getPickUpShps , pickUpShps} = new WarehouseOrder()
    return {
      getPickUpShps , pickUpShps
    }
  },
  data(){
    return {
      error:true,
      qrCode:'',
      shpssBarCode:'',
      placeCount:0
    }
  },

  mounted() {
    // this.getPickUpShps()
    var element = document.body // You must specify element here.
    element.addEventListener('keydown', e => {
      if (e.key== 'Enter' ) this.scanQrCode()
      else this.qrCode += e.key
    });
  },

  methods:{
    scanQrCode(){
      this.shpssBarCode = this.qrCode
      this.qrCode = ''
      this.pickUpshpss(this.shpssBarCode)
    },
    async pickUpshpss(barcode){
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('barcode' , barcode)
      formData.append('placement_id' , this.pickUpShps?.placement?.id )
      AxiosMethod.using_auth = true
      AxiosMethod.token = cookies.cookies.get('adminToken')
      AxiosMethod.end_point = 'admin/order/pick'
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.getPickUpShps()
      }
    },
  },

  components:{
    HandheldDrawer,
    LocatingToast
  }
}
</script>

<style>
.scan_box{
  height: calc(100% - 390px);

}
</style>