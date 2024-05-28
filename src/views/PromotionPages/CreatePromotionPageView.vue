<script setup>
import {defineAsyncComponent} from "vue";
const AddPromotionPage = defineAsyncComponent(()=> import ('@/components/PromotionPages/Add/AddPromotionPage.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddPromotionPage />
    </v-main>
  </v-layout>
</template>
