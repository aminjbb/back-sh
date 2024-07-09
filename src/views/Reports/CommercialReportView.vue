<script >
import {defineAsyncComponent} from "vue";
const CommercialReport = defineAsyncComponent(()=> import ('@/components/Reports/CommercialReport.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const HeaderMobile = defineAsyncComponent(()=> import ('@/components/Public/HeaderMobile.vue'))
const DashboardLayoutMobile = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayoutMobile.vue'))
const CommercialReportMobile = defineAsyncComponent(()=> import ('@/components/Reports/CommercialReportMobile.vue'))


export default {
  components:{
    DashboardLayout,
    Header,
    CommercialReportMobile,
    DashboardLayoutMobile,
    HeaderMobile,
    CommercialReport

  },

  data(){
    return {
      isMenu: false,
      screenType: null,
    }
  },

  mounted() {
    /**
     * Check screen size
     */
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
  <v-layout class="bg-gray"  v-if="screenType==='desktop'">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <CommercialReport />
    </v-main>
  </v-layout>
  <v-layout class="bg-gray" v-if="screenType==='mobile'">
    <DashboardLayoutMobile @closeSidebar="ToggleSideBarMenu" v-if="isMenu" />
    <v-main class="h-100vh">
      <HeaderMobile @sideMenu="ToggleSideBarMenu"/>
      <CommercialReportMobile/>
    </v-main>

  </v-layout>
</template>
