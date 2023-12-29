<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3">
        <span class="t20400">
          جایگذاری بسته
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
            اطلاعات جایگذاری
          </span>
      </div>
      <v-divider/>
      <div class="text-right my-5 px-5 d-flex justify-space-between px-10">
         <div>
           <span class="t16400">
           شماره ردیف :
            <span class="text-gray600">
              {{ placement?.row_number }}
            </span>
          </span>
         </div>
        <div>
          <span class="t16400">
           شماره قفسه  :
            <span class="text-gray600">
              {{ placement?.placement_number }}
            </span>
          </span>
        </div>
      </div>
      <div class="text-right mt-10 px-5 d-flex justify-space-between px-10">
        <div>
           <span class="t16400">
           شماره طبقه :
            <span class="text-gray600">
               {{ placement?.step_number }}
            </span>
          </span>
        </div>
        <div>
          <span class="t16400">
           شماره شلف   :
            <span class="text-gray600">
              {{ placement?.shelf_number }}
            </span>
          </span>
        </div>
      </div>
    </v-card>
    <div class="scan_box">
      <div  class="mb-15"  v-if="error">
        <LocatingToShelfError/>
      </div>
      <div v-else>
        <div class="px-5">
          <v-card min-height="92" class="d-flex justify-center align-center">
            <v-card class="ml-5 br br__12 d-flex justify-center align-center" height="52" width="52" color="primary500">
            <span class="text-white">
              {{ placeCount }}
            </span>
            </v-card>
            <span class="t16400 text-black">عدد از {{ shpssDetail?.shps_count }} عدد اسکن شده</span>
          </v-card>
          <v-card class="mt-2">
            <div class="d-flex justify-center">
              <img src="@/assets/img/productImge.png" width="150" height="150" alt="">
            </div>
            <div class="text-center px-10 my-3">
          <span class="text-gray600">
            سرم روشن کننده پوست پرایم مدل C_Prime ظرفیت ۳۰ میلی لیتر
          </span>
            </div>
          </v-card>
        </div>
      </div>
    </div>
    <v-card-actions>
      <v-row justify="center">
        <v-col cols="10">
          <v-btn
              color="primary500"
              height="40"
              width="348"
              variant="flat"
              rounded
              class="px-8 mt-2">
            بازگشت به لیست
          </v-btn>
        </v-col>

      </v-row>
    </v-card-actions>
    <LocatingToast/>
  </v-card>
</template>
<script>
import LocatingToShelfError from '@/components/PackagePlacement/Locating/LocatingToShelfError.vue'
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
import Placement from '@/composables/Placement'
import Sku from '@/composables/Sku'
import {AxiosCall} from "@/assets/js/axios_call";
export default {
  setup(){
    const { getPlacement , placement} = new Placement()
    const { getShpssDetail ,shpssDetail} = new Sku()
    return {
      getPlacement , placement,
      getShpssDetail ,shpssDetail
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
    this.getPlacement(this.$route.params.placementId)
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
      this.getShpssDetail(this.shpssBarCode)
    },
    async locateShpssToPlace(){
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('placement_id' , this.$route.params.placementId)
      formData.append('package_id' , this.$route.params.packageId )
      formData.append('barcode' , this.shpssBarCode )
      AxiosMethod.using_auth = true
      AxiosMethod.token = cookies.cookies.get('adminToken')
      AxiosMethod.end_point = 'shps/item/place/'
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.checkCount()
      }
    },
    checkCount(){
      if (this.shpssDetail.shps_count < this.placeCount) ++this.placeCount
      else this.placeCount = 0
    }
  },

  components:{
    LocatingToShelfError,
    LocatingToast
  }
}
</script>

<style>
.scan_box{
  height: calc(100% - 390px);

}
</style>