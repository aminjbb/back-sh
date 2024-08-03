<template>
  <div v-if="modalPrintOrderObject.length" class="" id="printableArea-order ">
    <div v-for="(printObject , index) in modalPrintOrderObject" class="mb-5">
      <div class="  d-flex justify-center ">
        <v-card height="240" width="282" class="rounded-0 d--ltr">
          <v-row v-if="printObject.sending_method === 'post'" justify="center" align="center"
                 class="pa-3 ">
            <v-col class="pa-0 ma-0" cols="3">
              <v-card height="30" variant="outlined" color="black" class="rounded-0 text-center">
                <div class="d-flex justify-center">
                  <span class="t24800">
                    {{ printObject.box_size }}
                  </span>
                </div>
              </v-card>
            </v-col>

            <v-col class="pa-0 ma-0" cols="6">
              <v-card height="30" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center">
                <img src="@/assets/img/newPost-image.png" width="32" height="30" alt="post image">

              </v-card>
            </v-col>

            <v-col class="pa-0 ma-0" cols="3">
              <v-card height="30" variant="outlined" color="black" class="rounded-0">

              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="12">
              <v-card height="12" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center">
                                      <span class="t8400">
                                          فروشگاه اینترنتی شاواز
                                      </span>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="12">
              <v-row justify="center" class="pa-3">
                <v-col cols="3" class="pa-0 ma-0">
                  <v-card height="24" variant="outlined" color="black"
                          class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8400">
                                              </span>
                  </v-card>
                </v-col>
                <v-col cols="9">
                  <v-row justify="center">
                    <v-col cols="6" class="pa-0 ma-0">
                      <v-card height="12" variant="outlined" color="black"
                              class="rounded-0 d-flex justify-center align-center pt-1">
                                              <span class="t8400 d--rtl">
                                               گرم {{ printObject?.weight }}
                                              </span>
                      </v-card>
                    </v-col>
                    <v-col cols="6" class="pa-0 ma-0">
                      <v-card height="12" variant="outlined" color="black"
                              class="rounded-0 d-flex justify-center align-center">
                                              <span class="t10500">
                                               {{ printObject?.state?.label }}
                                              </span>
                      </v-card>
                    </v-col>
                    <v-col cols="6" class="pa-0 ma-0">
                      <v-card height="12" variant="outlined" color="black"
                              class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8400">
                                              </span>
                      </v-card>
                    </v-col>
                    <v-col cols="6" class="pa-0 ma-0">
                      <v-card height="12" variant="outlined" color="black"
                              class="rounded-0 d-flex justify-center align-center pt-1">
                                              <span class="t8400">
                                               {{ printObject?.date }}
                                              </span>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="pa-0 ma-0" cols="12">
              <v-card height="65" variant="outlined" color="black" class="rounded-0 text-right px-1">
                <div class="my-0">
                   <span class="t10600">
                    {{ printObject?.state?.label }}
                   </span>
                  <span class="t10600">-</span>
                  <span class="t10600">
                    {{ printObject?.city?.label }}
                   </span>
                </div>
                <div  class="my-0 line-h-12">
                  <span class="t10600 ">  آدرس :</span> <span class="t10600 "> {{ printObject.receiver_address }}</span> <span class="t10600 d--rtl">  کدپستی :</span> <span class="t10600 d--rtl">  {{ printObject.receiver_postal_code }}</span>
                </div>

              </v-card>
            </v-col>

            <v-col cols="6" class="pa-0 ma-0">
              <v-card height="12" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center">
                                      <span class="t8400">
                                         {{ printObject?.order_factor_id }}
                                      </span>
              </v-card>
            </v-col>
            <v-col cols="6" class="pa-0 ma-0">
              <v-card height="12" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center">
                                      <span class="t8400">
                                         کاربر عادی {{ index + 1 }}/{{ modalPrintOrderObject?.length }}
                                      </span>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="12">
              <v-card height="22" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center d--rtl">
                                      <span class="t10600 mx-1">
                                          {{ printObject.receiver_name }}
                                      </span>

                <span class="t10600 mx-1">
                                          {{ printObject.receiver_mobile }}
                                      </span>
              </v-card>
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <v-card height="80" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center pa-0 pt-1">
                <barcode
                    :barcodeValue="printObject.logistic_barcode"
                    :format="'CODE128'"
                    :index="index"
                    text=""
                >
                </barcode>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else justify="center" align="center" class="pa-3">
            <v-col class="pa-0 ma-0" cols="12">
              <v-card height="114" variant="outlined" color="black" class="rounded-0">
                <v-row justify="center" class="pa-4">

                  <v-col cols="4" class="pa-0">
                    <img v-if="printObject.sending_method === 'tipax'" src="@/assets/img/tpax-image.png"
                         width="32" height="30" alt="post image">
                    <img v-else-if="printObject.sending_method === 'nafis'"
                         src="@/assets/img/nafis-image.png" width="32" height="30" alt="post image">
                  </v-col>
                  <v-col cols="8" class="text-right pa-0">
                    <p class="t8400">
                      <span> {{ printObject?.state?.label }} - </span>
                      <span> {{ printObject?.city?.label }} </span>
                    </p>
                    <p class="t10600">
                      <span> {{ printObject.receiver_address }} </span>
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="4">
              <v-card height="22" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center">
                      <span class="t8400 d--rtl">
                        {{ printObject?.weight }}گرم
                      </span>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="8">
              <v-card height="22" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                        <span class="t12600" v-if="printObject.sending_method === 'tipax'">
                          تیپاکس
                        </span>
                <span class="t12600" v-else-if="printObject.sending_method === 'nafis'">
                           {{ printObject?.branch_title }}
                        </span>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="12">
              <v-card height="22" variant="outlined" color="black" class="rounded-0 d-flex justify-center d--rtl">
                           <span class="t10600 mx-1">
                            {{ printObject.receiver_name }}
                           </span>

                <span class="t10600 mx-1">
                            {{ printObject.receiver_mobile }}
                          </span>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="5">
              <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8400 mx-1">
                            {{ printObject?.date }}
                           </span>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="3">
              <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8400 mx-1">
                          {{ printObject.order_factor_id }}
                           </span>
              </v-card>
            </v-col>
            <v-col class="pa-0 ma-0" cols="4">
              <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8400 mx-1">
                       کاربر عادی {{ index + 1 }}/{{ modalPrintOrderObject?.length }}
                           </span>
              </v-card>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">

              <v-card height="70" variant="outlined" color="black"
                      class="rounded-0 d-flex justify-center align-center pa-0 pt-1" :key="'logistic_barcode'+index">
                <barcode
                    :barcodeValue="printObject.logistic_barcode"
                    :format="'CODE128'"
                    :index="index"
                    text=""
                >
                </barcode>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

      </div>
    </div>
  </div>
</template>

<script>
import Barcode from "@/components/OrderPackaging/Barcode/OrderPackagingBarcode.vue";

import {
  AxiosCall
} from '@/assets/js/axios_call.js'

export default {

  data() {
    return {
      modalPrintOrderObject: [],
      form: {
        id: '',
        name: '',
      },
    }
  },


  components: {
    Barcode
  },

  mounted() {
    this.getOrderListDetail()
  },

  methods: {
    async getOrderListDetail() {
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `admin/order/boxes/print/label/${this.$route.params.orderId}`;
      try {
        let response = await AxiosMethod.axios_get();
        if (response) {
          this.modalPrintOrderObject = response.data

          setTimeout(() => {
            let myElement = document.getElementById('printableArea-order');
            window.onafterprint = function() {window.close()};
            window.print(myElement);
          }, 2000)

        } else {

        }
      } catch (error) {
        console.error("Error in API call:", error);

        return [];
      }
    }
  },
  watch: {
    'form.selectedItems': function (newVal, oldVal) {
      console.log('Selected Items Changed:', newVal)
    }
  },
}
</script>
