<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import SkuList from '@/components/PageSliders/SkuList/PagesSkuList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <SkuList />
    </v-main>
  </v-layout>
</template>
