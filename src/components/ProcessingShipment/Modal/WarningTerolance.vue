<template>
  <div class="text-right">
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
          <v-col cols="7" class="t16 w400 ">
            هشدار
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center pa-8" >
          <div class="text-center">
            <span>
            این محموله دارای مغایرت می باشد. آیا از بستن آن اطمینان دارید؟
            </span>
          </div>
          <div class="d-flex justify-space-between mt-5">
            <v-btn @click="approved()" color="primary500">
              تایید
            </v-btn>

            <v-btn variant="outlined" @click="dialog=false">
              انصراف
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Table from "@/components/ProcessingShipment/Table/DetailProcessingTable.vue";
import {convertDateToJalai} from "../../../assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props:{
    shipmentId:null
  },
  data(){
    return {
      detail:null,
      loading:false,
      dialog:false
    }
  },
  components: {
    Table,
  },

  methods: {
   async approved(){
      try {
        this.finishLoading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `shipment/shps/count/${this.$route.params.shipmentId}/done?approved=1`
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.dialog = false
          this.finishLoading = false
          this.$router.go(-1)
        } else {
          this.finishLoading = false
          this.$refs.WarningTerolance.dialog = true
        }
      } catch (e) {
        this.finishLoading = false
      }
    },

    close(){
     this.dialog = false
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

}
</script>
