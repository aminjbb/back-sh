<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import AddWasteAndLost from '@/components/WasteAndLost/Add/AddWasteAndLost.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddWasteAndLost />
    </v-main>
  </v-layout>
</template>
