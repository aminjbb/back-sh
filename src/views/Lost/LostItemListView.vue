<script setup>
import { defineAsyncComponent } from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const LostItemList = defineAsyncComponent(() => import('@/components/Lost/LostItemList.vue'));
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <LostItemList />
    </v-main>
  </v-layout>
</template>
