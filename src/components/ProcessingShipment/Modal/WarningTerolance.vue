<template>
  <div class="text-right ">
    <v-dialog v-model="dialog" width="468">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="7" class="t16400 ">
            هشدار
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center pa-8" >
          <div class="text-center">
            <span>
              این محموله دارای مغایرت می باشد.
            </span>
          </div>
          <div class="text-center mt-1">
            <span>
              قادر به تایید نیستید
            </span>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Table from "@/components/ProcessingShipment/Table/DetailProcessingTable.vue";
import ProcessingShipment from '@/composables/ProcessingShipment'
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToJalai, openToast} from "../../../assets/js/functions";

export default {
  setup(){
    const {headerDetailShipment} = new ProcessingShipment()
    return { headerDetailShipment }
  },
  props:{
    shipmentId:null
  },
  data(){
    return {
      detail:null,
      loading:false
    }
  },
  components: {
    Table,
  },

  methods: {
    close(){
      const form ={
        dialog:false,
        object:''
      }
      this.$store.commit('set_warningTolerance' , form)
    },
    convertDateToJalai,
    convertDate(date){
      const jalaliDate = convertDateToJalai( date , '-' , false)
      const splitDate = jalaliDate.split('-')
      return splitDate[0] + '/' +splitDate[1] +'/' + splitDate[2]
    },
  },

  computed: {
    basUrl(){
      return import.meta.env.VITE_API_BACKEND_URL
    },
    dialog(){
      return this.$store.getters['get_warningTolerance']
    },
    object(){
      return this.$store.getters['get_warningToleranceObject']
    }
  }
}
</script>
