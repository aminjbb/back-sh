<script setup>
import {defineAsyncComponent} from "vue";
const PackageList = defineAsyncComponent(()=> import ('@/components/Package/PackageList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <PackageList />
    </v-main>
  </v-layout>
</template>
