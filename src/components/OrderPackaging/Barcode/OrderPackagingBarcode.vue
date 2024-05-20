<template>
  <div class="barcode-container">
    <svg id="barcode"></svg>
  </div>
</template>

<script>
import JsBarcode from "jsbarcode";
export default {
  props: {
    barcodeValue: [Number, String],
    format: String,
    index: Number,
    text: String,
    order:String
  },
  data() {
    return {
      fontSize: 12,
    }
  },
  mounted() {
    let settings = {
      format: this.format,
      textAlign: 'rif',
      textPosition: 'bottom',
      fontOptions: 'bold',
      fontSize: 24,
      textMargin: 1,
      height: 85,
    };
    JsBarcode("#barcode", this.barcodeValue, settings);
  }

}
</script>

<style scoped>
svg {
  width: 160px !important;
  height: 65px!important;
}

.barcode-container {
  position: relative;
}


</style>