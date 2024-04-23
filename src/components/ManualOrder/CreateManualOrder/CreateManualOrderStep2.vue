<template>
  <div class="">
      <Table
          class="flex-grow-1"
          :header="headerSelectProduct"
          :items="manualOrderList"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          @updateList="updateList"
          deletePath="order/crud/delete/"
          model="order" />
  </div>
</template>
<script>
import ManualOrders from "@/composables/ManualOrders";
import Table from "@/components/ManualOrder/ManualOrderTable/SelectOrderTable.vue";

export default {
  components: {Table},
  setup(){
    const {headerSelectProduct} = ManualOrders()

    return{headerSelectProduct}
  }
}
</script>

<style scoped>

</style>