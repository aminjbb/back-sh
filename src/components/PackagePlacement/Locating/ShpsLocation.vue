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
    <LocatingShpsListStep :scanShelf="scanShelf" :shpsList="packageShpsList" v-if="!scan"/>
    <LocatingShpsLoadingScaningStep :state="state" :scanTitle="scanTitle" v-else/>
  </v-card>
</template>
<script >
import LocatingShpsListStep from '@/components/PackagePlacement/Locating/LocatingShpsListStep.vue'
import LocatingShpsLoadingScaningStep from '@/components/PackagePlacement/Locating/LocatingShpsLoadingScaningStep.vue'
import Package from '@/composables/Package'
export  default {
  setup(){
      const {packageShpsList , getPackageShpsList} = new Package()
      return {
        packageShpsList , getPackageShpsList
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
    this.getPackageShpsList(this.$route.params.packageId)
  },
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