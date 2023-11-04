<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddSkuGroup from '@/components/PromotionPages/Add/AddSkuGroup.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddSkuGroup />
    </v-main>
  </v-layout>
</template>
