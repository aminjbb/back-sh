<script setup>
import {defineAsyncComponent} from "vue";
const EditColorForm = defineAsyncComponent(()=> import ('@/components/Colors/Edit/EditColorForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
        <EditColorForm/>
    </v-main>
  </v-layout>

  
</template>
