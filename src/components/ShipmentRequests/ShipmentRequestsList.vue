<template>
    <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
            <v-row
                justify="center"
                align="center"
                class="px-10 py-5">
                <v-col cols="6" />
    
                <v-col cols="6">
                    <v-row justify="end">
                        <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />
    
                        <ModalTableFilter path="shipment-requests/index" :filterField="filterField" />
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    
        <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
            <Table
                :getShipmentRequestsList="getShipmentRequestsList"
                class="flex-grow-1"
                :header="header"
                :items="ShipmentRequestsList.data"
                :page="page"
                :perPage="dataTableLength"
                activePath="page/crud/update/activation/"
                :loading="loading"
                updateUrl="page/csv/mass-update"

                model="page" />
    
            <v-divider />
    
            <v-card-actions class="pb-3">
                <v-row class="px-8">
                    <v-col cols="3" class="d-flex justify-start">
<!--                        <ModalExcelDownload getEndPoint="cargo/csv/requested/cargo/export" />-->
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
    import Table from '@/components/ShipmentRequests/Table/Table.vue'
    import ShipmentRequests from "@/composables/ShipmentRequests";
    import ModalTableFilter from '@/components/ShipmentRequests/Filter/Filter.vue'
    import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
    import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
    import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
    import { openToast} from "@/assets/js/functions";
    export default {
        setup(props) {
            const {
                pageLength,
                getShipmentRequestsList,
                ShipmentRequestsList,
                filterField,
                dataTableLength,
                page,
                header,
                addPagination,
                addPerPage,
                loading
            } = ShipmentRequests();
            return {
                pageLength,
                getShipmentRequestsList,
                ShipmentRequestsList,
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
                    this.getShipmentRequestsList();
                }
            },
        },
    
        mounted() {
            this.getShipmentRequestsList();
        },
    
        watch: {
            dataTableLength(val) {
                this.addPerPage(val)
            },
            confirmModal(val) {
                if (this.$cookies.get('deleteItem')) {
                    if (!val) {
                        this.getPageList();
                        openToast(
                            this.$store,
                            'صفحه مورد نظر با موفقیت حذف شد',
                            "success"
                        );
                        this.$cookies.remove('deleteItem')
                    }
                }
            },
            $route(){
                this.getShipmentRequestsList();

            }
        }
    }
    </script>
    