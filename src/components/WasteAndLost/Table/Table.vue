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
                class="c-table__header__item t12500 text-black"
                :class="head.order === true ? 'pointer' : ''"
                :key="index"
                style="padding: 20px 5px !important"
                :style="[
                    { width: itemsWidth, flex: `0 0 ${itemsWidth}` },
                    index === 0  ? { width: '4.33333%', flex: '0 0 4.33333%' } : {},
                    index === 7 ? { width: '15.33333%', flex: '0 0 15.33333%' } : {},
                ]">
                <v-icon v-if="head.order === true" :icon="getIcon(head.value)" />
                {{ head.name }}
            </div>
        </template>

        <div class="c-table__header__item t12500 text-black" style="width: 5.33333%; flex: 0 0 5.33333%">
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
                    class="c-table__contents__item"
                    style="width: 4.33333%; flex: 0 0 4.33333%;padding: 3px 5px;">
                    <span class="t12500text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                        
                    </span>
                </div>

                <div
                    v-if="item.id && header[1].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5">
                        <template v-if="item.package_type">
                            {{ getPackageType(item.package_type) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5 number-font">
                        <template v-if="item.shipment_type">
                            {{getShipmentType(item.shipment_type)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[4].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5">
                        <template v-if="item.shps && item.shps.seller">
                            {{ item.shps.seller.shopping_name }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[5].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5">
                        <template v-if="item.supplier && item.supplier.full_name">
                            {{ item.supplier.full_name }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[6].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5 number-font">
                        <template v-if="item.shps_s">
                            {{ item.shps_s }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[7].show"
                    class="c-table__contents__item"
                    style="width: 15.33333%; flex: 0 0 15.33333%;padding: 3px 5px;">
                    <span class="t12500text-gray500 py-5 number-font">
                        <template v-if="item.shps && item.shps.label">
                            {{ item.shps.label }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[8].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5">
                        <template v-if="item.report_type">
                            {{ getReportType(item.report_type) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[9].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5">
                        <template v-if="item.creator">
                            {{ item.creator.first_name }} {{ item.creator.last_name }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[10].show"
                    class="c-table__contents__item"
                    style="padding: 3px 5px;"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500text-gray500 py-5 number-font">
                        <template v-if="item.created_at_fa">
                            {{ item.created_at_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div style="width: 5.33333%; flex: 0 0 5.33333%;padding: 3px 5px;" class="c-table__contents__item justify-center">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-gray500">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="removeItem(item.id)">
                                    <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                                    <span class="mr-1 text-grey-darken-1 t13400">
                                        حذف
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
</div>
</template>

<script>


import {
    openConfirm,
    isOdd
} from "@/assets/js/functions";
export default {

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
    },

    data() {
        return {
            order_type: "desc",
            ordering: {},
            per_page: '25',
            filter: [],
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
        getReportType(type){
            if(type === 'lost'){
                return 'مفقودی'
            }else{
                return 'ضایعات'
            }
        },

        getPackageType(type){
            if(type === 'bulk'){
                return 'بالک'
            }else{
                return 'پالت'
            }
        },

        getShipmentType(type){
            if(type === 'cross_dock_marketplace'){
                return 'فروش مارکت'
            }else if(type === 'consignment_shavaz'){
                return 'انبارش شاوز'
            }else if(type === 'consignment_marketplace'){
                return 'انبارش مارکت'
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
            openConfirm(this.$store, "با حذف کالا دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", "حذف کالا", "delete", this.deletePath + id, true);
        },


    },
}
</script>
