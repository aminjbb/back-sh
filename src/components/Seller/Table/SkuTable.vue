<template>
<div
    :class="variant == 'outlined' ? 'table-outlined': ''"
    :style="{height: height}"
    class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading" />

    <header class="c-table__header d-flex justify-start">
        <template v-for="(head, index) in header">
            <template v-if="head.value">
                <div
                    v-if="head.show"
                    @click="createOrdering(head.value, head.order)"
                    class="text-right c-table__header__item t12 w500 px-0"
                    :class="head.order == true ? 'pointer' : ''"
                    :key="index"
                    :style="{ width: itemsWidth, flex:head.value === 'label' ? `1 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
                  <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                    {{head.name}}
                </div>
            </template>
            <template v-else>
                <div
                    v-if="head.show"
                    class="text-right pointer c-table__header__item t12 w500"
                    :key="index"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    {{head.name}}
                </div>
            </template>
        </template>
        <div class="c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t12 w500 ">
                عملیات
            </span>
        </div>
    </header>
    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-start">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
                        <template v-if="checkbox">
                            <v-checkbox class="mr-1" v-model=item.value />
                        </template>
                    </div>
                </div>

                <div
                    v-if="item.sku && header[1].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{ item.sku?.id }}
                    </span>
                </div>
                <div
                    v-if="header[2].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <template v-if="item.id">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.id }}
                        </span>
                    </template>

                </div>
                <div
                    v-if="header[3].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
                    <template v-if="item.sku">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.sku?.label }}
                        </span>
                    </template>
                </div>
                <div
                    v-if="header[4].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.warehouse_stock">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.warehouse_stock }}
                        </span>

                    </template>
                    <template v-else>
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            -
                        </span>

                    </template>

                </div>
                <div
                    v-if="header[5].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.sku">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.site_stock }}
                        </span>
                    </template>

                </div>
                <div
                    v-if="header[6].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.sku">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ splitChar(item.customer_price) }}
                        </span>
                    </template>

                </div>
                <div
                    v-if="header[7].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.sku">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.base_discount }}
                        </span>
                    </template>

                </div>
                <div
                    v-if="header[8].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.sku">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.marketing_discount }}
                        </span>
                    </template>

                </div>
                <div
                    v-if="header[8].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.sku">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ splitChar(item.site_price) }}
                        </span>
                    </template>

                </div>
                <div
                    v-if="(item.is_active  != undefined )"
                    :style="{ width: itemsWidth, flex: `0 0.3 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14 w300 ">
                        <v-switch
                            v-model="active[index]"
                            inset
                            color="success"
                            @change="changeActive(index,item)" />
                    </span>
                </div>
                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer">
                                        <v-icon color="grey-darken-1" icon="mdi-file-document-multiple-outline" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            تاریخچه‌ی موجودی انبار
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/seller/sku/${$route.params.sellerId}/history/site-inventory/${item.sku?.id}`)">
                                        <v-icon color="grey-darken-1" icon="mdi-format-list-bulleted" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            تاریخچه‌ی موجودی سایت
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="openInventoryManagementModal(item.sku_id)">
                                        <v-icon color="grey-darken-1" icon="mdi-package-variant-closed" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            مدیریت موجودی سایت
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="openConsumerPriceModal(item.sku_id)">
                                        <v-icon color="grey-darken-1" icon="mdi-currency-usd" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            قیمت مصرف کننده
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="openBasicDiscountModal(item.sku_id)">
                                        <v-icon color="grey-darken-1" icon="mdi-percent-box-outline" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            تخفیف پایه
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="openMarketingDiscountModal(item.sku_id)">
                                        <v-icon color="grey-darken-1" icon="mdi-percent-box-outline" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            تخفیف مارکتینگ
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="openOrderLimitModal(item.sku_id)">
                                        <v-icon color="grey-darken-1" icon="mdi-close-octagon-outline" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            محدودیت سفارش
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/seller/sku/${$route.params.sellerId}/history/price/${item.sku?.id}`)">
                                        <v-icon color="grey-darken-1" icon="mdi-file-document-multiple-outline" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            تاریخچه ی قیمت
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeItem(item.sku_id)">
                                        <v-icon color="grey-darken-1" icon="mdi-trash-can-outline" size="xsmall"/>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
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
                <span class="t18 w600 text-black mb-5">لیست خالی!</span>
                <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>

    <ModalMassUpdate :updateUrl="updateUrl" />
    <OrderLimitModal @updateList="updateList" />
    <InventoryManagementModal @updateList="updateList" />
    <ConsumerPriceModal @updateList="updateList" />
    <BasicDiscountModal @updateList="updateList" />
    <MarketingDiscountModal @updateList="updateList" />
</div>
</template>

<script>
import {isOdd, splitChar} from '@/assets/js/functions'
import {openConfirm} from '@/assets/js/functions'
import {AxiosCall} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import {openModal} from "@/assets/js/functions_seller";
import OrderLimitModal from "@/components/Seller/Modals/OrderLimitModal.vue";
import InventoryManagementModal from "@/components/Seller/Modals/InventoryManagementModal.vue";
import ConsumerPriceModal from "@/components/Seller/Modals/ConsumerPriceModal.vue";
import BasicDiscountModal from "@/components/Seller/Modals/BasicDiscountModal.vue";
import MarketingDiscountModal from "@/components/Seller/Modals/MarketingDiscountModal.vue";
export default  {
    components: {
        ModalMassUpdate,
        OrderLimitModal,
        InventoryManagementModal,
        ConsumerPriceModal,
        BasicDiscountModal,
        MarketingDiscountModal,
    },

    props: {
        /**
         * Update button url
         */
        updateUrl: {
            type: String,
            default: '',
        },
        /**
         * Edit button url
         */
        editUrl: '',

        /**
         * List Items for header
         */
        header: [],

        /**
         * List of items
         */
        items: [],

        /**
         * Delete Path
         */
        deletePath: '',

        /**
         * Model
         */
        model: '',

        /**
         * Active checkbox
         */
        checkbox: {
            type: Boolean,
            default: false,
        },

        /**
         * Variant
         * Variant values: outlined
         */
        variant: {
            type: String,
            default: 'default',
        },

        /**
         * Height
         */
        height: {
            type: String,
            default: '500',
        },


        /**
         * Edit endpoint for change active
         */
        activePath: {
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

    },

    data() {
        return {
            order_type: "desc",
            skuStatus: [],
            ordering: {},
            per_page: '25',
            active: [],
            sellable: [],
            filter: [],
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
                const width = 80 / (headerLength + 1);
                return `${width}%`;
            }
            return 'auto';
        }
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
      splitChar,
        /**
         * Open order limit modal
         * @param {*} id
         */
        openOrderLimitModal(id) {
            openModal(this.$store, 'set_orderLimitModal', id, true)
        },

        /**
         * Open inventory management modal
         * @param {*} id
         */
        openInventoryManagementModal(id) {
            openModal(this.$store, 'set_inventoryManagementModal', id, true)
        },

        /**
         * Open consumer price modal
         * @param {*} id
         */
        openConsumerPriceModal(id) {
            openModal(this.$store, 'set_consumerPriceModal', id, true)
        },

        /**
         * Open Basic Discount modal
         * @param {*} id
         */
        openBasicDiscountModal(id) {
            openModal(this.$store, 'set_basicDiscountModal', id, true)
        },

        /**
         * Open Marketing Discount modal
         * @param {*} id
         */
        openMarketingDiscountModal(id) {
            openModal(this.$store, 'set_marketingDiscountModal', id, true)
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

        /**
         * Change Active
         * @param {*} index
         * @param {*} item
         */
        async changeActive(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.activePath + item?.sku?.id
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

        updateList(status) {
            this.$emit('updateList', status);
        },
    },
}
</script>
