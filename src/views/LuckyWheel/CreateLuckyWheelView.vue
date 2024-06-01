<script setup>
import { defineAsyncComponent } from 'vue'
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const CreateLuckyWheel = defineAsyncComponent(() => import('@/components/LuckyWheel/CreateLuckyWheel.vue'));
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CreateLuckyWheel />
    </v-main>
  </v-layout>
</template>
