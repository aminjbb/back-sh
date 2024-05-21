<script setup>
import {defineAsyncComponent} from "vue";
const DetailCustomerVocher = defineAsyncComponent(()=> import ('@/components/Voucher/DetailCustomerVocher.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
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
