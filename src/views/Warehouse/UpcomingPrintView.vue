<script setup>
import {defineAsyncComponent} from "vue";
const UpcomingPrintDetail = defineAsyncComponent(()=> import ('@/components/UpComing/UpcomingPrintDetail.vue'))


</script>

<template>
  <v-layout class="bg-gray">
    <v-main>
      <UpcomingPrintDetail />
    </v-main>
  </v-layout>
</template>
