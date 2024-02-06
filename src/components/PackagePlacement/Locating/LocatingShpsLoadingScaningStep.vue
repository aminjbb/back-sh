<template>
  <v-card class="h-100 position__relative d-flex align-center justify-center">
    <div>
      <div class="d-flex justify-center">
        <v-icon color="black" size="30">
          mdi-barcode-scan
        </v-icon>
      </div>
      <div class=" mt-8 d-flex justify-center px-10 text-center">
        <span class="text-black t20400">
            {{scanTitle}}
            <v-text-field v-model="objectId" :autofocus="true" @keyup.enter="qrCodeScan()"></v-text-field>
        </span>
      </div>
    </div>
  </v-card>
</template>
<script >
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props:{
    scanTitle:'',
    state:'',
    object:null,
    packageId:null,
    successScan:{type :Function},
    errorScan:{type :Function},

  },
  data(){
    return{
      objectId:'',
      readyToScan:false
    }
  },

  methods:{
    qrCodeScan(){
      const finalObject = this.objectId.split('-')
      this.qrCode = ''
      if (this.state === 'packageSphpsList') {
        this.packageScan(this.objectId , finalObject[1])
      }
      else if (this.state === 'scanShelf') this.$router.push(`/locating/${this.packageId}/shps-list/locating-shelf/${finalObject[1]}`)
    },

    async packageScan(barcode , objectId){
     try {
       const AxiosMethod = new AxiosCall()
       AxiosMethod.token = this.$cookies.get('adminToken')
       AxiosMethod.end_point = `package/crud/handheld/scan?barcode=${barcode}`
       AxiosMethod.using_auth = true
       let data = await AxiosMethod.axios_get()
       if (data) {
         this.successScan(`/locating/package/shps-list` , data.data?.id)

       }
     }
     catch (e) {
       this.errorScan()
     }
    }
  },
}
</script>
<style>
.v--hidden{
  visibility: hidden;
}
</style>
