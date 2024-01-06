<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">
        <v-col cols="6" />

        <v-col cols="6" class="mt-3">
          <v-row justify="end">
            <ModalTableFilter path="warehouse_inventory/index" :filterField="filterField" />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="orders"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          model="warehouseInventory" />

      <v-divider />

    </v-card>
  </div>
</template>

<script>
import Table from '@/components/WarehouseOrderList/Table/Table.vue'
import WarehouseOrder from "@/composables/WarehouseOrder";
import ModalTableFilter from '@/components/WarehouseInventory/Filter/Filter.vue'

export default {
  data() {
    return {

    }
  },

  components: {
    Table,
    ModalTableFilter,
  },

  setup(props) {
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

  watch: {
    dataTableLength(val) {
      this.getWarehouseOrders(val)
    },
  }
}
</script>
