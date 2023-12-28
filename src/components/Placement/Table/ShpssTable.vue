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
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0 /* && !loading */" class="c-table__contents">
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
                    v-if="header[1].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span v-if="item.shipment_id" class="t14300 text-gray500 py-5 number-font">
                        {{ item.shipment_id }}
                    </span>
                    <span v-else class="t14300 text-gray500 py-5 number-font">
                        -
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray500 py-5">
                        <template v-if="item.sku_label">
                            {{ item.sku_label }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.count">
                            {{item.count}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
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
    PanelFilter
} from "@/assets/js/filter"

import {
    openConfirm,
    isOdd
} from "@/assets/js/functions";
import ModalPrint from '@/components/Package/Modal/PrintModal.vue'

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

    components:{
        ModalPrint
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
                const width = 100 / (headerLength);
                return `${width}%`;
            }
            return 'auto';
        },
    },

    methods: {

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
    },
}
</script>
