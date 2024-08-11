<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-center c-table__header__item t12 w500 text-black " style="padding:20px 3px" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item t12 w500 text-black" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" style="padding:20px 3px">
            عملیات
        </div>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0/*  && !loading */ " class="c-table__contents">
            <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-between c-table__contents__row">
                <div v-if="header[0].show" class="c-table__contents__item justify-center" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div v-if=" header[1].show" class="c-table__contents__item ml-15 " style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.name }}
                    </span>

                </div>

                <div v-if="header[4].show" class="c-table__contents__item" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-icon v-if="item.nafis" class="text-green" size="large">mdi-check</v-icon>
                    <v-icon v-else class="text-red" size="large">mdi-close</v-icon>
                </div>

                <div v-if="header[3].show" class="c-table__contents__item " style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-icon v-if="item.pishtaz" class="text-green" size="large">mdi-check</v-icon>
                    <v-icon v-else class="text-red" size="large">mdi-close</v-icon>
                </div>

                <div v-if="header[2].show" class="c-table__contents__item " style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-icon v-if="item.post" class="text-green" size="large">mdi-check</v-icon>
                    <v-icon v-else class="text-red" size="large">mdi-close</v-icon>

                </div>

                <div v-if="header[5].show" class="c-table__contents__item" style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-icon v-if="item.tipax" class="text-green" size="large">mdi-check</v-icon>
                    <v-icon v-else class="text-red" size="large">mdi-close</v-icon>
                </div>

                <div v-if="header[9].show" class="c-table__contents__item " style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.start_time_fa">
                            {{ item.start_time_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div v-if="header[9].show" class="c-table__contents__item " style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <template v-if="item.end_time_fa">
                            {{ item.end_time_fa }}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </span>
                </div>

                <div class="c-table__contents__item " style="padding:3px" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13400 text-gray500 py-5 number-font">
                        <v-switch v-model="active[index]" inset color="success" @change="changeActive(index,item)" />
                    </span>
                </div>

                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item  ">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-gray500">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="$router.push(`/free-delivery/${item.id}/shps`)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        نمایش کالاهای تخفیف
                                    </span>
                                </div>
                            </v-list-item-title>

                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="$router.push(`/free-delivery/${item.id}/customer`)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-eye-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        نمایش مشتری های تخفیف
                                    </span>
                                </div>
                            </v-list-item-title>

                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="$router.push(`/free-delivery/${item.id}/orderList`)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        لیست سفارشات
                                    </span>
                                </div>
                            </v-list-item-title>
                            <v-list-item-title>
                                <div class="ma-3 pointer d--rtl" @click="removeItem(item.id)">
                                    <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                        حذف
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
</div>
</template>
  
<script>
import {openConfirm, isOdd, splitChar} from "@/assets/js/functions";
import DetailsModal from '@/components/Orders/Modal/DetailsModal.vue'
import FactorModal from '@/components/Orders/Modal/FactorModal.vue'
import { AxiosCall} from "@/assets/js/axios_call";

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
            activeColumn: false,
            active: [],
        }
    },

    components: {
        DetailsModal,
        FactorModal
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
        splitChar,

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

        /**
         * Remove Item
         * @param {*} id
         */
        removeItem(id) {

            openConfirm(this.$store, "از حذف آیتم مورد نظر اطمینان دارید؟", "حذف", "delete", this.deletePath + id, true);

        },

        /**
         * Update list
         * @param {*} status
         */


        async changeActive(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.activePath + item.id
            if (this.active[index]) formdata.append('is_active', 1)
            else formdata.append('is_active', 0)
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
        },
    },
    watch: {

        items(val) {
          this.active =[]
            val.forEach(element => {
                var active = false
                if (element.is_active == 1) active = true
                this.active.push(active)
            });
        }
    },

}
</script>
