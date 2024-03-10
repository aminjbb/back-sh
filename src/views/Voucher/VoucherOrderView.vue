<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import VoucherOrderList from '@/components/Voucher/VoucherOrderList.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <VoucherOrderList/>
    </v-main>
  </v-layout>
</template>
