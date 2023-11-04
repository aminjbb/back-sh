<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CerateNaturalSeller from '@/components/Seller/Add/NaturalSeller/CerateNaturalSeller.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CerateNaturalSeller />
    </v-main>
  </v-layout>
</template>
