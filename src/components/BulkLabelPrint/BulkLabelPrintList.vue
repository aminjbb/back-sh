<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="200" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="start"
          align="start"
          class="px-10 py-5">
        <v-col
            cols="12"
            class="d-flex justify-center align-center t14500">
          اسکن شناسه بسته
        </v-col>
        <v-divider color="grey"/>
        <v-col cols="12" md="6">
          <div class="text-right  ">

                        <span class="text-gray600 t14500">
                            شناسه بسته
                        </span>
            <span class="text-error">
                            *
                        </span>
          </div>
          <div>
            <v-text-field
                :autofocus="true"
                variant="outlined"
                :rules="rule"
                @keyup.enter="scanPackageId()"
                v-model="packageId"/>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          deletePath="category/crud/delete/"
          :header="cargoReceivingHeader"
          :items="shpsList.shps_list "
          :page="1"
          :perPage="1000"
          :packageId="packageId"
          :loading="loading"/>

      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="px-5 py-2" justify="end">
          <v-btn
              @click="packingData()"
              color="primary500"
              height="40"
              rounded
              variant="flat"
              class="px-8 mt-2">
            بستن بسته
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {
  ref
} from 'vue'
//Components
import Table from '@/components/BulkLabelPrint/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import BulkLabelPrintList from '@/composables/BulkLabelPrint';
import {openToast} from "@/assets/js/functions";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'


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
      scanPackage:'',
      packageId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      allCargoData: [],
      filteredCargoData: [],
      closePackageLoading :false

    }
  },

  setup(props) {
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

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal;
    }
  },

  watch: {
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

    scanPackageId(){

      const packageSplit = this.packageId.split('-')
      let PackageScan = ''
      if (packageSplit[1]){
        PackageScan = packageSplit[1]
      }
      else{
        PackageScan = this.packageId
      }

      this.scanPackage = ''
      this.getShpsList(PackageScan, this.$store);
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
          this.closePackageLoading = false
          openToast(
              this.$store,
              'بسته با موفقیت ویرایش گردید',
              "success"
          );
        }
      }
      catch (e) {
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
