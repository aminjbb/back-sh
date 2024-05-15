<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
            <v-col cols="6" />

            <v-col cols="6" class="mt-3">
                <v-row justify="end">
                  <PanelFilter
                      path="warehouse_inventory/index"
                      :filterField="filterField"
                  />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="itemList.data"
            :page="page"
            :perPage="dataTableLength"
            @updateList = "updateList"
            :loading="loading"
            model="warehouseInventory" />

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
import Table from '@/components/WarehouseInventory/Table/Table.vue'
import WarehouseInventory from "@/composables/WarehouseInventory"
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue"

export default {
    components: {
      PanelFilter,
        Table
    },

    setup() {
        const {
            pageLength,
            getWarehouseInventoryList,
            itemList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        } = WarehouseInventory();
        return {
            pageLength,
            getWarehouseInventoryList,
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
                this.getWarehouseInventoryList();
            }
        },
    },

    mounted() {
        this.getWarehouseInventoryList();
    },

    watch: {
        dataTableLength(val) {
            this.getWarehouseInventoryList(val)
        },
      $route(){
        this.getWarehouseInventoryList()
      }
    }
}
</script>
