<template>
  <div  class="pa-5" id="printableArea-cargo d--ltr">
    <v-card >
      <div class="text-center px-5">
        <v-card class="d-flex justify-center align-center px-10 ma-5 " height="82">
          <div class="mx-10 d--rtl">
            <div>
              <img width="200" height="58" :src="baseUrl + retailObject?.barcode_image" alt="">
            </div>
            <div>
              {{ retailObject?.barcode }}
            </div>

          </div>
          <div class="mx-10 d--rtl">
                        <span class="t14500">
                            تاریخ ارسال :
                        </span>
            <span v-if="retailObject?.sent_to_warehouse_at " class="t13400 text-gray500 number-font d--ltr">
                            {{ convertDateToJalai(retailObject?.sent_to_warehouse_at, '-', false) }}
                        </span>
            <span v-else class="t13400 text-gray500">
                            ----
                        </span>
          </div>
          <div class="mx-10 d--rtl">
                        <span class="t14500">
                            شناسه محموله :
                        </span>
            <span class="t13400 text-gray500 number-font">
                            {{ retailObject?.id }}
                        </span>
          </div>
          <div class="mx-10 d--rtl">
                        <span class="t14500">
                            تامین کننده :
                        </span>
            <span class="t13400 text-gray500">
                             {{ retailObject?.factor?.supplier?.full_name }}
                        </span>
          </div>
          <div class="mx-10 d--rtl">
                        <span class="t14500">
                            شناسه فاکتور :
                        </span>
            <span class="t13400 text-gray500">
                            {{ retailObject?.factor_id }}
                        </span>
          </div>

        </v-card>
        <v-card class="ma-5 br-12 " min-height="580">
          <Table
              class="flex-grow-1"
              :header="headerShps"
              :items="retailObject?.shps_list"
              editUrl="/seller/edit/"
              activePath="seller/crud/update/activation/"
              changeStatusUrl="seller/crud/update/contract/"
              updateUrl="seller/csv/mass-update"
              model="sku"/>

          <v-divider/>

        </v-card>
      </div>
    </v-card>
  </div>
</template>
<script >
import Table from "@/components/RetailShipment/Table/RetailShipmentDetailShipmentShps.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import RetailShipment from "@/composables/RetailShipment";
import {convertDateToJalai} from "../../../assets/js/functions";

export default {
  setup() {
    const {

      headerShps
    } = RetailShipment();

    return {

      headerShps
    };
  },
  components:{
    Table
  },
  data(){
    return{
      retailObject:null
    }
  },
  mounted() {
    this.retailShipmentDetail()
  },
  methods:{
    convertDateToJalai,

    async retailShipmentDetail(item) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/consignment/crud/get/${this.$route.params.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.retailObject =data.data
       setTimeout(()=>{
         var myElement = document.getElementById('printableArea-cargo');
         window.print(myElement);
       } , 2000)
      }

    },
  },
  computed: {
    baseUrl() {
      return 'https://api.shvz.ir/'
    },
  }
}
</script>