<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header />

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
                                <ModalColumnFilter
                                    :changeHeaderShow="changeHeaderShow"
                                    :header="header" />

                                <PanelFilter
                                    @resetPage="resetPage"
                                    :factorId="$route.query.factor_id"
                                    path="retail-shipment/index"
                                    :filterField="filterFieldAllRetail"
                                    :statusItems="status" />
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>

                <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
                    <ShTable
                        class="flex-grow-1"
                        :headers="header"
                        :items="itemListTable"
                        :page="page"
                        :perPage="dataTableLength"
                        :loading="loading"
                    >
                        <template v-slot:actionSlot="item">
                            <div class="text-center">
                                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                                    mdi-dots-vertical
                                </v-icon>
                            </div>

                            <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                                <v-list class="c-table__more-options">
                                    <v-list-item>
                                        <v-list-item-title>
                                            <div class="ma-5 pointer" @click="$router.push(`/retail-shipment/${item.data.id}/edit/shps`)">
                                                <v-icon class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                                                <span class="mr-2 text-grey-darken-1 t14 w300">
                                                    مدیریت کالاها
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item :disabled="checkPermission(item.data.originalStatus)">
                                        <v-list-item-title>
                                            <ModalRequestShipment :id="item.data.id" :getRetailShipmentList="getRetailShipmentList"/>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-title>
                                            <div class=" pointer" @click="print(item.data.id)">
                                                <v-icon class="text-grey-darken-1">mdi-eye-outline</v-icon>
                                                <span class="mr-2 text-grey-darken-1 t14 w300">
                                                    نمایش جزئیات
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item :disabled="checkPermission(item.data.originalStatus )">
                                        <v-list-item-title>
                                            <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                                <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                                                <span class="mr-2 text-grey-darken-1 t14 w300">
                                                    حذف
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </ShTable>
                    <v-divider />

                    <v-card-actions class="pb-3">
                        <v-row class="px-8">
                            <v-col cols="3" class="d-flex justify-start">
                                <!--            <ModalExcelDownload getEndPoint="cargo/csv/export" />-->
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

        </v-main>
    </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

import RetailShipment from "@/composables/RetailShipment";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import ModalRetailShipmentDetail from "@/components/RetailShipment/Modal/ModalRetailShipmentDetail.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalRequestShipment from "@/components/RetailShipment/Modal/ModalRequestShipment.vue";

export default {
    components: {
        ModalRequestShipment,
        DashboardLayout,
        Header,
        PanelFilter,
        ModalRetailShipmentDetail,
        ModalColumnFilter,
        ModalExcelDownload,
        ShTable
    },

    setup() {
        const status= [
            {
                label: 'همه',
                value: '',
            },
            {
                label: 'در انتظار',
                value: 'waiting',
            },
            {
                label: 'در حال بررسی',
                value: 'in_review',
            },
            {
                label: 'رد شده',
                value: 'rejected',
            },
            {
                label: 'تایید شده',
                value: 'approved',
            },
            {
                label: 'در حال ارسال به انبار',
                value: 'sending_warehouse',
            },
            {
                label: 'رسیده به انبار',
                value: 'received_by_warehouse',
            },
            {
                label: 'در حال شمارش',
                value: 'counting',
            },
            {
                label: 'تایید شده انبار',
                value: 'approved_by_warehouse',
            },
            {
                label: 'به سمت انبار اصلی',
                value: 'sending_base_warehouse',
            },
            {
                label: 'رسیده به انبار اصلی',
                value: 'received_base_warehouse',
            },
            {
                label: 'در حال جایگذاری',
                value: 'locating',
            },
            {
                label: 'موجود شده در انبار',
                value: 'located',
            },
        ]
        const {
            filterFieldAllRetail,
            getRetailShipmentList,
            retailShipments,
            pageLength,
            dataTableLength,
            page,
            header,
            loading
        } = RetailShipment()

        return {
            filterFieldAllRetail,
            getRetailShipmentList,
            retailShipments,
            pageLength,
            dataTableLength,
            page,
            header,
            loading,
            status
        }
    },

    data() {
        return {
            perPageFilter:false,
            itemListTable: [],
            statusItems: [
                {
                    label: 'در انتظار',
                    value: 'waiting',
                },
                {
                    label: 'کنسل شده',
                    value: 'canceled',
                },
                {
                    label: 'در حال بررسی',
                    value: 'in_review',
                },
                {
                    label: 'رد شده',
                    value: 'rejected',
                }, {
                    label: 'تایید شده',
                    value: 'approved',
                }, {
                    label: 'در حال ارسال به انبار',
                    value: 'sending_warehouse',
                }, {
                    label: 'رسیده به انبار',
                    value: 'received_by_warehouse',
                }, {
                    label: 'در حال شمارش',
                    value: 'counting',
                }, {
                    label: 'تایید شده انبار',
                    value: 'approved_by_warehouse',
                }, {
                    label: 'به سمت انبار اصلی',
                    value: 'sending_base_warehouse',
                }, {
                    label: 'رسیده به انبار اصلی',
                    value: 'received_base_warehouse',
                }, {
                    label: 'در حال جایگذاری',
                    value: 'locating',
                },
                {
                    label: 'موجود شده در انبار',
                    value: 'available_in_warehouse',
                },
            ],
            permissions: ['approved', 'sending_warehouse', 'received_by_warehouse',
                'counting', 'approved_by_warehouse', 'sending_base_warehouse',
                'received_base_warehouse', 'locating', 'located', 'canceled']

        }
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
        resetPage(){
            this.perPageFilter = true
            this.page = 1
            setTimeout(()=>{
                this.perPageFilter = false
            }, 1000)
        },

        removeItem(id) {
            openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'shipment/consignment/crud/delete/'+id, true)
        },
        getStatus(status) {
            const persianStatus = this.statusItems.find(element => element.value === status)
            if (persianStatus){
                return persianStatus.label
            }
        },
        checkPermission(status) {
            const index = this.permissions.findIndex(permission => permission === status)
            if (index > -1) return true
            return false
        },
        print(id) {
            window.open(`${ import.meta.env.VITE_API_SITEURL}retail-shipment/${id}/print`, '_blank');
        },
    },

    mounted() {
        this.getRetailShipmentList()
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
        page(){
            if (!this.perPageFilter){
                this.getRetailShipmentList()
            }
        },
        confirmModal(val) {
            if (localStorage.getItem('deleteObject') === 'done') {
                if (!val) {
                    this.getRetailShipmentList();
                    openToast(
                        this.$store,
                        'محصول با موفقیت حذف شد',
                        "success"
                    );
                    localStorage.removeItem('deleteObject')
                }
            }
        },
        $route(){
            this.getRetailShipmentList()
        },

        retailShipments() {
            this.itemListTable = []
            this.retailShipments.forEach((item) => {
                this.itemListTable.push(
                    {
                        id: item.id,
                        factor_id: item.factor_id ? item.factor_id : '-',
                        shps_count: item.shps_count,
                        shps_variety: item.shps_variety,
                        creator: item.creator.first_name && item.creator?.last_name ? item.creator?.first_name +' '+item.creator?.last_name : '--',
                        created_at_fa: item.created_at_fa,
                        updated_at_fa: item.updated_at_fa,
                        status: this.getStatus(item.status),
                        originalStatus: item.status
                    }
                )
            })
        },
    }
}
</script>
