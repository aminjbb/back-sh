<script setup>
import {defineAsyncComponent} from "vue";
const CreateVoucher = defineAsyncComponent(()=> import ('@/components/Voucher/CreateVoucher.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
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
