<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import UpdateImagesPage from '@/components/Pages/Update/Images/UpdateImagesPage.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <UpdateImagesPage/>
    </v-main>
  </v-layout>


</template>
