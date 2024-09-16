<template>
    <v-layout class="bg-gray">
        <DashboardLayout/>
        <v-main class="h-100vh">
            <Header/>

            <div class="h-100 d-flex flex-column align-stretch seller">
                <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
                    <v-row
                        justify="center"
                        align="center"
                        class="px-10 py-3">
                        <v-col cols="6">
                            <v-btn
                                @click="$router.push('/factor/create')"
                                color="primary500"
                                height="40"
                                rounded
                                class="px-8 mt-1">
                                <template v-slot:prepend>
                                    <v-icon>mdi-plus</v-icon>
                                </template>
                                افزودن
                            </v-btn>
                        </v-col>

                        <v-col cols="6">
                            <v-row justify="end">
                                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header"/>

                                <PanelFilter @resetPage="resetPage" path="factor/index" :filterField="filterField"
                                             :statusItems="status"/>
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
                        <template v-slot:customSlot="item">
                            <div v-if="item.data.custom !== 'نامعلوم' " class="factor-dropdown">
                                <div
                                    class="factor-dropdown__selected"
                                    @click="showDropDown(item.index)"
                                    :style="{ backgroundColor: factorSelectedBg(item.data.custom) }">
                                    <span>{{ factorSelectedTitle(item.data.custom) }}</span>
                                    <v-icon icon="mdi-chevron-down"></v-icon>
                                </div>
                                <div class="factor-dropdown__items" :id="`factor-dropdown__items-${item.index}`">
                                    <div
                                        class="factor-dropdown__item"
                                        id="factor-dropdown__item--1"
                                        :class="showStatus(item.data.custom, '0')"
                                        @click="updateStatus(item.data.custom, 'draft', item.data.id ,'0')">
                                        پیش نویس
                                    </div>
                                    <div
                                        class="factor-dropdown__item"
                                        id="factor-dropdown__item--2"
                                        :class="showStatus(item.data.custom, 'draft')"
                                        @click="updateStatus(item.data.custom,'cargo_preparing',item.data.id ,'draft')">
                                        آماده سازی محموله
                                    </div>
                                    <div
                                        class="factor-dropdown__item"
                                        id="factor-dropdown__item--3"
                                        :class="showStatus(item.data.custom, 'cargo_preparing')"
                                        @click="updateStatus(item.data.custom, 'pricing',item.data.id ,'cargo_preparing')">
                                        در انتظار قیمت گذاری
                                    </div>
                                    <div
                                        class="factor-dropdown__item"
                                        id="factor-dropdown__item--4"
                                        :class="showStatus(item.data.custom, 'pricing')"
                                        @click="updateStatus(item.data.custom, 'done',item.data.id ,'pricing')">
                                        تمام شده
                                    </div>
                                </div>
                            </div>
                            <div v-else >
                                'نامعلوم'
                            </div>
                        </template>


                        <template v-slot:actionSlot="item">
                            <div class="text-center">
                                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto">
                                    mdi-dots-vertical
                                </v-icon>
                            </div>

                            <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
                                <v-list class="c-table__more-options">
                                    <v-list-item>
                                        <v-list-item-title>
                                            <div class="ml-16">
                                                <div class=" pointer" @click=print(item.data.id)>
                                                    <v-icon size="x-small" class="text-grey-darken-1">
                                                        mdi-text-box-multiple-outline
                                                    </v-icon>
                                                    <span class="mr-2 text-grey-darken-1 t14 w300">
                                                        نمایش جزئیات
                                                    </span>
                                                </div>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item :disabled="item.data.custom === 'pricing'  ? true : false">
                                        <v-list-item-title>
                                            <div class="ma-5 pointer"
                                                 @click="$router.push(`/retail-shipment/index?factor_id=${item.data.id}`)">
                                                <v-icon size="small" class="text-grey-darken-1">
                                                    mdi-package-variant-closed
                                                </v-icon>
                                                <span class="mr-2 text-grey-darken-1 t14 w300">
                                                    مدیریت محموله‌های انبارش
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item
                                        :disabled="item.data.custom === 'pricing' || item.data.custom == 'done' ? true : false">
                                        <v-list-item-title>
                                            <div class="ma-5 pointer"
                                                 @click="$router.push(`/retail-shipment/${item.data.id}/add/shps`)">
                                                <v-icon size="small" class="text-grey-darken-1">
                                                    mdi-package-variant-closed
                                                </v-icon>
                                                <span class="mr-2 text-grey-darken-1 t14 w300">
                                                    ساخت محموله انبارش
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item
                                        :disabled="item.data.custom === 'cargo_preparing' || item.data.custom === 'done' || item.data.custom === 'draft' ? true : false">
                                        <v-list-item-title>
                                            <div class="ma-5 pointer" @click="$router.push(`details/${item.data.id}`)">
                                                <v-icon size="small" class="text-grey-darken-1">mdi-currency-usd
                                                </v-icon>
                                                <span class="mr-2 text-grey-darken-1 t14 w300">
                                                    قیمت گذاری
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-title>
                                            <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                                <v-icon size="small" class="text-grey-darken-1">mdi-trash-can-outline
                                                </v-icon>
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
                    <v-divider/>

                    <v-card-actions class="pb-3">
                        <v-row class="px-8">
                            <v-col cols="3" class="d-flex justify-start"/>

                            <v-col cols="6" class="d-flex justify-center">
                                <div class="text-center">
                                    <v-pagination
                                        v-model="page"
                                        :length="pageLength"
                                        rounded="circle"
                                        size="40"
                                        :total-visible="7"
                                        prev-icon="mdi-chevron-right"
                                        next-icon="mdi-chevron-left"/>
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
                                :items="[25,50,100]"/>
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

const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))

import Table from '@/components/Factor/Table/Table.vue'
import Factor from "@/composables/Factor";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import {openConfirm, openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {AxiosCall} from "@/assets/js/axios_call";


export default {
    data() {
        return {
            perPageFilter: false,
            itemListTable: [],
        }
    },

    setup() {
        const status = [
            {
                label: 'همه',
                value: '',
            },
            {
                label: 'پیش نویس',
                value: 'draft',
            },
            {
                label: 'آماده سازی محموله',
                value: 'cargo_preparing',
            },
            {
                label: 'در انتظار قیمت گذاری',
                value: 'pricing',
            },
            {
                label: 'تمام شده',
                value: 'done',
            },
        ]

        const {
            pageLength,
            getFactorList,
            factorList,
            filterField,
            dataTableLength,
            page,
            header,
            loading,
        } = Factor();
        return {
            pageLength,
            getFactorList,
            factorList,
            filterField,
            dataTableLength,
            page,
            header,
            loading,
            status,
        }
    },

    components: {
        DashboardLayout,
        Header,
        PanelFilter,
        Table,
        ModalColumnFilter,
        ShTable,
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },
    },

    methods: {
        changeHeaderShow(index, value) {
            this.header[index].show = value
        },

        resetPage() {
            this.perPageFilter = true
            this.page = 1
            setTimeout(() => {
                this.perPageFilter = false
            }, 1000)
        },

        print(id) {
            window.open(`${import.meta.env.VITE_API_SITEURL}factor/print/${id}`, '_blank')
        },
        removeItem(id) {
            openConfirm(this.$store, "با حذف فاکتور دیگر به جزئیات آن دسترسی نخواهید داشت. آیا از انجام این کار اطمینان دارید؟", "حذف آیتم", "delete", 'factor/crud/delete/' + id, true)
        },
        factorSelectedTitle(status) {
            if (status === 'draft') {
                return 'پیش نویس'
            }
            if (status === 'cargo_preparing') {
                return 'آماده سازی محموله'
            }
            if (status === 'pricing') {
                return 'در انتظار قیمت گذاری'
            }
            if (status === 'done') {
                return 'تمام شده'
            }
        },
        factorSelectedBg(status) {
            if (status === 'draft') {
                return '#FFEBEE'
            }
            if (status === 'cargo_preparing') {
                return '#E8F5E9'
            }
            if (status === 'pricing') {
                return '#FFF3E0'
            }
            if (status === 'done') {
                return '#EDE7F6'
            }
        },
        showDropDown(index) {
            const itemDropdown = document.getElementById(`factor-dropdown__items-${index}`);
            itemDropdown.classList.toggle('active');
        },
        showStatus(mainStatus, status) {
            if (mainStatus === status) {
                return 'active'
            } else {
                return 'de-active'
            }
        },
        async updateStatus(itemStatus, status, id, currentStatus) {
            if (itemStatus === currentStatus) {
                var formdata = new FormData();
                const AxiosMethod = new AxiosCall()
                formdata.append('status', status)
                AxiosMethod.end_point = 'factor/crud/update/status/' + id
                AxiosMethod.store = this.$store
                AxiosMethod.form = formdata

                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                let data = await AxiosMethod.axios_post()
                if (data.status === 'Success') {
                    await this.getFactorList();
                    openToast(
                        this.$store,
                        'وضعیت با موفقیت ویرایش شد.',
                        "success"
                    );
                }
            }
        },
    },

    mounted() {
        this.getFactorList();
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
                    },
                })
            } else {
                this.$router.push({
                    query: {
                        per_page: this.dataTableLength,
                    },
                })
            }
            this.perPageFilter = false
        },
        page() {
            if (!this.perPageFilter) {
                this.getFactorList()
            }
        },
        confirmModal(val) {
            if (localStorage.getItem('deleteObject') === 'done') {
                if (!val) {
                    this.getFactorList()
                    openToast(
                        this.$store,
                        'محصول با موفقیت حذف شد',
                        "success",
                    );
                    localStorage.removeItem('deleteObject')
                }
            }
        },
        $route() {
            this.getFactorList()
        },

        factorList() {
            if(this.factorList.data) {

                this.itemListTable = []
                this.factorList.data.forEach((item) => {
                    this.itemListTable.push(
                        {
                          data: item,
                          id: item.id,
                          supplier: item.supplier ? item.supplier.shopping_name : 'نامعلوم',
                          pre_factor: item.pre_factor_number ? item.pre_factor_number : '-',
                          creator: item.creator ? item.creator.first_name + ' ' + item.creator.last_name : 'نامعلوم',
                          factor_number: item.factor_number ? item.factor_number : 'نامعلوم',
                          created_at_fa: item.created_at_fa ? item.created_at_fa : 'نامعلوم',
                          custom: item.status ? item.status : 'نامعلوم',
                        }
                    )
                })
            }
        },
    },
}
</script>
