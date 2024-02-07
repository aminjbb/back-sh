<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import UpComingShipment from '@/components/UpComing/Shipment/UpComingShipment.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main  class="h-100vh">
      <Header/>
      <UpComingShipment/>
    </v-main>
  </v-layout>


</template>
