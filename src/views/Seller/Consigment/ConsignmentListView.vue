<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ConsignmentList from '@/components/Seller/Consigment/ConsignmentList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <ConsignmentList />
    </v-main>
  </v-layout>
</template>
