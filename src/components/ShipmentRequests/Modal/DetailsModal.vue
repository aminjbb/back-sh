<template>
    <div class="text-right ">
  
      <v-dialog
          v-model="dialog"
          width="1060"
  
      >
        <v-card class="">
  
          <div class="text-center px-5" >
            <v-card class="d-flex justify-center align-center px-10 ma-5 "  height="82">
              <div class="mx-10" >
                  <span class="t14500">
                       تاریخ ارسال :
                  </span>
                  <span v-if="retailObject.sent_to_warehouse_at " class="t13400 text-gray500  d--ltr">
                   {{convertDateToJalai(retailObject.sent_to_warehouse_at ,  '-' , false) }}
                  </span>
                  <span v-else class="t13400 text-gray500">
                  ----
                  </span>
                </div>
              <div class="mx-10" >
                  <span class="t14500">
                       شناسه محموله :
                  </span>
                  <span  class="t13400 text-gray500">
                    {{ retailObject.id }}
                  </span>
                </div>
              <div class="mx-10" >
                  <span class="t14500">
                        نام فروشگاه :
                  </span>
                  <span  class="t13400 text-gray500">
                    {{ retailObject.factor.supplier.shopping_name }}
                  </span>
                </div>
              
            </v-card>
            <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" height="580">
              <Table
                  class="flex-grow-1"
                  :header="headerShps"
                  :items="retailObject.shps_list"
                  :loading="loading"
                  @updateList="updateList"
                  model="sku" />
  
              <v-divider />
  
  
            </v-card>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
 
  
  import ShipmentRequests from "@/composables/ShipmentRequests";
  import Table from "@/components/ShipmentRequests/Table/ShipmentRequestDetailShipmentShps.vue";
  import {convertDateToJalai} from "../../../assets/js/functions";
  export  default {
    setup(){
      const {
        retailShipments, dataTableLength, page, header, loading ,headerShps
      } = ShipmentRequests();
  
      return {
        retailShipments, dataTableLength, page, header, loading ,headerShps
      };
    },
    components:{
      Table,
      
  
    },
    data(){
      return{
      }
    },
  
    methods:{
      convertDateToJalai,
    
      close(){
        const form = {
          dialog :false,
          object : ''
        }
        this.$store.commit('set_modalRequestShipment' , form)
      },
   
   
  
    },
  
    computed:{
      dialog(){
        return this.$store.getters['get_modalRetailShipmentDetail']
      },
      retailObject(){
        return this.$store.getters['get_modalRetailShipmentDetailObject']
      },

    }
  }
  </script>
  
  <style>
  
  
  
  </style>