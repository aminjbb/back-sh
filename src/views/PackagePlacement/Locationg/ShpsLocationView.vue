<script setup>
import {defineAsyncComponent} from "vue";
const ShpsLocation = defineAsyncComponent(()=> import ('@/components/PackagePlacement/Locating/ShpsLocation.vue'))

</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh">
      <div class="vh-100 d-flex justify-center">
        <ShpsLocation />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
