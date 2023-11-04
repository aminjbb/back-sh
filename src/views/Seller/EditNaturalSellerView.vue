<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import EditNaturalSeller from '@/components/Seller/Edit/NaturalSeller/EditNaturalSeller.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditNaturalSeller />
    </v-main>
  </v-layout>
</template>
