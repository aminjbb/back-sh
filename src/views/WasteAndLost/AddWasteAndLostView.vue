<script setup>
import {defineAsyncComponent} from "vue";
const AddWasteAndLost = defineAsyncComponent(()=> import ('@/components/WasteAndLost/Add/AddWasteAndLost.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <AddWasteAndLost />
    </v-main>
  </v-layout>
</template>
