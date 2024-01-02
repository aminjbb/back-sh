<template>
  <v-card class="h-100 width-100 position__relative">
    <div class="d-flex justify-space-between align-center">
      <div class="pa-3 d-flex">
        <HandheldDrawer/>
        <span class="t20400">
         جمع آوری کالا
        </span>
      </div>
      <div class="pa-3">
        <v-icon size="30">
          mdi-chevron-left
        </v-icon>
      </div>
    </div>

    <v-card class="ma-5 br-15" min-height="196">
      <div class="d-flex justify-center my-3">
          <span class="t20400">
            جایگاه کالا
          </span>
      </div>
      <v-divider/>
      <div v-if="isPlacement">
        <div class="text-right my-5 px-5 d-flex justify-space-between px-10">
          <div>
           <span class="t16400">
           شماره ردیف :
            <span class="text-gray600 number-font">
              ۳۴
            </span>
          </span>
          </div>
          <div>
          <span class="t16400">
           شماره قفسه  :
            <span class="text-gray600 number-font">
              ۳۴
            </span>
          </span>
          </div>
        </div>
        <div class="text-right mt-10 px-5 d-flex justify-space-between px-10">
          <div>
           <span class="t16400">
           شماره طبقه :
            <span class="text-gray600 number-font">
               ۳۴
            </span>
          </span>
          </div>
          <div>
          <span class="t16400">
           شماره شلف   :
            <span class="text-gray600 number-font">
             ۳۴
            </span>
          </span>
          </div>
        </div>
      </div>
      <div v-else class=" pt-8 px-10 text-center">
        <span class="t16400">
          برای مشخص شدن اطلاعات جایگاه، شناسه شلف را اسکن کنید.
        </span>
      </div>
    </v-card>
    <div class="scan_box">
      <div>
        <div class="px-5">
          <v-card class="mt-2 py-5">
            <div class="d-flex justify-center">
              <img src="@/assets/img/productImge.png" width="150" height="150" alt="">
            </div>
            <div class="text-center my-2">
              <span class="t16400">
                پرایم
              </span>
            </div>
            <div class="text-center px-10 my-3">
              <span class="text-gray600">
                سرم روشن کننده پوست پرایم مدل C_Prime ظرفیت ۳۰ میلی لیتر
              </span>
            </div>
          </v-card>
        </div>
      </div>
    </div>
    <v-card-actions>
      <v-row justify="center">
        <v-col cols="10">
          <v-btn
              color="primary500"
              height="40"
              width="348"
              variant="flat"
              rounded
              class="px-8 mt-2">
            اسکن شناسه شلف
          </v-btn>
        </v-col>

      </v-row>
    </v-card-actions>
    <!--    <LocatingToast/>-->
  </v-card>
</template>
<script>
import LocatingToast from '@/components/PackagePlacement/Locating/LocatingToast.vue'
import Placement from '@/composables/Placement'
import Sku from '@/composables/Sku'
import {AxiosCall} from "@/assets/js/axios_call";
import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";

export default {
  setup() {
    const {getPlacement, placement} = new Placement()
    const {getShpssDetail, shpssDetail} = new Sku()
    return {
      getPlacement, placement,
      getShpssDetail, shpssDetail
    }
  },
  data() {
    return {
      error: true,
      qrCode: '',
      shpssBarCode: '',
      isPlacement: false
    }
  },

  mounted() {
    // this.getPlacement(this.$route.params.placementId)
    var element = document.body // You must specify element here.
    element.addEventListener('keydown', e => {
      if (e.key == 'Enter') this.scanQrCode()
      else this.qrCode += e.key
    });
  },

  methods: {
    scanQrCode() {
      this.shpssBarCode = this.qrCode
      this.qrCode = ''
      this.getShpssDetail(this.shpssBarCode)
    },
    async locateShpssToPlace() {
      const AxiosMethod = new AxiosCall()
      const formData = new FormData()
      formData.append('placement_id', this.$route.params.placementId)
      formData.append('package_id', this.$route.params.packageId)
      formData.append('barcode', this.shpssBarCode)
      AxiosMethod.using_auth = true
      AxiosMethod.token = cookies.cookies.get('adminToken')
      AxiosMethod.end_point = 'shps/item/place/'
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.checkCount()
      }
    },
    checkCount() {
      if (this.shpssDetail.shps_count < this.placeCount) ++this.placeCount
      else this.placeCount = 0
    }
  },

  components: {
    HandheldDrawer,
    LocatingToast
  }
}
</script>

<style>
.scan_box {
  height: calc(100% - 390px);

}
</style>