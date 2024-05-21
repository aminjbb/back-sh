<script setup>
import {defineAsyncComponent} from "vue";
const LoginSection = defineAsyncComponent(()=> import ('@/components/Login/LoginSection.vue'))

</script>

<template>
  <main>
    <LoginSection />
  
  </main>
</template>
