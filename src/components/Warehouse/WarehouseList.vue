<template>
<div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <v-row justify="start">
                    <v-btn
                        @click="$router.push('/warehouse/create')"
                        color="primary500"
                        height="40"
                        rounded
                        class="px-8 mt-1">
                        <template v-slot:prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                        افزودن انبار جدید
                    </v-btn>

                </v-row>
            </v-col>

            <v-col cols="6">
                <v-row justify="end" />
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            @resetPage="resetPage"
            class="flex-grow-1"
            :header="header"
            :items="warehouseList.data"
            :page="page"
            :perPage="dataTableLength"
            editUrl="/warehouse/edit/"
            activePath="warehouse/crud/update/activation/"
            deletePath="warehouse/crud/delete/"
            :loading="loading"
            model="Warehouse" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="pr-5">
                <v-col cols="3">
                    <ModalExcelDownload getEndPoint="warehouse/csv/get/export" />
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
import Table from '@/components/Warehouse/Table/Table.vue'
import Warehouse from "@/composables/Warehouse";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
export default {
  components: {
    ModalExcelDownload,
    Table
  },

  setup() {
    const {
      pageLength,
      getWarehouseList,
      warehouseList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = Warehouse();
    return {
      pageLength,
      getWarehouseList,
      warehouseList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    };
  },

  data() {
    return {
      perPageFilter:false
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    }
  },

  mounted() {
    this.getWarehouseList();
  },

  watch: {
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

    $route(){
      this.getWarehouseList()
    },

    page(){
      if (!this.perPageFilter){
        this.getWarehouseList()
      }
    },

    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getWarehouseList();
          openToast(
              this.$store,
              'انبار با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
  }
}
</script>
