<script setup>
import {defineAsyncComponent} from "vue";
const InitialBulkLabelPrint = defineAsyncComponent(()=> import ('@/components/BulkLabelPrint/InitialBulkLabelPrintList.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <InitialBulkLabelPrint/>
    </v-main>
  </v-layout>
</template>

