<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import  EditPromotionPage from '@/components/PromotionPages/Edit/EditPromotionPage.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditPromotionPage />
    </v-main>
  </v-layout>
</template>
