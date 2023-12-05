<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditShpsToRetailShipment from '@/components/RetailShipment/Update/EditShpsToRetailShipment.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditShpsToRetailShipment />
    </v-main>
  </v-layout>
</template>
