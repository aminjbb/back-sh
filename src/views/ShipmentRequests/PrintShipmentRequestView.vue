<script setup>
import {defineAsyncComponent} from "vue";
const PrintShipmentRequest = defineAsyncComponent(()=> import ('@/components/ShipmentRequests/Print/PrintShipmentRequest.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main >
      <PrintShipmentRequest />
    </v-main>
  </v-layout>
</template>
