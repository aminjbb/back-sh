<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ReturnedOrderList from '@/components/ReturnedOrders/ReturnedOrderList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <ReturnedOrderList />
    </v-main>
  </v-layout>
</template>
