<template>
  <div class="h-100">
    <SuccessScan v-if="success"/>
    <ScanError v-else-if="error"/>
    <ScanStep v-else/>
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
      success:true
    }
  },
  components:{
    ScanStep,
    ScanError,
    SuccessScan
  }
}
</script>



