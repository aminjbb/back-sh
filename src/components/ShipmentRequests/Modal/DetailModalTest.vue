<template>
  <div class="text-right  ">

    <v-dialog
        v-model="dialog"
        width="1060"

    >
      <v-card class="">
        <v-row justify="space-between" align="center" class="">
          <v-col cols="2">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
          </v-col>
        </v-row>
        <div class="text-center  " >
          <v-card class="d-flex justify-center align-center px-10 ma-5  "  height="82">
            <div class="mx-10" >
                <span class="t14500">
                     تاریخ ارسال :
                </span>
                <span v-if="retailObject.sent_to_warehouse_at " class="t13400 text-gray500 number-font d--ltr">
                 {{convertDateToJalai(retailObject.sent_to_warehouse_at ,  '-' , false) }}
                </span>
                <span v-else class="t13400 text-gray500">
                ----
                </span>
              </div>
            <div class="mx-10" >
                <span class="t14500 ">
                     شناسه محموله :
                </span>
                <span  class="t13400 text-gray500 number-font">
                  {{ retailObject.id }}
                </span>
              </div>
            <div class="mx-10" >
                <span class="t14500">
                  نام فروشگاه  :
                </span>
                <span  class="t13400 text-gray500">
                    {{retailObject.shopping_name  }}
                </span>
              </div>
            
          </v-card>
          <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl " >
            <div  class="table-scroll-container">
              <Table
                class="flex-grow-1  "
                :header="headerShps"
                :items="retailObject.shps_list"
                editUrl="/seller/edit/"
                activePath="seller/crud/update/activation/"
                deletePath="seller/crud/update/activation/"
                changeStatusUrl="seller/crud/update/contract/"
                :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
                :loading="loading"
                @updateList="updateList"
                
                model="sku" />
            </div>

            
            <v-row class="justify-between my-2 mx-2 "> 
                      
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

          </v-card>
        
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
      this.$store.commit('set_detailModalTest' , form)
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
      return this.$store.getters['get_detailModalTest']
    },
    retailObject(){
      return this.$store.getters['get_detailModalTestObject']
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