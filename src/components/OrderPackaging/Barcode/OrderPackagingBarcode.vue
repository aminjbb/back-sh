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
      width: 4,
      height: 100

    };
    JsBarcode("#barcode", this.barcodeValue, settings);
  }

}
</script>

<style scoped>
svg {
  width: 90% !important;
  height: 65px!important;
}

.barcode-container {
  display: flex;
  justify-content: center;
  position: relative;
}

.barcode-text {
  position: absolute;
  top: 65px; /* Adjust this value according to your needs. */
  width: 100%;
  text-align: right;
}
</style>