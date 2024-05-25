<script setup>
import {defineAsyncComponent} from "vue";
const WarehouseOrderPickUp = defineAsyncComponent(()=> import ('@/components/WarehouseOrderList/WarehouseOrderPickUp.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100 ">
      <div class="vh-100 " >
        <WarehouseOrderPickUp />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
