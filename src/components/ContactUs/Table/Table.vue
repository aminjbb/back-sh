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

        <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span>مشاهده</span>
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
                        {{ item.full_name }}
                    </span>
                </div>

                <div v-if="header[2].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.phone_number">
                            {{ item.phone_number }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div v-if="header[3].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray500 py-5 number-font">
                        <template v-if="item.subject">

                            {{ translateType(item.subject) }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div v-if="header[3].show" class="c-table__contents__item text-gray500 justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="number-font">
                        <template v-if="item.created_at">
                            {{ convertDateToJalai (item.created_at , '-' , true) }}

                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>
                <div v-if="header[3].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray500 py-5 number-font">
                        <ModalShowDes :description="item.description" />
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
import ModalShowDes from "@/components/ContactUs/Modal/ModalShowDes.vue";

import {
    convertDateToJalai,
    isOdd
} from "@/assets/js/functions";

export default {
    components: {
        ModalShowDes,
    },

    props: {
        getShipmentRequestsList: {
            type: Function
        },
        ShipmentRequestsList: {
            type: Function
        },
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
            active: [],
            isIndex: [],
            isFollow: [],
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
        convertDateToJalai,

        translateType(type) {
            const translations = {

                'suggestion': 'پیشنهاد',
                'criticism': 'نقد',
                'commercial': 'تبلیغات',
                'digital_marketing': 'دیجیتال مارکتینگ',
                'support': 'حمایت',
                'other': 'سایر',
            };
            return translations[type] || type;
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
