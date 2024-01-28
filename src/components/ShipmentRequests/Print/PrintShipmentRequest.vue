<template>
  <div  class="pa-5" id="printableArea-cargo d--ltr">
    <v-card >
      <div class="text-center px-5">
        <v-card class="d-flex justify-center align-center px-10 ma-5 " height="82">
          <div v-if="retailObject" class=" mx-10 ">
                        <span class="t14500">
                            <img :src="retailObject.barcode_image" alt="Barcode Image" />

                        </span>
            <span class="t13400 ">
                            <p class="number-font">{{ retailObject.barcode }}</p>
                        </span>
          </div>
          <div class="mx-10">
                        <span class="t14500">
                            تاریخ تحویل :
                        </span>
            <span v-if="retailObject.received_by_warehouse_at " class="t13400 text-gray500 number-font d--ltr ">
                            {{convertDateToJalai(retailObject.received_by_warehouse_at ,  '-' , false) }}
                        </span>
            <span v-else class="t13400 text-gray500 d--ltr">
                            ----
                        </span>
          </div>
          <div class="mx-10">
                        <span class="t14500">
                            شناسه محموله
                        </span>
            <span class="t13400 text-gray500">
                            {{ retailObject.id }}
                        </span>
          </div>

          <div class="mx-10">
                        <span class="t14500">
                            نام فروشگاه :
                        </span>
            <span class="t13400 text-gray500">
                            {{retailObject.shopping_name }}
                        </span>
          </div>
        </v-card>
        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" height="580">
          <div class="table-scroll-container">
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

