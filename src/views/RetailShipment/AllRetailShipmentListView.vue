<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import RetailShipmentList from '@/components/RetailShipment/RetailShipmentList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <RetailShipmentList />
    </v-main>
  </v-layout>
</template>
