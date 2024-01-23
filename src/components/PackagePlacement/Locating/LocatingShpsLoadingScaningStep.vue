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
    object:null
  },
  data(){
    return{
      qrCode:'',
      objectId:''
    }
  },

  methods:{
    qrCodeScan(){
      this.objectId = this.qrCode
      const finalObject = this.objectId.split('-')
      this.qrCode = ''
      if (this.state === 'packageSphpsList') {
        this.packageScan()
      }
      else if (this.state === 'scanShelf') this.$router.push(`/locating/${this.$route.params.packageId}/shps-list/locating-shelf/${finalObject[1]}`)
    },

    async packageScan(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `package/crud/handheld/scan?barcode=${this.objectId}`
      AxiosMethod.using_auth = true
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.$router.push(`/locating/${this.objectId}/shps-list`)
      }
    }
  },


  mounted() {
    var element = document.body // You must specify element here.
    element.addEventListener('keydown', e => {
      if (e.key== 'Enter' ) this.qrCodeScan()
      else this.qrCode += e.key
    });
  }
}
</script>
<style>
.v--hidden{
  visibility: hidden;
}
</style>
