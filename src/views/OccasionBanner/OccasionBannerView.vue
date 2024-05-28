<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import OccasionBannerList from '@/components/OccasionBanner/OccasionBannerList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <OccasionBannerList />
    </v-main>
  </v-layout>
</template>
