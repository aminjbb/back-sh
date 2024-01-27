<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
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
      <div  class="mb-15"  v-if="!shpssDetail">
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
              <img :src="shpssDetail?.sku?.image_url" width="150" height="150" alt="">
            </div>
            <div class="text-center px-10 my-3">
            <span class="text-gray600">
              {{ shpssDetail?.sku?.lable }}
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
              @click="$router.go(-1)"
              class="px-8 mt-2">
            بازگشت به لیست
          </v-btn>
        </v-col>

      </v-row>
    </v-card-actions>
    <LocatingToast v-if="toast"/>
  </v-card>
</template>
<script>
import LocatingToShelfError from '@/components/PackagePlacement/Locating/LocatingToShelfError.vue'
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
import Placement from '@/composables/Placement'
import Sku from '@/composables/Sku'
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import {openToast} from "@/assets/js/functions";
export default {
  setup(){
    const { getPlacement , placement} = new Placement()
    const { getShpssDetail } = new Sku()
    return {
      getPlacement , placement,
      getShpssDetail
    }
  },
  data(){
    return {
      error:true,
      qrCode:'',
      shpssBarCode:'',
      placeCount:0,
      toast:false,
      shpssDetail:null
    }
  },
  beforeMount() {
    this.getPlacement(this.$route.params.placementId)
  },
  mounted() {
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
      this.shpsDetail(this.shpssBarCode)

    },
    async shpsDetail(id){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'shps/item/detail?barcode=' + id
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.shpssDetail = data.data
        this.locateShpssToPlace()

      }
    },
    async locateShpssToPlace(){
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('placement_id' , this.$route.params.placementId)
      formData.append('package_id' , this.$route.params.packageId )
      formData.append('barcode' , this.shpssBarCode )
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      AxiosMethod.store =this.$store
      AxiosMethod.form = formData
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'shps/item/place/'
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.getShpsCount(this.shpssDetail?.package?.placement_id ,this.shpssDetail?.shps?.id  )
      }
      else{
      }
    },
    async getShpsCount(id , shps){
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      AxiosMethod.using_auth = true
      AxiosMethod.toast_error = true
      AxiosMethod.store =this.$store
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'placement/shps/items/' + id +'?shps='+shps
      let data = await AxiosMethod.axios_get()
      if (data) {
        console.log(data.data)
        if (parseInt(data.data[0]?.handheld_count) > this.placeCount){
          this.placeCount = data.data[0]?.handheld_count
          if (parseInt(data.data[0]?.handheld_count) > this.placeCount){
            this.toast = true
            setTimeout(()=>{
              this.$router.go(-1)
            } , 4000)
          }
        }

      }
      else{
      }
    },

  },

  components:{
    HandheldDrawer,
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