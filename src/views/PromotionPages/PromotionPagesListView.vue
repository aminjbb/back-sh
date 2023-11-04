<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import PromotionPagesList from '@/components/PromotionPages/PromotionPagesList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PromotionPagesList />
    </v-main>
  </v-layout>
</template>
