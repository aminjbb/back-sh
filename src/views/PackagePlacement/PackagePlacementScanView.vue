<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh d-flex justify-center">
      <div class="scan-container">
        <!--        <ScanPackagePlacement />-->
        <div class="h-100">
          <SuccessScan  v-if="success" :packageId="packageId" :changeRoute="changeRoute"/>
          <ScanError :cancelError="cancelError" v-else-if="error"/>
          <ScanStep :successScan="successScan" :errorScan="errorScan" v-else/>
        </div>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
// import {defineAsyncComponent} from "vue";
// const ScanPackagePlacement = defineAsyncComponent(()=> import ('@/components/PackagePlacement/ScanPackagePlacement.vue'))
import ScanStep from '@/components/PackagePlacement/Scan/ScanStep.vue'
import ScanError from '@/components/PackagePlacement/Scan/ScanError.vue'
import SuccessScan from '@/components/PackagePlacement/Scan/SuccessScan.vue'

export default {
  data (){
    return{
      error:false,
      success:false,
      changeRoute :null,
      packageId:null
    }
  },
  methods:{
    successScan(route , packageId){
      this.success = true
      this.changeRoute = route
      this.packageId =packageId
    },
    errorScan(){
      this.error = true
    },
    cancelError(){
      this.error = false
    }
  },
  components:{
    ScanStep,
    ScanError,
    SuccessScan
  }
}
</script>

