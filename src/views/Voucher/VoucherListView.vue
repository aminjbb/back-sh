<template>
    <v-layout class="bg-gray" v-if="screenType==='desktop'">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header/>
            <VoucherList/>
        </v-main>
    </v-layout>

    <v-layout class="bg-gray" v-if="screenType==='mobile'">
        <DashboardLayoutMobile @closeSidebar="ToggleSideBarMenu" v-if="isMenu" />
        <v-main  class="h-100vh">
            <HeaderMobile @sideMenu="ToggleSideBarMenu"/>
            <VoucherListMobile/>
        </v-main>
    </v-layout>
</template>

<script>
import VoucherList from '@/components/Voucher/VoucherList.vue'
import VoucherListMobile from '@/components/Voucher/Mobile/Index/VoucherListMobile.vue'
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import DashboardLayoutMobile from '@/components/Layouts/DashboardLayoutMobile.vue'
import Header from '@/components/Public/Header.vue'
import HeaderMobile from '@/components/Public/HeaderMobile.vue'

export default {
    components:{
        VoucherList,
        VoucherListMobile,
        DashboardLayout,
        DashboardLayoutMobile,
        Header,
        HeaderMobile,
    },

    data(){
        return {
            isMenu: false,
            screenType: null,
        }
    },

    mounted() {
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    methods: {
        ToggleSideBarMenu() {
            this.isMenu = !this.isMenu
        }
    }
}

</script>