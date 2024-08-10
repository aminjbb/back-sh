<script>
import {defineAsyncComponent} from "vue";
const TicketList = defineAsyncComponent(()=> import ('@/components/Ticket/TicketList.vue'))
const TicketListMobile = defineAsyncComponent(()=> import ('@/components/Ticket/TicketListMobile.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const DashboardLayoutMobile = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayoutMobile.vue'))
const HeaderMobile = defineAsyncComponent(()=> import ('@/components/Public/HeaderMobile.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  components:{
    DashboardLayout,
    DashboardLayoutMobile,
    HeaderMobile,
    Header,
    TicketList,
    TicketListMobile
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

<template>
  <v-layout class="bg-gray" v-if="screenType==='desktop'">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <TicketList/>
    </v-main>
  </v-layout>

  <v-layout class="bg-gray" v-if="screenType==='mobile'">
    <DashboardLayoutMobile @closeSidebar="ToggleSideBarMenu" v-if="isMenu" />
    <v-main class="h-100vh">
      <HeaderMobile @sideMenu="ToggleSideBarMenu"/>
      <TicketListMobile/>
    </v-main>

  </v-layout>
</template>