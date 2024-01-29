<template>

  <v-card class="h-100 scan-success position__relative d-flex align-center justify-center">
    <div >
      <div class="d-flex justify-center">
        <v-icon color="white" size="30">
          mdi-check-circle
        </v-icon>
      </div>
      <div class=" mt-8 d-flex justify-center">
        <span class="text-white t20600">
         بسته با موفقیت به شما اختصاص داده شد.
        </span>
      </div>
      <div class=" mt-8 d-flex justify-center px-10 text-center">
        <span class="text-white t20400">
      بسته با شناسه {{ packageId }} به شما اختصاص داده شد.
        </span>
      </div>
      <div class="bottom-box d-flex justify-center mt-15 pt-15">
        <v-btn
            @click="$router.push(changeRoute)"
            color="white"
            height="40"
            width="348"
            rounded
            class="px-8 mt-2">

       <span class="text-black">
         ادامه
       </span>
        </v-btn>
      </div>
    </div>

  </v-card>

</template>
<script >
export default {
  props:{
    changeRoute : null,
    packageId:null
  },
  data(){
    return{

    }
  }
}
</script>
