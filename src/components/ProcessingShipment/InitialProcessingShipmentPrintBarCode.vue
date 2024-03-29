<template>
  <v-row class="my-0 py-0" id="printableArea-shipmentBarcode" v-if="detail">
    <v-col class="my-0 py-0" cols="6" v-for="(barCode , index) in detail" :key="'shpss-list-barcode'+index"
    >
      <div class="barcode-page" style="height: 120px">
        <barcode
            :barcodeValue="barCode.barcode"
            :format="'CODE128'"
            :index="index"
            :shps="barCode?.shps?.id"
            :text="barCode?.shps?.sku?.label.substring(0, 45)"
        ></barcode>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import Barcode from "@/components/Barcode/Barcode.vue";

export default {
  components: {Barcode},
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
      AxiosMethod.end_point = `shipment/print-initial/barcode/${this.$route.params.shipmentId}?shps=${this.$route.params.shpsId}&package_id=${this.$route.params.packageId}&placer_id=${this.$route.params.placerId}&placement_id=${this.$route.params.placementId}`
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
      return import.meta.env.VITE_API_BACKEND_URL
    },

  }
}
</script>
<style>
@media print {
  .barcode-page {
    height: 100vh !important;
    page-break-after: always;
  }
}
</style>