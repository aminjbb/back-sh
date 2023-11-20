<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddHomePageSpecial from '@/components/HomePage/Add/AddHomePageSpecialSale.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddHomePageSpecial />
    </v-main>
  </v-layout>
</template>
