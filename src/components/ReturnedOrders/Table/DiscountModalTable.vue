<template>
<div class="c-table d--rtl">
    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div
                v-if="head.show"
                class="text-center c-table__header__item t12 w500 text-black"
                style="padding:20px 3px"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="[
                    { width: itemsWidth, flex: `0 0 ${itemsWidth}` },
                    index === 0  ? { width: '10.6667%', flex: '0 0 10.6667%' } : {},
                    index === 1 ? { width: '22.6667%', flex: '0 0 22.6667%',textAlign:'right !important' } : {},
                ]">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0" class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-between c-table__contents__row">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 10.6667%; flex: 0 0 10.6667%;">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="header[1].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 22.6667%; flex: 0 0 22.6667%">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        <template v-if="item.label">
                            {{ item.label }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13 w400 text-gray500 py-5">
                        <template v-if="item.code">
                            {{ item.code }}
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
                    <span class="t13 w400 text-gray500 py-5">
                        <template v-if="item.discount_amount">
                            {{ item.discount_amount }}
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
                    <span class="t13 w400 text-gray500 py-5 number-font">
                        <template v-if="item.start_time_fa">
                            {{ item.start_time_fa }}
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
                    <span class="t13 w400 text-gray500 py-5 number-font">
                        <template v-if="item.end_time_fa">
                            {{ item.end_time_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
    
<script>
import {
    isOdd
} from "@/assets/js/functions";

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

    },

    data() {
        return {
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
                const width = 100 / (headerLength);
                return `${width}%`;
            }
            return 'auto';
        },
    },

    methods: {

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
    },
}
</script>
