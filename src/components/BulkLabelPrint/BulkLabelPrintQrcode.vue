<template>
    <div class="text-center px-5 ma-5" id="printableArea-shipmentBarcode">
      <v-card class="content py-5">
        <v-row justify="center">
          <v-col cols="4" v-for="(barCode , index) in detail " :key="'bulk-label-print-qrcode'+ index">
            <div class="d-flex justify-space-between px-15">
              <span>{{barCode?.shps?.seller?.id}}</span>
              <span>{{barCode?.shps?.seller?.shopping_name}}</span>
            </div>
            <div class="text-center">
              <img width="190" height="80" :src="basUrl + barCode.barcode_image">
            </div>
            <div class="text-center">
              <img width="133" height="69" :src="basUrl + barCode.shps?.barcode_image">
            </div>
          </v-col>
        </v-row>
      </v-card>
  
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
    mounted() {
      this.getDetail()
    },
  
    methods: {
  
      async getDetail(){
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `shipment/print/barcode/${this.$route.params.shipmentId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
          this.detail = data.data
          setTimeout(() => {
            var myElement = document.getElementById('printableArea-shipmentBarcode');
            window.print(myElement);
          }, 1000);
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
  