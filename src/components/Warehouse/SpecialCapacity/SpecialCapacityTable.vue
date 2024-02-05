<template>
<div
    :class="variant == 'outlined' ? 'table-outlined': ''"
    :style="{height: height}"
    class="c-table pl-1">
    <!--    <v-progress-linear-->
    <!--        color="primary500"-->
    <!--        indeterminate-->
    <!--        reverse-->
    <!--        v-if="loading"-->
    <!--    />-->

    <header class="c-table__header d-flex justify-between">

        <div
            v-for="(head, index) in header"
            class="text-right pointer c-table__header__item t12500"
            :key="index"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            {{head.name}}

        </div>
        <div class="c-table__header__item">
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
                class="d-flex justify-between">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14300 text-grey-darken-3 py-5 number-font">
                            {{convertDate(item.created_at)}}
                        </span>

                    </div>
                </div>

                <div
                    v-if="header[1].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14300 text-grey-darken-3 py-5">
                            {{ item.market_storage_count }}
                        </span>
                    </div>
                </div>
                <div
                    v-if="header[2].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14300 text-grey-darken-3 py-5">
                            {{ item.retail_storage_count }}
                        </span>
                    </div>
                </div>
                <div class="c-table__contents__item">
                    <v-icon @click="removeItem(item.id)">mdi-delete</v-icon>
                </div>

            </div>
        </div>

    </div>

</div>
</template>

<script>
import {convertDateToJalai, isOdd} from '@/assets/js/functions'
import AddAttributeValueModal from '@/components/Attributes/Add/AddAttributeValueModal.vue'
import { openConfirm } from '@/assets/js/functions'
import { AxiosCall } from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import { PanelFilter } from  "@/assets/js/filter"
import { SkuPanelFilter } from  "@/assets/js/filter_sku"
import { openToast } from "@/assets/js/functions";
export default {
    components: {
        ModalMassUpdate,
        AddAttributeValueModal
    },

    props: {
        /**
         * Update button url
         */
        updateUrl: {
            type: String,
            default: '',
        },
        /**
         * Edit button url
         */
        editUrl: '',

        /**
         * List Items for header
         */
        header: [],

        /**
         * List of items
         */
        items: [],

        /**
         * Delete Path
         */
        deletePath: '',

        /**
         * Model
         */
        model: '',

        /**
         * Active checkbox
         */
        checkbox: {
            type: Boolean,
            default: false,
        },

        /**
         * Variant
         * Variant values: outlined
         */
        variant: {
            type: String,
            default: 'default',
        },

        /**
         * Height
         */
        height: {
            type: String,
            default: '500',
        },

        /**
         * Edit endpoint for change filter
         */
        editPath: {
            type: String,
            default: ''
        },

        /**
         * Edit endpoint for change active
         */
        activePath: {
            type: String,
            default: ''
        },

        /**
         * Edit endpoint for change Sellable
         */
        sellablePath: {
            type: String,
            default: ''
        },

        /**
         * Get attributes
         */
        getAttributes: {
            type: Function
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
        uploadImageUrl: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            order_type: "desc",
            skuStatus: [],
            ordering: {},
            per_page: '25',
            active: [],
            sellable: [],
            filter: [],
            panelFilter: new PanelFilter(),
            skuPanelFilter: new SkuPanelFilter(),
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
                if (element.value === 'is_active' && element.show == true) {
                    this.activeColumn = true;
                } else if (element.value === 'is_active' && element.show == false) {
                    this.activeColumn = false;
                }
            });
            return this.activeColumn;
        },
    },

    methods: {
        convertDate(date){
         return  convertDateToJalai(date, '-' ,true)
        },

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
         */
        createOrdering(index) {
            if (index) {
                if (this.order_type === 'desc') {
                    this.order_type = 'asc'

                    if (this.model === 'sku') {
                        this.skuPanelFilter.order_type = 'asc'
                    } else {
                        this.panelFilter.order_type = 'asc'
                    }
                } else {
                    this.order_type = 'desc'

                    if (this.model === 'sku') {
                        this.skuPanelFilter.order_type = 'desc'
                    } else {
                        this.panelFilter.order_type = 'desc'
                    }
                }

                if (this.model === 'sku') {
                    this.skuPanelFilter.order = index
                    this.$router.push(this.$route.path + this.skuPanelFilter.sort_query(this.$route.query))
                } else {
                    this.panelFilter.order = index
                    this.$router.push(this.$route.path + this.panelFilter.sort_query(this.$route.query))
                }

                this.ordering = {};
                this.ordering[index] = !this.ordering[index];
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
         * Change filter
         * @param {*} index
         * @param {*} item
         */
        async changeFilter(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.editPath + item.id
            if (this.filter[index]) formdata.append('is_filterable', 1)
            else formdata.append('is_filterable', 0)
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
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
         * Change Sellable
         * @param {*} index
         * @param {*} item
         */
        async changeSellable(index, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = this.sellablePath + item.id
            if (this.sellable[index]) formdata.append('is_sellable', 1)
            else formdata.append('is_sellable', 0)
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
        },

        /**
         * Change SKU status
         * @param {*} index
         * @param {*} id
         */
        async changeStatusSku(index, id) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()

            if (this.skuStatus[index]) formdata.append('status', 'approved')
            else formdata.append('status', 'rejected')
            AxiosMethod.end_point = `product/sku/crud/switch/status/${id}`
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
