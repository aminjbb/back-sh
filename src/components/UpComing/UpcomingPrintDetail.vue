<template>
  <div class="text-right ">
    <v-card class="">

      <v-row
          justify="space-between"
          align="center"
          class="pa-1 my-2">
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
      </div>
    </v-card>
  </div>
</template>

<script>
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import Table from "@/components/ProcessingShipment/Table/DetailProcessingTable.vue";
import {
  convertDateToJalai
} from "@/assets/js/functions";
import ProcessingShipment from "@/composables/ProcessingShipment";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  setup() {
    const {headerDetailShipment} = new ProcessingShipment()
    return { headerDetailShipment }
  },

  components: {
    Table,
    UploadFileSection

  },
  data(){
    return{
      retailObject:''
    }
  },
  methods: {
    async getDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/detail/${this.$route.params.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {

        this.retailObject =data.data
        console.log(this.retailObject)
        // if (data.data.barcode_image) {
        //   data.data.barcode_image = baseUrl + data.data.barcode_image;
        // }


      } else {
        console.error("Data not found");
      }
    },
    convertDateToJalai,

  },

  computed: {
    baseUrl() {
      return import.meta.env.VITE_API_BACKEND_URL
    },
  },
  beforeMount() {
    this.getDetail()
  }
}
</script>
