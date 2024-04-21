<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6">
          <v-row justify="start">
            <v-btn
                @click="$router.push('/orders/create')"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن
            </v-btn>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="end" class="mt-0">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <ModalTableFilter path="orders/manual-order-list" :filterField="filterField"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="manualOrderList"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          @updateList="updateList"
          deletePath="order/crud/delete/"
          model="order" />
    </v-card>

  </div>
</template>

<script>
import ModalTableFilter from '@/components/ManualOrder/Filter/ModalTableFilter.vue'
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import Table from "@/components/ManualOrder/ManualOrderTable/ManualOrderTable.vue";
import ManualOrders from "@/composables/ManualOrders";

export default {
  setup() {
    const {
      header,
      page,
      dataTableLength,
      pageLength,
      loading,
      manualOrderList,
      filterField
    } = ManualOrders()

    return {
      header,
      page,
      dataTableLength,
      pageLength,
      loading,
      manualOrderList,
      filterField
    };
  },
  components: {ModalTableFilter, ModalColumnFilter, Table },

  methods:{
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
  }
}
</script>

<style scoped>

</style>