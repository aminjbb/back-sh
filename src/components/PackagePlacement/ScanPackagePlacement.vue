<template>
  <div class="h-100">
    <SuccessScan  v-if="success" :packageId="packageId" :changeRoute="changeRoute"/>
    <ScanError v-else-if="error"/>
    <ScanStep :successScan="successScan" v-else/>
  </div>
</template>
<script>
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
    }
  },
  components:{
    ScanStep,
    ScanError,
    SuccessScan
  }
}
</script>



