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
        پرینت
      </v-btn>
      <v-dialog v-model="dialog" width="1060">
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
              پرینت برچسب
            </v-col>
          </v-row>
          <v-divider/>
          <div class="text-center px-5" >
            <v-card class="content">
                <v-row justify="center">
                  <v-col cols="4" v-for="(barCode , index) in detail " :key="'bulk-label-print'+index">
                    <div class="d-flex justify-space-between px-15">
                      <span>{{barCode?.shps?.seller?.id}}</span>
                      <span>{{barCode?.shps?.seller?.shopping_name}}</span>
                    </div>
                    <div class="text-center">
                      <img width="190" height="80" :src="basUrl + barCode.barcode_image">
                    </div>
                    <div class="text-center px-10">
                      {{barCode?.shps?.sku?.label }}
                    </div>
                    <div class="text-center">
                      <img width="133" height="69" :src="basUrl + barCode.shps?.barcode_image">
                    </div>
                    <div class="text-center px-10">
                      {{barCode?.shps?.barcode }}
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
      
      }
    },
  
  
    methods: {
      print() {
        console.log(this.shipmentId);
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
  
      detail() {
       return this.$store.getters['get_bulkPrintLabelObject']
      },
      dialog() {
                return this.$store.getters['get_bulkPrintLabel']
            },
  
      basUrl(){
         
  
        return 'https://api.shvz.ir/'
      },
  
    }
  }
  </script>
  