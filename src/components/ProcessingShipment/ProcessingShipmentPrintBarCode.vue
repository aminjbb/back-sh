<template>
  <div class="text-center d--ltr" id="printableArea-shipmentBarcode">
    <v-row class="pa-0 ma-0">
      <v-col v-for="(barCode , index) in detail" cols="6" :key="'shpss-list-barcode'+index" class="pa-0 " :class="index < (detail.length - 1) ? 'mb-11' : 'mb-0'">
        <!--        <div class="d-flex justify-space-between ">-->
        <!--          <span>{{barCode?.shps?.seller?.id}}</span>-->
        <!--          <span>{{barCode?.shps?.seller?.shopping_name}}</span>-->
        <!--        </div>-->
        <!--        <div class="text-center">-->
        <!--          <img width="180" height="70" :src="basUrl + barCode.shps?.barcode_image">-->
        <!--        </div>-->
        <!--"-->
        <div class="text-center" style="font-size: 8px ;direction: rtl">
          {{ barCode?.shps?.sku?.label }}
        </div>
        <div class="text-center">
          <img width="100" height="45" :src="basUrl + barCode?.barcode_image" :alt="barCode?.barcode">
        </div>
        <!--        style="font-size: 7px"-->
        <div class="text-center" style="font-size: 8px ;direction: rtl">
          {{ barCode?.barcode }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props: {
    shipmentId: null
  },
  data() {
    return {
      dialog: false,
      detail: null,
    }
  },
  mounted() {
    this.getDetail()
  },

  methods: {

    async getDetail() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `shipment/print/barcode/${this.$route.params.shipmentId}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.detail = data.data
        setTimeout(() => {
          var myElement = document.getElementById('printableArea-shipmentBarcode');
          window.print(myElement);
        }, 1000);
      }
    },

  },

  computed: {
    basUrl() {
      return 'https://api.shvz.ir/'
    },

  }
}
</script>