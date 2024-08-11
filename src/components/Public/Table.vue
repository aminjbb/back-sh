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

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <template v-if="head.value">
                <div
                    v-if="head.show"
                    @click="createOrdering(head.value, head.order)"
                    class="text-right c-table__header__item t12 w500"
                    :class="head.order == true ? 'pointer' : ''"
                    :key="index"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                    {{head.name}}
                </div>
            </template>
            <template v-else>
                <div
                    v-if="head.show"
                    class="text-right c-table__header__item t12 w500"
                    :class="head.order == true ? 'pointer' : ''"
                    :key="index"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                    {{head.name}}
                </div>
            </template>
        </template>
        <div
            v-if="model !== 'permission' "
            class="c-table__header__item"
            :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-menu :location="location">
                <template v-slot:activator="{ props }">
                    <!-- <v-icon v-bind="props">
                        mdi-dots-vertical
                    </v-icon> -->
                    <span v-bind="props">
                        عملیات
                    </span>
                </template>

                <v-list v-if="model !== 'sku' && model !== 'export'">
                    <v-list-item>
                        <v-list-item-title>
                            <v-btn
                                @click="massUpdateModal()"
                                variant="text"
                                height="40"
                                rounded
                                class="px-5 mt-1 mr-5">
                                <template v-slot:prepend>
                                    <v-icon>mdi-pen-minus</v-icon>
                                </template>
                                ویرایش گروهی
                            </v-btn>
                        </v-list-item-title>

                    </v-list-item>
                </v-list>
            </v-menu>
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
                        <span class="t14 w300 text-gray500 py-5 number-font">
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
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>
                <div
                    v-if="model === 'export' && item.model"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5">
                        {{ item.model }}
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <template v-if="item.name">
                        <template v-if="model === 'sku' || model === 'skuGroup'">
                            <button type="button" v-clipboard:copy="item.name" v-clipboard:success="onCopy" v-clipboard:error="onError" class=" text-right">
                                <span class="text-gray500 t14 w300 text-right"> {{item.name}}</span>
                            </button>
                        </template>

                        <template v-else>
                            <span class="t14 w300 text-gray500 py-5 number-font">
                                {{ item.name }}
                            </span>
                        </template>
                    </template>
                    <template v-else-if="item.created_at">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.created_at_fa }}
                        </span>
                    </template>
                    <template v-else>
                        <span class="t14 w300 text-gray500 py-5">
                            بدون نام
                        </span>
                    </template>
                </div>

                <div
                    v-if="header[3].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <template v-if="item.label">
                        <template v-if="model === 'sku' || model === 'skuGroup'">
                            <button type="button" v-clipboard:copy="item.label" v-clipboard:success="onCopy" v-clipboard:error="onError" class=" text-right">
                                <span class="text-gray500 t14 w300 text-right"> {{item.label}}</span>
                            </button>
                        </template>
                        <template v-else>
                            <span class="text-gray500 py-5 t14 w300 number-font">
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

                    <template v-else-if="item.download_url && model === 'export'">
                        <v-btn :href="item.download_url" variant="icon">
                            <v-icon color="success">mdi-download</v-icon>
                        </v-btn>
                    </template>

                    <template v-else>
                        <span class="t14 w300 text-gray500 py-5">
                            بدون نام
                        </span>
                    </template>
                </div>

                <div
                    v-if="model === 'color' && header[4].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14 w300 text-gray500 py-5">
                        {{ item.group }}
                    </span>
                </div>

                <!-- category name -->
                <div
                    v-if="(model === 'product' || model === 'skuGroup') && header[4].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span>
                        <v-btn :href=" model === 'product'? `/product/create/sku/${item.id}` : `/product/get/${item.product_id}/skugroup/${item.id}/create/sku`" variant="icon">
                            <v-icon color="success">mdi-plus</v-icon>
                        </v-btn>
                    </span>
                </div>

                <div
                    v-if="(model === 'product' || model === 'skuGroup') && header[4].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span>
                        <v-btn :href=" model === 'product'? `/product/get/${item.id}/sku/index/` : `${item.id}/sku/index`" variant="icon">
                            <v-icon color="success">mdi-eye</v-icon>
                        </v-btn>
                    </span>
                </div>

                <div
                    v-if="model === 'product' && header[5].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14 w300 ">
                        <v-switch
                            v-model="active[index]"
                            inset
                            color="success"
                            @change="changeActive(index,item)" />
                    </span>
                </div>

                <div
                    v-if="model === 'attribute' && header[4].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14 w300 text-gray500 py-5">
                        {{ item.type }}
                    </span>
                </div>

                <div
                    v-if="model === 'attribute' && header[5].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <div class="text-center">
                        <AddAttributeValueModal
                            :getAttributes="getAttributes"
                            :attributeId="item.id"
                            :values="item.values" />
                    </div>
                </div>

                <div
                    v-if="item.is_filterable != undefined && header[6].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14 w300">
                        <v-switch
                            color="success"
                            v-model="filter[index]"
                            inset
                            @change="changeFilter(index,item)" />
                    </span>
                </div>

                <template v-if="model === 'sku'">
                    <div
                        v-if="header[4].show"
                        class="c-table__contents__item"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <button v-if="item.s_k_u_group" type="button" v-clipboard:copy="item.s_k_u_group.name" v-clipboard:success="onCopy" v-clipboard:error="onError" class=" text-right">
                            <span class="text-gray500 t14 w300 text-right">{{item.s_k_u_group.name}}</span>
                        </button>
                        <span v-else class="t14 w300 text-gray500 py-5"> بدون گروه بندی </span>
                    </div>

                    <div
                        v-if="item.product && header[5].show"
                        class="c-table__contents__item"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5">
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
                        <span v-if="item.brand && item.brand.label" class="t14 w300 text-gray500 py-5">
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
                                <span class="t14 w300 text-gray500 py-5">
                                    {{volume.value}} {{volume.label}}
                                    <template v-if="index + 1 !== item.volumes.length">
                                        -
                                    </template>
                                </span>
                            </template>
                        </template>
                        <template v-else>
                            <span class="t14 w300 text-gray500 py-5">بدون تعداد</span>
                        </template>
                    </div>

                    <div
                        v-if="header[8].show"
                        class="c-table__contents__item"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span v-if="item.color && item.color.value" class="t14 w300 text-gray500 py-5 pointer">
                            <v-icon
                                icon="mdi-circle"
                                size="small"
                                :style="{ color: item.color.value }"
                                class="ml-2"
                                :class="item.color.value == '#FFFFFF' ? 'icon-bordered' : ''" />

                            <v-tooltip
                                activator="parent"
                                location="top"
                                class="d--rtl">
                                {{item.color.label}}
                            </v-tooltip>
                        </span>
                        <span v-else class="t14 w300 text-gray500 py-5"> بدون رنگ </span>
                    </div>
                </template>

                <div
                    v-if="(item.is_active  != undefined && checkActive ) && model !== 'product'"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14 w300 ">
                        <v-switch
                            v-model="active[index]"
                            inset
                            color="success"
                            @change="changeActive(index,item)" />
                    </span>
                </div>

                <div
                    v-if="item.is_sellable != undefined && header[11].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t14 w300 ">
                        <v-switch
                            v-model="sellable[index]"
                            inset
                            color="success"
                            @change="changeSellable(index,item)" />
                    </span>
                </div>

                <div
                    v-if="item.product && header[11].show && model === 'sku'"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5">
                        {{ item.product.label }}
                    </span>
                </div>

                <div
                    v-if="model !== 'permission'  "
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <v-menu :close-on-content-click="false" :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>
                                <v-list-item-title v-if="model !== 'export' && editUrl">
                                    <div class="ma-5 pointer" @click="$router.push(editUrl + item.id )">
                                        <v-icon class="text-grey-darken-1">mdi-pen-minus</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش
                                        </span>
                                    </div>
                                </v-list-item-title>

                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeItem(item.id)">
                                        <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            حذف
                                        </span>
                                    </div>
                                </v-list-item-title>
                              <v-list-item-title v-if="item.product">
                                <div class="ma-5 pointer" >
                                  <ModalFinancialInfo :id="item.id" :financialInfo="item" @getFinancialData="financialData"/>
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
                <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
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
import {openToast} from "@/assets/js/functions";
import ModalFinancialInfo from '@/components/Products/Sku/Modal/ModalFinancialInfo.vue'
export default {
    components: {
        ModalMassUpdate,
        AddAttributeValueModal,
      ModalFinancialInfo
    },

    props: {
      getRetailShipmentList:{
        type:Function
      },
      id:'',
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
      financialData(va) {
        this.$emit('getFinancial', va)
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
