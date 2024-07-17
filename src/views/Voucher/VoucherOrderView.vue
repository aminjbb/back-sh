<template>
    <v-layout class="bg-gray" v-if="screenType==='desktop'">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header/>
            <VoucherOrderList/>
        </v-main>
    </v-layout>

    <v-layout class="bg-gray mh-100" v-if="screenType==='mobile'">
        <DashboardLayoutMobile @closeSidebar="ToggleSideBarMenu" v-if="isMenu" />
        <v-main>
            <HeaderMobile @sideMenu="ToggleSideBarMenu"/>
            <VoucherOrderListMobile/>
        </v-main>
    </v-layout>
</template>


<script>
import VoucherOrderList from '@/components/Voucher/VoucherOrderList.vue'
import VoucherOrderListMobile from '@/components/Voucher/Mobile/VoucherOrderListMobile.vue'
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import DashboardLayoutMobile from '@/components/Layouts/DashboardLayoutMobile.vue'
import Header from '@/components/Public/Header.vue'
import HeaderMobile from '@/components/Public/HeaderMobile.vue'

export default {
    components:{
        VoucherOrderList,
        VoucherOrderListMobile,
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