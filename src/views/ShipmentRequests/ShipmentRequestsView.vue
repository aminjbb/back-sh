<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ShipmentRequestsList from '@/components/ShipmentRequests/ShipmentRequestsList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <ShipmentRequestsList/>
    </v-main>
  </v-layout>
  
</template>
 