<script setup>
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
import ImageUploader from '@/components/Public/ImageUploader.vue'
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      
      <ImageUploader
        attachUrl="product/crud/attach/images/"
        getUrl="product/crud/get/"
        :imageLength="1"
        routePath="/product/index"
      />
    </v-main>
  </v-layout>
</template>
