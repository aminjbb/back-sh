<template>
  <div>
    <svg width="400px" :id="'barcode-'+index"></svg>
  </div>
</template>

<script>

import JsBarcode from "jsbarcode";

export default {
  props: {
    barcodeValue: [Number, String],
    format: String,
    index: Number
  },
  mounted() {
    let settings = {
      format: this.format,
    };
    JsBarcode("#barcode-"+this.index, this.barcodeValue,settings);
  }

}
</script>
