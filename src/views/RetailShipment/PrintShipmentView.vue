<script setup>

import {defineAsyncComponent} from "vue";
const PrintShipmentDetail = defineAsyncComponent(()=> import ('@/components/RetailShipment/Print/PrintShipmentDetail.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main >
      <PrintShipmentDetail />
    </v-main>
  </v-layout>
</template>
