<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import HomePageSpecialSalesList from '@/components/HomePage/HomePageSpecialSalesList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <HomePageSpecialSalesList />
    </v-main>
  </v-layout>
</template>
