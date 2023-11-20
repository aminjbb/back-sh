<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddSphsToSpecialSale from '@/components/HomePage/Add/AddSphsToSpecialSale.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddSphsToSpecialSale />
    </v-main>
  </v-layout>
</template>
