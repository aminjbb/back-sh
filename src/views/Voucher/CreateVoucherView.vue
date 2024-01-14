<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import CreateVoucher from '@/components/Voucher/CreateVoucher.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <CreateVoucher/>
    </v-main>
  </v-layout>
</template>
