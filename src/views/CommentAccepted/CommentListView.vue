<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <CommentList/>
    </v-main>
  </v-layout>
</template>

<script setup>
  import {defineAsyncComponent} from "vue";
  const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
  const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
  const CommentList = defineAsyncComponent(()=> import ('@/components/Comments/CommentList.vue'))
</script >
