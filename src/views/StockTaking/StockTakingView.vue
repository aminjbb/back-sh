<script setup>
import {defineAsyncComponent} from "vue";
const StockTaking = defineAsyncComponent(()=> import ('@/components/StockTaking/StockTaking.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh">
      <div class="h-100vh">
        <StockTaking />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
