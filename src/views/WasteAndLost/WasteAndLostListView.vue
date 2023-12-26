<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import WasteAndLostList from '@/components/WasteAndLost/WasteAndLostList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <WasteAndLostList />
    </v-main>
  </v-layout>
</template>
