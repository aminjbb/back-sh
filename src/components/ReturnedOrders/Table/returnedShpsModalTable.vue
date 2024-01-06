<template>
<div class="c-table d--rtl">
    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div
                v-if="head.show"
                @click="createOrdering(head.value, head.order)"
                class="text-center c-table__header__item t12500 text-black"
                style="padding:20px 3px"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="[
                    { width: itemsWidth, flex: `0 0 ${itemsWidth}` },
                    index === 0  ? { width: '7.5%', flex: '0 0 7.5%' } : {},
                    index === 2 ? { width: '13.5%', flex: '0 0 13.5%',textAlign:'right !important' } : {},
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
                    style="padding: 3px; width: 7.5%; flex: 0 0 7.5%;">
                    <span class="t12500 text-gray500 py-3 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="item.id && header[1].show"
                    class="c-table__contents__item justify-center"
                    style="padding:3px"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-3 number-font">
                        {{ item.id }}
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 13.5%; flex: 0 0 13.5%;">
                    <span class="t12500 text-gray500 py-3">
                        <template v-if="item.shps && item.shps.sku && item.shps.sku.label">
                            {{ item.shps.sku.label }}
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
                    <span class="t12500 text-gray500 py-3 number-font">
                        <template v-if="item.count">
                            {{item.count}}
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
                    <span class="t12500 text-gray500 py-3">
                        <template v-if="item.shps && item.shps.sku && item.shps.sku.seller && item.shps.sku.seller.shopping_name">
                            {{ item.shps.sku.seller.shopping_name }}
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
                    <span class="t12500 text-gray500 py-3 number-font">
                        <template v-if="item.price">
                            {{ splitChar(item.price) }}
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
                    <span class="t12500 text-gray500 py-3 number-font">
                        <template v-if="item.base_discount">
                            {{ splitChar(item.base_discount) }} تومان
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
                    <span class="t12500 text-gray500 py-3 number-font">
                        <template v-if="item.marketing_discount">
                            {{ item.marketing_discount}}
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
                    <span class="t12500 text-gray500 py-3 number-font">
                        <template v-if="item.code">
                            {{ item.code }}
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
                    <span class="t12500 text-gray500 py-3 number-font">
                        <template v-if="item.total_price">
                            {{ splitChar(item.total_price) }} تومان
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
    isOdd,
    splitChar
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
        splitChar,

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
            rowIndex = index + 1
            return rowIndex
        },
    },
}
</script>
