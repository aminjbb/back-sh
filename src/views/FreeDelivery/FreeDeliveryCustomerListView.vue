<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import DetailCustomerVocher from '@/components/FreeDelivery/DetailCustomerVocher.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <DetailCustomerVocher/>
    </v-main>
  </v-layout>
</template>
