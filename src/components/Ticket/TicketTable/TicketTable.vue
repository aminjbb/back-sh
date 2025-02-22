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
                class="text-center c-table__header__item t12 w500"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
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
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-between c-table__contents__row">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray-darken-1 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="header[1].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray-darken-1 py-5 d--ltr">
                        <template v-if="item.code">
                            #{{ item.code }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray-darken-1 py-5 d--ltr number-font">
                        <template v-if="item.id">
                            {{ item.id }}
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
                    <span class="t14 w300 text-gray-darken-1 py-5">
                        <template v-if="item.title">
                            {{ item.title }}
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
                    <span class="py-5" :class="item.priority == 'urgent' ? 't14 w500 text-red-darken-4' : item.priority == 'high' ? 't14 w500 text-red-darken-2' : 't14 w300 text-gray-darken-1 '" :style="{ 'text-shadow': item.priority === 'urgent' ? '0px 0px 7px #CE0202' : '' }">
                        <template v-if="item.priority">
                            {{getPriorityText(item.priority)}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="item.status && header[5].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-chip
                        class="ma-2 rounded-lg t10 w400"
                        :color="getStatusColor(item.status)"
                        text-color="white">
                        {{getStatusText(item.status)}}
                    </v-chip>
                </div>

                <div
                    v-if="header[6].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray-darken-1 py-5">
                        <template v-if="item.user && item.user.first_name   ">
                            {{ item.user.first_name }} {{ item.user.last_name }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[7].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray-darken-1 py-5 number-font">
                            <template v-if="item.user && item.user.phone_number   ">
                                {{ item.user.phone_number }}
                            </template>
                            <template>
                                -
                            </template>
                        </span>
                </div>

                <div
                    v-if=" header[8].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray-darken-1 py-5 number-font">
                        <template v-if="item.created_at_fa">
                            {{item.updated_at.split('T')[1].split('.')[0]}}
                            {{ item.created_at_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                    <div
                        v-if="header[9].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray-darken-1 py-5 number-font">
                        <template v-if="item.latest_date_fa">
                            {{ item.latest_date_fa.split(' ')[1] }}
                            {{ item.latest_date_fa.split(' ')[0] }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-btn class="c-table__button" @click="$router.push(`/ticket/get/${item.id}`)">
                        <v-icon color="primary500">mdi-eye</v-icon>
                    </v-btn>
                </div>
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
import { isOdd } from '@/assets/js/functions'
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
        getStatusColor(status) {
            const color = '';

            if (status == 'open') {
                return 'blue';
            }
            if (status == 'answered') {
                return 'green';
            }
            if (status == 'resolved') {
                return 'grey-lighten-1';
            }
          if (status == 'pending') {
            return 'warning';
          }

            return '';
        },

        getStatusText(status) {
            const text = '';

            if (status == 'open') {
                return 'باز';
            }
            if (status == 'answered') {
                return 'پاسخ داده شده';
            }
            if (status == 'resolved') {
                return 'بسته شده';
            }
          if (status == 'pending') {
            return 'در حال بررسی';
          }

            return 'نامعلوم';
        },

        getPriorityText(priority) {
            const text = '';

            if (priority == 'urgent') {
                return 'ضروری';
            }
            if (priority == 'low') {
                return 'پایین';
            }
            if (priority == 'high') {
                return 'بالا';
            }
            if (priority == 'medium') {
                return 'متوسط';
            }

            return 'معمولی';
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
    },
}
</script>
