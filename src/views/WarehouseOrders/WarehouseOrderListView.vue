<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <WarehouseOrderList />-->
    </v-main>
    <div class="h-100 d-flex flex-column align-stretch seller">
      <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch pa-2 scroller" height="580">
        <v-row justify="space-between" class="pa-5 ma-0">
          <ModalRejectSorting
              :getWarehouseOrders="getWarehouseOrders"
              :order="order"
              v-for="(order,index) in orders"
              :key="`order${index}`"/>
        </v-row>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const WarehouseOrderList = defineAsyncComponent(()=> import ('@/components/WarehouseOrderList/WarehouseOrderList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/WarehouseOrderList/Table/Table.vue'
import WarehouseOrder from "@/composables/WarehouseOrder";
import ModalRejectSorting from "@/components/WarehouseOrderList/Modal/ModalRejectSorting.vue";

export default {
  components: {
    ModalRejectSorting,
    Table,
    DashboardLayout,
    Header
  },

  setup() {
    const {
      pageLength,
      filterField,
      orders ,
      addPerPage,
      getWarehouseOrders,
      dataTableLength,
      page,
      header,
      loading
    } = WarehouseOrder();
    return {
      pageLength,
      filterField,
      orders ,
      addPerPage,
      getWarehouseOrders,
      dataTableLength,
      page,
      header,
      loading
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  mounted() {
    this.getWarehouseOrders()
  }
}
</script>
