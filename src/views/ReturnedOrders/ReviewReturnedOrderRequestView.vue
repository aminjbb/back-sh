<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ReviewReturnedOrderRequest from '@/components/ReturnedOrders/ReviewReturnedOrderRequest.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main style="min-height: 100vh;">
      <Header />
      <ReviewReturnedOrderRequest />
    </v-main>
  </v-layout>
</template>
