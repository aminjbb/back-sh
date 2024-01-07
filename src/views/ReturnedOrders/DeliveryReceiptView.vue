<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import DeliveryReceipt from '@/components/ReturnedOrders/DeliveryReceipt.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <DeliveryReceipt />
    </v-main>
  </v-layout>
</template>
