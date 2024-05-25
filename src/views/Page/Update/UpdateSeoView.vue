<script setup>
import {defineAsyncComponent} from "vue";
const UpdateSeo = defineAsyncComponent(()=> import ('@/components/Pages/Update/Seo/UpdateSeo.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <UpdateSeo/>
    </v-main>
  </v-layout>


</template>
