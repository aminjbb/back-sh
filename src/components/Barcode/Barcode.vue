<template>
  <div class="barcode-container">
    <svg :id="'barcode-'+index"></svg>
    <div class="barcode-text" v-html="text"></div>
  </div>
</template>

<script>

import JsBarcode from "jsbarcode";

export default {
  props: {
    barcodeValue: [Number, String],
    format: String,
    index: Number,
    text: String
  },
  mounted() {
    let settings = {
      format: this.format,
    };
    JsBarcode("#barcode-" + this.index, this.barcodeValue, settings);
  }

}
</script>

<style scoped>
svg {
  width: 160px !important;
}
.barcode-container {
  position: relative;
}

.barcode-text {
  position: absolute;
  top: 100px; /* Adjust this value according to your needs. */
  width: 100%;
  text-align: right;
  font-size: 5px;
}
</style>