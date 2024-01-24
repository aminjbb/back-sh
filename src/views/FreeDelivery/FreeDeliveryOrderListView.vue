<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import FreeDeliveryOrderList from '@/components/FreeDelivery/FreeDeliveryOrderList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <FreeDeliveryOrderList/>
    </v-main>
  </v-layout>
</template>
