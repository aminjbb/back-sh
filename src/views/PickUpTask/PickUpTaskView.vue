<script setup>
import {defineAsyncComponent} from "vue";
const PickUpTaskList = defineAsyncComponent(()=> import ('@/components/PickUpTask/PickUpTaskList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PickUpTaskList/>
    </v-main>
  </v-layout>
</template>
