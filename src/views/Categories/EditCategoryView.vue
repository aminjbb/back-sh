<script setup>
import {defineAsyncComponent} from "vue";
const EditCategoryForm = defineAsyncComponent(()=> import ('@/components/Categories/Edit/EditCategoryForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <EditCategoryForm/>
    </v-main>
  </v-layout>

  
</template>
