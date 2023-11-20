<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import HomePagePartitionSliderAddSku from '@/components/HomePage/HomePagePartitionSliderAddSku.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <HomePagePartitionSliderAddSku />
    </v-main>
  </v-layout>
</template>
