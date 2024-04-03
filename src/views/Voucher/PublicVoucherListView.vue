<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import PublicVoucherList from '@/components/Voucher/PublicVoucherList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <PublicVoucherList/>
    </v-main>
  </v-layout>
</template>
