<script setup>
import {defineAsyncComponent} from "vue";
const SingularLocating = defineAsyncComponent(()=> import ('@/components/PackagePlacement/Locating/SingularLocating.vue'))
</script>

<template>
  <v-layout class="bg-gray">
    <v-main class="h-100vh">
      <div class="h-100vh">
        <SingularLocating />
      </div>
    </v-main>
  </v-layout>
</template>
<style>

</style>
