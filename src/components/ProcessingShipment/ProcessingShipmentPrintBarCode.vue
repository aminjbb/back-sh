<template>
  <div class="barcode-label-container" id="printableArea-shipmentBarcode">
    <v-row v-for="(barCode, index) in detail" :key="'shpss-list-barcode'+index" class="barcode-label">
      <v-col cols="12">
        <div class="barcode-sku">
          {{ barCode?.shps?.sku?.label }}
        </div>
        <div class="barcode-image">
          <img :src="baseUrl + barCode?.barcode_image" :alt="barCode?.barcode">
        </div>
        <div class="barcode-value">
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
    baseUrl() {
      return 'https://api.shvz.ir/'
    },

  }
}
</script>
<style scoped>
.barcode-label-container {
  display: flex;
  flex-direction: column;
}

.barcode-label {
  height: 140mm;
  width: 35mm;
  margin-bottom: 10mm;
}

.barcode-sku, .barcode-image, .barcode-value {
  text-align: center;
}

.barcode-image > img {
  width: 100%;
  height: auto;
}
</style>