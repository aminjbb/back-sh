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
                style="padding:20px 5px"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div
            class="text-center c-table__header__item t12500 text-black"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
            style="padding:20px 5px">
            ذخیره
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
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="item.shps && header[1].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        {{ item.shps }}
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5">
                        <template v-if="item.sku">
                            {{ item.sku }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.shps_requested_count">
                            {{ item.shps_requested_count }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

              <div
                  v-if="header[3].show"
                  style="padding: 3px 5px;"
                  class="c-table__contents__item justify-center"
                  :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.shps_received_count">
                            {{ item.shps_received_count }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
              </div>

                <div
                    v-if="header[4].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-text-field
                        v-if="form[index]"
                        v-model="form[index].buying_price"
                        hide-details
                        variant="outlined"
                        class="number-font"
                        type="number" />
                </div>

                <div
                    v-if="header[5].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-text-field
                        v-if="form[index]"
                        v-model="form[index].customer_price"
                        hide-details
                        variant="outlined"
                        class="number-font"
                        type="number" />
                </div>

                <div
                    v-if="header[6].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.sum_buying_price || item.sum_buying_price == 0">
                            {{ splitChar(item.sum_buying_price) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[7].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.sum_customer_price || item.sum_customer_price == 0">
                            {{ splitChar(item.sum_customer_price) }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[8].show"
                    style="padding: 3px 5px;"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.profit || item.profit == 0">
                            {{ item.profit }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    style="padding: 3px 5px;">
                    <v-progress-circular
                        v-if="form[index] && form[index].loading"
                        indeterminate
                        color="primary"></v-progress-circular>
                    <div
                        v-else
                        @click="updatePricing(index, item)"
                        class="seller__add-sku-btn d-flex justify-center align-center pointer">

                        <v-icon size="15">mdi-plus</v-icon>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="null-data-table d-flex justify-center align-center flex-column">
            <img src="@/assets/img/NullTable.png" alt="shavaz image">
            <div class="d-flex justify-center align-center flex-column">
                <span class="title4 text-black mb-5">لیست خالی!</span>
                <span class="t13400 text-gray500">تاکنون داده‌ای به این لیست افزوده نشده است.</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    openToast,
    isOdd,
    splitChar
} from "@/assets/js/functions";

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
            form: [{
                customer_price: null,
                buying_price: null
            }],
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

    watch: {
        items(val) {
            this.form = []
            val.forEach(element => {
                const form = {
                    customer_price: element.customer_price ? element.customer_price : '',
                    buying_price: element.buying_price ? element.buying_price : '',
                    loading: false,
                    save: false,
                }
                this.form.push(form)
            });
        }
    },

    methods: {
        splitChar,

        async updatePricing(index, item) {
          try {
            this.form[index].loading = true
            const formData = new FormData()
            formData.append('customer_price', this.form[index].customer_price)
            formData.append('buying_price', this.form[index].buying_price)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.form = formData
            AxiosMethod.store = this.$store;
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `factor/crud/update/${this.$route.params.id}/shps/price/${item.shps}`
            let data = await AxiosMethod.axios_post();

            if (data) {
              this.form[index].loading = false;
              this.form[index].save = true;
              openToast(this.$store, 'اطلاعات با موفقیت ویرایش شد', 'success');

              if (this.form.length === this.items.length) {
                const showVariable = this.form.every(obj => obj.save === true);
                if (showVariable) {
                  this.showSave('true');
                }
              }
              this.updateList('true');
            }
          }
          catch (e) {
            this.form[index].loading = false;
          }
        },

        /**
         * Update list
         * @param {*} status 
         */
        updateList(status) {
            this.$emit('updateList', status);
        },

        /**
         * showSave
         * @param {*} status 
         */
        showSave(status) {
            this.$emit('showSave', status);
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
