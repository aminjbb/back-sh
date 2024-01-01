<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card
        height="300"
        class="ma-5 br-12 "
    >
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5"
      >
        <v-col cols="5">
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
              <v-text-field v-model="packageId" variant="outlined"/>
            </div>
          </div>
        </v-col>
        <v-col cols="5">
          <div>
            <div class="text-right ">
                 <span class="text-gray600 t14500">
                  شماره جایگاه
                 </span>
              <span class="text-error">
                  *
                </span>
            </div>
            <div>
              <v-autocomplete item-title="id" item-value="id" :items="placementList" v-model="shelf" variant="outlined"/>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="end" align="center">
        <v-btn
            @click="addPackage()"
            :loading="loadingBtn"
            color="primary500"
            :disabled="!(shelf&&packageId)"
            height="40"
            rounded
            class="ml-15 px-8 mt-2">

          ذخیره
        </v-btn>
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
          :header="header"
          :items="packagePlacement.data"
          updateUrl="category/csv/mass-update"
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
import Table from '@/components/PackagePlacement/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import PackagePlacement from '@/composables/PackagePlacement';
import Placement from '@/composables/Placement';
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  components: {
    Table,
    ModalTableFilter,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,

  },
  data(){
    return{
      packageId:null,
      shelf:null,
      loadingBtn:false
    }
  },
  setup(props) {
    const {getAllPlacementList , placementList} = new Placement()
    const {
      pageLength, packagePlacement, addPerPage, getPackagePlacement, dataTableLength , page  , header , item ,
      loading
    } = PackagePlacement();
    return {
      pageLength, packagePlacement, addPerPage, getPackagePlacement, dataTableLength , page  , header , item ,
      loading ,
      getAllPlacementList , placementList
    };
  },
  mounted() {
    this.getPackagePlacement()
    this.getAllPlacementList()
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
    },

    async addPackage(){
      this.loadingBtn = true
      var formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `placement/assign/package/`
      formData.append('package_id', this.packageId)
      formData.append('placement_id', this.shelf)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loadingBtn = false
      }
      else {
        this.loadingBtn = false
      }
    }
  },


}
</script>
