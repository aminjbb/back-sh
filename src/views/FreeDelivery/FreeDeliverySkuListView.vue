<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import FreeDeliverySkuList from '@/components/FreeDelivery/FreeDeliverySkuList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <FreeDeliverySkuList/>
    </v-main>
  </v-layout>
</template>
