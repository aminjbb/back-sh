
<script setup>
import {defineAsyncComponent} from "vue";
const HomePageBlogSection = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageBlogSection.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <HomePageBlogSection />
    </v-main>
  </v-layout>
</template>
