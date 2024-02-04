<template>
  <v-card class="h-100 width-100 ">

    <div class="package_list" v-if="!scan">
     <div class="d-flex justify-space-between align-center">

       <div class="pa-3 d-flex">
         <HandheldDrawer/>
        <span class="t20400">
          جایگذاری بسته
        </span>
       </div>
       <div class="pa-3">
         <v-icon size="30">
           mdi-chevron-left
         </v-icon>
       </div>
     </div>
     <div class="d-flex justify-center my-3">
          <span class="t20400">
            جایگذاری بسته
          </span>
     </div>
     <v-divider/>
     <div class="scan_table">
       <v-card @click="selectPackagePlacement(assignedPackage)" class="ma-5 br-15" min-height="100" v-for="(assignedPackage , index) in singlePackagePlacement">
         <div >
           <div class="text-right my-5 px-5">
          <span class="t16400">
           شناسه بسته :
            <span class="text-gray600">
             {{assignedPackage?.id }}
            </span>
          </span>
           </div>
           <div class="text-right my-5 px-5">
          <span class="t16400">
           شماره جایگاه :
            <span class="text-gray600">
              {{ assignedPackage?.placement_id }}
            </span>
          </span>
           </div>
         </div>

       </v-card>
     </div>
     <v-card-actions>
       <v-row justify="center">
         <v-col cols="6">
           <v-btn
               color="primary500"
               height="40"
               width="348"
               rounded
               variant="flat"
               class="px-8 mt-2">

             بعدی
           </v-btn>
         </v-col>
         <v-col cols="6">
           <v-btn
               color="primary500"
               height="40"
               width="348"
               rounded
               variant="flat"
               class="px-8 mt-2">

             قبلی
           </v-btn>
         </v-col>
       </v-row>
     </v-card-actions>
   </div>
    <LocatingShpsLoadingScaningStep  v-else :successScan="successScan" :object="object" :state="state" :scanTitle="scanTitle"/>
  </v-card>
</template>
<script>
import PackagePlacement from '@/composables/PackagePlacement'
import LocatingShpsLoadingScaningStep from "@/components/PackagePlacement/Locating/LocatingShpsLoadingScaningStep.vue";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
export default {
  props:{
    successScan:{type :Function}
  },
  components: {HandheldDrawer, LocatingShpsLoadingScaningStep},
  setup(){
      const {getSinglePackagePlacement ,singlePackagePlacement } = new PackagePlacement()
      return {
        getSinglePackagePlacement ,singlePackagePlacement
      }
  },
  data(){
    return{
      qrCode:'',
      packageId:'',
      scan:false,
      scanTitle:'شناسه بسته را اسکن کنید.',
      state:'packageSphpsList',
      object:''
    }
  },

  mounted() {
    this.getSinglePackagePlacement()

  },

  methods:{
    selectPackagePlacement(packagePlacement){
      this.object = packagePlacement
      this.scan = true
      this.scanTitle = 'شناسه بسته را اسکن کنید.'
      this.state = 'packageSphpsList'
    }
  }
}
</script>
<style>
.width-100{
  width: 100%;
  background: #F7F8FA;
}
.scan_table{
  height: calc(100% - 201px);
  overflow-x: hidden;
  overflow-y: scroll;
}

.package_list{
  height: calc(100% - -20px);
}

</style>