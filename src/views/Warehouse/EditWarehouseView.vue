<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditWarehouse from '@/components/Warehouse/Edit/EditWarehouse.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditWarehouse />
    </v-main>
  </v-layout>
</template>
