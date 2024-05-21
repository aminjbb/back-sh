<script setup>
import {defineAsyncComponent} from "vue";
const VoucherOrderList = defineAsyncComponent(()=> import ('@/components/Voucher/VoucherOrderList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
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
