<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import UpdateSeo from '@/components/Pages/Update/Seo/UpdateSeo.vue'
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
