<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateWarehouse from '@/components/Warehouse/Add/CreateWarehouse.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CreateWarehouse />
    </v-main>
  </v-layout>
</template>
