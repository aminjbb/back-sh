<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <!--      <CargoReceivingList/>-->
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card height="150" class="ma-5 br--12 stretch-card-header-90">
          <v-row
              justify="start"
              align="center"
              class="px-10 py-5">
            <v-col cols="5">

              <div class="text-right ">
                <span class="text-gray600 t14 w500">شناسه کارگو</span>
                <span class="text-error">*</span>
              </div>
              <div>
                <v-text-field :autofocus="true" @keyup.enter="addQrCode()" variant="outlined" :rules="rule" v-model="cargo"/>
              </div>
            </v-col>

          </v-row>
        </v-card>
        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="cargoReceivingHeader"
              :items="itemsListTable"
              :page="1"
              :perPage="dataTableLength"
              :loading="loading">

            <template v-slot:customSlot="item">
              <v-progress-circular
                  v-if="form[item.index].loading"
                  indeterminate
                  color="primary"></v-progress-circular>
              <div
                  v-else
                  @click="updatePackage(item , item.index)"
                  class="seller__add-sku-btn d-flex justify-center align-center pointer">

                <v-icon size="15" v-if="!form[item.index].sent_to_warehouse">mdi-dots-horizontal</v-icon>
                <v-icon size="15" v-else>mdi-check</v-icon>
              </div>
            </template>
          </ShTable>

          <v-divider/>

          <v-card-actions class="pb-3">
            <v-row class="px-5 py-2" justify="end">
              <v-btn
                  @click="updateCargo()"
                  :disabled="closeCargoDisabled"
                  :loading="loading"
                  color="primary500"
                  height="40"
                  rounded
                  variant="flat"
                  class="px-8 mt-2">
                بستن کارگو
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const CargoReceivingList = defineAsyncComponent(()=> import ('@/components/Cargo/Receiving/CargoReceivingList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import CreateCargo from '@/components/Cargo/Modal/CreateCargo.vue'
import Cargo from '@/composables/Cargo';
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  components: {
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    CreateCargo,
    ShTable,
    DashboardLayout,
    Header
  },

  data() {
    return {
      cargo: null,
      qrCode: '',
      rule: [v => !!v || 'این فیلد الزامی است'],
      loading: false,
      valid: true,
      closeCargoDisabled: false,
      itemsListTable: [],
      form:[
        {
          sent_to_warehouse:false,
          loading:false
        }
      ],
    }
  },

  setup() {
    const {
      getCargoReceivingList,
      cargoReceivingList,
      dataTableLength,
      cargoReceivingHeader
    } = Cargo();
    return {
      getCargoReceivingList,
      cargoReceivingList,
      dataTableLength,
      cargoReceivingHeader
    };
  },

  methods: {
    checkDisabledCloseCargo(form) {
      const sentToWarehouseCargo = form.find(cargoDetail => cargoDetail.sent_to_warehouse == false)
      if (sentToWarehouseCargo) this.closeCargoDisabled = true
      else this.closeCargoDisabled = false
    },
    addQrCode() {
      if (this.cargo.includes('-')) {
        const cargoSplit = this.cargo.split('-')
        if (cargoSplit[1]) {
          this.getCargoReceivingList(cargoSplit[1] , this.$store)
        }
      }
      else{
        this.getCargoReceivingList(this.cargo , this.$store)
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

    async updateCargo() {
      try {
        let cargo = null
        if (this.cargo.includes('-')){
          const cargoSplit = this.cargo.split('-')
          if (cargoSplit[1]) cargo= cargoSplit[1]
          else cargo= this.cargo
        }
        else cargo= this.cargo
        this.loading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.using_auth = true
        AxiosMethod.end_point = `cargo/close/${cargo}`
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        let data = await AxiosMethod.axios_post()
        if (data) {
          openToast(this.$store , 'کارگو با موفیت بسته شد')
          this.loading = false
          this.cargo = ''
        }
        else {
          this.loading = false
        }
      } catch (e) {
        this.loading = false
      }
    },

    async updatePackage(item , index) {
      try {
        this.form[index].loading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `package/received/${item.data.id}`
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.form[index].loading = false
          this.form[index].sent_to_warehouse = true
          this.checkDisabledCloseCargo( this.form)
        }
        else{
          this.form[index].loading = false
        }
      }
      catch (e) {
        this.form[index].loading = false
      }
    },
  },

  watch: {
    cargoReceivingList() {
      this.itemsListTable = [];

      this.cargoReceivingList.forEach((element) => {
        let form = {};

        if (element.status == 'received_by_warehouse') {
          form = {
            sent_to_warehouse: true,
            loading: false
          };
        } else {
          form = {
            sent_to_warehouse: false,
            loading: false
          };
        }

        this.form.push(form);

        this.itemsListTable.push({
          id: element.id,
          shps_variety: element.shps_variety,
          shps_count: element.shps_count,
          custom: element.status,
        });

        this.checkDisabledCloseCargo(this.form);
      });
    },
  }

}

</script>

