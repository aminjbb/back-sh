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
                class="text-center c-table__header__item t12500 text-black"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item t12500 text-black" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            عملیات
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
                    v-if="item.id && header[1].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        <template v-if="item.supplier">
                            {{ item.supplier.full_name }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.creator">
                            {{ item.creator.first_name }} {{ item.creator.last_name }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[4].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.factor_number">
                            {{ item.factor_number }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[5].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.created_at_fa">
                            {{ item.created_at_fa }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[6].show"
                    class="c-table__contents__item justify-center"
                    :ref="`factor--${index}`"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <template v-if="item.status">
                        <div class="factor-dropdown">
                            <div
                                class="factor-dropdown__selected"
                                @click="showDropDown(index)"
                                :style="{ backgroundColor: factorSelectedBg(item.status) }">
                                <span>{{ factorSelectedTitle(item.status) }}</span>
                                <v-icon icon="mdi-chevron-down"></v-icon>
                            </div>
                            <div class="factor-dropdown__items" :id="`factor-dropdown__items-${index}`">
                                <div
                                    class="factor-dropdown__item"
                                    id="factor-dropdown__item--1"
                                    :class="showStatus(item.status, '0')"
                                    @click="updateStatus(index,'draft', item,'0')">
                                    پیش نویس
                                </div>
                                <div
                                    class="factor-dropdown__item"
                                    id="factor-dropdown__item--2"
                                    :class="showStatus(item.status, 'draft')"
                                    @click="updateStatus(index,'cargo_preparing',item,'draft')">
                                    آماده سازی محموله
                                </div>
                                <div
                                    class="factor-dropdown__item"
                                    id="factor-dropdown__item--3"
                                    :class="showStatus(item.status, 'cargo_preparing')"
                                    @click="updateStatus(index,'pricing',item,'cargo_preparing')">
                                    در انتظار قیمت گذاری
                                </div>
                                <div
                                    class="factor-dropdown__item"
                                    id="factor-dropdown__item--4"
                                    :class="showStatus(item.status, 'pricing')"
                                    @click="updateStatus(index,'done',item,'pricing')">
                                    تمام شده
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        نامعلوم
                    </template>
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
                                    <div class="ma-5 pointer" @click="openShowDetailsModal(item.id)">
                                        <v-icon size="small" class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            نمایش جزئیات
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/retail-shipment/index?factor_id=${item.id}`)">
                                        <v-icon size="small" class="text-grey-darken-1">mdi-package-variant-closed</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            مدیریت محموله‌های انبارش
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item :disabled="item.status == 'pricing' || item.status == 'done' ? true : false">
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/retail-shipment/${item.id}/add/shps`)">
                                        <v-icon size="small" class="text-grey-darken-1">mdi-package-variant-closed</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            ساخت محموله انبارش
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item :disabled="item.status == 'cargo_preparing' || item.status == 'done' || item.status == 'draft' ? true : false">
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`details/${item.id}`)">
                                        <v-icon size="small" class="text-grey-darken-1">mdi-currency-usd</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            قیمت گذاری
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeItem(item.id)">
                                        <v-icon size="small" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
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
    <ModalMassUpdate :updateUrl="updateUrl" />
    <DetailsModal />
</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    SupplierPanelFilter
} from "@/assets/js/filter_supplier"
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import DetailsModal from "@/components/Factor/Modals/DetailsModal.vue";
import {
    openToast,
    openConfirm,
    isOdd
} from "@/assets/js/functions";
import {
    openModal
} from "@/assets/js/functions_seller";
export default {
    components: {
        ModalMassUpdate,
        DetailsModal
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
            order_type: "desc",
            ordering: {},
            per_page: '25',
            filter: [],
            active: [],
            panelFilter: new SupplierPanelFilter(),
            activeColumn: false,
        }
    },

    computed: {
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
    },

    methods: {
        /**
         * Open Basic Discount modal
         * @param {*} id
         */
        openShowDetailsModal(id) {
            openModal(this.$store, 'set_showDetailsModal', id, true)
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

        /**
         * Open factor details modal
         * @param {*} id
         */
        openBasicDiscountModal(id) {
            openModal(this.$store, 'set_basicDiscountModal', id, true)
        },

        showDropDown(index) {
            const itemDropdown = document.getElementById(`factor-dropdown__items-${index}`);
            itemDropdown.classList.toggle('active');
        },

        showStatus(mainStatus, status) {
            if (mainStatus == status) {
                return 'active'
            } else {
                return 'de-active'
            }
        },

        async updateStatus(index, status, item, currentStatus) {
            if (item.status === currentStatus) {
                var formdata = new FormData();
                const AxiosMethod = new AxiosCall()
                formdata.append('status', status)
                AxiosMethod.end_point = 'factor/crud/update/status/' + item.id
                AxiosMethod.store = this.$store
                AxiosMethod.form = formdata

                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                let data = await AxiosMethod.axios_post()
                if (data.status === 'Success') {
                    this.updateList('true');
                    openToast(
                        this.$store,
                        'وضعیت با موفقیت ویرایش شد.',
                        "success"
                    );
                }
            }else{
                
            }
        },

        /**
         * Update list
         * @param {*} status 
         */
        updateList(status) {
            this.$emit('updateList', status);
        },

        /**
         * Mass update modal
         */
        massUpdateModal() {
            this.$store.commit('set_massUpdateModal', true)
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
            openConfirm(this.$store, "با حذف فاکتور دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", "حذف آیتم", "delete", this.deletePath + id, true)
        },
    },
}
</script>
