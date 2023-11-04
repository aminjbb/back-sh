<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddSpecialCapacity from '@/components/Warehouse/SpecialCapacity/AddSpecialCapacity.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddSpecialCapacity />
    </v-main>
  </v-layout>
</template>
