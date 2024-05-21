<script setup>
import {defineAsyncComponent} from "vue";
const DetailsDiscountCode = defineAsyncComponent(()=> import ('@/components/Voucher/Table/DetailsDiscountCode.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

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