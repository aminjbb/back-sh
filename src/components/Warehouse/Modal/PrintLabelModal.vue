<template>
  <div class="text-right">
    <v-btn
        @click="openModal()"
        color="primary500"
        height="40"
        rounded
        class="px-8">
      تایید
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="468">
      <v-card>
        <header class="modal__header d-flex justify-center align-center">
                <span class="t16400 pa-6">
                    پرینت برچسب
                </span>

          <v-btn
              class="modal__header__btn"
              @click="closeModal()"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div class="mt-2 mb-2 px-5">
          <v-divider/>
        </div>

        <div :id="`printableArea-${barcode}`">
          <div style="display: flex ; justify-content: center; align-items: center" class="ma-5">

            <div style="text-align: center" v-if="shpssDetail">
              <barcode

                  :barcodeValue="barcode"
                  :format="'CODE128'"
                  :index="1"
                  :shps="shpssDetail?.shps?.id"
                  :text="shpssDetail?.shps?.sku?.sku?.label.substring(0, 45)"
              >

              </barcode>
              <span>
                  {{shpssDetail?.shps?.sku?.sku?.label.substring(0, 45)}}
              </span>
            </div>
            <div class="text-center" v-else-if="placementDetail">
              <barcode
                  :barcodeValue="barcode"
                  :format="'CODE128'"
                  :index="1"
                  text=""
              >
              </barcode>
              <div style="display: flex;justify-content: center;margin: 14px;">
                <div>
                  <div class="text-right my-2 px-5 d-flex justify-space-between px-10">
                    <div>
                                    <span class="t12 w400">
                                        شماره ردیف :
                                        <span class="t12 w400 text-gray600 number-font">
                                            {{ placementDetail?.row_number }}
                                        </span>
                                    </span>
                    </div>
                    <div>
                                    <span class="t12 w400">
                                        شماره قفسه :
                                        <span class=" t12 w400 text-gray600 number-font">
                                            {{ placementDetail?.placement_number }}
                                        </span>
                                    </span>
                    </div>
                  </div>
                  <div class="text-right  px-5 d-flex justify-space-between px-10">
                    <div>
                                    <span class="t12 w400">
                                        شماره طبقه :
                                        <span class=" t12 w400 text-gray600 number-font">
                                            {{ placementDetail?.step_number }}
                                        </span>
                                    </span>
                    </div>
                    <div>
                                    <span class="t12 w400">
                                        شماره شلف :
                                        <span class=" t12 w400 text-gray600 number-font">
                                            {{ placementDetail?.shelf_number }}
                                        </span>
                                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <barcode
                v-else
                :barcodeValue="barcode"
                :format="'CODE128'"
                :index="1"
                text=""
            >
            </barcode>

          </div>
        </div>

        <div class="mt-3 mb-3 px-5">
          <v-divider/>
        </div>

        <v-row
            justify="space-between"
            align="center"
            class="pb-4 ma-0">
          <v-col cols="6" class="">
            <div class="text-left">
              <v-btn
                  @click="print()"
                  color="white"
                  height="40"
                  rounded
                  class="px-5 mt-1 mr-5">
                پرینت برچسب
              </v-btn>
            </div>
          </v-col>

          <v-col cols="6" class="text-right">
            <v-btn
                @click="closeModal()"
                variant="text"
                height="40"
                rounded
                class="px-5 mt-1 mr-5">
              انصراف
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  AxiosCall
} from '@/assets/js/axios_call.js'

import {
  openToast
} from '@/assets/js/functions.js'
import Barcode from "@/components/OrderPackaging/Barcode/OrderPackagingBarcode.vue";

export default {
  components: {Barcode},

  data() {
    return {
      dialog: false,
      data: null,
      url: import.meta.env.VITE_API_BASEURL2,
      shpssDetail: null,
      placementDetail: null,

    }
  },

  props: {
    barcode: null
  },

  methods: {
    openModal() {
      if (this.barcode.includes('-')) {
        const barcodeSplit = this.barcode.split('-')
        if (barcodeSplit[0] == 2) this.getShpssDetail()
        else if (barcodeSplit[0] == 5) this.getPlacementDetail()
        else this.dialog = true
      }
      else {
        this.dialog = true
      }
    },

    closeModal() {
      this.dialog = false;
    },

    /**
     * get Detail shpss barcode
     */
    async getShpssDetail() {
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shps/item/detail?barcode=${this.barcode}`;
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      const data = await AxiosMethod.axios_get()
      if (data) {
        this.shpssDetail = data?.data
        console.log(this.shpssDetail , 'this.shpssDetail')
        this.dialog = true
      }
    },
    /**
     * get Detail placement barcode
     */
    async getPlacementDetail() {
      const AxiosMethod = new AxiosCall();
      AxiosMethod.using_auth = true;
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `placement/crud/get-barcode?barcode=${this.barcode}`;
      AxiosMethod.store = this.$store
      AxiosMethod.toast_error = true
      const data = await AxiosMethod.axios_get()
      if (data) {
        this.placementDetail = data?.data
        this.dialog = true
      }
    },

    /**
     * Print barcode
     */
    print() {
      const printWindow = window.open('about:blank', '_blank');
      printWindow.document.write(document.getElementById(`printableArea-${this.barcode}`).innerHTML)
      printWindow.print();
    },
  }
}
</script>
