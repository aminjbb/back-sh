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
      برای ادامه فرآیند بارکد را اسکن کنید.
        </span>


      </div>
      <div class="v--hidden">
        <v-text-field :autofocus="true" v-model="qrCode"></v-text-field>
      </div>
    </div>
  </v-card>
</template>
<script >
export default {
  data(){
    return{
      qrCode:''
    }
  },

  watch:{
    qrCode(val){
      alert(val)
    }
  }
}
</script>
<style>
.v--hidden{
  visibility: hidden;
}
</style>
