<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import OpenOrder from '@/components/Warehouse/OpenOrder/OpenOrder.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <OpenOrder />
    </v-main>
  </v-layout>
</template>
