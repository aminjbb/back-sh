<script setup>
import {defineAsyncComponent} from "vue";
const AddAttributesForm = defineAsyncComponent(()=> import ('@/components/Attributes/Add/AddAttributesForm.vue'))
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'

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
