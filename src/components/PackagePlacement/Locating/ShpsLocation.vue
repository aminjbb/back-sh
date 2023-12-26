<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3">
        <span class="t20400">
        لیست محصولات
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30">
          mdi-chevron-left
        </v-icon>
      </div>
    </div>
<!--    <LocatingShpsListStep/>-->
     <LocatingShpsLoadingScaningStep/>
  </v-card>
</template>
<script >
import LocatingShpsListStep from '@/components/PackagePlacement/Locating/LocatingShpsListStep.vue'
import LocatingShpsLoadingScaningStep from '@/components/PackagePlacement/Locating/LocatingShpsLoadingScaningStep.vue'
export  default {
  components:{
    LocatingShpsListStep,
    LocatingShpsLoadingScaningStep
  }
}
</script>
<style>
.width-100{
  background: #F7F8FA;
}

</style>