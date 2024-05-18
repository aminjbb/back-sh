<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
            <v-col cols="6" />

            <v-col cols="6" class="d-flex justify-end ">
              <PanelFilter
                  path="active-package/index"
                  :filterField="filterField"
                  :typeItems="typeList"
                  :statusItems="statusListPackage"/>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="packageList.data"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
            @updateList="updateList"
            deletePath="package/crud/delete/"
            model="package" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start" />

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
import Table from '@/components/ActivePackage/Table/Table.vue'
import ActivePackage from "@/composables/ActivePackage";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
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
      const statusListPackage = [
        {
          label: 'خالی',
          value: 'empty'
        },
        {
          label: 'لودینگ',
          value: 'loading'
        },
        {
          label: 'در حال بارگیری',
          value: 'luggage'
        },
        {
          label: 'انتقال به انبار اصلی',
          value: 'sent_to_warehouse'
        },
        {
          label: 'رسیده به انبار اصلی',
          value: 'received_by_warehouse'
        }
      ]
        const {
            pageLength,
            getPackageList,
            packageList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        } = ActivePackage();
        return {
            pageLength,
            getPackageList,
            packageList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading,
            typeList,
            statusListPackage
        }
    },

    components: {
      PanelFilter,
      Table
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
                this.getPackageList()
            }
        }
    },

    mounted() {
      this.getPackageList()
    },

    watch: {
      dataTableLength(val) {
        this.getPackageList(val)
      },

      $route(){
        this.getPackageList()
      }
    }
}
</script>
