<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ZoneList from '@/components/Zone/ZoneList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <ZoneList />
    </v-main>
  </v-layout>
</template>
