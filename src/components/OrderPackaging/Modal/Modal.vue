<template>
  <div class="text-right ">
    <v-dialog v-model="dialog" width="700">
      <v-card class="">
        <v-row
            justify="space-between"
            align="center"
            class="pa-1 my-2">
          <v-col class="mx-10" cols="2">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" class="t16 w400 ">
            پرینت برچسب سفارش
          </v-col>
        </v-row>
        <v-divider class="spacing--mr-auto" style="width: 80%;"/>
        <div class=" px-5">
          <div>
            <div class=" mt-10 d-flex justify-center ">
              <v-card height="199" width="227" class="rounded-0">
                <v-row v-if="modalPrintOrderObject.sending_method === 'post'" justify="center" align="center"
                       class="pa-3">
                  <v-col class="pa-0 ma-0" cols="3">
                    <v-card height="30" variant="outlined" color="black" class="rounded-0">

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
                                      <span class="t8 w400">
                                      </span>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="12">
                    <v-row justify="center" class="pa-3">
                      <v-col cols="3" class="pa-0 ma-0">
                        <v-card height="24" variant="outlined" color="black"
                                class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8 w400">
                                              </span>
                        </v-card>
                      </v-col>
                      <v-col cols="9">
                        <v-row justify="center">
                          <v-col cols="6" class="pa-0 ma-0">
                            <v-card height="12" variant="outlined" color="black"
                                    class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8 w400 d--rtl">
                                               گرم {{ modalPrintOrderObject?.weight }}
                                              </span>
                            </v-card>
                          </v-col>
                          <v-col cols="6" class="pa-0 ma-0">
                            <v-card height="12" variant="outlined" color="black"
                                    class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8 w400">
                                               {{ modalPrintOrderObject?.state?.label }}
                                              </span>
                            </v-card>
                          </v-col>
                          <v-col cols="6" class="pa-0 ma-0">
                            <v-card height="12" variant="outlined" color="black"
                                    class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8 w400">
                                              </span>
                            </v-card>
                          </v-col>
                          <v-col cols="6" class="pa-0 ma-0">
                            <v-card height="12" variant="outlined" color="black"
                                    class="rounded-0 d-flex justify-center align-center">
                                              <span class="t8 w400">
                                               {{ modalPrintOrderObject?.date }}
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
                        <span class="t8 w400">{{ modalPrintOrderObject.receiver_address }} : آدرس</span>
                      </p>
                      <p>
                        <span class="t8 w400">  {{ modalPrintOrderObject.receiver_postal_code }} : کدپستی</span>
                      </p>
                    </v-card>
                  </v-col>

                  <v-col cols="6" class="pa-0 ma-0">
                    <v-card height="12" variant="outlined" color="black"
                            class="rounded-0 d-flex justify-center align-center">
                                      <span class="t8 w400">
                                         {{ modalPrintOrderObject?.order_factor_id }}
                                      </span>
                    </v-card>
                  </v-col>
                  <v-col cols="6" class="pa-0 ma-0">
                    <v-card height="12" variant="outlined" color="black"
                            class="rounded-0 d-flex justify-center align-center">
                                      <span class="t8 w400">
                                         کاربر عادی 1/1
                                      </span>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="12">
                    <v-card height="12" variant="outlined" color="black"
                            class="rounded-0 d-flex justify-center align-center d--rtl">
                                      <span class="t8 w400 mx-1">
                                          {{ modalPrintOrderObject.receiver_name }}
                                      </span>

                      <span class="t8 w400 mx-1">
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
                          <p class="t8 w400">
                            <span> {{ modalPrintOrderObject?.state?.label }} - </span>
                            <span> {{ modalPrintOrderObject?.city?.label }} </span>
                          </p>
                          <p class="t8 w400">
                            <span> {{ modalPrintOrderObject.receiver_address }} </span>
                          </p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="4">
                    <v-card height="22" variant="outlined" color="black"
                            class="rounded-0 d-flex justify-center align-center">
                      <span class="t8 w400">
                        {{ modalPrintOrderObject?.weight }}
                      </span>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="8">
                    <v-card height="22" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                        <span class="t12 w400" v-if="modalPrintOrderObject.sending_method === 'tipax'">
                          تیپاکس
                        </span>
                      <span class="t12 w400" v-else-if="modalPrintOrderObject.sending_method === 'nafis'">
                          نفیس
                        </span>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="12">
                    <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center d--rtl">
                           <span class="t8 w400 mx-1">
                            {{ modalPrintOrderObject.receiver_name }}
                           </span>

                      <span class="t8 w400 mx-1">
                            {{ modalPrintOrderObject.receiver_mobile }}
                          </span>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="5">
                    <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8 w400 mx-1">
                            {{modalPrintOrderObject?.date}}
                           </span>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="3">
                    <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8 w400 mx-1">
                          {{ modalPrintOrderObject.order_factor_id }}
                           </span>
                    </v-card>
                  </v-col>
                  <v-col class="pa-0 ma-0" cols="4">
                    <v-card height="12" variant="outlined" color="black" class="rounded-0 d-flex justify-center">
                           <span class="t8 w400 mx-1">
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
          <v-row class="justify-between my-2 mx-2">

            <v-col cols="3" class="d-flex mx-10 ">
              <v-btn
                  @click="print()"
                  height="40"
                  rounded
                  variant="flat"
                  class="px-5 mt-1 border ">
                <template v-slot:prepend>
                  <v-icon>mdi-printer-outline</v-icon>
                </template>
                پرینت برچسب
              </v-btn>
              <span>

                                                    </span>
            </v-col>
            <v-col cols="3" class="d-flex justify-end mx-10">
              <btn
                  class="mt-3 mr-2"
                  @click="close()"
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

import OrderPackaging from "@/composables/OrderPackaging";
import Barcode from "@/components/OrderPackaging/Barcode/OrderPackagingBarcode.vue";


export default {
  components: {Barcode},
  props: {
    orderId: null
  },
  data() {
    return {
      form: {

        id: '',
        name: '',

      },
    }
  },


  setup() {


    const {

      orderList,
      dataTableLength,
      page,
      header,
      loading,
      headerShps,
      orderListDetail,
      getShpssDetailLost,
      shpssDetailLost,
      getShpsList
    } = OrderPackaging();

    return {
      orderList,
      getShpssDetailLost,
      shpssDetailLost,
      dataTableLength,
      orderListDetail,
      page,
      header,
      loading,
      headerShps,
      getShpsList
    };
  },


  methods: {
    print() {
      // this.close()
      window.open(`${import.meta.env.VITE_API_SITEURL}order-packaging/${this.orderId}/print`, '_blank');

    },
    close() {
      const form = {
        dialog: false,
        object: ''
      }
      this.$store.commit('set_modalPrintOrder', form)
    },
  },
  watch: {
    'form.selectedItems': function (newVal, oldVal) {
      console.log('Selected Items Changed:', newVal)
    }
  },


  computed: {


    modalPrintOrderObject() {
      const data = this.$store.getters['get_modalPrintOrderObject'];
      return data;
    },


    dialog() {
      return this.$store.getters['get_modalPrintOrder']
    },

  }
}
</script>

<style>


</style>
