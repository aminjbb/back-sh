<script setup>
import {defineAsyncComponent} from "vue";
const EditLegalSeller = defineAsyncComponent(()=> import ('@/components/Seller/Edit/LegalSeller/EditLegalSeller.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <EditLegalSeller />
    </v-main>
  </v-layout>
</template>
