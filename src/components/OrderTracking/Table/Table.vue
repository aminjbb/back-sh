<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-center c-table__header__item t12 w500" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>

        </template>
        <div class="c-table__header__item text-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-bind="props">
                mdi-dots-vertical
            </v-icon>
        </div>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-between c-table__contents__row">
                <div v-if="header[0].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray-darken-1 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div v-if="header[1].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray-darken-1 py-5 d--ltr number-font">
                        <template v-if="item.id">
                            #{{ item.id }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[2].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray-darken-1 py-5 d--ltr number-font">
                        <template v-if="item.order_number">
                            {{ item.order_number }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[3].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray-darken-1 py-5 d--ltr number-font">
                        <template v-if="item.status">
                            {{ item.status }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-icon color="primary500" @click="showOrderDetails(item.id)">mdi-eye</v-icon>
                </div>

                <orderModal :data="item" :ref="`orderTrackingDetails${item.id}`" />
            </div>
        </div>

        <div v-else class="null-data-table d-flex justify-center align-center flex-column">
            <img src="@/assets/img/NullTable.png" alt="shavaz image">
            <div class="d-flex justify-center align-center flex-column">
                <span class="t18 w600 text-black mb-5">لیست خالی!</span>
                <span class="t14 w300 text-gray-darken-1">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//components
import orderModal from '@/components/OrderTracking/Modals/OrderDetails.vue'
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

        /**
         * Active loading
         */
        loading: {
            type: Boolean,
            default: false
        },
    },

    components: {
        orderModal
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
        showOrderDetails(id){
            this.$refs[`orderTrackingDetails${id}`][0].dialog = true;
        },

        /**
         * Get row index in table
         * @param {*} index 
         */
        rowIndexTable(index) {
            return index + 1
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
