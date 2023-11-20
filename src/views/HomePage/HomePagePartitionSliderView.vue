<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import HomePagePartitionSlider from '@/components/HomePage/HomePagePartitionSlider.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <HomePagePartitionSlider />
    </v-main>
  </v-layout>
</template>
