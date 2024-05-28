<template>
  <div class="text-right ">
    <div class=" pointer" @click="requestShipmentDetailShipmentDetail()">
      <v-icon size="small" class="text-grey-darken-1">mdi-printer-outline</v-icon>
      <span class="mr-2 text-grey-darken-1 t14300">
                         پرینت محموله
                      </span>
    </div>
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
            <div class="d-flex justify-space-between pa-5 d--rtl">

              <span>شناسه محموله : {{ retailObject?.id }}</span>
              <span v-if="retailObject?.seller">نام فروشگاه : {{ retailObject?.seller?.shopping_name  }}</span>
              <span v-if="retailObject?.sent_to_warehouse_at">تاریخ تحویل : {{ convertDateToJalai(retailObject?.sent_to_warehouse_at , '-' , false)}} </span>
              <div class="text-center">
                <div>
                  <span><img :src="baseUrl + retailObject?.barcode_image"></span>
                </div>
                <div>
                <span>
                   <span>{{retailObject?.barcode}}</span>
                </span>
                </div>
              </div>
            </div>
          </v-card>
          <v-card min-height="500" class="d--rtl mt-2" >
            <Table
                class="flex-grow-1"
                editUrl="/categories/edit/"
                activePath="category/crud/update/activation/"
                deletePath="category/crud/delete/"
                :header="headerDetailShipment"
                :items="retailObject?.shps_list"
                :detail="retailObject"
                updateUrl="category/csv/mass-update"
                model="shipmentDetail"
            />

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
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import Table from "@/components/ProcessingShipment/Table/DetailProcessingTable.vue";
import {
  convertDateToJalai
} from "@/assets/js/functions";
import ProcessingShipment from "@/composables/ProcessingShipment";

export default {
  setup() {
    const {headerDetailShipment} = new ProcessingShipment()
    return { headerDetailShipment }
  },
  components: {
    Table,
    UploadFileSection

  },
  props:{
    item : null
  },
  data() {
    return {
      dialog: false,
      retailObject:null
    }
  },

  methods: {
    async requestShipmentDetailShipmentDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/detail/${this.item.id}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.retailObject= data.data
        this.dialog = true
        const baseUrl = import.meta.env.VITE_API_BACKEND_URL
      }
    },

    print() {
      window.open(`${ import.meta.env.VITE_API_SITEURL}up-coming/${this.retailObject.id}/print`, '_blank');
    },
    
    convertDateToJalai,






  },

  computed: {
    baseUrl() {
      return import.meta.env.VITE_API_BACKEND_URL
    },

  },

  // watch:{
  //   dialog(val){
  //     if (val){
  //       this.requestShipmentDetailShipmentDetail()
  //     }
  //   }
  // }

}

</script>
