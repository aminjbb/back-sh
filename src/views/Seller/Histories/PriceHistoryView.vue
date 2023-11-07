<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import PriceHistoryList from '@/components/Seller/Sku/Histories/PriceHistoryList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PriceHistoryList />
    </v-main>
  </v-layout>
</template>
