<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="loading_modal" v-if="loading">
      <v-progress-circular
          indeterminate
          color="purple"
      ></v-progress-circular>
    </div>
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20400">
          جایگذاری بسته
        </span>
      </div>
      <div class="pa-3">
        <v-icon @click="$router.go(-1)"  size="30">
          mdi-chevron-left
        </v-icon>
      </div>
    </div>

    <v-card class="ma-5 br-15" max-height="116">
      <div class="d-flex justify-center my-1">
          <span class="t18400">
            اطلاعات جایگذاری
          </span>
      </div>
      <v-divider/>
      <div class="text-right my-2 px-5 d-flex justify-space-between px-10">
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
      <div class="text-right  px-5 d-flex justify-space-between px-10">
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
    <v-card class="mx-5 mb-1 br-15 pa-2" >
      <v-text-field @keyup.enter="scanQrCode()" :autofocus="true" v-model="shpssBarCode" variant="outlined" ></v-text-field>
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
            <span class="t16400 text-black">عدد از {{ allCount }} عدد اسکن شده</span>
          </v-card>
          <v-card class="mt-2">
            <div class="d-flex justify-center">
              <img :src="shpssDetail?.shps?.sku?.sku?.image_url" width="100" height="100" alt="">
            </div>
            <div class="text-center px-10 my-3">
            <span class="text-gray600">
              {{ shpssDetail?.shps?.sku?.sku?.label}}
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
      shpssDetail:null,
      allCount:'',
      loading:false,
      readyToScan:false
    }
  },
  beforeMount() {
    this.getPlacement(this.$route.params.placementId)
  },


  methods:{
    scanQrCode(){
      if (!this.loading)  this.locateShpssToPlace()
    },
    async shpsDetail(id){
     try {
       this.loading =true
       const AxiosMethod = new AxiosCall()
       AxiosMethod.using_auth = true
       AxiosMethod.token = this.$cookies.get('adminToken')
       AxiosMethod.end_point = 'shps/item/detail?barcode=' + id
       let data = await AxiosMethod.axios_get()
       if (data) {
         this.shpssDetail = data.data
         this.getShpsCount(this.$route.params.placementId,this.shpssDetail?.shps?.id  ,this.shpssDetail?.package?.id , data.data.shipment_id)

       }
       else {
         this.loading = false
       }
     }
     catch (e) {
       this.loading = false
       this.shpssBarCode = ''
     }
    },
    async locateShpssToPlace(){
      try {
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
          this.shpsDetail(this.shpssBarCode)
        }
        else{
          this.loading = false
        }
      }catch (e) {
        this.loading = false
        this.shpssBarCode = ''
      }
    },
    async getShpsCount(id , shps , packageId , shipmentId){
     try {
       const AxiosMethod = new AxiosCall()
       const formData = new FormData()
       AxiosMethod.using_auth = true
       AxiosMethod.toast_error = true
       AxiosMethod.store =this.$store
       AxiosMethod.token = this.$cookies.get('adminToken')
       AxiosMethod.end_point = 'placement/shps/items/' + id +'?shps='+shps +'&package_id=' +packageId
       let data = await AxiosMethod.axios_get()
       if (data) {
         this.loading = false
         const findShps = data.data.find(shps=> shps.shipment_id == shipmentId)
         this.allCount = findShps.packed_count
         this.shpssBarCode = ''
         this.placeCount = findShps?.handheld_count
         if (parseInt(findShps?.handheld_count) >= this.placeCount){
           if (parseInt(findShps?.handheld_count) === findShps.packed_count){
             this.toast = true
             setTimeout(()=>{
               this.$router.push('/locating/package/shps-list')
             } , 4000)
           }
         }

       }

     }
     catch (e) {
       this.loading = false
       this.shpssBarCode = ''
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

<style scoped>
.scan_box{
  height: calc(100% - 330px);

}

</style>