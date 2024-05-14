<template>
<div class="h-100 d-flex flex-column align-stretch supplier">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <v-row justify="start">
                    <v-btn
                        @click="$router.push('/supplier/create')"
                        color="primary500"
                        height="40"
                        rounded
                        class="px-8 mt-1">
                        <template v-slot:prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                      افزودن تکی
                    </v-btn>

                    <ModalGroupAdd getEndPoint="supplier/csv/get/template" uploadEndpoint="supplier/csv/bulk" />
                </v-row>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                  <ModalColumnFilter
                      :changeHeaderShow="changeHeaderShow"
                      :header="header" />

                  <PanelFilter
                      path="supplier/index"
                      :filterField="filterField"
                      :typeItems="supplierTypeFilter"
                      :paymentType="paymentTypeFilter"
                  />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="supplierList.data"
            :page="page"
            :perPage="dataTableLength"
            editUrl="/supplier/edit/"
            activePath="supplier/crud/update/activation/"
            changeStatusUrl="supplier/crud/update/contract/"
            :loading="loading"
            @updateList = "updateList"
            updateUrl="supplier/csv/mass-update"
            model="Supplier" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="pr-5">
                <v-col cols="3">
                    <ModalExcelDownload getEndPoint="supplier/csv/get/export" />
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
import Table from '@/components/Supplier/Table/Table.vue'
import Supplier from "@/composables/Supplier";
import ModalTableFilter from '@/components/Supplier/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
export default {
    setup(props) {
      const supplierTypeFilter = [
        {
          label: 'همه',
          value: '',
        },
        {
          label: 'حقوقی',
          value: 'legal',
        },
        {
          label: 'حقیقی',
          value: 'genuine',
        },
      ]
      const  paymentTypeFilter= [
        {
          label: 'همه',
          value: '',
        },
        {
          label: 'نقدی',
          value: 'cash',
        },
        {
          label: 'امانی',
          value: 'safekeeping',
        },
        {
          label: 'اعتباری',
          value: 'credit',
        }
      ]
        const {
            pageLength,
            getSupplierList,
            supplierList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        } = Supplier();
        return {
            pageLength,
            getSupplierList,
            supplierList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading,
            supplierTypeFilter,
            paymentTypeFilter
        };
    },

    components: {
      PanelFilter,
        Table,
        ModalGroupAdd,
        ModalTableFilter,
        ModalColumnFilter,
        ModalExcelDownload,
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

        updateList(status){
            if(status === 'true'){
                this.getSupplierList();
            }
        },
    },

    mounted() {
        this.getSupplierList();
    },

    watch: {
      dataTableLength(val) {
        this.addPerPage(val)
      },
      confirmModal(val) {
        if (this.$cookies.get('deleteItem')) {
          if (!val) {
            this.getSupplierList();
            openToast(
                this.$store,
                'انبار با موفقیت حذف شد',
                "success"
            );
            this.$cookies.remove('deleteItem')
          }
        }
      },

      $route(){
        this.getSupplierList()
      }
    }
}
</script>
