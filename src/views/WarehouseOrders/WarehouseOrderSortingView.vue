<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh ">
      <div class="d-flex justify-center align-center h-100vh">
        <!--        <WarehouseOrderSorting />-->
        <v-card class="h-100 width-100 position__relative">
          <div class="d-flex justify-space-between align-center">
            <div class="pa-3 d-flex">
              <HandheldDrawer/>
              <span class="t20 w400">
         سورتینگ
        </span>
            </div>
            <div class="pa-3">
              <v-icon size="30">
                mdi-chevron-left
              </v-icon>
            </div>
          </div>
          <div >
            <div class="scan_box" >
              <div>
                <div class="px-5 ">
                  <v-card class="mt-2 py-5 " variant="outlined">
                    <div class="text-center my-2">
                  <span class="t16 w400">
                    {{ skuDetail?.label }}
                  </span>
                    </div>
                    <div class="text-center px-10 my-3">
                  <span class="text-gray600">
                   {{ shpssDetail?.shps?.id }}
                  </span>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
            <v-card class="ma-5 br-15" min-height="140">
              <div class="d-flex justify-center my-3">
            <span class="t16 w400">
              جایگاه کالا
            </span>
              </div>
              <v-divider/>
              <div v-if="shpssDetail">
                <div v-if="shpssDetail?.sorting_placement">
                  <div class="text-center my-5 px-5 d-flex justify-space-between px-10">
                    <div>
              <span class="t16 w400">
               شماره شلف   :
                <span class="text-gray600 number-font">
                 {{ shpssDetail?.sorting_placement }}
                </span>
              </span>
                    </div>
                  </div>
                </div>
                <div v-else class=" pt-8 px-10 text-center">
            <span class="t14 w400">
              برای مشخص شدن اطلاعات جایگاه، شناسه شلف را اسکن کنید.
          </span>
                </div>
              </div>
              <div class="text-center" v-else>
                <v-row justify="center" align="center" class="py-3">
                  <v-col cols="6">
                    <div>
                      <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
                    </div>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="getShpssDetail" v-model="qrCode"
                                  variant="outlined" :autofocus="true"></v-text-field>
                    <v-text-field v-else @keyup.enter="getShpssDetail()" :autofocus="true" v-model="qrCode"
                                  variant="outlined"></v-text-field>
                  </v-col>

                </v-row>
              </div>
            </v-card>
            <div class="scan_box" v-if="shpssDetail">
              <div>
                <div class="px-5">
                  <v-card class="mt-2 py-5">
                    <div class="d-flex justify-center my-3">
            <span class="t16 w400">
              اسکن شلف
            </span>
                    </div>
                    <v-divider/>
                    <v-row justify="center" align="center" class="py-3">
                      <v-col cols="6">
                        <div>
                          <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSendShelf"></v-switch>
                        </div>
                      </v-col>
                      <v-col cols="10">
                        <v-text-field v-if="autoSendShelf === 'automate'" v-debounce:150ms="sortingShps" v-model="shelfBarcode"
                                      variant="outlined" :autofocus="true"></v-text-field>
                        <v-text-field v-else @keyup.enter="sortingShps()" :autofocus="true" v-model="shelfBarcode"
                                      variant="outlined"></v-text-field>
                      </v-col>

                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>

          </div>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
// import {defineAsyncComponent} from "vue";
// const WarehouseOrderSorting = defineAsyncComponent(()=> import ('@/components/WarehouseOrderList/WarehouseOrderSorting.vue'))
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import {openToast} from "@/assets/js/functions";

export default {
  data() {
    return {
      scanShps: true,
      qrCode: '',
      shpssDetail: null,
      shelfBarcode:'',
      autoSend:'automate',
      autoSendShelf:'automate',
      lastBarcode:null
    }
  },

  methods: {
    async getShpssDetail() {
      if (this.lastBarcode !== this.qrCode){
        try {
          this.lastBarcode = this.qrCode
          const AxiosMethod = new AxiosCall()
          AxiosMethod.using_auth = true
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = `warehouse/order/sorting/get-item?barcode=${this.qrCode}`
          AxiosMethod.toast_error = true
          AxiosMethod.store = this.$store
          let data = await AxiosMethod.axios_get()
          if (data) {
            this.shpssDetail = data.data
          }
          else{
            this.qrCode = ''
          }
        }
        catch (e) {
          this.qrCode = ''
        }

      }

    },
    async sortingShps() {
      if (this.lastBarcode !== this.shelfBarcode){
        try {
          this.lastBarcode = this.shelfBarcode
          const AxiosMethod = new AxiosCall()
          const formData = new FormData()
          formData.append('shps_s_barcode', this.qrCode)
          formData.append('placement_barcode', this.shelfBarcode)
          AxiosMethod.form = formData
          AxiosMethod.using_auth = true
          AxiosMethod.toast_error = true
          AxiosMethod.store = this.$store
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = `warehouse/order/sorting/put-sort`
          let data = await AxiosMethod.axios_post()
          if (data) {
            const splitShelf = this.shelfBarcode.split('-')
            openToast(this.$store , `در جایگاه ${splitShelf[1]} قرار گرفت`, 'success')
            this.shpssDetail = null
            this.shelfBarcode = ''
            this.qrCode = ''
          }
          else {
            this.shelfBarcode = ''
          }
        }
        catch (e) {
          this.shelfBarcode = ''
        }

      }

    },
  },

  components: {
    HandheldDrawer,
    LocatingToast
  },

  computed: {
    skuDetail() {
      try {
        return this.shpssDetail.shps.sku?.sku
      } catch (e) {

      }
    }
  }
}

</script>

<style>
.scan_box {
  height: calc(100% - 390px);
}
</style>
