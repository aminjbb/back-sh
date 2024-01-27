<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
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
    <LocatingShpsListStep :scanShelf="scanShelf" :shpsList="packageShpsList" v-if="!scan"/>
    <LocatingShpsLoadingScaningStep :state="state" :scanTitle="scanTitle" v-else/>
  </v-card>
</template>
<script >
import LocatingShpsListStep from '@/components/PackagePlacement/Locating/LocatingShpsListStep.vue'
import LocatingShpsLoadingScaningStep from '@/components/PackagePlacement/Locating/LocatingShpsLoadingScaningStep.vue'
import Package from '@/composables/Package'
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
export  default {
  setup(){
      const {packageShpsList , getPackageShpsList ,getAssignPackageList} = new Package()
      return {
        packageShpsList , getPackageShpsList , getAssignPackageList
      }
  },
  data(){
    return{
      scan:false,
      scanTitle:'',
      state:''
    }
  },
  methods:{
    scanShelf(){
      this.scan = true
      this.scanTitle = 'شناسه شلف را اسکن کنید.'
      this.state = 'scanShelf'
    }
  },
  mounted() {
    this.getAssignPackageList()
  },
  components:{
    HandheldDrawer,
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