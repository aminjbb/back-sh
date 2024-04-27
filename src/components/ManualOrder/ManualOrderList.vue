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

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start" />

          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left" />
            </div>
          </v-col>

          <v-col cols="3" class="d-flex justify-end">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
              <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]" />
                        </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import ModalTableFilter from '@/components/Orders/Filter/Filter.vue'
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import Table from "@/components/ManualOrder/ManualOrderTable/ManualOrderTable.vue";
import ManualOrders from "@/composables/ManualOrders";
import Orders from "@/composables/Orders";

export default {
  setup() {
    const {filterField} = Orders();

    const {
      header,
      page,
      dataTableLength,
      pageLength,
      loading,
      manualOrderList,
      getManualOrderList,
      addPerPage
    } = ManualOrders()

    return {
      header,
      page,
      dataTableLength,
      pageLength,
      loading,
      manualOrderList,
      filterField,
      getManualOrderList,
      addPerPage
    }
  },

  components: {ModalTableFilter, ModalColumnFilter, Table },

  methods:{
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    updateList(status) {
      if (status === 'true') {
        this.getManualOrderList();
      }
    },
  },

  mounted() {
    this.getManualOrderList()
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },
    $route(){
      this.getManualOrderList()

    }
  }
}
</script>

<style scoped>

</style>