<template>
  <div class="loading_modal" v-if="loading">
    <v-progress-circular
        indeterminate
        color="purple"
    ></v-progress-circular>
  </div>
  <template v-if="!hasTask && !showError && !doneTask">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20 w400">
       جابه‌جایی کالا
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30" @click="scanShelf =false">
          mdi-chevron-left
        </v-icon>
      </div>

    </div>
    <div class="vh-80 d-flex align-center justify-center">
      <div>
        <div class="d-flex justify-center">
          <v-icon color="black" size="30">
            mdi-barcode-scan
          </v-icon>
        </div>
        <div class=" mt-8 d-flex justify-center px-5 text-center">
          <span class="text-black t20 w400">
        شناسه کالا را اسکن کنید.
          </span>
        </div>

        <div class=" mt-3 d-flex justify-center px-5 text-center">
          <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="scanQrCode()" v-model="shpssBarCode"
                        variant="outlined" :autofocus="true"/>
          <v-text-field v-else @keyup.enter="scanQrCode()" v-model="shpssBarCode" variant="outlined" :autofocus="true"/>
        </div>
        <div>
          <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
        </div>
      </div>
    </div>
    <div class="d-flex justify-center">
      <v-col cols="10">
        <v-btn @click="scanQrCode()" block color="primary500" rounded>
          <span class="t16 w500">
            تایید
          </span>
        </v-btn>
      </v-col>
    </div>
  </template>

  <template v-else-if="hasTask && !showShps&& !showError&& !doneTask">
    <v-card class="h-screen">
      <div class="d-flex justify-space-between align-center">
        <div class="pa-3 d-flex">
          <HandheldDrawer/>
          <span class="t20 w400">
         جابه‌جایی کالا
        </span>
        </div>
        <div class="pa-3">
          <v-icon size="30">
            mdi-chevron-left
          </v-icon>
        </div>
      </div>
      <v-card class="mx-5 my-2 br-15" max-height="116">
        <div class="d-flex justify-center my-3">
          <span class="t12 w400">
            جایگاه کالا
          </span>
        </div>
        <v-divider/>
        <div class="text-center ">
          <span class="t16 w400  text-grey">
                      {{ shpsDetail?.placement?.shelf_number }}-{{ shpsDetail?.placement?.step_number }}-{{ shpsDetail?.placement?.placement_number }}-{{ shpsDetail?.placement?.row_number}}
          </span>
        </div>
      </v-card>
      <v-card class="mx-5 mb-1 br-15 pa-2">
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="scanQrCode" v-model="shpssBarCode"
                          variant="outlined" :autofocus="true"></v-text-field>
            <v-text-field v-else @keyup.enter="scanQrCode()" :autofocus="true" v-model="shpssBarCode"
                          variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="6">
            <div>
              <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
            </div>
          </v-col>

        </v-row>
      </v-card>
      <div class="scan_box mb-10">
        <div>
          <div class="px-5">
            <v-card min-height="92" class="d-flex justify-center align-center">
              <v-card class="ml-5 br br--12 d-flex justify-center align-center" height="52" width="52"
                      color="primary500">
            <span class="text-white number-font">
              {{shpsDetail?.count}}
            </span>
              </v-card>
              <span class="t16 w400 text-black">عدد اسکن شده</span>
            </v-card>
            <v-card class="mt-2 py-5" height="300">
              <div class="d-flex justify-center">
                <img :src="shpsDetail?.image_url" width="100" height="100" alt="">
              </div>
              <div class="text-center px-10 my-3">
                <span class="text-gray600">
                  {{ shpsDetail.sku_title }}
                </span>
              </div>
              <div class="text-center px-10 my-3">
                <span class="text-gray600">
                 {{ shpsDetail?.shps }}
                </span>
              </div>
            </v-card>

          </div>
        </div>
      </div>
      <div class="position-absolute bottom-0 w-100 mb-5">
        <v-row justify="center">
          <v-col cols="10">
            <v-btn @click="showShpssList()" block color="primary500" rounded>
               <span class="t16 w500">
                  نمایش کالا
               </span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </template>

  <template v-else-if="showShps && !scanShelf && !showError&& !doneTask">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20 w400">
        کالاهای اسکن شده
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30" @click="showShps =false">
          mdi-chevron-left
        </v-icon>
      </div>

    </div>
    <div>
      <div class="d-flex justify-center">
        <v-col cols="12">
          <v-text-field v-model="searchItem" placeholder="جستجوی شناسه کالا" variant="solo-filled" prepend-inner-icon="mdi-magnify"></v-text-field>
        </v-col>
      </div>
    </div>

    <div>
      <v-card class="br--12 mx-3">
        <div v-for="(shps , index) in searchedItem">
          <v-row justify="start" align="center" class="px-2 my-2" >
            <v-col cols="1">
              <div>
                <img :src="shps?.image_url" width="24" height="24">
              </div>
            </v-col>
            <v-col cols="11">
              <div class="d-flex justify-space-between">

                <div>
                  <div><span class="t12 w500"> جایگاه کالا :</span></div>
                  <div><span class="t12 w500 text-gray700">۱-۲-۳-۲</span></div>
                </div>
                <div>
                  <div><span class="t12 w500">شناسه کالا :</span></div>
                  <div><span class="t12 w500 text-gray700">{{ shps?.shps }}</span></div>
                </div>
                <div>
                  <div><span class="t12 w500">تعداد کالا :</span></div>
                  <div><span class="t12 w500 text-gray700">{{ shps?.count }}</span></div>
                </div>
              </div>
              <div><span class="t12 w500 text-gray500">{{ shps?.sku_title }}</span></div>
            </v-col>
          </v-row>
          <v-divider/>
        </div>

      </v-card>
    </div>
    <v-bottom-navigation class="pa-0" height="80">
      <div class="d-flex justify-center">
        <v-col cols="10">
          <v-row justify="center">
            <v-card @click="scanShelf=true" color="primary500"
                    class="br--12 mt-5 d-flex justify-center align-center rounded-pill	" width="300" height="42">
                  <span class="t16 w500">
                    اسکن شلف مقصد
                  </span>
            </v-card>
          </v-row>
        </v-col>
      </div>
    </v-bottom-navigation>

  </template>

  <template v-else-if="scanShelf && !showError&& !doneTask">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20 w400">
       جابه‌جایی کالا
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30" @click="scanShelf =false">
          mdi-chevron-left
        </v-icon>
      </div>

    </div>
    <div class="vh-80 d-flex align-center justify-center">
      <div>
        <div class="d-flex justify-center">
          <v-icon color="black" size="30">
            mdi-barcode-scan
          </v-icon>
        </div>
        <div class=" mt-8 d-flex justify-center px-5 text-center">
          <span class="text-black t20 w400">
         شناسه شلف را اسکن کنید.
          </span>
        </div>

        <div class=" mt-3 d-flex justify-center px-5 text-center">
          <v-text-field v-if="autoSend === 'automate'" v-debounce:150ms="placementScan" v-model="placementBarcode"
                        variant="outlined" :autofocus="true"/>
          <v-text-field v-else @keyup.enter="placementScan()" v-model="placementBarcode" variant="outlined"
                        :autofocus="true"/>
        </div>
        <div>
          <v-switch label="اتوماتیک؟" true-value="automate" false-value="manual" v-model="autoSend"></v-switch>
        </div>
      </div>
    </div>
    <div class="d-flex justify-center">
      <v-col cols="10">
        <v-btn block color="primary500" rounded>
          <span class="t16 w500">
            تایید
          </span>
        </v-btn>
      </v-col>
    </div>
  </template>
  <template v-else-if="showError && !doneTask">
    <div class="h-screen bg-scanError d-flex justify-center align-center" >
      <div class=" text-center mx-10">
        <v-icon size="40">
          mdi-close-circle
        </v-icon>
        <div class="mt-15 t20 w700">
          امکان اسکن بارکد کالا وجود ندارد.
        </div>
        <div class="mt-4 t20 w400">
          {{errorMassage }}
        </div>
      </div>

      <div class="px-15 d-flex justify-center t16 w500" style="  position: absolute; bottom: 30px; left: 0;right: 0;">
        <v-btn
            height="40"
            flat
            block
            rounded
            @click="window.location.reload()"
            class="px-8 mt-5 me-3">
          تلاش مجدد
        </v-btn>
      </div>
    </div>

  </template>
  <template v-else-if="!showError && doneTask">
    <div class="h-screen bg-success d-flex  justify-center align-center">
      <div>
        <div class="d-flex justify-center">
          <v-icon color="succes" size="30">
            mdi-check-circle
          </v-icon>
        </div>
        <div class="text-center mt-15">
            <span class="t20 w700">
           جا‌به‌جایی کالا با موفقیت انجام شد.
          </span>
        </div><div class="text-center mt-4">
            <span class="t20 w400">
          کالاها با موفقیت به شلف {{ placementBarcode }} منتقل شدند.
          </span>
        </div>
        <div class="px-5 d-flex justify-center " style="  position: absolute; bottom: 8px; left: 0;right: 0;">
          <v-btn
              color="white"
              height="40"
              width="348"
              rounded
              variant="outlined"
              @click="$router.push('/locating/dashboard')"
              class="px-8 mt-5">
            بازگشت به داشبورد
          </v-btn>

        </div>
      </div>

    </div>

  </template>

</template>

<script>
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";
import axios from "axios";
import {id} from "vuetify/locale";

export default {
  components: {HandheldDrawer},
  data() {
    return {
      loading: false,
      hasTask: false,
      autoSend: true,
      shpssBarCode: null,
      showShps: false,
      scanShelf: false,
      placementBarcode: null,
      scannedList: [],
      errorMassage: '',
      shpsDetail:null,
      searchItem:null,
      showError:false,
      doneTask:false
    }
  },

  methods: {
    async scanQrCode() {
      this.loading = true
      await axios
          .post(`${import.meta.env.VITE_API_BASEURL}/v1/warehouse/relocate/scan/item`,
              {
                shpss_barcode: this.shpssBarCode

              },
              {
                headers: {
                  Authorization:
                      "Bearer " + this.$cookies.get('adminToken')
                },
              })
          .then((response) => {

          }).catch((err) => {
            this.openToast(this.$store , err.response.data.message , 'error')
              this.errorMassage = err.response.data.message
          }).finally(()=>{
            this.loading = false
          })
    },

    async  placementScan() {
      this.loading = true
      await axios
          .post(`${import.meta.env.VITE_API_BASEURL}/v1/warehouse/relocate/transfer`,
              {
                placement_barcode: this.placementBarcode
              },
              {
                headers: {
                  Authorization:
                      "Bearer " + this.$cookies.get('adminToken')
                },
              })
          .then((response) => {
            this.doneTask = true
          }).catch((err) => {
            this.showError = true
            this.errorMassage = err.response.data.message
          }).finally(()=>{
            this.loading = false
          })
    },

    async getScannedList() {
      this.loading = true
      await axios
          .get(`${import.meta.env.VITE_API_BASEURL}/v1/warehouse/relocate/scan/item/index`, {
            headers: {
              Authorization:
                  "Bearer " + this.$cookies.get('adminToken')
            },
          })
          .then((response) => {
            this.scannedList = response.data.data
            this.allScannedList = response.data.data
            this.shpsDetail = response.data.data[response.data.data.length -1]
            if (response.data.data.length == 0) this.hasTask = false
            else this.hasTask = true

          }).catch((err) => {
            if (err.response.status === 400) this.hasTask = false
          }).finally(()=>{
            this.loading = false
          })
    },

    showShpssList(){
      this.getScannedList()
      this.showShps = true
    }
  },

  computed:{
    searchedItem(){
      const lowerCaseSearch = this.searchItem.toLowerCase();
      return this.scannedList
          .sort((a, b) => a.sku_title.localeCompare(b.sku_title))
          .filter(
              (item) =>
                  item.sku_title.toLcowerCase().includes(lowerCaseSearch)
          );
    }
  },

  mounted() {
    this.getScannedList()
  }

}
</script>