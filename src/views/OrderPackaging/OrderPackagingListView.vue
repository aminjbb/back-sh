<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import OrderPackagingList from '@/components/OrderPackaging/OrderPackagingList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <OrderPackagingList/>
    </v-main>
  </v-layout>
</template>

