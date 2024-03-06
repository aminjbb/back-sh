<template>
  <div v-if="retailObject" class="pa-5" id="printableArea-cargo d--ltr" >

      <v-card class="d-flex justify-center align-center px-10 ma-5  " height="82">
        <div class="mx-10">
                        <span class="t14500">
                            تاریخ ارسال :
                        </span>
          <span v-if="retailObject.sent_to_warehouse_at " class="t13400 text-gray500 number-font d--ltr">
                            {{ convertDateToJalai(retailObject.sent_to_warehouse_at, '-', false) }}
                        </span>
          <span v-else class="t13400 text-gray500">
                            ----
                        </span>
        </div>
        <div class="mx-10">
                        <span class="t10500 ">
                            شناسه محموله :
                        </span>
          <span class="t13400 text-gray500 number-font">
                            {{ retailObject.id }}
                        </span>
        </div>
        <div class="mx-10" v-if="retailObject.supplier">
                        <span class="t10500">
                            نام فروشگاه:
                        </span>
          <span class="t10500 text-gray500">
                            {{ retailObject?.supplier?.shopping_name }}
                        </span>
        </div>

        <div class="mx-10" v-else>
                        <span class="t10500">
                            نام تامین کننده :
                        </span>
          <span class="t10400 text-gray500">
                            {{ retailObject?.factor?.supplier?.shopping_name }}
                        </span>
        </div>

      </v-card>
    <v-card class="ma-5" min-height="82" v-if="retailObject?.rejection_reason">
      <div class="my-2">دلیل رد</div>
      <v-divider class="mb-3"/>
      <div class="pa-5 text-right">
        {{ retailObject?.rejection_reason }}
      </div>
    </v-card>

      <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl ">
        <div class="table-scroll-container">

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
              model="sku"/>
        </div>
        <v-divider />
        <div class="calculate-all d-flex justify-end align-center">
          <div class="text-center c-table__header__item t12500 text-black" style="width:17.1111%;padding:15px 10px">
            جمع:
          </div>

          <div class="text-center  c-table__header__item t12500 text-black" style="width:7.1111%;padding:15px 10px;margin-right: 300px;">
            <template v-if="retailObject && retailObject.shps_list.buying_price >= 0">
              {{retailObject.buying_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black" style="width:10.1111%;padding:15px 10px">
            <template v-if="retailObject && retailObject.shps_list.customer_price >= 0">
              {{retailObject.shps_list.customer_price }}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t12500 text-black " style="width:11.1111%;padding:15px 10px">
            <template v-if="retailObject && retailObject.shps_list.sum_customer_price ">
              {{retailObject.shps_list.sum_customer_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t10500 text-black mr-15" style="width:11.1111%;padding:15px 10px">
            <template v-if="retailObject && retailObject.shps_count >= 0">
              {{retailObject.shps_count}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t10500 text-black mr-10" style="width:11.1111%;padding:15px 10px">
            <template v-if="retailObject && retailObject.shps_count >= 0">
              {{retailObject.total_buying_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item t10500 text-black " style="width:11.1111%;padding:15px 10px">
            <template v-if="retailObject && retailObject.shps_count >= 0">
              {{retailObject.total_customer_price}}
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="text-center c-table__header__item  " style="width:11.1111%;padding:15px 10px">
            <template v-if="retailObject && retailObject.shps_count >= 0">
              {{retailObject.total_profit}}%
            </template>
            <template v-else>
              -
            </template>
          </div>
        </div>



      </v-card>

    </div>

</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";

import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import ShipmentRequests from "@/composables/ShipmentRequests";
import Table from "@/components/ShipmentRequests/Table/ShipmentRequestDetailShipmentShps.vue";
import {
  convertDateToJalai
} from "@/assets/js/functions";

export default {
  setup() {
    const {

      headerShps,

    } = ShipmentRequests();

    return {

      headerShps,

    };
  },
  components: {
    Table,
    UploadFileSection

  },
  mounted() {
    this.retailShipmentDetail()
  },
  data() {
    return {
      retailObject:null
    }
  },

  methods: {



    convertDateToJalai,
    async retailShipmentDetail(item) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/detail/${this.$route.params.shipmentRequestDetailId}`
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



  }
}
</script>
