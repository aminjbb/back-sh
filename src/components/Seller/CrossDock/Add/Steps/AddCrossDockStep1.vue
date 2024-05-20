<template>
  <div class="h-100 d-flex flex-column align-stretch cross-dock-seller">
    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch">

      <Table
          :getOrders="getOrders"
          ref="AddCrossDockStep1Table"
          class="flex-grow-1"
          :header="headerShps"
          :items="sellerOrder"
          :page="page"
          :perPage="dataTableLength"
          activePath="page/crud/update/activation/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="crossDockShps" />
    </v-card>
  </div>
</template>

<script>
import {ref} from 'vue'
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import Table from "@/components/Seller/CrossDock/Add/Table/CrossDockShpsTable.vue";
import CrossDock from "@/composables/CrossDock"
export default {
  components:{
    Table, ModalExcelDownload,
    datePicker: VuePersianDatetimePicker,
    UploadFileSection
  },
  setup(){
    const {filterFieldAllRetail, getRetailShipmentList,retailShipments, pageLength ,addPerPage, dataTableLength, page,
      header, loading ,headerShps ,getOrders , orders} = new CrossDock()
    return {
      filterFieldAllRetail, getRetailShipmentList,retailShipments, pageLength ,addPerPage, dataTableLength, page,
      header, loading ,headerShps ,getOrders , orders
    }
  },

  data: () => ({
    valid:false,

  }),

  methods:{

  },
  computed:{
    sellerOrder(){
     try {
       let sellerOrders = []
       this.orders.forEach(element=>{

         if (element.not_providable_count){
           console.log(element.not_providable_count)
           const form1 = element
           form1.count = element.not_providable_count
           sellerOrders.push(form1)
         }
         if (element.providable_count){
           console.log(element.providable_count)
           const form2 = Object.create(element)
           form2.count= element.providable_count
           sellerOrders.push(form2)
         }
         else {
           sellerOrders.push(element)
         }


       })
       return sellerOrders
     }
     catch (e) {
       return []
     }
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>