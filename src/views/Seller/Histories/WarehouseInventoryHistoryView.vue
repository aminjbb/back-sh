<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import WarehouseInventoryHistoryList from '@/components/Seller/Sku/Histories/WarehouseInventoryHistoryList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <WarehouseInventoryHistoryList />
    </v-main>
  </v-layout>
</template>
