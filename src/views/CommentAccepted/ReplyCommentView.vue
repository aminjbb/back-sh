<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
            <ReplyComment />
    </v-main>
  </v-layout>
</template>

<script setup>
import {defineAsyncComponent} from "vue";

    const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
    const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
    const ReplyComment = defineAsyncComponent(() => import ('@/components/Comments/Reply/ReplyComment.vue'))
</script >