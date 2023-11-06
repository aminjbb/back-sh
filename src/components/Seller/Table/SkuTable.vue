<template>
<div
    :class="variant == 'outlined' ? 'table-outlined': ''"
    :style="{height: height}"
    class="c-table pl-1">
    <v-progress-linear
        color="primary500"
        indeterminate
        reverse
        v-if="loading" />

    <header class="c-table__header d-flex justify-start">
        <template v-for="(head, index) in header">
            <template v-if="head.value">
                <div
                    v-if="head.show"
                    @click="createOrdering(head.value, head.order)"
                    class="text-right c-table__header__item t12500 px-0"
                    :class="head.order == true ? 'pointer' : ''"
                    :key="index"
                    :style="{ width: itemsWidth, flex:head.value === 'label' ? `0.9 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
                    {{head.name}}
                </div>
            </template>
            <template v-else>
                <div
                    v-if="head.show"
                    class="text-right pointer c-table__header__item t12500"
                    :key="index"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    {{head.name}}
                </div>
            </template>
        </template>
        <div
            class="c-table__header__item"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t12500 ">
              عملیات
            </span>
        </div>
    </header>
    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-start">
                <div
                    v-if="header[0].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
                        <template v-if="checkbox">
                            <v-checkbox class="mr-1" v-model=item.value />
                        </template>
                    </div>
                </div>

                <div
                    v-if="item.id && header[1].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>
                <div
                    v-if="header[2].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <template v-if="item.seller_sku">
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{ item.seller_sku.unique_code }}
                        </span>
                    </template>

                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <template v-if="item.name">
                        <template v-if="model === 'sku' || model === 'skuGroup'">
                            <button type="button" v-clipboard:copy="item.name" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                <text-clamp
                                    :text='item.name'
                                    :max-lines='1'
                                    class="text-gray500 t14300 text-right" />
                                <v-tooltip
                                    activator="parent"
                                    location="top"
                                    class="d--rtl">
                                    {{item.name}}
                                </v-tooltip>
                            </button>
                        </template>

                        <template v-else>
                            <span class="t14300 text-gray500 py-5">
                                {{ item.name }}
                            </span>
                        </template>
                    </template>
                    <template v-else-if="item.created_at">
                        <span class="t14300 text-gray500 py-5 number-font number-font">
                            {{ item.created_at_fa }}
                        </span>
                    </template>
                    <template v-else>
                        <span class="t14300 text-gray500 py-5">
                            بدون نام
                        </span>
                    </template>
                </div>

                <div
                    v-if="header[4].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.label">
                        <template v-if="model === 'sku' || model === 'skuGroup'">
                            <button type="button" v-clipboard:copy="item.label" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                <text-clamp
                                    :text='item.label'
                                    :max-lines='1'
                                    class="text-gray500 t14300 text-right" />
                                <v-tooltip
                                    activator="parent"
                                    location="top"
                                    class="d--rtl">
                                    {{item.label}}
                                </v-tooltip>
                            </button>
                        </template>
                        <template v-else>
                            <span class="text-gray500 py-5 t14300">
                                <v-icon
                                    v-if="model === 'color'"
                                    icon="mdi-circle"
                                    size="small"
                                    :style="{color: item.value}"
                                    class="ml-2"
                                    :class="item.value == '#FFFFFF' ? 'icon-bordered' : ''" />
                                {{ item.label }}
                            </span>
                        </template>
                    </template>

                </div>

                <template v-if="model === 'sku'">
                    <div
                        v-if="header[4].show"
                        class="c-table__contents__item"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <button v-if="item.s_k_u_group" type="button" v-clipboard:copy="item.s_k_u_group.name" v-clipboard:success="onCopy" v-clipboard:error="onError">
                            <text-clamp
                                :text='item.s_k_u_group.name'
                                :max-lines='1'
                                class="text-gray500 t14300 text-right" />
                            <v-tooltip
                                activator="parent"
                                location="top"
                                class="d--rtl">
                                {{item.s_k_u_group.name}}
                            </v-tooltip>
                        </button>
                        <span v-else class="t14300 text-gray500 py-5"> بدون گروه بندی </span>
                    </div>

                    <div
                        v-if="item.product && header[5].show"
                        class="c-table__contents__item"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5">
                            <template v-if="item.product.category">
                                {{ item.product.category.label }}
                            </template>

                            <template v-else>
                                بدون دسته‌بندی
                            </template>
                        </span>
                    </div>

                    <div
                        v-if="header[6].show"
                        class="c-table__contents__item"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span v-if="item.brand && item.brand.label" class="t14300 text-gray500 py-5">
                            {{ item.brand.label }}
                        </span>
                        <span v-else> بدون برند </span>
                    </div>

                    <div
                        v-if="item.volumes && header[7].show"
                        class="c-table__contents__item"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <template v-if="item.volumes.length">
                            <template v-for="(volume,index) in item.volumes" :key="`volume-${index}`">
                                <span class="t14300 text-gray500 py-5 number-font">
                                    {{volume.value}} {{volume.label}}
                                    <template v-if="index + 1 !== item.volumes.length">
                                        -
                                    </template>
                                </span>
                            </template>
                        </template>
                        <template v-else>
                            <span class="t14300 text-gray500 py-5">بدون تعداد</span>
                        </template>
                    </div>

                </template>

                <div
                    v-if="(item.is_active  != undefined && checkActive ) && model !== 'product'"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14300 ">
                        <v-switch
                            v-model="active[index]"
                            inset
                            color="success"
                            @change="changeActive(index,item)" />
                    </span>
                </div>

                <div
                    v-if="model !== 'permission'"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>

                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeItem(item.id)">
                                        <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            حذف
                                        </span>
                                    </div>
                                </v-list-item-title>

                            </v-list-item>
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
import {isOdd} from '@/assets/js/functions'
import AddAttributeValueModal from '@/components/Attributes/Add/AddAttributeValueModal.vue'
import {openConfirm} from '@/assets/js/functions'
import {AxiosCall} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import {PanelFilter} from "@/assets/js/filter"
import {SkuPanelFilter} from "@/assets/js/filter_sku"
import {openToast} from "@/assets/js/functions";
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
                const width = 70 / (headerLength + 1);
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

    watch: {
        items(val) {
            if (this.model === 'sku') {
                this.skuStatus = [];
                val.forEach(element => {
                    var active = false
                    if (element.status == 'approved') active = true
                    this.skuStatus.push(active)
                });

                this.sellable = []
                val.forEach(element => {
                    var sellable = false
                    if (element.is_sellable == 1) sellable = true
                    this.sellable.push(sellable)
                });
            }

            if (this.model === 'attribute') {
                this.filter = []

                val.forEach(element => {
                    var active = false
                    if (element.is_filterable == 1) active = true
                    this.filter.push(active)
                });
            } else if (this.model !== 'rolePermission') {
                this.active = []
                val.forEach(element => {
                    var active = false
                    if (element.is_active == 1) active = true
                    this.active.push(active)
                });
            }
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

        /**
         * Clipboard success msg
         */
        onCopy() {
            openToast(
                this.$store,
                'متن  با موفقیت کپی شد.',
                "success"
            );
        },

        /**
         * Clipboard error msg
         */
        onError() {
            openToast(
                this.$store,
                'کپی متن با مشکل مواجه شد.',
                "error"
            );
        },
    },
}
</script>
