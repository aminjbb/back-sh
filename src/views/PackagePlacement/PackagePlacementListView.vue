<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import PackagePlacementList from '@/components/PackagePlacement/PackagePlacementList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PackagePlacementList />
    </v-main>
  </v-layout>
</template>
