<script setup>
import {defineAsyncComponent} from "vue";
const PrintShipmentRequestDetail = defineAsyncComponent(()=> import ('@/components/ShipmentRequests/Print/PrintShipmentRequestDetail.vue'))


</script>

<template>
  <v-layout class="bg-gray">
    <v-main >
      <PrintShipmentRequestDetail />
    </v-main>
  </v-layout>
</template>
