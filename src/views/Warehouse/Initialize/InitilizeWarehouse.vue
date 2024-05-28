<script setup>
import {defineAsyncComponent} from "vue";
const InitializeWarehousePage = defineAsyncComponent(()=> import ('@/components/Warehouse/Initialize/InitializeWarehousePage.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="justify-center">
      <div class="scan-container">
        <InitializeWarehousePage />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
