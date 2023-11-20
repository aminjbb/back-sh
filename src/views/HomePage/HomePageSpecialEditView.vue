<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditHomePageSpecialSale from '@/components/HomePage/Add/EditHomePageSpecialSale.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditHomePageSpecialSale />
    </v-main>
  </v-layout>
</template>
