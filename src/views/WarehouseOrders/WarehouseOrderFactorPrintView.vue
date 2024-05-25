<script setup>
import {defineAsyncComponent} from "vue";
const WarehouseOrderPrntFactor = defineAsyncComponent(()=> import ('@/components/WarehouseOrderList/WarehouseOrderPrntFactor.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh">
      <WarehouseOrderPrntFactor />
    </v-main>
  </v-layout>
</template>
