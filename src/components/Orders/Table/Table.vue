<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-center c-table__header__item t12500 text-black" style="padding:20px 3px" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{ head.name }}
            </div>
        </template>

        <div class="text-center c-table__header__item t12500 text-black" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" style="padding:20px 3px">
            عملیات
        </div>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0/*  && !loading */ " class="c-table__contents">
            <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-between c-table__contents__row">
                <div v-if="header[0].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ rowIndexTable(index) }}
                    </span>
                </div>

                <div v-if="item.id && header[1].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>
                <div v-if="header[2].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.order_number">
                          {{ item.order_number }}
                        </template>
                        <template v-else>
                          -
                        </template>
                    </span>
                </div>

                <div v-if="header[3].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.user && item.user.first_name && item.user.last_name">
                            {{ item.user.first_name }} {{ item.user.last_name }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[4].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.shps_count">
                            {{ item.shps_count }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[5].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.status">
                            {{getOrderStatus(item.status) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[6].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.payment_status">
                            {{ getPaymentStatus(item.payment_status) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[7].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.payment_method">
                            {{ getPaymentMethod(item.payment_method) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[8].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.paid_price">
                            {{ splitChar(item.paid_price) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[9].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <v-icon :icon="setIcon(item.packed_status)" :color="item.packed_status === 1 ? 'green' : 'red'" />
                    </span>
                </div>

                <div v-if="header[10].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.submit_date_fa">
                            {{ item.submit_date_fa }} {{splitTime(item.submit_date)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[11].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.receive_date_fa">
                            {{ item.receive_date_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>
              <div v-if="header[12].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.user.phone_number">
                            {{ item.user.phone_number}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
              </div>


              <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-gray500">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="showDetails(item.id)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        نمایش جزئیات
                                    </span>
                                </div>
                            </v-list-item-title>

                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="$router.push(`/orders/user/${item.id}/edit`)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-pencil-box-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        ویرایش اطلاعات گیرنده
                                    </span>
                                </div>
                            </v-list-item-title>

                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="showFactor(item.id)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        نمایش فاکتور مالی
                                    </span>
                                </div>
                            </v-list-item-title>
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

    <DetailsModal />
    <FactorModal />
</div>
</template>

<script>
import {
    PanelFilter
} from "@/assets/js/filter"

import {
    openConfirm,
    isOdd,
    splitChar
} from "@/assets/js/functions";

import DetailsModal from '@/components/Orders/Modal/DetailsModal.vue'
import FactorModal from '@/components/Orders/Modal/FactorModal.vue'

import {
    openModal
} from "@/assets/js/functions_seller";

export default {

    props: {
        /**
         * List Items for header
         */
        header: Array,

        /**
         * List of items
         */
        items: Array,

        /**
         * Model
         */
        model: String,

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
            panelFilter: new PanelFilter(),
            activeColumn: false,
            orderStatus: [{
                    text: 'پرداخت شده',
                    value: 'paid'
                },
                {
                    text: 'پیش پردازش',
                    value: 'pre_progress'
                },
                {
                    text: 'در حال ارسال',
                    value: 'sending'
                },
                {
                    text: 'در حال پردازش',
                    value: 'processing'
                },
                {
                    text: 'لغو شده',
                    value: 'cancelled'
                },
                {
                    text: 'تحویل شده',
                    value: 'received'
                },
                {
                    text: 'مرجوعی',
                    value: 'returned'
                },
                {
                    text: 'در انتظار پرداخت',
                    value: 'payment_in_progress'
                }
            ],
        }
    },

    components: {
        DetailsModal,
        FactorModal
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
        splitTime(date) {
            try {
                const dateSplit = date.split(' ')
                return dateSplit[1]
            } catch (e) {

            }
        },
        splitChar,
        /**
         * return persian order status
         * @param {*} status
         */
        getOrderStatus(status) {
            const persianStatus = this.orderStatus.find(orderStatus => orderStatus.value === status)
            if (persianStatus) return persianStatus.text

        },

        /**
         * Open details modal
         * @param {*} id
         */
        showDetails(id) {
            openModal(this.$store, 'set_orderDetailsModal', id, true)
        },

        /**
         * Open factor modal
         * @param {*} id
         */
        showFactor(id) {
            openModal(this.$store, 'set_orderFactorModal', id, true)
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
         * Set icon
         * @param {*} status
         */
        setIcon(status) {
            if (status === 1) {
                return 'mdi-check-bold'
            } else {
                return 'mdi-close-thick'
            }

        },

        /**
         * Get persian name of method
         * @param {*} method
         */
        getPaymentMethod(method) {
            if (method === 'saman') {
                return 'درگاه سامان'
            } else if (method === 'wallet') {
                return 'کیف پول'
            } else if (method === 'snapp') {
                return 'اسنپ پی'
            }
        },

        /**
         * Get persian name of payment status
         * @param {*} method
         */
        getPaymentStatus(method) {
            if (method === 'unsuccessful') {
                return 'نا موفق'
            } else if (method === 'contradictory') {
                return 'دارای مغایرت'
            } else if (method === 'successful') {
                return 'موفق'
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
            openConfirm(this.$store, "با حذف بسته دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", "حذف بسته", "delete", this.deletePath + id, true);
        },

        /**
         * Update list
         * @param {*} status
         */
        updateList(status) {
            this.$emit('updateList', status);
        },
    },
}
</script>
