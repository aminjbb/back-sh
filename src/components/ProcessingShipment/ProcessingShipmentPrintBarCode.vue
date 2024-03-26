<template>
  <div>
    <v-row class="my-0 py-0" id="printableArea-shipmentBarcode" v-if="detail">
      <v-col cols="6" v-for="(barCode , index) in detail" :key="'shpss-list-barcode'+index" class="text-center my-0 py-0">
        <barcode
            :barcodeValue="barCode.barcode"
            :format="'CODE128'"
            :index="index"
            :text="barCode?.shps?.sku?.label.substring(0, 90)"
        ></barcode>
        <br>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import Barcode from "@/components/Barcode/Barcode.vue";

export default {
  props: {
    shipmentId: null
  },
  components: {
    Barcode,
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
      AxiosMethod.end_point = `shipment/print/barcode/${this.$route.params.shipmentId}?shps=${this.$route.params.shpsId}&package_id=${this.$route.params.packageId}`
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
.custom-margin-bottom {
}
</style>