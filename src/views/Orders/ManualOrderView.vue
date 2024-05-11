<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateManualOrder from '@/components/Orders/CreateManualOrder/CreateManualOrder.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CreateManualOrder />
    </v-main>
  </v-layout>
</template>