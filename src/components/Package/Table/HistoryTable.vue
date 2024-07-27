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
                    <span v-if="item.updated_at_fa" class="t14300 text-gray500 py-5 number-font">
                        {{ item.updated_at_fa }}
                    </span>

                    <span v-else class="t14300 text-gray500 py-5 number-font">
                        -
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        <template v-if="item.type">
                            {{ getPackageType(item.type) }}
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
                        <template v-if="item.shps_count">
                            {{item.shps_count}}
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
                    <span class="t13500 text-black py-5 expanded-background" style="background-color: #F5F5F5;">
                        <template v-if="item.status">
                            {{ renameStatus(item.status) }}
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
    <ModalMassUpdate :updateUrl="updateUrl" />
</div>
</template>

<script>
import {isOdd} from "@/assets/js/functions";
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
         * Height
         */
        height: {
            type: String,
            default: '500',
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
            filter: []
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
        getPackageType(type){
            if(type === 'bulk'){
                return 'بالک'
            }else{
                return 'پالت'
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
         * Get row index in table
         * @param {*} index
         */
        renameStatus(status) {
            if (status === 'loading') {
                return 'لودینگ'
            } else if (status === 'luggage') {
                return 'در حال بارگیری'
            } else if (status === 'sent_to_warehouse') {
                return 'انتقال به انبار اصلی'
            } else if (status === 'received_by_warehouse') {
                return 'رسیده به انبار اصلی'
            }
            else if (status === 'completed') {
              return 'پر شده'
            }else {
                return 'خالی';
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
        }
    }
}
</script>
