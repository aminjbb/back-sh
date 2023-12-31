<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import OrderPackagingDetail from '@/components/OrderPackaging/Detail/OrderPackagingDetail.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <OrderPackagingDetail/>
    </v-main>
  </v-layout>
</template>

