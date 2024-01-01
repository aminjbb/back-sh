<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import WarehouseOrderList from '@/components/WarehouseOrderList/WarehouseOrderList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <WarehouseOrderList />
    </v-main>
  </v-layout>
</template>
