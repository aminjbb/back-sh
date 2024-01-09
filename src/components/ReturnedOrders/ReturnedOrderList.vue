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
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                    <ModalTableFilter path="returned-orders/index" :filterField="filterField" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="mocketData"
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
import Table from '@/components/ReturnedOrders/Table/Table.vue'
import ReturnedOrders from "@/composables/ReturnedOrders";
import ModalTableFilter from '@/components/ReturnedOrders/Filter/Filter.vue'
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";

export default {
    data() {
        return {
            "mocketData": [{
                    "id": 21,
                    "user": {
                        "first_name": "اویس",
                        "last_name": "اویس"
                    },
                    "shps_count": 10,
                    "status": "paid",
                    "payment_status": "unsuccessful",
                    "payment_method": "saman",
                    "packed_status": 1,
                    "total_price": 22500000,
                    "paid_price": 20000000,
                    "submit_date": "2023-12-30 13:11:39",
                    "submit_date_fa": "1402/10/09",
                    "receive_date": "2024-01-04 13:11:39",
                    "receive_date_fa": "1402/10/14",
                    "total_discount": 2500000,
                    "state": {
                        "id": 1,
                        "label": "فارس"
                    },
                    "city": {
                        "id": 1,
                        "label": "شیراز"
                    }
                },
                {
                    "id": 22,
                    "user": {
                        "first_name": "اویس",
                        "last_name": "اویس"
                    },
                    "shps_count": 10,
                    "status": "paid",
                    "payment_status": "contradictory",
                    "payment_method": "wallet",
                    "packed_status": 0,
                    "total_price": 22500000,
                    "paid_price": 20000000,
                    "submit_date": "2023-12-30 13:11:50",
                    "submit_date_fa": "1402/10/09",
                    "receive_date": "2024-01-04 13:11:50",
                    "receive_date_fa": "1402/10/14",
                    "total_discount": 2500000,
                    "state": {
                        "id": 1,
                        "label": "فارس"
                    },
                    "city": {
                        "id": 1,
                        "label": "شیراز"
                    }
                },
                {
                    "id": 23,
                    "user": {
                        "first_name": "اویس",
                        "last_name": "اویس"
                    },
                    "shps_count": 10,
                    "status": "paid",
                    "payment_status": "successful",
                    "payment_method": "snapp",
                    "packed_status": 0,
                    "total_price": 22500000,
                    "paid_price": 20000000,
                    "submit_date": "2023-12-30 13:11:51",
                    "submit_date_fa": "1402/10/09",
                    "receive_date": "2024-01-04 13:11:51",
                    "receive_date_fa": "1402/10/14",
                    "total_discount": 2500000,
                    "state": {
                        "id": 1,
                        "label": "فارس"
                    },
                    "city": {
                        "id": 1,
                        "label": "شیراز"
                    }
                }
            ]
        }
    },

    setup(props) {
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
            loading
        };
    },

    components: {
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
    }
}
</script>
