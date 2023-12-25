<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card
        height="200"
        class="ma-5 br-12 "
    >
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5"
      >
        <v-col cols="3">
          <div class="d-flex">
            <span>
              شناسه کارگو : ۱۲۳۴۵۶۷۸
            </span>
          </div>
        </v-col>

        <v-col cols="3">
          <div class="d-flex">
            <span>
              شناسه کارگو : ۱۲۳۴۵۶۷۸
            </span>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex">
            <span>
             خودرو : وانت آبی/ ایران ۱۱ ـ ۱۳۲ ب ۳۵
            </span>
          </div>
        </v-col>
        <v-col cols="8">
          <v-row justify="center" align="center">
            <v-col cols="8">
              <div>
                <div class="text-right ">
                 <span class="text-gray600 t14500">
                   شناسه بسته
                 </span>
                  <span class="text-error">
                  *
                </span>
                </div>
                <div>
                  <v-text-field variant="outlined"/>
                </div>
              </div>
            </v-col>
            <v-col cols="3">
              <v-btn
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-2">

                تایید
              </v-btn>
            </v-col>
          </v-row>
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
          :header="packageHeader"
          :items="[]"
          updateUrl="category/csv/mass-update"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
      />

      <v-divider/>

      <v-card-actions class="pb-3" >
        <v-row class="px-5 py-2"  justify="end">
          <v-btn
              color="primary500"
              height="40"
              rounded
              variant="flat"
              class="px-8 mt-2">

            تکمیل ظرفیت کارگو
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {ref} from 'vue'
//Components
import Table from '@/components/Cargo/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import CreateCargo from '@/components/Cargo/Modal/CreateCargo.vue'
import Cargo from '@/composables/Cargo';

export default {
  components: {
    Table,
    ModalTableFilter,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    CreateCargo
  },

  setup(props) {
    const {
      pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , packageHeader , item , filterField ,loading
    } = Cargo();
    return {
      pageLength, cargoList, addPerPage, getCargoList, dataTableLength , page  , packageHeader , item , filterField ,loading
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
    /**
     * Change Header Status
     * @param {*} index
     * @param {*} value
     */
    changeHeaderShow(index, value) {
      this.header[index].show = value
    }
  }
}
</script>
