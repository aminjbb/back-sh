<template>
    <div class="text-right ">
      <v-dialog
          v-model="dialog"
          width="1060"
      >
        <v-card class="">
          <v-row justify="space-between" align="center" class="pa-1 my-2">
            <v-col class="mx-10" cols="2">
              <v-btn @click="close()" variant="icon">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
  
            <v-col cols="7" class="t16400 ">
              پرینت برچسب
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div class="text-center px-5" >
           
            
             <v-cart class="content">
      <div class="qr-code-container px-10 ma-5">
              <div v-for="(consignment, index) in dataObject" :key="index" class="qr-code-item mx-10 ">
                  <span class="d-flex justify-between">
                      <p>{{ consignment.id }}</p>
                      <p>{{ consignment.seller }}</p>
                  </span>
                  <span>
                      <img :src="consignment.imageUrl" alt="Data Image" />
                  </span>
                  
                  <span >
                      <p>{{ consignment.label }}</p>
                  </span>
                  <span>
                      <img :src="consignment.secondImageUrl" alt="Data Image" />
                  </span>
                  <span >
                      <p>{{ consignment.text }}</p>
                  </span>
              </div>
            </div>
            </v-cart>
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
                        <btn class="mt-3 mr-2" @click="close()" style="cursor: pointer;">
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
  import BlogForm from '@/components/HomePage/Forms/BlogForm.vue'
  import {AxiosCall} from "@/assets/js/axios_call";
  import UploadFileSection from "@/components/Public/UploadFileSection.vue";
  import RetailShipment from "@/composables/RetailShipment";
  import Table from "@/components/RetailShipment/Table/RetailShipmentDetailShipmentShps.vue";
  import {convertDateToJalai} from "../../../assets/js/functions";
  export  default {
    setup(){
      const {
        retailShipments, dataTableLength, page, header, loading ,headerShps
      } = RetailShipment();
  
      return {
        retailShipments, dataTableLength, page, header, loading ,headerShps
      };
    },
    components:{
      Table,
      UploadFileSection
  
    },
    data(){
      return{

        dataObject: [{  
          id: "123112",
          seller: "پخش رخسار",
          label: "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
          text: '۶۷۶۷۶۷۶۷۶۷',
          imageUrl: "../src/assets/img/qrcode.png",
          secondImageUrl: "../src/assets/img/qrcode2.png"
                },
      {  
          id: "123112",
          seller: "پخش رخسار",
          label: "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
          text: '۶۷۶۷۶۷۶۷۶۷',
          imageUrl: "../src/assets/img/qrcode.png",
          secondImageUrl: "../src/assets/img/qrcode2.png"
                },
                {  
           id: "123112",
          seller: "پخش رخسار",
          label: "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
          text: '۶۷۶۷۶۷۶۷۶۷',
          imageUrl: "../src/assets/img/qrcode.png",
          secondImageUrl: "../src/assets/img/qrcode2.png"
                },
      {   
          id: "123112",
          seller: "پخش رخسار",
          label: "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
          text: '۶۷۶۷۶۷۶۷۶۷',
          imageUrl: "../src/assets/img/qrcode.png",
          secondImageUrl: "../src/assets/img/qrcode2.png"
                },
                {   
          id: "123112",
          seller: "پخش رخسار",
          label: "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
          text: '۶۷۶۷۶۷۶۷۶۷',
          imageUrl: "../src/assets/img/qrcode.png",
          secondImageUrl: "../src/assets/img/qrcode2.png"
                },
                {   
          id: "123112",
          seller: "پخش رخسار",
          label: "کرم پودر شون مدل Daily Defence کد D01 ظرفیت 30 میلی لیتر",
          text: '۶۷۶۷۶۷۶۷۶۷',
          imageUrl: "../src/assets/img/qrcode.png",
          secondImageUrl: "../src/assets/img/qrcode2.png"
                },
    ]
      }
    },
  
    methods:{
      convertDateToJalai,
      getnavbarItem(){
        console.log(document.getElementById('navbarItems').offsetWidth)
      },
      close(){
        const form = {
          dialog :false,
          object : ''
        }
        this.$store.commit('set_detailModalTestQrCodeFull' , form)
      },
      validate(){
        this.$refs.BlogForm.$refs.addForm.validate()
        setTimeout(()=>{
          if (this.$refs.BlogForm.valid) this.createBlog()
        } , 200)
      },
      searchWarehouse(e){
        const filter = {
          name: e
        }
        this.getWarehouseList(filter)
      },
  
    },
  
    computed:{
      dialog(){
        return this.$store.getters['get_detailModalTestQrCodeFull']
      },
      retailObject(){
        return this.$store.getters['get_detailModalTestQrCodeFullObject']
      },
      warehouseData(){
        try {
          return this.warehouseList.data
        }
        catch (e) {
          return []
        }
      }
    }
  }
  </script>
  
  <style>
  
  
  
  </style>