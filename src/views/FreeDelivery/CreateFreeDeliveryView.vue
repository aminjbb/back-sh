<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateFreeDelivery from '@/components/FreeDelivery/CreateFreeDelivery.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <CreateFreeDelivery/>
    </v-main>
  </v-layout>
</template>
