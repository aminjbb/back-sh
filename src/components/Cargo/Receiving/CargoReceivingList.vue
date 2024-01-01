<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="150" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="start"
          align="center"
          class="px-10 py-5">
        <v-col cols="5">
          <v-form v-model="valid" @submit.prevent="getCargoReceivingList(cargo)" ref="shipmentId" class="">
            <div class="text-right ">
                 <span class="text-gray600 t14500">
                 شناسه کارگو
                 </span>
              <span class="text-error">
                  *
                </span>
            </div>
            <div>
              <v-text-field variant="outlined" :rules="rule" v-model="cargo" />
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
          editUrl="/categories/edit/"
          activePath="category/crud/update/activation/"
          deletePath="category/crud/delete/"
          :header="cargoReceivingHeader"
          :items="cargoReceivingList"
          updateUrl="category/csv/mass-update"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
      />

      <v-divider/>

      <v-card-actions class="pb-3" >
        <v-row class="px-5 py-2"  justify="end">
          <v-btn
              @click="updateCargo()"
              :disabled="!cargo"
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

export default {

  components: {
    Table,
    ModalTableFilter,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    CreateCargo
  },

  data(){
    return{
      cargo:null ,
      qrCode:'',
      rule:[v=> !!v || 'این فیلد الزامی است'],
      loading:false,
      valid:true
    }
  },

  mounted() {
    var element = document.body // You must specify element here.
    element.addEventListener('keydown', e => {
      if (e.key == 'Enter' ) this.addQrCode()
      else this.qrCode += e.key
    });
  },

  setup(props) {
    const {
      pageLength,  addPerPage, getCargoReceivingList , cargoReceivingList, dataTableLength , page  , cargoReceivingHeader
    } = Cargo();
    return {
      pageLength,  addPerPage, getCargoReceivingList , cargoReceivingList, dataTableLength , page  , cargoReceivingHeader
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  watch: {
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
    addQrCode(){
      this.cargo = this.qrCode
      this.qrCode = ''
      this.getCargoReceivingList(this.cargo)
    },
    /**
     * Change Header Status
     * @param {*} index
     * @param {*} value
     */
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    async updateCargo(){
      this.loading = true
      const AxiosMethod = new AxiosCall()
      const formData =  new FormData()
      formData.append('status' , 'received_by_warehouse')
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.using_auth =true
      AxiosMethod.form =formData
      AxiosMethod.end_point = `cargo/crud/update/status/${this.cargo}`
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.cargo = ''
      }
    }
  },


}
</script>
