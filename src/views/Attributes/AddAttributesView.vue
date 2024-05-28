<script setup>
import {defineAsyncComponent} from "vue";
const AddAttributesForm = defineAsyncComponent(()=> import ('@/components/Attributes/Add/AddAttributesForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
</script>

<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main>
            <Header/>
            <AddAttributesForm/>
        </v-main>
    </v-layout>
</template>
