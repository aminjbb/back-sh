<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddShpsToSellerConsigment from '@/components/Seller/Consigment/AddShpsToSellerConsigment.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddShpsToSellerConsigment />
    </v-main>
  </v-layout>
</template>
