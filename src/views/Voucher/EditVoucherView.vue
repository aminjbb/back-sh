<script setup>
import {defineAsyncComponent} from "vue";
const EditVoucher = defineAsyncComponent(()=> import ('@/components/Voucher/Edit/EditVoucher.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <EditVoucher/>
    </v-main>
  </v-layout>
</template>
