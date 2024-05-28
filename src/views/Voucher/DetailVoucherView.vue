<script setup>
import {defineAsyncComponent} from "vue";
const DetailVoucher = defineAsyncComponent(()=> import ('@/components/Voucher/DetailVoucher.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <DetailVoucher/>
    </v-main>
  </v-layout>
</template>
