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
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.row_number">
                            {{ item.row_number }}
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
                        <template v-if="item.placement_number">
                            {{item.placement_number}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[4].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.step_number">
                            {{ item.step_number }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[5].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.shelf_number">
                            {{ item.shelf_number }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[6].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.created_at_fa">
                            {{ item.created_at_fa }}
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
                                <div class="ma-5 pointer d--rtl" @click="$router.push(`/placement/${item.id}/shpss`)">
                                    <v-icon class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        مدیریت کالاها
                                    </span>
                                </div>
                            </v-list-item-title>

                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="printBarcode(item.id)">
                                    <v-icon class="text-grey-darken-1">mdi-printer-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        پرینت برچسب
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

    <ModalPrint />
</div>
</template>

<script>
import {
    PanelFilter
} from "@/assets/js/filter_placement"

import {
    isOdd
} from "@/assets/js/functions";

import ModalPrint from '@/components/Placement/Modal/PrintModal.vue'

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
                const width = 100 / (headerLength + 1);
                return `${width}%`;
            }
            return 'auto';
        },
    },

    methods: {
        /**
         * Open print barcode modal
         * @param {*} id
         */
        printBarcode(id) {
            openModal(this.$store, 'set_printModal', id, true)
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
    },
}
</script>
