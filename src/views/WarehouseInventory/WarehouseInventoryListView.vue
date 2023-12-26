<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import WarehouseInventoryList from '@/components/WarehouseInventory/WarehouseInventoryList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <WarehouseInventoryList />
    </v-main>
  </v-layout>
</template>
