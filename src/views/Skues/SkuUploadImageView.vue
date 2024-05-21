<script setup>
import {defineAsyncComponent} from "vue";
const ImageUploader = defineAsyncComponent(()=> import ('@/components/Public/ImageUploader.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>

      <ImageUploader
        attachUrl="product/sku/crud/attach/images/"
        getUrl="product/sku/crud/get/"
        :imageLength="1"
        module="sku"
      />
    </v-main>
  </v-layout>
</template>
