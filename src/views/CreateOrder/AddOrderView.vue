<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateOrder from '@/components/Orders/CreateOrder/CreateOrder.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <CreateOrder/>
    </v-main>
  </v-layout>
</template>
