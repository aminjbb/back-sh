<script setup>
import {defineAsyncComponent} from "vue";
const WarehouseOrderSorting = defineAsyncComponent(()=> import ('@/components/WarehouseOrderList/WarehouseOrderSorting.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh ">
      <div class="d-flex justify-center align-center h-100vh">
        <WarehouseOrderSorting />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
