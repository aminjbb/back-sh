<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import InitialBulkLabelPrint from '@/components/BulkLabelPrint/InitialBulkLabelPrintList.vue'
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

