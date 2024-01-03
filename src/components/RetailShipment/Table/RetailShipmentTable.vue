<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div
                v-if="head.show"
                @click="createOrdering(head.value, head.order)"
                class="text-center c-table__header__item t10400 text-black"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-menu :location="location">
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">
                        mdi-dots-vertical
                    </v-icon>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title>
                            <v-btn
                                @click="massUpdateModal()"
                                variant="text"
                                height="40"
                                rounded
                                class="px-5 mt-1 text-grey-darken-1 t14300">
                                <template v-slot:append>
                                    <v-icon>mdi-pen-minus</v-icon>
                                </template>
                                ویرایش گروهی تنظیمات سئو
                            </v-btn>
                        </v-list-item-title>

                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-between c-table__contents__row">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>
                <div
                    v-if=" header[1].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>
                <div
                    v-if=" header[2].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.factor_id }}
                    </span>
                </div>
                <div
                    v-if=" header[3].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.shps_count }}
                    </span>
                </div>
                <div
                    v-if=" header[4].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.shps_variety }}
                    </span>
                </div>
                <div
                    v-if=" header[5].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.creator?.first_name }} {{ item.creator?.last_name }}
                    </span>
                </div>
                <div
                    v-if=" header[6].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.created_at_fa }}
                    </span>
                </div>
                <div
                    v-if=" header[7].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.updated_at_fa }}
                    </span>
                </div>
                <div
                    v-if=" header[8].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="retail-status-box d-flex align-center pr-2">
                        <span class="t14300 text-gray500 py-5 ">
                            {{ getStatus(item.status)  }}
                        </span>
                    </div>

                </div>

                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-gray500">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/retail-shipment/${item.id}/edit/shps`)">
                                        <v-icon class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            مدیریت کالاها
                                        </span>

                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item :disabled="checkPermission(item.status , deleteAndShippingPermission)">
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="requestShipment(item)">
                                        <v-icon class="text-grey-darken-1">mdi-car-pickup</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            درخواست ارسال
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item :disabled="checkPermission(item.status , PrintPermission)">
                                <v-list-item-title>
                                    <div class="ma-5 pointer"  @click="retailShipmentDetail(item)">
                                        <v-icon class="text-grey-darken-1">mdi-printer-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            پرینت محموله

                                        </span>

                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="retailShipmentDetail(item)">
                                        <v-icon class="text-grey-darken-1">mdi-eye-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            نمایش جزئیات
                                        </span>

                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item :disabled="checkPermission(item.status , deleteAndShippingPermission)">
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeItem(item.id)">
                                        <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            حذف
                                        </span>

                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                        </v-list>
                    </v-menu>
                </div>
            </div>
        </div>
        <div v-else class="null-data-table d-flex justify-center align-center flex-column">
            <img src="@/assets/img/NullTable.png" alt="shavaz image">
            <div class="d-flex justify-center align-center flex-column">
                <span class="title4 text-black mb-5">لیست خالی!</span>
                <span class="t14300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>
    <ModalRequestShipment />

</div>
</template>
<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    SupplierPanelFilter
} from "@/assets/js/filter_supplier"
import ModalRequestShipment from "@/components/RetailShipment/Modal/ModalRequestShipment.vue";

import ActivationModal from "@/components/Public/ActivationModal.vue";
import {
    openToast,
    openConfirm,
    isOdd,
    convertDateToJalai
} from "@/assets/js/functions";
export default {
    components: {
        ModalRequestShipment,
        ActivationModal,
    },

    props: {
        /**
         * List Items for header
         */
        header: [],

        /**
         * List of items
         */
        items: [],

        /**
         * Model
         */
        model: '',

        /**
         * Height
         */
        height: {
            type: String,
            default: '500',
        },

        /**
         * Delete endpoint for change filter
         */
        deletePath: {
            type: String,
            default: ''
        },

        /**
         * Page on table
         */
        page: {
            type: Number,
            default: 1
        },

        /**
         * PerPage of data
         */
        perPage: {
            type: Number,
            default: 1
        },

        /**
         * Active loading
         */
        loading: {
            type: Boolean,
            default: false
        },

        /**
         * Edit endpoint for change active
         */
        activePath: {
            type: String,
            default: ''
        },

    },

    data() {
        return {
            statusItems: [{
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
                }, {
                    label: 'موجود شده در انبار',
                    value: 'located',
                },
            ],
            order_type: "desc",
            ordering: {},
            per_page: '25',
            filter: [],
            active: [],
            isIndex: [],
            isFollow: [],
            panelFilter: new SupplierPanelFilter(),
            activeColumn: false,
        }
    },

    computed: {
        PrintPermission() {
            return ['waiting', 'in_review']
        },
        deleteAndShippingPermission() {
            return ['approved', 'sending_warehouse', 'received_by_warehouse',
                'counting', 'approved_by_warehouse', 'sending_base_warehouse',
                'received_base_warehouse', 'locating', 'located'
            ]
        },
        /**
         * Get each items table based of header length
         */
        itemsWidth() {
            let headerLength = 0;
            if (this.header && this.header.length > 0) {
                this.header.forEach(element => {
                    if (element.show == true) {
                        headerLength++;
                    }
                });
                const width = 100 / (headerLength + 1);
                return `${width}%`;
            }
            return 'auto';
        },

        /**
         * Check is_active is true or false for show in table
         */
        checkActive() {
            this.header.forEach(element => {
                if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == true) {
                    this.activeColumn = true;
                } else if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == false) {
                    this.activeColumn = false;
                }
            });
            return this.activeColumn;
        },
    },

    watch: {
        items(val) {
            this.active = []
            val.forEach(element => {
                var active = false
                if (element.is_active == 1) active = true
                this.active.push(active)

            });
        }
    },

    methods: {
        checkPermission(status, permissions) {
            const index = permissions.findIndex(p => p === status)
            if (index > -1) return true
            return false
        },
        getStatus(status) {
            const persianStatus = this.statusItems.find(element => element.value === status)
            return persianStatus.label
        },
        convertDateToJalai,
        changeValue(index, value) {
            this.active[index] = value
        },
        /**
         * requestShipment modal
         */
        requestShipment(item) {
            const form = {
                dialog: true,
                object: item
            }
            this.$store.commit('set_modalRequestShipment', form)
        },
        /**
         * retailShipment detail modal
         */
        async retailShipmentDetail(item) {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `shipment/consignment/crud/get/${item.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                const form = {
                    dialog: true,
                    object: data.data
                }
                this.$store.commit('set_modalRetailShipmentDetail', form)

            }

        },
        /**
         * Get row index in table
         * @param {*} index
         */
        rowIndexTable(index) {
            let rowIndex = 0
            if (this.page === 1) {
                rowIndex = (1 + index)
                return rowIndex
            } else {
                rowIndex = ((this.page - 1) * this.perPage) + index + 1
                return rowIndex
            }
        },

        /**
         * Create ordering
         * @param {*} index
         * @param { boolean } order
         */
        createOrdering(index, order) {
            if (order === true) {
                if (index) {
                    if (this.order_type === 'desc') {
                        this.order_type = 'asc'
                        this.panelFilter.order_type = 'asc'
                    } else {
                        this.order_type = 'desc'
                        this.panelFilter.order_type = 'desc'
                    }

                    this.panelFilter.order = index
                    this.$router.push(this.$route.path + this.panelFilter.sort_query(this.$route.query))

                    this.ordering = {};
                    this.ordering[index] = !this.ordering[index];
                }
            }
        },

        /**
         * Get icon
         * @param {*} column
         */
        getIcon(column) {
            return this.ordering[column] ? 'mdi-sort-descending' : 'mdi-sort-ascending';
        },

        returnTrueOrFalse(data) {
            if (data === 1) return true
            else return false
        },

        /**
         * Change Active
         * @param {*} index
         * @param {*} item
         */
        async changeActive(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.activePath + item.id
            if (this.active[index]) formdata.append('is_active', 1)
            else formdata.append('is_active', 0)
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
        },

        /**
         * Return odd index
         * @param {*} index
         */
        oddIndex(index) {
            return isOdd(index)
        },

        /**
         * Remove Item
         * @param {*} id
         */
        removeItem(id) {
            openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", this.deletePath + id, true)
        },
    },
}
</script>
