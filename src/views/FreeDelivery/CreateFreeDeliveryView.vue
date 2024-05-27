<script setup>
import {defineAsyncComponent} from "vue";
const CreateFreeDelivery = defineAsyncComponent(()=> import ('@/components/FreeDelivery/CreateFreeDelivery.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <CreateFreeDelivery/>
    </v-main>
  </v-layout>
</template>
