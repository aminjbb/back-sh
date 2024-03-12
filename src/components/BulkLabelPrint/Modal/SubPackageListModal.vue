<template>
  <div class="text-right ">
    <v-btn
        @click="getDetail()"
        height="40"
        rounded
        variant="outlined"
        class="px-8 mt-1">
      <span>
        <v-icon>
          mdi-printer-outline
        </v-icon>
      </span>
      مدیریت سبد ها
    </v-btn>
    <v-dialog v-model="dialog" fullscreen>
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16400 ">
            مدیریت سبد ها
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5" >
          <v-card class="content">
            <v-row justify="center">
              <v-col cols="12" v-for="(barCode , index) in detail " :key="'shpss-list-barcode'+index">
                <div class="text-right">
                 شناسه بسته : 12152416
                </div>
              </v-col>
            </v-row>
          </v-card>

          <v-row class="justify-between my-2 mx-2">

            <v-col cols="3" class="d-flex mx-10 ">
              <v-btn
                  @click="print()"
                  height="40"
                  rounded
                  variant="outlined"
                  prepend-icon="mdi-printer-outline"
                  class="px-5 mt-1">
                پرینت محموله
              </v-btn>
            </v-col>
            <v-col cols="3" class="d-flex justify-end mx-10">
              <btn
                  class="mt-3 mr-2"
                  @click="dialog = false"
                  style="cursor: pointer;">
                انصراف
              </btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props:{
    shipmentId:null
  },
  data(){
    return {
      dialog:false,
      detail:null,
    }
  },


  methods: {
    print() {
      // this.close()
      window.open(`${ import.meta.env.VITE_API_SITEURL}processing-shipment/${this.shipmentId}/barcode-print`, '_blank');

    },
    close() {
      this.dialog = false

    },
    async getDetail(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/print/barcode/${this.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.detail = data.data
        this.dialog = true
      }
    },

  },

  computed: {
    basUrl(){
      return import.meta.env.VITE_API_BACKEND_URL
    },

  }
}
</script>
