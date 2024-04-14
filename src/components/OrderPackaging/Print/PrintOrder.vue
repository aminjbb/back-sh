<template>
<div v-if="modalPrintOrderObject" class="pa-5" id="printableArea-order ">
    <div>
        <div class=" mt-10 d-flex justify-center ">
          <v-card height="199" width="277" class="rounded-0">
            <v-row v-if="modalPrintOrderObject.sending_method === 'post'" justify="center" align="center"
                   class="pa-3">
              <v-col class="pa-0 ma-0" cols="3">
                <v-card height="30" variant="outlined" color="black" class="rounded-0">

                </v-card>
              </v-col>

              <v-col class="pa-0 ma-0" cols="6">
                <v-card height="30" variant="outlined" color="black"
                        class="rounded-0 d-flex justify-center align-center">
                  <img src="@/assets/img/post-image.png" width="32" height="30" alt="post image">

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
                                class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8400">
                                               {{ modalPrintOrderObject?.state?.label }}
                                              </span>
                        </v-card>
                      </v-col>
                      <v-col cols="6" class="pa-0 ma-0">
                        <v-card height="12" variant="outlined" color="black"
                                class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8400">
                                               {{ modalPrintOrderObject?.state?.label }}
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
                                class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8400">
                                               {{ modalPrintOrderObject?.state?.label }}
                                              </span>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="pa-0 ma-0" cols="12">
                <v-card height="75" variant="outlined" color="black" class="rounded-0 text-right px-1">
                  <p>
                    <span class="t8400">{{ modalPrintOrderObject.receiver_address }} : آدرس</span>
                  </p>
                  <p>
                    <span class="t8400">  {{ modalPrintOrderObject.receiver_postal_code }} : کدپستی</span>
                  </p>
                </v-card>
              </v-col>

              <v-col cols="6" class="pa-0 ma-0">
                <v-card height="12" variant="outlined" color="black"
                        class="rounded-0 d-flex justify-center align-center">
                                      <span class="t8400">
                                         {{ modalPrintOrderObject?.order_factor_id }}
                                      </span>
                </v-card>
              </v-col>
              <v-col cols="6" class="pa-0 ma-0">
                <v-card height="12" variant="outlined" color="black"
                        class="rounded-0 d-flex justify-center align-center">
                                      <span class="t8400">
                                         کاربر عادی 1/1
                                      </span>
                </v-card>
              </v-col>
              <v-col class="pa-0 ma-0" cols="12">
                <v-card height="12" variant="outlined" color="black"
                        class="rounded-0 d-flex justify-center align-center d--rtl">
                                      <span class="t8400 mx-1">
                                          {{ modalPrintOrderObject.receiver_name }}
                                      </span>

                  <span class="t8400 mx-1">
                                          {{ modalPrintOrderObject.receiver_mobile }}
                                      </span>
                </v-card>
              </v-col>

              <v-col cols="12" class="pa-0 ma-0">
                <v-card height="35" variant="outlined" color="black"
                        class="rounded-0 d-flex justify-center align-center pa-0">
                  <barcode
                      :barcodeValue="modalPrintOrderObject.logistic_barcode"
                      :format="'CODE128'"
                      :index="1"
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
                      <img v-if="modalPrintOrderObject.sending_method === 'tipax'" src="@/assets/img/tpax-image.png"
                           width="32" height="30" alt="post image">
                      <img v-else-if="modalPrintOrderObject.sending_method === 'nafis'"
                           src="@/assets/img/nafis-image.png" width="32" height="30" alt="post image">
                    </v-col>
                    <v-col cols="8" class="text-right pa-0">
                      <p class="t8400">
                        <span> {{ modalPrintOrderObject?.state?.label }} - </span>
                        <span> {{ modalPrintOrderObject?.city?.label }} </span>
                      </p>
                      <p class="t8400">
                        <span> {{ modalPrintOrderObject.receiver_address }} </span>
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col class="pa-0 ma-0" cols="4">
                <v-card height="22" variant="outlined" color="black"
                        class="rounded-0 d-flex justify-center align-center">
                      <span class="t8400">
                        {{ modalPrintOrderObject?.weight }}
                      </span>
                </v-card>
              </v-col>
              <v-col class="pa-0 ma-0" cols="8">
                <v-card height="22" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                        <span class="t12400" v-if="modalPrintOrderObject.sending_method === 'tipax'">
                          تیپاکس
                        </span>
                  <span class="t12400" v-else-if="modalPrintOrderObject.sending_method === 'nafis'">
                          نفیس
                        </span>
                </v-card>
              </v-col>
              <v-col class="pa-0 ma-0" cols="12">
                <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center d--rtl">
                           <span class="t8400 mx-1">
                            {{ modalPrintOrderObject.receiver_name }}
                           </span>

                  <span class="t8400 mx-1">
                            {{ modalPrintOrderObject.receiver_mobile }}
                          </span>
                </v-card>
              </v-col>
              <v-col class="pa-0 ma-0" cols="5">
                <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8400 mx-1">
                            {{modalPrintOrderObject?.date}}
                           </span>
                </v-card>
              </v-col>
              <v-col class="pa-0 ma-0" cols="3">
                <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8400 mx-1">
                          {{ modalPrintOrderObject.order_factor_id }}
                           </span>
                </v-card>
              </v-col>
              <v-col class="pa-0 ma-0" cols="4">
                <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8400 mx-1">
                         کاربر عادی 1/1
                           </span>
                </v-card>
              </v-col>
              <v-col cols="12" class="pa-0 ma-0">
                <v-card height="40" variant="outlined" color="black"
                        class="rounded-0 d-flex justify-center align-center pa-0">
                  <barcode
                      :barcodeValue="modalPrintOrderObject.logistic_barcode"
                      :format="'CODE128'"
                      :index="1"
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
import OrderPackaging from "@/composables/OrderPackaging";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {

    data() {
        return {
            modalPrintOrderObject: null,
            form: {
                id: '',
                name: '',
            },
        }
    },

    setup() {
        const {
            dataTableLength,
            page,
            header,
            loading,
            headerShps,
            orderListDetail,
            getShpssDetailLost,
            shpssDetailLost
        } = OrderPackaging();

        return {
            getShpssDetailLost,
            shpssDetailLost,
            dataTableLength,
            page,
            orderListDetail,
            header,
            loading,
            headerShps
        };
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
            AxiosMethod.end_point = `admin/order/print/label/${this.$route.params.orderId}`;
            try {
                let response = await AxiosMethod.axios_get();
                if (response) {
                    this.modalPrintOrderObject = response.data

                    setTimeout(() => {
                        let myElement = document.getElementById('printableArea-order');
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
