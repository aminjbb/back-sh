<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ProcessingShipmentIndex from '@/components/ProcessingShipment/ProcessingShipmentIndex.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <ProcessingShipmentIndex/>
    </v-main>
  </v-layout>


</template>
