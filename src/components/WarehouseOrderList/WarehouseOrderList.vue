<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch pa-2 scroller" height="580">

      <v-row justify="space-between" align class="pa-5 ma-0">
        <ModalRejectSorting :getWarehouseOrders="getWarehouseOrders" :order="order" v-for="(order,index) in orders" :key="`order${index}`"/>
      </v-row>
    </v-card>

  </div>
</template>

<script>
import Table from '@/components/WarehouseOrderList/Table/Table.vue'
import WarehouseOrder from "@/composables/WarehouseOrder";
import ModalRejectSorting from "@/components/WarehouseOrderList/Modal/ModalRejectSorting.vue";

export default {
  components: {
    Table,
    ModalRejectSorting
  },

  setup() {
    const {
      pageLength,filterField, orders ,addPerPage, getWarehouseOrders, dataTableLength, page, header,loading
    } = WarehouseOrder();
    return {
      pageLength,filterField, orders ,addPerPage, getWarehouseOrders, dataTableLength, page, header,loading
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
  },

  mounted() {
    this.getWarehouseOrders();
  },

}
</script>
