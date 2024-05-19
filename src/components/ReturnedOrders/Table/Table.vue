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
                style="padding:20px 3px"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div
            class="text-center c-table__header__item t12500 text-black"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
            style="padding:20px 3px">
            عملیات
        </div>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0/*  && !loading */ " class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-between c-table__contents__row">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="item.id && header[1].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.returned_id">
                            {{ item.returned_id }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.user">
                            {{item.user.first_name}} {{item.user.last_name}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[4].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.shps_count">
                            {{ item.shps_count }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[5].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.status">
                            {{getOrderStatus(item.status) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[6].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.returned_status">
                           {{ item.returned_status }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[7].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.payment_status">
                            {{ getPaymentStatus(item.payment_status) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[8].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.payment_method">
                            {{ getPaymentMethod(item.payment_method) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[9].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.paid_price">
                            {{splitChar(item.paid_price)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[10].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <v-icon :icon="setIcon(item.request_status)" :color="item.request_status === 1 ? 'green' : 'red'"/>
                    </span>
                </div>

                <div
                    v-if="header[11].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <v-icon :icon="setIcon(item.packed_status)" :color="item.packed_status === 1 ? 'green' : 'red'"/>
                    </span>
                </div>

                <div
                    v-if="header[12].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.submit_date_fa">
                            {{ item.submit_date_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[13].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.receive_date_fa">
                            {{ item.receive_date_fa}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[14].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.created_at_fa">
                            {{ item.created_at_fa}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[15].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.discount">
                            {{splitChar(item.discount)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[16].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.state">
                           {{ item.state.label }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[17].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.city">
                           {{ item.city.label }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[18].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.identifier_code">
                           {{ item.identifier_code }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[19].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.bank_id">
                           {{ item.bank_id }}
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
                                <div class="ma-3 pointer d--rtl" @click="$router.push(`/returned-orders/request/${item.id}`)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-keyboard-return</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        بررسی درخواست مرجوعی
                                    </span>
                                </div>
                            </v-list-item-title>

                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="showDetails(item.id)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        نمایش جزئیات
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

                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="$router.push(`/returned-orders/receipt/${item.id}`)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-email-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        رسید ارسال
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


import DetailsModal from '@/components/ReturnedOrders/Modal/DetailsModal.vue'
import FactorModal from '@/components/ReturnedOrders/Modal/FactorModal.vue'


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
        splitChar,

        /**
         * Open details modal
         * @param {*} id
         */
         showDetails(id) {
            openModal(this.$store, 'set_returnedOrderDetailsModal', id, true)
        },

        /**
         * Open factor modal
         * @param {*} id
         */
         showFactor(id) {
            openModal(this.$store, 'set_returnedOrderFactorModal', id, true)
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
         * Get persian name of order status
         * @param {*} method
         */
         getOrderStatus(method) {
            if (method === 'paid') {
                return 'پرداخت شده'
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
                let query = this.$route.query
                if (this.order_type === 'desc') {
                  this.order_type = 'asc'
                } else {
                  this.order_type = 'desc'
                }
                this.$router.replace({
                  query: {
                    ...query,
                    order_type :this.order_type,
                    order :index
                  }
                })

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

<style scoped lang="scss">
.c-table {
        overflow-x: auto;
        height: calc(100% - 70px);
        -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar {
            height: 5px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 3px;
            background-color: #F8BBD0;

        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background-color: #F06292;
        }

        &__header,
        .stretch-table{
            width: 2700px;
            color: #9E9E9E !important;
        }
    }
</style>
