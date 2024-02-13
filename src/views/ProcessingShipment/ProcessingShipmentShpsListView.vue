<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ProcessingShipmentShpsList from '@/components/ProcessingShipment/ProcessingShipmentShpsList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main  class="h-100vh">
      <Header/>
      <ProcessingShipmentShpsList/>
    </v-main>
  </v-layout>
</template>
