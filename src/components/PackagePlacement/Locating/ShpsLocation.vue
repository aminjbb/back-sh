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
    <template v-if="!donePackage">
      <LocatingShpsListStep :scanShelf="scanShelf" :shpsList="packageShpsList" v-if="!scan"/>
      <LocatingShpsLoadingScaningStep :packageId="assignPackage" :state="state" :scanTitle="scanTitle" v-else/>
    </template>
    <template v-else>
      <div class="pt-15 mt-15 px-8 text-center">
        <div class="d-flex justify-center">
          <v-icon color="succes" size="30">
            mdi-check-circle
          </v-icon>
        </div>
        <div class=" mt-8 d-flex justify-center">
        <span class="text-black t20600">
         جایگذاری بسته با موفقیت به اتمام رسید.
        </span>
        </div>

      </div>
      <div class="px-5 d-flex justify-center" style="  left: 0;right: 0;  position: absolute; bottom: 8px;">
        <v-btn
            color="primary500"
            height="40"
            width="248"
            rounded
            @click="$router.push('/locating/index')"
            class="px-8 mt-5">
          <template v-slot:prepend>
            <v-icon>mdi-barcode-scan</v-icon>
          </template>
          اسکن بسته جدید
        </v-btn>
      </div>
    </template>
  </v-card>
</template>
<script >
import LocatingShpsListStep from '@/components/PackagePlacement/Locating/LocatingShpsListStep.vue'
import LocatingShpsLoadingScaningStep from '@/components/PackagePlacement/Locating/LocatingShpsLoadingScaningStep.vue'
import Package from '@/composables/Package'
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import ModalFinishPackage from "@/components/PackagePlacement/Locating/ModalFinishPackage.vue";
export  default {
  setup(){
      const {packageShpsList , getPackageShpsList ,getAssignPackageList , assignPackage , donePackage} = new Package()
      return {
        packageShpsList , getPackageShpsList , getAssignPackageList , assignPackage , donePackage
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
    ModalFinishPackage,
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