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
export default {
  props:{
    scanTitle:'',
    state:''
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
      this.qrCode = ''
      if (this.state === 'packageSphpsList') this.$router.push(`/locating/${this.objectId}/shps-list`)
      else if (this.state === 'scanShelf') this.$router.push(`/locating/${this.objectId}/shps-list/locating-shelf/${this.objectId}`)
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
