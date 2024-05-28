<script setup>
import {defineAsyncComponent} from "vue";
const ActivePackageList = defineAsyncComponent(()=> import ('@/components/ActivePackage/PackageList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <ActivePackageList />
    </v-main>
  </v-layout>
</template>
