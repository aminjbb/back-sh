<script setup>
import {defineAsyncComponent} from "vue";
const EditNaturalSeller = defineAsyncComponent(()=> import ('@/components/Seller/Edit/NaturalSeller/EditNaturalSeller.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditNaturalSeller />
    </v-main>
  </v-layout>
</template>
