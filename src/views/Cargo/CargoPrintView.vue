<script setup>
import {defineAsyncComponent} from "vue";
const PrintCargo = defineAsyncComponent(()=> import ('@/components/Cargo/Print/PrintCargo.vue'))
</script>

<template>
  <v-layout class="bg-gray">

    <v-main class="h-100vh">
      <PrintCargo/>
    </v-main>
  </v-layout>
</template>

