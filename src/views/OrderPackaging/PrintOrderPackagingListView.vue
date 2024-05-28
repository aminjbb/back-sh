<script setup>
import {defineAsyncComponent} from "vue";
const PrintOrder = defineAsyncComponent(()=> import ('@/components/OrderPackaging/Print/PrintOrder.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main >
      <PrintOrder />
    </v-main>
  </v-layout>
</template>
