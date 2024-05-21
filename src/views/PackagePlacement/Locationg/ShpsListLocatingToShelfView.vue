<script setup>
import {defineAsyncComponent} from "vue";
const ShpsListLocatingToShelf = defineAsyncComponent(()=> import ('@/components/PackagePlacement/Locating/ShpsListLocatingToShelf.vue'))


</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh d-flex justify-center">
      <div class="scan-container">
        <ShpsListLocatingToShelf />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
