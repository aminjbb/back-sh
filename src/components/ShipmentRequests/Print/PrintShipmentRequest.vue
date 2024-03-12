<template>
  <div v-if="retailObject" class="pa-5" id="printableArea-cargo d--ltr" >
    <v-card >
      <div class="text-center px-5">
        <v-card class="" height="150">
          <div class="mx-10 d--rtl">
            <div>
              <img width="200" height="58" :src="baseUrl + retailObject?.barcode_image" alt="">
            </div>
            <div>
              {{ retailObject?.barcode }}
            </div>

          </div>
          <div class="d-flex justify-center align-center px-10 ma-5 ">
            <div class="mx-10">
                        <span style="font-size: 7px">
                            تاریخ تحویل :
                        </span>
              <span v-if="retailObject.sent_to_warehouse_at " style="font-size: 7px;direction: ltr">
                            {{convertDateToJalai(retailObject.sent_to_warehouse_at ,  '-' , false) }}
                        </span>
              <span v-else style="font-size: 7px">
                            ----
                        </span>
            </div>
            <div class="mx-10">
                        <span style="font-size: 7px">
                            شناسه محموله
                        </span>
              <span style="font-size: 7px">
                            {{ retailObject.id }}
                        </span>
            </div>
            <div class="mx-10">
                        <span style="font-size: 7px">
                            نام فروشگاه :
                        </span>
              <span style="font-size: 7px">
                            {{retailObject.shopping_name }}
                        </span>
            </div>
          </div>
        </v-card>
        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" min-height="580">
          <div >
            <Table
                class="flex-grow-1"
                :header="headerQrcode"
                :items="retailObject.shps_list"
                editUrl="/seller/edit/"
                deletePath="seller/crud/update/activation/"
                changeStatusUrl="seller/crud/update/contract/"
                :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
                :loading="loading"
                @updateList="updateList"
                updateUrl="seller/csv/mass-update"
                model="sku" />
          </div>

          <v-divider/>

        </v-card>
      </div>
    </v-card>
  </div>
</template>
<script >
import ShipmentRequests from "@/composables/ShipmentRequests";
import {AxiosCall} from "@/assets/js/axios_call";
import Table from "@/components/ShipmentRequests/Table/MarketPlaceShipmentPrint.vue";
import {convertDateToJalai} from "../../../assets/js/functions";

export default {
  setup() {
    const {

      headerQrcode
    } = ShipmentRequests();

    return {

      headerQrcode
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
      AxiosMethod.end_point = `shipment/consignment/crud/get/${this.$route.params.shipmentRequestId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.retailObject =data.data
        setTimeout(()=>{
          let myElement = document.getElementById('printableArea-cargo');
          window.print(myElement);
        } , 2000)
      }

    },
  },
  computed: {
    baseUrl() {
      return import.meta.env.VITE_API_BACKEND_URL
    },
  }
}
</script>

