<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import SiteInventoryHistoryList from '@/components/Seller/Sku/Histories/SiteInventoryHistoryList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <SiteInventoryHistoryList />
    </v-main>
  </v-layout>
</template>
