<template>
  <div class="text-center px-5" v-if="detail" >
    <v-card class="content" id="printableArea-shipment">
      <div class="d-flex justify-space-between pa-5 d--rtl">

        <span>شناسه محموله : {{ detail?.id }}</span>
        <span v-if="detail?.seller">نام فروشگاه : {{ detail?.seller?.shopping_name  }}</span>
        <span >تاریخ تحویل : <span class="d--rtl">{{convertDateToJalai( detail?.sent_to_warehouse_at , '-' , false) }}</span></span>
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
          :header="detailCargoHeader"
          :detail="detail"
          :items="detail?.shps_list"
          updateUrl="category/csv/mass-update"
          model="shipmentDetail"
      />

    </v-card>

  </div>
</template>
<script >
import Table from "@/components/ProcessingShipment/Table/DetailProcessingTable.vue";
import Cargo from '@/composables/Cargo'
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToJalai} from "@/assets/js/functions";
export default {
  setup(){
    const {detailCargoHeader} = new Cargo()

    return { detailCargoHeader }
  },
  data(){
    return {
      detail:null,
    }
  },
  methods:{
    convertDateToJalai,
    async getDetail(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/detail/${this.$route.params.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.detail = data.data
        this.dialog = true
        setTimeout(() => {
          var myElement = document.getElementById('printableArea-shipment');
          window.print(myElement);
        }, 1000);
      }
    },
  },
  components:{
    Table
  },
  computed: {
    basUrl(){
      return import.meta.env.VITE_API_BACKEND_URL
    },

  },
  mounted() {
    this.getDetail()
  }

}
</script>