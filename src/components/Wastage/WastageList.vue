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
          ثبت ضایعات
        </v-col>
        <v-divider color="grey"/>
        <v-col cols="12" md="6">
          <div class="text-right  ">

                        <span class="text-gray600 t14500">
          اسکن سریال کالا
                        </span>
            <span class="text-error">
                            *
                        </span>
          </div>
          <div class="d-flex justify-end w-full">

            <div class=" w-full">
              <v-text-field
                  class="justify-end"
                  :autofocus="true"
                  variant="outlined"
                  :rules="rule"
                  v-model="shps_s"/>
            </div>

            <v-btn
                @click="addShps()"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5"
            >
              ثبت
            </v-btn>
          </div>


        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="itemList"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          @updateList="updateList"
          deletePath="report/crud/delete/"
          model="report" />

      <v-divider />

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
import Table from '@/components/Wastage/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Wastage from '@/composables/Wastage';
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

      rule: [v => !!v || 'این فیلد الزامی است'],
      allCargoData: [],
      filteredCargoData: [],
      closePackageLoading :false,


        shps_s: null,

    }
  },

  setup(props) {
    const {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = Wastage();
    return {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    async addShps() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'report/crud/create'
      AxiosMethod.form = formdata
      formdata.append('report_type', "wastage")
      formdata.append(`shps_s`, this.shps_s)
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false;
        this.getWasteShps();

      } else {
        this.loading = false
      }
    },


    updateList(status) {
      if (status === 'true') {
        this.getWasteAndLostList();
      }
    },
  },

  mounted() {
    this.getWasteAndLostList();
  },

  watch: {
    dataTableLength(val) {
      this.getWasteAndLostList(val)
    },
  }
}
</script>
