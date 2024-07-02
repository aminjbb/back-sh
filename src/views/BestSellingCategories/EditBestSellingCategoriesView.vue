<script setup>
import {defineAsyncComponent} from "vue";
const EditBestSellingCategories = defineAsyncComponent(()=> import ('@/components/BestSellingCategories/Edit/EditBestSellingCategories.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="vh-100">
      <Header/>
      <EditBestSellingCategories/>
    </v-main>
  </v-layout>
</template>
