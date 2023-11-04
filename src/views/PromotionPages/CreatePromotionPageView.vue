<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddPromotionPage from '@/components/PromotionPages/Add/AddPromotionPage.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddPromotionPage />
    </v-main>
  </v-layout>
</template>
