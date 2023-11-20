
<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import HomePageBrandSection from '@/components/HomePage/HomePageBrandSection.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <HomePageBrandSection />
    </v-main>
  </v-layout>
</template>
