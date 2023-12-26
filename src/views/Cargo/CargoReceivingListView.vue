<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CargoReceivingList from '@/components/Cargo/Receiving/CargoReceivingList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <CargoReceivingList/>
    </v-main>
  </v-layout>
</template>

