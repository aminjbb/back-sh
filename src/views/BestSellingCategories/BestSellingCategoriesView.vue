<script setup>
import {defineAsyncComponent} from "vue";
const BestSellingCategoriesView = defineAsyncComponent(()=> import ('@/components/BestSellingCategories/BestSellingCategoriesListing.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="vh-100">
      <Header/>
      <BestSellingCategoriesView/>
    </v-main>
  </v-layout>
</template>
