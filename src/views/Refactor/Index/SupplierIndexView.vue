<template>
    <v-layout class="bg-gray">
        <DashboardLayout />
        <v-main class="h-100vh">
            <Header />

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
                                    @resetPage="resetPage"
                                    path="supplier/index"
                                    :filterField="filterField"
                                    :statusItems="activeStatus"
                                    :typeItems="supplierTypeFilter"
                                    :paymentType="paymentTypeFilter"
                                />
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>

                <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
                    <ShTable
                        class="flex-grow-1"
                        :headers="header"
                        :items="itemListTable"
                        :page="page"
                        :perPage="dataTableLength"
                        activePath="supplier/crud/update/activation/"
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
                                            <div class="ma-5 pointer" @click="$router.push(`/supplier/edit/${item.data.id}`)">
                                                <v-icon size="small" class="text-grey-darken-1">
                                                    mdi-pen
                                                </v-icon>
                                                <span class="mr-2 text-grey-darken-1 t14 w300">
                                                    ویرایش
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-title>
                                            <div class="ma-5 pointer" @click="changeStatus(item.data)">
                                                <template v-if="item.data.contract_status === 'associate'">
                                                    <v-icon class="text-grey-darken-1">mdi-close-circle-outline</v-icon>
                                                    <span class="mr-2 text-grey-darken-1 t14 w300">توقف همکاری </span>
                                                </template>

                                                <template v-if="item.data.contract_status === 'disassociate'">
                                                    <v-icon class="text-grey-darken-1">mdi-check-circle-outline</v-icon>
                                                    <span class="mr-2 text-grey-darken-1 t14 w300">شروع همکاری </span>
                                                </template>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </ShTable>

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

        </v-main>
    </v-layout>
</template>
<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

import {ref} from "vue";
import Supplier from "@/composables/Supplier";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    data() {
        return {
            perPageFilter:false,
            itemListTable:[]
        }
    },
    setup() {
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
        const activeStatus = ref([
            {
                label: 'همه',
                value: '',
            },
            {
                label: 'فعال',
                value: '1',
            },
            {
                label: 'غیرفعال',
                value: '0',
            }
        ])
        const {
            pageLength,
            getSupplierList,
            supplierList,
            filterField,
            dataTableLength,
            page,
            header,
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
            loading,
            supplierTypeFilter,
            paymentTypeFilter,
            activeStatus
        };
    },

    components: {
        DashboardLayout,
        Header,
        PanelFilter,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
        ShTable
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

        resetPage(){
            this.perPageFilter = true
            this.page = 1
            setTimeout(()=>{
                this.perPageFilter = false
            }, 1000)
        },

        getType(type) {
            if (type === 'legal') {
                return 'حقوقی';
            }
            if (type === 'genuine') {
                return 'حقیقی';
            }
            return 'نامعلوم';
        },

        async changeStatus(item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `supplier/crud/update/contract/${item.id}`
            if (item.contract_status === 'associate') formdata.append('contract_status', 'disassociate')
            else if (item.contract_status === 'disassociate') formdata.append('contract_status', 'associate')
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()

            if (data) {
                openToast(
                    this.$store,
                    'عملیات مورد نظر با موفقیت انجام شد.',
                    "success"
                );

                await this.getSupplierList();
            } else {
                openToast(
                    this.$store,
                    'عملیات مورد نظر با مشکل مواجه شد.',
                    "error"
                );
            }
        },
    },

    mounted() {
        this.getSupplierList();
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
                this.getSupplierList()
            }
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
        },

        supplierList() {
            this.itemListTable = []

            this.supplierList.data.forEach((item) =>
                this.itemListTable.push(
                    {
                        id: item.id,
                        kosar_id: item.kosar_id !== null ? item.kosar_id : 'نامعلوم',
                        full_name: item.full_name ,
                        shopping_name: item.shopping_name ,
                        supplier_type: this.getType(item.type) ,
                        state_label: item.state.label ,
                        city_label: item.city.label ,
                        phone: item.phone ,
                        payment_period: item.payment_period +' '+'روز' ,
                        created_at: item.created_at_fa,
                        is_active: item.is_active,
                        is_active_id: item.id,
                        contract_status: item.contract_status
                    },
                ),
            )
        }

    }
}

</script>