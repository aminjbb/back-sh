<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-center c-table__header__item t12 w500 text-black" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t12 w500 text-black">عملیات</span>
        </div>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-between c-table__contents__row">
                <div v-if="header[0].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>
                <template v-if="model === 'promotionPage'">
                    <div v-if="item.name && header[1].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5">
                            {{ item.name }}
                        </span>
                    </div>
                    <div v-if="item.label && header[2].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5">
                            {{ item.label }}
                        </span>
                    </div>
                    <div v-if="item.id && header[3].show" class="c-table__contents__item justify-center number-font" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.id }}
                        </span>
                    </div>
                    <div v-if="item.created_at_fa && header[4].show" class="c-table__contents__item justify-center number-font" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.created_at_fa }}
                        </span>
                    </div>
                    <div v-if="item.updated_at_fa && header[5].show" class="c-table__contents__item justify-center number-font" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.updated_at_fa }}
                        </span>
                    </div>
                    <div v-if="header[6]?.show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300">
                            <v-switch color="success" v-model="active[index]" inset @change="changeActive(index,item)" />
                        </span>
                    </div>
                    <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
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
                                            <span class="mr-2 text-grey-darken-1 t14 w300">
                                                حذف
                                            </span>

                                        </div>
                                    </v-list-item-title>
                                    <v-list-item-title>
                                        <div class="ma-5 pointer" @click="$router.push(`/promotion-page/update/${item.id}`)">
                                            <v-icon class="text-grey-darken-1">mdi-pen-minus</v-icon>
                                            <span class="mr-2 text-grey-darken-1 t14 w300">
                                                ویرایش
                                            </span>

                                        </div>
                                    </v-list-item-title>

                                    <v-list-item-title>
                                        <div class="ma-5 pointer" @click="$router.push(`/promotion-page/${item.id}/sku-group/add`)">
                                            <v-icon class="text-grey-darken-1">mdi-package-variant-closed</v-icon>
                                            <span class="mr-2 text-grey-darken-1 t14 w300">
                                                مدیریت محصولات
                                            </span>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </template>

                <template v-if="model === 'skuPromotionPage'">
                    <div v-if="header[1].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5" v-show="item.sku">
                            {{ item.sku?.label }}
                        </span>
                    </div>
                    <div v-if="item.id && header[2].show" class="c-table__contents__item justify-center number-font" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{ item.id }}
                        </span>
                    </div>
                    <div v-if="  header[3].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <div class="t14 w300 text-gray500 py-5" style="width: 100px;">
                            <v-text-field variant="outlined" v-model="priorities[index]" type="number" />
                        </div>
                    </div>

                    <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}`  }" @click="saveSkuToPromotion(item, index)" class="d-flex justify-center align-center ">
                        <span class="seller__add-sku-btn d-flex justify-center align-center">
                            <v-icon>mdi-plus</v-icon>
                        </span>
                    </div>

                    <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class=" c-table__contents__item justify-center">
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
                                            <span class="mr-2 text-grey-darken-1 t14 w300">
                                                حذف
                                            </span>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </template>
            </div>
        </div>
        <div v-else class="null-data-table d-flex justify-center align-center flex-column">
            <img src="@/assets/img/NullTable.png" alt="shavaz image">
            <div class="d-flex justify-center align-center flex-column">
                <span class="t18 w600 text-black mb-5">لیست خالی!</span>
                <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {AxiosCall} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import ActivationModal from "@/components/Public/ActivationModal.vue";

import {openToast, openConfirm, isOdd} from "@/assets/js/functions";
export default {
    components: {
        ModalMassUpdate,
        ActivationModal
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
            priorities: [],
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
    },

    watch: {
        items(val) {
            this.active = []
            this.priorities = []
            val.forEach(element => {
                var active = false
                if (element.is_active == 1) active = true
                this.active.push(active)
                if (this.model === 'skuPromotionPage') {
                    this.priorities.push(element.pivot ?.priority)
                }
            });

        }
    },

    methods: {
        async saveSkuToPromotion(item, index) {
            const formData = new FormData();
            const AxiosMethod = new AxiosCall();
            AxiosMethod.using_auth = true;
            AxiosMethod.store = this.$store;
            AxiosMethod.token = this.$cookies.get('adminToken');
            AxiosMethod.end_point = `page/promotion/${this.$route.params.promotionId}/seller-sku/attach`;
            formData.append('seller_sku_id', item.id);
            formData.append('is_active', 1);
            formData.append('priority', this.priorities[index]);

            AxiosMethod.form = formData;

            let data = await AxiosMethod.axios_post();
            if (data) {

                openToast(
                    this.$store,
                    'کد کالا با موفقیت افزوده شد.',
                    "success"
                );
            }
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
