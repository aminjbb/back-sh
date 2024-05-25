<script setup>
import {defineAsyncComponent} from "vue";
const CreateOrder = defineAsyncComponent(()=> import ('@/components/Orders/CreateOrder/CreateOrder.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
      <CreateOrder/>
    </v-main>
  </v-layout>
</template>
