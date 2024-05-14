<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
            <v-col cols="6" />

            <v-col cols="6">
                <v-row justify="end" class="mt-0">
                    <ModalColumnFilter
                        :changeHeaderShow="changeHeaderShow"
                        :header="header" />

                  <PanelFilter
                      path="returned-orders/index"
                      :filterField="filterField"
                      :statusItems="status"
                      :paymentMethods="paymentMethods"
                      :packedStatus="packedStatus"
                  />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="returnedOrderList?.data"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
            @updateList="updateList"
            deletePath="returned-orders/crud/delete/"
            model="returned-orders" />

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
import Table from '@/components/ReturnedOrders/Table/Table.vue'
import ReturnedOrders from "@/composables/ReturnedOrders";
import ModalTableFilter from '@/components/ReturnedOrders/Filter/Filter.vue'
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
    setup(props) {
      const status = [
        {
          label: 'پیش پردازش',
          value: 'pre_progress'
        },
        {
          label: 'ارسال شده',
          value: 'sending'
        },
        {
          label: 'تحویل داده شده',
          value: 'received'
        }
      ]
      const paymentMethods= [
        {
          label: 'کیف پول',
          value: 'wallet'
        },
        {
          label: 'آنلاین',
          value: 'online'
        },
        {
          label: 'اسنپ پی',
          value: 'snap_pay'
        }
      ]
      const packedStatus = [
        {
          label: 'بارگیری شده',
          value: '1'
        },
        {
          label: 'بارگیری نشده',
          value: '0'
        }
      ]

        const {
            pageLength,
            getReturnedOrderList,
            returnedOrderList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        } = ReturnedOrders();
        return {
            pageLength,
            getReturnedOrderList,
            returnedOrderList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading,
            paymentMethods,
            status,
            packedStatus
        };
    },

    components: {
      PanelFilter,
        Table,
        ModalTableFilter,
        ModalColumnFilter
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
                this.getReturnedOrderList();
            }
        },
    },

    mounted() {
        this.getReturnedOrderList();
    },

    watch: {
      dataTableLength(val) {
            this.getReturnedOrderList(val)
        },
      $route(){
        this.getReturnedOrderList()
      }
    }
}
</script>
