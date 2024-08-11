<template>
  <div class="text-right  ">
    <div class="ma-3 pointer" @click="requestShipmentDetailShipmentDetail()">
      <v-icon size="x-small" class="text-grey-darken-1">mdi-eye-outline</v-icon>
      <span class="mr-2 text-grey-darken-1 t14 w300">
                                            نمایش جزئیات
                                        </span>
    </div>
    <v-dialog v-model="dialog" width="1060">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="">
          <v-col cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
          </v-col>
        </v-row>
        <div class="text-center  ">
          <v-card class="d-flex justify-center align-center px-10 ma-5  " height="82">
            <div class="mx-10">
                        <span class="t14 w500">
                            تاریخ ارسال :
                        </span>
              <span v-if="retailObject.sent_to_warehouse_at " class="t13 w400 text-gray500 number-font d--ltr">
                            {{ convertDateToJalai(retailObject.sent_to_warehouse_at, '-', false) }}
                        </span>
              <span v-else class="t13 w400 text-gray500">
                            ----
                        </span>
            </div>
            <div class="mx-10">
                        <span class="t14 w500 ">
                            شناسه محموله :
                        </span>
              <span class="t13 w400 text-gray500 number-font">
                            {{ retailObject.id }}
                        </span>
            </div>
            <div class="mx-10" v-if="retailObject.supplier">
                        <span class="t14 w500">
                            نام فروشگاه:
                        </span>
              <span class="t13 w400 text-gray500">
                            {{ retailObject?.supplier?.shopping_name }}
                        </span>
            </div>

            <div class="mx-10" v-else>
                        <span class="t14 w500">
                            نام تامین کننده :
                        </span>
              <span class="t13 w400 text-gray500">
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
              <div class="text-center c-table__header__item t12 w500 text-black" style="width:17.1111%;padding:15px 10px">
                جمع:
              </div>

              <div class="justify-center  c-table__header__item t12 w500 text-black" style="width:7.1111%;padding:15px 10px;margin-right: 300px;">
                <template v-if="retailObject && retailObject.shps_list.buying_price >= 0">
                  {{retailObject.buying_price}}
                </template>
                <template v-else>
                  -
                </template>
              </div>
              <div class="justify-center c-table__header__item t12 w500 text-black" style="width:10.1111%;padding:15px 10px">
                <template v-if="retailObject && retailObject.shps_list.customer_price >= 0">
                  {{retailObject.shps_list.customer_price }}
                </template>
                <template v-else>
                  -
                </template>
              </div>
              <div class="justify-center c-table__header__item t12 w500 text-black " style="width:11.1111%;padding:15px 10px">
                <template v-if="retailObject && retailObject.shps_list.sum_customer_price ">
                  {{retailObject.shps_list.sum_customer_price}}
                </template>
                <template v-else>
                  -
                </template>
              </div>
              <div class="justify-center c-table__header__item t12 w500 text-black mr-15" style="width:11.1111%;padding:15px 10px">
                <template v-if="retailObject && retailObject.shps_count >= 0">
                  {{retailObject.shps_count}}
                </template>
                <template v-else>
                  -
                </template>
              </div>
              <div class="justify-center c-table__header__item t12 w500 text-black mr-10" style="width:11.1111%;padding:15px 10px">
                <template v-if="retailObject && retailObject.shps_count >= 0">
                  {{retailObject.total_buying_price}}
                </template>
                <template v-else>
                  -
                </template>
              </div>
              <div class="justify-center c-table__header__item t12 w500 text-black " style="width:11.1111%;padding:15px 10px">
                <template v-if="retailObject && retailObject.shps_count >= 0">
                  {{retailObject.total_customer_price}}
                </template>
                <template v-else>
                  -
                </template>
              </div>
              <div class="justify-center c-table__header__item t12 w500 text-black " style="width:11.1111%;padding:15px 10px">
                <template v-if="retailObject && retailObject.shps_count >= 0">
                  {{retailObject.total_profit}}%
                </template>
                <template v-else>
                  -
                </template>
              </div>
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
                <btn
                    class="mt-3 mr-2"
                    @click="dialog = false"
                    style="cursor: pointer;">
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
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import ShipmentRequests from "@/composables/ShipmentRequests";
import Table from "@/components/ShipmentRequests/Table/ShipmentRequestDetailShipmentShps.vue";
import {
  convertDateToJalai
} from "@/assets/js/functions";

export default {
  setup() {
    const {
      retailShipments,
      dataTableLength,
      page,
      header,
      loading,
      headerShps,
      getDetail,
        detail
    } = ShipmentRequests();

    return {
      retailShipments,
      dataTableLength,
      page,
      header,
      loading,
      headerShps,
      getDetail,
      detail
    };
  },
  components: {
    Table,


  },
  props: {
    item : null
  },
  data() {
    return {
      retailObject: null,
      dialog: false
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
      this.dialog = true
      this.retailObject = data.data


      }

    },
    print() {

      // this.close()
      window.open(`${ import.meta.env.VITE_API_SITEURL}shipment-requests/${this.retailObject.id}/print-detail`, '_blank');

    },
    convertDateToJalai,

    close() {
      const form = {
        dialog: false,
        object: ''
      }
      this.$store.commit('set_detailModalTest', form)
    },



  },

  computed: {


  }
}
</script>
