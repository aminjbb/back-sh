<template>
  <v-card class="h-100 scan-error position__relative d-flex align-center justify-center">
    <div>
      <div class="d-flex justify-center">
        <v-icon color="white" size="30">
          mdi-close-circle
        </v-icon>
      </div>
      <div class=" mt-8 d-flex justify-center">
        <span class="text-white t20600">
          بسته تعریف نشده است.
        </span>
      </div>
      <div class=" mt-8 d-flex justify-center px-10 text-center">
        <span class="text-white t20400">
         لطفا بارکد بسته را بررسی کنید و دوباره اسکن کنید.
        </span>
      </div>
    </div>
    <div class="bottom-box">
      <v-btn
          @click="cancelError()"
          color="white"
          height="40"
          width="348"
          rounded
          class="px-8 mt-2">

       <span class="text-black">
         تلاش مجدد
       </span>
      </v-btn>
    </div>
  </v-card>
</template>
<script >
export default {
  props:{
    cancelError : {type:Function}
  },
  data(){
    return{

    }
  }
}
</script>

<style>

</style>