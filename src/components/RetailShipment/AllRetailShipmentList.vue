<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6">

        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <PanelFilter path="seller/index" :filterField="filterFieldAllRetail" />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="retailShipments"
          :page="page"
          :perPage="dataTableLength"
          editUrl="/seller/edit/"
          activePath="seller/crud/update/activation/"
          changeStatusUrl="seller/crud/update/contract/"
          :loading="loading"
          updateUrl="seller/csv/mass-update"
          model="seller" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <ModalExcelDownload getEndPoint="seller/csv/get/export" />
          </v-col>

          <v-col cols="6" class="d-flex justify-center">
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

          <v-col cols="3" class="d-flex justify-end">
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
import Table from '@/components/RetailShipment/Table/RetailShipmentTable.vue'
import RetailShipment from "@/composables/RetailShipment";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
export default {
  setup() {
    const {
      filterFieldAllRetail,
      getRetailShipmentList,
      retailShipments,
      pageLength ,
      addPerPage,
      dataTableLength,
      page,
      header,
      loading
    } = RetailShipment();

    return {
      filterFieldAllRetail,
      getRetailShipmentList,
      retailShipments,
      pageLength ,
      addPerPage,
      dataTableLength,
      page,
      header,
      loading
    };
  },

  components: {
    Table,
    ModalColumnFilter,
    ModalExcelDownload,
    PanelFilter
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

  },

  mounted() {
    this.getRetailShipmentList()
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          openToast(
              this.$store,
              'محصول با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>
