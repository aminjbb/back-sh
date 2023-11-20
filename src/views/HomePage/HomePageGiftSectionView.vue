<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import HomePageGiftSection from '@/components/HomePage/HomePageGiftSection.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <HomePageGiftSection />
    </v-main>
  </v-layout>
</template>
