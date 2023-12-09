<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddShpsToRetailShipment from '@/components/RetailShipment/Add/AddShpsToRetailShipment.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddShpsToRetailShipment />
    </v-main>
  </v-layout>
</template>
