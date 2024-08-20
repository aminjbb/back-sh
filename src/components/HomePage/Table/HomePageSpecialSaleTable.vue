<template>
<div :class="variant == 'outlined' ? 'table-outlined': ''" :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-start">
        <template v-for="(head, index) in header">
            <template v-if="head.value">
                <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-right c-table__header__item t12 w500 px-0" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex:head.value === 'link' ? `2 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
                    {{head.name}}
                </div>
            </template>
            <template v-else>
                <div v-if="head.show" class="text-right pointer c-table__header__item t12 w500" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    {{head.name}}
                </div>
            </template>
        </template>
        <div class="c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <span class="t12 w500 ">
                عملیات
            </span>
        </div>
    </header>
    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-start">
                <div v-if="header[0].show" class="c-table__contents__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
                        <template v-if="checkbox">
                            <v-checkbox class="mr-1" v-model=item.value />
                        </template>
                    </div>
                </div>
                <div v-if="header[1].show" class="c-table__contents__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{item.label}}
                        </span>
                    </div>
                </div>
                <div v-if="header[2].show" class="c-table__contents__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{convertDateToJalai(item.start_time , '-' , true) }} {{getTime(item.start_time)}}
                        </span>
                    </div>
                </div>
                <div v-if="header[3].show" class="c-table__contents__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{convertDateToJalai(item.end_time, '-' , true)}} {{getTime(item.end_time)}}
                        </span>
                    </div>
                </div>
                <div v-if="header[4].show" class="c-table__contents__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{item.creator?.first_name}} {{item.creator?.last_name}}
                        </span>
                    </div>
                </div>
                <div v-if="header[4].show" class="c-table__contents__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center slider_status " :class="sliderStatusClass(item.status)">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{sliderStatus(item.status)}}
                        </span>
                    </div>
                </div>
                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/home-page/${$route.params.sectionId}/special-sales/${item.id}/edit`)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/home-page/${$route.params.sectionId}/special-sales/${item.id}/add/shps`)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش محصولات
                                        </span>
                                    </div>
                                </v-list-item-title>
                                <v-list-item>
                                    <v-list-item-title>
                                        <div class="ma-5 pointer" @click="removeItem(item.id)">
                                            <span class="mr-2 text-grey-darken-1 t14 w300">
                                                حذف
                                            </span>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
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
import {
    convertDateToJalai,
    isOdd
} from '@/assets/js/functions'
import {
    openConfirm
} from '@/assets/js/functions'
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";

export default {
    components: {
        ModalMassUpdate,
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
            this.active = []
            val.forEach(element => {
                var active = false
                if (element.is_active == 1) active = true
                this.active.push(active)
            });
        }
    },

    methods: {
        getTime(date) {
            const splitDate = date.split(' ')
            return splitDate[1]
        },
        convertDateToJalai,
        sliderStatus(status) {
            switch (status) {
                case 'in_progress':
                    return 'در حال انتشار'
                case 'waiting':
                    return 'در انتظار انتشار'
                case 'expired':
                    return 'اتمام انتشار'
            }
        },
        sliderStatusClass(status) {
            switch (status) {
                case 'in_progress':
                    return 'slider_status__progress'
                case 'waiting':
                    return 'slider_status__waiting'
                case 'expired':
                    return 'slider_status__expire'
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
                            order_type: this.order_type,
                            order: index
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

<style lang="scss">
.slider_status {
    padding: 7px 12px 7px 8px;
    border-radius: 8px;
    height: 30px;

    &__waiting {
        background: #FFF3E0;
    }

    &__progress {
        background: #E8F5E9;
    }

    &__expire {
        background: #FFEBEE;
    }
}
</style>
