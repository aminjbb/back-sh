<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="200" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="space-between"
          align="start"
          class="px-10 py-5">
        <v-col
            cols="12"
            class="d-flex justify-center align-center t14500">
          ثبت ضایعات
        </v-col>
        <v-divider color="grey"/>
        <v-col cols="12" md="6" >
          <div class="text-right">
            <span class="text-gray600 t14500">اسکن سریال کالا</span>
            <span class="text-error">*</span>
          </div>
          <div class="d-flex justify-between">
            <div>
                 <v-text-field
                     class="shrink"
                  :autofocus="true"
                  variant="outlined"
                  :rules="rule"
                    style="width: 500px;"
                  v-model="shps_s"/>
            </div>

            <div>
              <v-btn
                  @click="addShps()"
                  color="primary500"
                  height="40"
                  rounded
                  variant="flat">ثبت </v-btn>

            </div>
          </div>
        </v-col>
        <v-col cols="12" md="1" class="mt-3">
          <PanelFilter
              path="wastage/index"
              :filterField="filterField"
              :typeItems="typeList"
              :shipmentTypeItems="shipmentTypes"
          />
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
        <v-row class="pr-5">
          <v-col cols="3">
          </v-col>

          <v-col cols="6">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left" />
            </div>
          </v-col>

          <v-col cols="3">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
              <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]" />
                        </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
//Components
import Table from '@/components/Wastage/Table/Table.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Wastage from '@/composables/Wastage';
import {openToast} from "@/assets/js/functions";
import {
  AxiosCall
} from '@/assets/js/axios_call.js'
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  components: {
    PanelFilter,
    Table,
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
      perPageFilter:false
    }
  },

  setup() {
    const typeList= [
      {
        label: 'پالت',
        value: 'pallet'
      },
      {
        label: 'بالک',
        value: 'bulk'
      },
    ]
    const shipmentTypes= [
      {
        label: 'کراس داک فروشندگان',
        value: 'cross_dock_marketplace'
      },
      {
        label: 'محموله های شاواز',
        value: 'consignment_shavaz'
      },
      {
        label: 'محموله های فروشندگان',
        value: 'consignment_marketplace'
      }
    ]

    const {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      loading,
    } = Wastage();
    return {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      loading,
      typeList,
      shipmentTypes
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
     try {
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
         this.getWasteAndLostList();
         this.loading = false;
       } else {
         this.loading = false
       }
     }
     catch (e) {
       this.loading = false;
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
    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getWasteAndLostList();
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    dataTableLength() {
      this.perPageFilter = true
      this.page = 1
      let query = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...query,
            per_page: this.dataTableLength,
          }
        })
      }
      else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },
    page(){
      if (!this.perPageFilter){
        this.getWasteAndLostList()
      }
    },

    $route(){
      this.getWasteAndLostList()
    }
  }
}
</script>
