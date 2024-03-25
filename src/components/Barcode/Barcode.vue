<template>
  <div class="barcode-container">
    <div class="barcode-text" :style="'font-size:'+fontSize+'px'" v-html="text"></div>
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
  },
  data() {
    return {
      fontSize: 12
    }
  },
  mounted() {
    if (this.text.length >= 30) {
      this.fontSize = 6
    }
    let settings = {
      format: this.format,
      textAlign: 'rif',
      textPosition: 'top',
      fontOptions: 'bold',
      fontSize: 18,
      textMargin: 8,
      height: 70
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
}
</style>