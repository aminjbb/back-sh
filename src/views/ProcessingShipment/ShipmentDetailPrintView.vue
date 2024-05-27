<script setup>
import {defineAsyncComponent} from "vue";
const ProcessingShipmentDetailPrint = defineAsyncComponent(()=> import ('@/components/ProcessingShipment/ProcessingShipmentDetailPrint.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main >
      <ProcessingShipmentDetailPrint/>
    </v-main>
  </v-layout>


</template>
