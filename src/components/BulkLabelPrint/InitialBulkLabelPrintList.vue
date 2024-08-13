<template>
  <div class="h-100 d-flex flex-column align-stretch">

    <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <InitialTable
          class="flex-grow-1"
          deletePath="category/crud/delete/"
          :header="cargoReceivingHeader"
          :items="shipmentShpsListFilterd"
          :page="1"
          :perPage="1000"
          :packageId="1"
          :loading="loading"
          :getShpsList="getShpsList"/>

      <v-divider/>

      <v-card-actions class="pb-3">
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

//Components
import InitialTable from '@/components/BulkLabelPrint/Table/InitialTable.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import BulkLabelPrintList from '@/composables/InitialBulkLabelPrint';
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from '@/assets/js/axios_call.js'

export default {
  components: {
    InitialTable,
    ModalColumnFilter,
    ModalGroupAdd,
  },

  data() {
    return {
      scanPackage: '',
      packageId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      allCargoData: [],
      filteredCargoData: [],
      closePackageLoading: false,
      shipmentShpsListFilterd: [],
      barcodeShps: null,
      adminName:null
    }
  },

  setup() {
    const {
      cargoList,
      addPerPage,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      filterField,
      loading,
      getShpsList,
      shpsList
    } = BulkLabelPrintList();
    return {
      cargoList,
      addPerPage,
      getCargoList,
      dataTableLength,
      cargoReceivingHeader,
      filterField,
      loading,
      getShpsList,
      shpsList
    };
  },

  mounted() {
    this.initial()
  },
  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal;
    }
  },

  watch: {
    adminName(value) {
      if (value === '' || !value) {
        this.shipmentShpsListFilterd = this.shpsList.shps_list
      }
    },
    shpsList() {
      this.shipmentShpsListFilterd = this.shpsList.shps_list
    },
    cargo(newCargoId) {
      if (newCargoId) {
        this.fetchCargoData(newCargoId);
        this.updatePackageIdInStore();
      }
    },

    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getCategories()
          this.$cookies.remove('deleteItem')
        }

      }
    },

    dataTableLength(val) {
      this.addPerPage(val)
    },

  },

  methods: {
    initial() {
      this.getShpsList(1, this.$store);
    },
    async filterData() {
      if (this.adminName && this.adminName !== "" && this.adminName != null) {
        const searchTermRegex = new RegExp(this.adminName, 'g');
        const filterData = this.shpsList.shps_list.filter(element => {
          return searchTermRegex.test(element.admin_name)
        })

        if (filterData) {
          this.shipmentShpsListFilterd = []

          this.shipmentShpsListFilterd =filterData
        } else {
          openToast(this.$store, 'نام انباردار وجود ندارد')
        }
      } else {
        this.shipmentShpsListFilterd =this.shpsList.shps_list
      }
    },
    async packingData() {
      try {
        let packageId = null
        if (this.packageId.includes('-')) {
          const cargoSplit = this.packageId.split('-')
          if (cargoSplit[1]) packageId = cargoSplit[1]
          else packageId = this.packageId
        } else packageId = this.packageId
        this.closePackageLoading = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `package/crud/update/status/${packageId}`
        AxiosMethod.form = formData
        formData.append('status', 'received_by_warehouse')
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.shipmentShpsListFilterd = []
          this.closePackageLoading = false
          openToast(
              this.$store,
              'بسته با موفقیت ویرایش گردید',
              "success"
          );
        }
      } catch (e) {
        this.closePackageLoading = false
      }
    },

    updatePackageIdInStore() {
      this.$store.commit('set_packageId', this.cargo);
    },

    filterDataById(id) {
      if (!id) {
        this.filteredCargoData = this.allCargoData;
        return;
      }
      this.filteredCargoData = this.allCargoData.filter(item => item.id === id);
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
