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
      پرینت محموله
    </v-btn>
    <v-dialog v-model="dialog" width="1060">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="dialog =false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16 w400 ">
            پرینت برچسب
          </v-col>
        </v-row>
        <v-divider/>
        <div class="text-center px-5" >
          <v-card class="content">
            <div class="d-flex justify-space-between pa-5 d--rtl">

              <span>شناسه محموله : {{ detail?.id }}</span>
              <span v-if="detail.seller">نام فروشگاه : {{ detail?.seller?.shopping_name  }}</span>
              <span >تاریخ تحویل : {{convertDate(detail?.sent_to_warehouse_at)}} </span>
              <div class="text-center">
                <div>
                  <span><img :src="basUrl +detail.barcode_image"></span>
                </div>
                <div>
                <span>
                   <span>{{detail.barcode}}</span>
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
                :items="detail?.shps_list"
                :detail="detail"
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
import Table from "@/components/ProcessingShipment/Table/DetailProcessingTable.vue";
import ProcessingShipment from '@/composables/ProcessingShipment'
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToJalai} from "../../../assets/js/functions";

export default {
  setup(){
    const {headerDetailShipment} = new ProcessingShipment()
    return { headerDetailShipment }
  },
  props:{
    shipmentId:null
  },
  data(){
    return {
      dialog:false,
      detail:null,
    }
  },
  components: {
    Table,
  },

  methods: {
    convertDateToJalai,
    convertDate(date){
     try {
       const jalaliDate = convertDateToJalai( date , '-' , false)
       const splitDate = jalaliDate.split('-')
       return splitDate[0] + '/' +splitDate[1] +'/' + splitDate[2]
     }
     catch (e) {
       return ''
     }
    },
    print() {
      // this.close()
      window.open(`${ import.meta.env.VITE_API_SITEURL}processing-shipment/${this.shipmentId}/detail-print`, '_blank');

    },

    async getDetail(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/detail/${this.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.detail = data.data
        this.dialog = true
        // this.getShipmentShpslist()
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
