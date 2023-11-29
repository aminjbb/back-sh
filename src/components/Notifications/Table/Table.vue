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

        <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-menu :location="location">
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">
                        mdi-dots-vertical
                    </v-icon>
                </template>
            </v-menu>
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
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="item.id && header[1].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        {{ item.id }}
                    </span>
                </div>

                <div
                    v-if="item.title && header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 text-center">
                        {{ item.title }}
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5">
                        <v-btn :href="item.section ==='system' ? item.url :'/notifications/get/' + item.id" variant="icon">
                            <v-icon color="success">mdi-eye</v-icon>
                        </v-btn>
                    </span>
                </div>

                <div
                    v-if="header[4].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.created_at_fa">
                            {{ item.created_at_fa }}
                        </template>
                        <template v-else>
                            نامعلوم
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
                                <div class="ma-5 pointer" @click="removeItem(item.id)">
                                    <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
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
    <ModalMassUpdate :updateUrl="updateUrl" />
</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    SupplierPanelFilter
} from "@/assets/js/filter_supplier"
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import {
    openToast,
    openConfirm,
    isOdd
} from "@/assets/js/functions";
export default {
    components: {
        ModalMassUpdate,
    },

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
            active: [],
            isIndex: [],
            isFollow: [],
            panelFilter: new SupplierPanelFilter(),
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

        /**
         * Check is_active is true or false for show in table
         */
        checkActive() {
            this.header.forEach(element => {
                if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == true) {
                    this.activeColumn = true;
                } else if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == false) {
                    this.activeColumn = false;
                }
            });
            return this.activeColumn;
        },
    },

    watch: {
        items(val) {
            this.active = []
            this.isIndex = []
            this.isFollow = []
            val.forEach(element => {
                var active = false
                var is_index = false
                var is_follow = false
                if (element.is_active == 1) active = true
                if (element.is_index == 1) is_index = true
                if (element.is_follow == 1) is_follow = true
                this.active.push(active)
                this.isIndex.push(is_index)
                this.isFollow.push(is_follow)
            });
        }
    },

    methods: {

        /**
         * Mass update modal
         */
        massUpdateModal() {
            this.$store.commit('set_massUpdateModal', true)
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

        returnTrueOrFalse(data) {
            if (data === 1) return true
            else return false
        },

        /**
         * Change Active
         * @param {*} index 
         * @param {*} item 
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

        /**
         * Change be index
         * @param {*} index 
         * @param {*} item 
         */
        async changeIsIndex(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'page/crud/update/index/' + item.id
            if (this.isIndex[index]) formdata.append('is_index', 1)
            else formdata.append('is_index', 0)
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
        },

        /**
         * Change be follow
         * @param {*} index 
         * @param {*} item 
         */
        async changeIsFollow(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'page/crud/update/follow/' + item.id
            if (this.isFollow[index]) formdata.append('is_follow', 1)
            else formdata.append('is_follow', 0)
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
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
            openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", this.deletePath + id, true)
        },
    },
}
</script>
