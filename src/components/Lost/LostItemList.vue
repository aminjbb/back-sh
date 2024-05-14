<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">


        <v-col cols="12">
          <v-row justify="end pa-3">
            <PanelFilter
                path="lost/index"
                :filterField="filterField"
                :typeItems="typeList"
                :shipmentTypeItems="shipmentTypes"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
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
import Table from '@/components/Lost/Table/Table.vue'
import Lost from "@/composables/Lost";
import ModalTableFilter from '@/components/Lost/Filter/Filter.vue'
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  components: {
    PanelFilter,
    Table,
    ModalTableFilter,
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
      addPagination,
      addPerPage,
      loading
    } = Lost();
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
      this.addPerPage(val)
    },


  }
}
</script>
