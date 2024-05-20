<template>
<div class="c-table d--rtl">
    <header class="c-table__header d-flex justify-between" style="border-color:#F7F8FA">
        <template v-for="(head, index) in header">
            <div
                v-if="head.show"
                class="text-center c-table__header__item t12500 text-black"
                style="padding:10px 3px;"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="[
                        { width: itemsWidth, flex: `0 0 ${itemsWidth}` },
                        index === 0  ? { width: '6%', flex: '0 0 6%' } : {},
                        index === 1  ? { width: '7%', flex: '0 0 7%' } : {},
                        index === 2 ? { width: '17%', flex: '0 0 17%',textAlign:'right !important' } : {},
                        index === 3  ? { width: '7%', flex: '0 0 7%' } : {},
                        index === 9  ? { width: '13%', flex: '0 0 13%' } : {},
                    ]">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>
    </header>

    <div class="stretch-table" style="height: 20px;">
        <div v-if="items && items.length > 0" class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-between c-table__contents__row">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 6%; flex: 0 0 6%;">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="header[1].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 7%; flex: 0 0 7%;">
                    <span class="t12500 text-gray500 py-5 number-font">
                        <template v-if="item.shps_id">
                            {{ item.shps_id }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 17%; flex: 0 0 17%">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.shps_label">
                            {{ item.shps_label }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 7%; flex: 0 0 7%;">
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.shps_count">
                            {{ item.shps_count }}
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
                    <span class="t13400 text-gray500 py-5">
                        <template v-if="item.price">
                            {{ item.price }}
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
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.total_price">
                            {{ item.total_price }}
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
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.price">
                            {{ item.price }}
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
                        <template v-if="item.base_discount">
                            {{ item.base_discount }}
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
                        <template v-if="item.tax_amount">
                            {{ item.tax_amount }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[9].show"
                    class="c-table__contents__item justify-center"
                    style="padding: 3px; width: 13%; flex: 0 0 13%;">>
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.tax_amount_sum">
                            {{ item.tax_amount_sum }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <v-divider color="grey" />

    <div class="d-flex align-center justify-space-between pa-5">
        <span class="t12500 text-black">جمع کل:</span>
        <span class="t12500 text-black"></span>
    </div>

    <v-divider color="grey" />

    <div class="d-flex align-center justify-space-between pa-5">
        <div class="d-flex align-center">
            <span class="modal__content__title">مهر و امضای فروشنده: </span>
            <span class="modal__content__txt">
            </span>
        </div>

        <div class="d-flex align-center">
            <span class="modal__content__title">مهر و امضای خریدار: </span>
            <span class="modal__content__txt">
            </span>
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
