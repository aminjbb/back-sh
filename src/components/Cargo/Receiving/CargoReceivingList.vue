<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="150" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="start"
          align="center"
          class="px-10 py-5">
        <v-col cols="5">

          <div class="text-right ">
                 <span class="text-gray600 t14500">
                 شناسه کارگو
                 </span>
            <span class="text-error">
                  *
                </span>
          </div>
          <div>
            <v-text-field :autofocus="true" @keyup.enter="addQrCode()" variant="outlined" :rules="rule" v-model="cargo"/>
          </div>
        </v-col>

      </v-row>
    </v-card>
    <v-card
        class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
        height="580"
    >
      <Table
          :checkDisabledCloseCargo="checkDisabledCloseCargo"
          class="flex-grow-1"
          editUrl="/categories/edit/"
          activePath="category/crud/update/activation/"
          deletePath="category/crud/delete/"
          :header="cargoReceivingHeader"
          :items="cargoReceivingList"
          updateUrl="category/csv/mass-update"
          :page="1"
          :perPage="1000"
          :loading="loading"
      />

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
</template>

<script>
import {ref} from 'vue'
//Components
import Table from '@/components/Cargo/Receiving/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import CreateCargo from '@/components/Cargo/Modal/CreateCargo.vue'
import Cargo from '@/composables/Cargo';
import {AxiosCall} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";

export default {

  components: {
    Table,
    ModalTableFilter,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    CreateCargo
  },

  data() {
    return {
      cargo: null,
      qrCode: '',
      rule: [v => !!v || 'این فیلد الزامی است'],
      loading: false,
      valid: true,
      closeCargoDisabled: false
    }
  },

  setup(props) {
    const {
       getCargoReceivingList, cargoReceivingList, dataTableLength, cargoReceivingHeader
    } = Cargo();
    return {
       getCargoReceivingList, cargoReceivingList, dataTableLength, cargoReceivingHeader
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
          this.getCargoReceivingList(cargoSplit[1])
        }
      }
      else{
        this.getCargoReceivingList(this.cargo)
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
        this.loading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.using_auth = true
        AxiosMethod.end_point = `cargo/close/${this.cargo}`
        AxiosMethod.toast_error = true
        AxiosMethod.store = this.$store
        let data = await AxiosMethod.axios_post()
        if (data) {
          openToast(this.$store , 'کارگو با موفیت بسته شد')
          this.loading = false
          this.cargo = ''
        }
      } catch (e) {
        this.loading = false
      }
    }
  },


}
</script>
