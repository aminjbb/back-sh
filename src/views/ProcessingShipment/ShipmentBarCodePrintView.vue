<script setup>
import {defineAsyncComponent} from "vue";
const ProcessingShipmentPrintBarCode = defineAsyncComponent(()=> import ('@/components/ProcessingShipment/ProcessingShipmentPrintBarCode.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main >
      <ProcessingShipmentPrintBarCode/>
    </v-main>
  </v-layout>


</template>
