<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-center c-table__header__item t12500 text-black" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
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
            <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-between c-table__contents__row">
                <div v-if="header[0].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div v-if="item.id && header[1].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>

                <div v-if="header[2].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.first_name">
                            {{ item.first_name }}  {{ item.last_name }}
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
                                <div class="ma-3 pointer d--rtl" @click="openPickUpperModal(item.id)">
                                    <v-icon class="text-grey-darken-1">mdi-distribute-vertical-top</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                       ناحیه بندی
                                    </span>
                                </div>
                            </v-list-item-title>
                        </v-list>
                    </v-menu>
                </div>

                <ModalPickUpper :ref="`pickUpper${item.id}`" :id="item.id" :name="`${item.first_name} ${item.last_name}`" :rowList="rowList"/>
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
} from "@/assets/js/filter.js"

import {
    isOdd
} from "@/assets/js/functions";

import ModalPickUpper from '@/components/Zone/Modal/PickUpperModal.vue'

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

        rowList:Array

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
        ModalPickUpper
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
        openPickUpperModal(id){
            this.$refs[`pickUpper${id}`][0].openModal();
        },

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
