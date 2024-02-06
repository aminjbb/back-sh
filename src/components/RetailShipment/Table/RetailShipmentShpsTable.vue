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
                    :style="{ width: itemsWidth, flex:head.value === 'label' ? `1 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
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
            v-if="model === 'editShpsRetail'"
            class="c-table__header__item"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t12500 ">
                عملیات
            </span>
        </div>
        <div class="c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
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
                        <span class="t13300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
                        <template v-if="checkbox">
                            <v-checkbox class="mr-1" v-model=item.value />
                        </template>
                    </div>
                </div>

                <div
                    v-if=" header[1].show"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>

                <div
                    v-if=" header[2].show"
                    style="padding:0"
                    class="c-table__contents__item text-right"
                    :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray500 py-5 number-font">
                        {{ item.sku?.label }}
                    </span>
                </div>

                <div
                    v-if=" header[3].show"
                    class="c-table__contents__item number-font text-right"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-text-field v-model="form[index].count" variant="outlined" />
                </div>
                <div
                    v-if=" header[4].show && model != 'sellerConsigment'"
                    class="c-table__contents__item number-font"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-text-field v-model="form[index].minTolerance" variant="outlined" />
                </div>
                <div
                    v-if=" header[5].show && model != 'sellerConsigment'"
                    class="c-table__contents__item number-font"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-text-field v-model="form[index].maxTolerance" variant="outlined" />
                </div>
                <div
                    v-if=" model === 'editShpsRetail'"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div @click="updateRetailShipment(index)" class="seller__add-sku-btn d-flex justify-center align-center pointer">
                        <v-icon size="15">mdi-plus</v-icon>
                    </div>
                </div>

                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">
                                mdi-dots-vertical
                            </v-icon>
                        </template>
                        <v-list-item-title>
                            <div class="ma-5 pointer d--rtl" v-if="model === 'addShps'" @click="deleteFunction(item.id)">
                                <v-icon class="text-grey-darken-1" size="small">mdi-delete</v-icon>
                                <span class="mr-2 text-grey-darken-1 t13400">
                                    حذف
                                </span>
                            </div>
                          <div v-else class="ma-5 pointer d--rtl" @click="removeItem(item.id)">
                                <v-icon class="text-grey-darken-1" size="small">mdi-delete</v-icon>
                                <span class="mr-2 text-grey-darken-1 t13400">
                                    حذف
                                </span>
                            </div>
                        </v-list-item-title>

                    </v-menu>
                </div>
            </div>
        </div>
        <div v-else class="null-data-table d-flex justify-center align-center flex-column">
            <img src="@/assets/img/NullTable.png" alt="shavaz image">
            <div class="d-flex justify-center align-center flex-column">
                <span class="title4 text-black mb-5">لیست خالی!</span>
                <span class="t13300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    isOdd
} from '@/assets/js/functions'
import AddAttributeValueModal from '@/components/Attributes/Add/AddAttributeValueModal.vue'
import {
    openConfirm
} from '@/assets/js/functions'
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import {
    PanelFilter
} from "@/assets/js/filter"
import {
    SkuPanelFilter
} from "@/assets/js/filter_sku"
import {
    openToast
} from "@/assets/js/functions";
export default {

    props: {
        deleteFunction: {
            type: Function,
        },
        updateSkuUrl: {
            type: String,
            default: '',
        },
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
            activeColumn: false,
            form: []
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
                const width = 80 / (headerLength + 1);
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
         * Change Active
         * @param {*} index
         * @param {*} item
         */
        async updateRetailShipment(index) {
            const formData = new FormData()
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.store = this.$store
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `shipment/consignment/${this.$route.params.retailId}/attach/shps`
            formData.append('shps', this.form[index].shps)
            formData.append('count', this.form[index].count)
            formData.append('min_tolerance', this.form[index].minTolerance)
            formData.append('max_tolerance', this.form[index].maxTolerance)
            AxiosMethod.form = formData
            let data = await AxiosMethod.axios_post()
            if (data) {
                openToast(
                    this.$store,
                    ' کالا با موفقیت ویرایش شد.',
                    "success"
                );
            }

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

        updateList(status) {
            console.log('2.skuTable', status)
            this.$emit('updateList', status);
        },
    },
}
</script>
