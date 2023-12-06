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
                     تامین کننده :
                </span>
                <span  class="t13400 text-gray500">
                  زیبارویان نفیس
                </span>
              </div>
            <div class="mx-10" >
                <span class="t14500">
                     شناسه فاکتور :
                </span>
                <span  class="t13400 text-gray500">
                  {{ retailObject.factor?.id }}
                </span>
            </div>
          </v-card>
          <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" height="580">
            <Table
                class="flex-grow-1"
                :header="headerShps"
                :items="retailObject.shps_list"
                editUrl="/seller/edit/"
                activePath="seller/crud/update/activation/"
                deletePath="seller/crud/update/activation/"
                changeStatusUrl="seller/crud/update/contract/"
                :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
                :loading="loading"
                @updateList="updateList"
                updateUrl="seller/csv/mass-update"
                model="sku" />

            <v-divider />


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
      this.$store.commit('set_modalRequestShipment' , form)
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
      return this.$store.getters['get_modalRetailShipmentDetail']
    },
    retailObject(){
      return this.$store.getters['get_modalRetailShipmentDetailObject']
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