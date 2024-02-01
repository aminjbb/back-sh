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
          :header="cargoReceivingHeader"
          :items="orderList"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
      />

      <v-divider/>


    </v-card>
  </div>
</template>

<script>
import {ref} from 'vue'
//Components
import Table from '@/components/OrderPackaging/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import OrderPackagingList from '@/composables/OrderPackaging';

export default {
  components: {
    Table,
    ModalTableFilter,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,

  },

  data() {
    return {
      cargoId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      allCargoData: [],
      filteredCargoData: [],
      qrCode: null,
      valid: null,
    }
  },

  setup() {
    const {
      cargoList,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      item,
      filterField,
      loading,
      getShpsList,
      orderList,
      getOrderListDetail
    } = OrderPackagingList();
    return {
      cargoList,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      item,
      filterField,
      loading,
      getShpsList,
      orderList,
      getOrderListDetail
    };
  },
  async mounted() {
    await this.fetchCargoData();
  },

  watch: {
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.$cookies.remove('deleteItem')
        }

      }
    },
    dataTableLength(val) {
      this.addPerPage(val)
    },
  },
  methods: {
    async fetchCargoData(newCargoId) {
      this.getShpsList(newCargoId);
    },
    updatePackageIdInStore() {
      this.$store.commit('set_packageId', this.cargoId);
    },
    updateSendingMethod() {
      const paymentMethod = "saman";
      this.$store.commit('set_sendingMethod', paymentMethod);
    },
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
    /**
     * Change Header Status
     * @param {*} index
     * @param {*} value
     */
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
    $route() {
      this.fetchCargoData();
    }
  }
}
</script>
  