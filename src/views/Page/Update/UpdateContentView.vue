<script setup>
import {defineAsyncComponent} from "vue";
const UpdateContent = defineAsyncComponent(()=> import ('@/components/Pages/Update/Content/UpdateContent.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <UpdateContent/>
    </v-main>
  </v-layout>


</template>
