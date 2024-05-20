<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="100" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="start"
          align="start"
          class="px-10 py-5">
        <v-col cols="12" md="6">
          <v-form @submit.prevent="onFormSubmit" v-model="valid">
            <div>
              <v-text-field
                  :autofocus="true"
                  variant="outlined"
                  :rules="rule"
                  v-model="cargoId"
                  placeholder="شناسه سفارش را اسکن نمایید"/>
            </div>
          </v-form>
        </v-col>

      </v-row>
    </v-card>
    <v-card
        class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
        height="580"
    >
      <Table

          class="flex-grow-1"
          deletePath="category/crud/delete/"
          :header="orderListHeader"
          :items="orderList"
          :page="1"
          :perPage="dataTableLength"
          :loading="loading"
      />

      <v-divider/>
      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3">
          </v-col>

          <v-col cols="6">
            <div class="text-center">
              <v-pagination
                  v-model="pageNumber"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left" />
            </div>
          </v-col>

          <v-col cols="3">
          </v-col>
        </v-row>
      </v-card-actions>


    </v-card>
  </div>
</template>

<script>
//Components
import Table from '@/components/OrderPackaging/Table/Table.vue'
import OrderPackagingList from '@/composables/OrderPackaging';


export default {
  components: {
    Table,
  },

  data() {
    return {
      cargoId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: null,
    }
  },

  setup() {
    const {

      dataTableLength,
      orderListHeader,
      loading,
      getSortingOrder,
      orderList,
      pageNumber,
      pageLength
    } = OrderPackagingList();
    return {
      dataTableLength,
      orderListHeader,
      loading,
      getSortingOrder,
      orderList,
      pageNumber,
      pageLength
    };
  },
   mounted() {
     this.getSortingOrder();
  },

  watch: {
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.$cookies.remove('deleteItem')
        }

      }
    },
  },
  methods: {

    onFormSubmit() {
      if (this.cargoId.includes('-')) {
        const cargoSplit = this.cargoId.split('-')
        if (cargoSplit[1]) {
          this.cargoId = cargoSplit[1]
        }
      }
      if (this.valid) {
        this.$router.push('/order-packaging/detail-info/' + this.cargoId);
      }
    },


    pageNumber(val){
      this.getSortingOrder(val)
    }
  }
}
</script>
  