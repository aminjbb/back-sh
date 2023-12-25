<template>
  <div class="text-right">

    <v-dialog
        v-model="dialog"
        width="908"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                           دلیل رد محموله
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <v-row justify="center" align="center">
            <v-col cols="11">
              <div class="text-right my-5">
                <span class="t14500">
                   دلیل رد محموله
                  <span class="text-error">
                    *
                  </span>
                </span>
              </div>
              <v-textarea
                  variant="outlined"
                  single-line
                  v-model="subject"
                  rows="3"
              />
            </v-col>

          </v-row>
        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              :disabled="!subject"
              @click="rejectShipment()"
              color="primary500"
              :loading="loading"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <v-btn
              @click="close()"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1"
          >

            انصراف
          </v-btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BlogForm from '@/components/HomePage/Forms/BlogForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import Warehouse from "@/composables/Warehouse"
import {convertDateToJalai, openToast} from "@/assets/js/functions";
export  default {
  setup(){
    const {getWarehouseList ,  warehouseList} = new Warehouse()
    return {getWarehouseList ,  warehouseList}
  },
  props:{
    getShipmentRequestsList:{type:Function},
  },
  components:{
    UploadFileSection

  },
  data(){
    return{
      warehouse:null,
      workDays:[],
      workDay:null,
      loading:false,
      subject:null,

    }
  },

  methods:{
    setWorkDay(workday){
      if (workday.storage > 0) this.workDay = workday.date
    },
    workDaysClass(workday){
      if (workday.date === this.workDay){
        return 'retailShipment--work-days-card__active'
      }
      else if (workday.storage === 0){
        return 'retailShipment--work-days-card__disable'
      }
      else {
        return 'retailShipment--work-days-card__free'
      }
    },
    convertDateToJalai,
    getnavbarItem(){
      console.log(document.getElementById('navbarItems').offsetWidth)
    },
    close(){
      const form = {
        dialog :false,
        object : ''
      }
      this.$store.commit('set_modalRejectRequestShipment' , form)
    },

    async rejectShipment(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `shipment/consignment/crud/update/status/${this.requestShipmentObject.id}`
      formData.append('status' , 'rejected')
      formData.append('rejection_reason', this.subject)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.getShipmentRequestsList()
        this.close()
      }
      else{
        this.loading=false
      }
    },

  },

  computed:{
    dialog(){
      return this.$store.getters['get_modalRejectRequestShipment']
    },
    requestShipmentObject(){
      return this.$store.getters['get_modalRejectRequestShipmentObject']
    },
    warehouseData(){
      try {
        return this.warehouseList.data
      }
      catch (e) {
        return []
      }
    }
  },

  watch:{
    warehouse(val){
      this.updateWorkDay()
    }
  }
}
</script>

<style>



</style>