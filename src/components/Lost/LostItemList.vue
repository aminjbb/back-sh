<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">


        <v-col cols="12">
          <v-row justify="end p-5">


<!--            <ModalTableFilter path="report/index" :filterField="filterField" />-->
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
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
          </v-col>

          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="4"
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
import Table from '@/components/Lost/Table/Table.vue'
import Lost from "@/composables/Lost";
import ModalTableFilter from '@/components/WasteAndLost/Filter/Filter.vue'


export default {
  components: {
    Table,
    ModalTableFilter,
  },
  data(){
    return{
      lostItemData:[
        {
          "id": 3,
          "package_id": 9,
          "package_type": "bulk",
          "shipment_type": "consignment_shavaz",
          "seller_id": null,
          "supplier": {
            "full_name": "supplier 3",
            "shopping_name": "shopping name 3"
          },
          "shps_s": 2279,
          "shps": {
            "id": 42,
            "label": "شامپوی بدن شون مناسب برای  آقایان 1 عدد",
            "seller": {
              "id": 2,
              "shopping_name": "فروشگاه نکین اسدی3ثث"
            }
          },
          "report_type": "lost",
          "creator": {
            "id": 4,
            "first_name": "حانیه",
            "last_name": "عاصمی"
          },
          "created_at": "2024-01-01T10:27:44.000000Z",
          "created_at_fa": "1402/10/11",
          "updated_at": "2024-01-01T10:27:44.000000Z",
          "updated_at_fa": "1402/10/11"
        },
        {
          "id": 4,
          "package_id": 9,
          "package_type": "bulk",
          "shipment_type": "consignment_shavaz",
          "seller_id": null,
          "supplier": {
            "full_name": "supplier 3",
            "shopping_name": "shopping name 3"
          },
          "shps_s": 2279,
          "shps": {
            "id": 42,
            "label": "شامپوی بدن شون مناسب برای  آقایان 1 عدد",
            "seller": {
              "id": 2,
              "shopping_name": "فروشگاه نکین اسدی3ثث"
            }
          },
          "report_type": "lost",
          "creator": {
            "id": 4,
            "first_name": "حانیه",
            "last_name": "عاصمی"
          },
          "created_at": "2024-01-01T10:30:56.000000Z",
          "created_at_fa": "1402/10/11",
          "updated_at": "2024-01-01T10:30:56.000000Z",
          "updated_at_fa": "1402/10/11"
        }
      ]
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
