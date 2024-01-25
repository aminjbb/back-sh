<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddSpecialExitCapacity from '@/components/Warehouse/SpecialExitCapacity/AddSpecialExitCapacity.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddSpecialExitCapacity />
    </v-main>
  </v-layout>
</template>
