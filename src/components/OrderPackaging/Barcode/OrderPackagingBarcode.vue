<template>
  <div class="barcode-container">
    <svg :id="'barcode-'+index"></svg>
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
      fontSize: 14,
      textMargin: 1,
      height: 56,
    };
    JsBarcode("#barcode-" + this.index, this.barcodeValue, settings);
  }

}
</script>

<style scoped>
svg {
  width: 100% !important;
  height: 100px!important;
}

.barcode-container {
  position: relative;
  width: 100%;
}


</style>