<template>
  <v-row id="printableArea-shipmentBarcode" class="custom-margin-bottom">
    <v-col v-for="(barCode , index) in detail" cols="6" :key="'shpss-list-barcode'+index" class="text-center">
      <img class="px-2" style="width: 35mm ; height: 11mm" :src="basUrl + barCode?.barcode_image"
           :alt="barCode?.barcode">
      <br>
      <span style="font-size: 8px">
                              {{ barCode?.shps?.sku?.label.substring(0, 20) }}
        </span>
      <br>
      <span style="font-size: 8px">
                              {{ barCode?.barcode }}
        </span>

      <!--        <div class="d-flex justify-space-between ">-->
      <!--          <span>{{barCode?.shps?.seller?.id}}</span>-->
      <!--          <span>{{barCode?.shps?.seller?.shopping_name}}</span>-->
      <!--        </div>-->
      <!--        <div class="text-center">-->
      <!--          <img width="180" height="70" :src="basUrl + barCode.shps?.barcode_image">-->
      <!--        </div>-->
      <!--"-->
      <!--        <v-row>-->
      <!--          <v-col cols="12" class="py-0">-->
      <!--          </v-col>-->
      <!--          <v-col class="py-0" cols="12" style="font-size: 5px">-->
      <!--            {{ barCode?.shps?.sku?.label }}-->
      <!--          </v-col>-->
      <!--          <v-col class="py-0" cols="12" style="font-size: 5px">-->
      <!--            {{ barCode?.barcode }}-->
      <!--          </v-col>-->
      <!--        </v-row>-->
    </v-col>
  </v-row>
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
          myElement.style.marginBottom = this.detail.length * 0.9 + 'mm'
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
<style>
.custom-margin-bottom {
}
</style>