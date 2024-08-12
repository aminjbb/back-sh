<script setup>
import {defineAsyncComponent} from "vue";
const WarehouseUnLoadSorting = defineAsyncComponent(()=> import ('@/components/WarehouseOrderList/WarehouseUnLoadSorting.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh ">
      <div class="d-flex justify-center align-center h-100vh">
        <WarehouseUnLoadSorting />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
