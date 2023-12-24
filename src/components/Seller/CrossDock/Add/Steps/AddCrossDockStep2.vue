<template>
  <div class="h-100 d-flex flex-column align-stretch cross-dock-seller">
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch">
      <Table
          ref="AddCrossDockStep2Table"
          class="flex-grow-1"
          :header="headerSumShps"
          :items="draftCrossDockSelectedShps"
          :page="page"
          :perPage="dataTableLength"
          activePath="page/crud/update/activation/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="crossDockShpsSum" />
    </v-card>
  </div>
</template>

<script>
import {ref} from 'vue'
import Table from "@/components/Seller/CrossDock/Add/Table/CrossDockShpsTable.vue";
import CrossDock from "@/composables/CrossDock";
export default {
  components:{
    Table,
  },
  setup(){
    const {filterFieldAllRetail, getRetailShipmentList,retailShipments, pageLength ,addPerPage, dataTableLength, page, header, loading ,headerSumShps} = new CrossDock()
    return {
      filterFieldAllRetail, getRetailShipmentList,retailShipments, pageLength ,addPerPage, dataTableLength, page, header, loading ,headerSumShps
    }
  },

  computed:{
    draftCrossDockSelectedShps(){
      let sumShps = []
      this.$store.getters['get_crossDockSelectedShps'].forEach(shps=>{
        const sumShpsDraft = sumShps.find(element=> element.shps === shps.shps)
        if (sumShpsDraft) sumShpsDraft.count = sumShpsDraft.count + shps.count
        else sumShps.push(shps)
      })
      return sumShps
    },
  },

  mounted() {
    // if (this.$store.getters['get_legalSellerStep1']!= null){
    //   this.form = this.$store.getters['get_legalSellerStep1']
    // }
  }
}
</script>