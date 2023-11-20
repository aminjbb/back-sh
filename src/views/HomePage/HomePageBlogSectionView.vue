
<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import HomePageBlogSection from '@/components/HomePage/HomePageBlogSection.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <HomePageBlogSection />
    </v-main>
  </v-layout>
</template>
