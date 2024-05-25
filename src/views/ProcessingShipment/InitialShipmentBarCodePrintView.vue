<script setup>

import {defineAsyncComponent} from "vue";
const InitialProcessingShipmentPrintBarCode = defineAsyncComponent(()=> import ('@/components/ProcessingShipment/InitialProcessingShipmentPrintBarCode.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main >
      <InitialProcessingShipmentPrintBarCode/>
    </v-main>
  </v-layout>


</template>
