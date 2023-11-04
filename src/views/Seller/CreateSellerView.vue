<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateSellerIndex from '@/components/Seller/Add/CreateSellerIndex.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CreateSellerIndex />
    </v-main>
  </v-layout>
</template>
