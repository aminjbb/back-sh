<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import DetailsDiscountCode from "@/components/Voucher/Table/DetailsDiscountCode.vue";
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <DetailsDiscountCode/>
    </v-main>
  </v-layout>
</template>