<script setup>
import {defineAsyncComponent} from "vue";
const AddCategoryForm = defineAsyncComponent(()=> import ('@/components/Categories/Add/AddCategoryForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
    <AddCategoryForm/>
    </v-main>
  </v-layout>

  
</template>
