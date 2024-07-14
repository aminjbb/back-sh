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
                :style="[
                    { width: itemsWidth, flex: `0 0 ${itemsWidth}` },
                    index === 0  ? { width: '6.09091%', flex: '0 0 6.09091%' } : {},
                    index === 9  ? { width: '14.09091%', flex: '0 0 14.09091%' } : {},
                ]">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item" style="width: 7.09091%; flex: 0 0 7.09091%;">
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
                    style="width: 6.09091%; flex: 0 0 6.09091%;">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>
                <div
                    v-if=" header[1].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
                </div>
                <div
                    v-if=" header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.vehicle?.vehicle_type }}
                    </span>
                </div>
                <div
                    v-if=" header[3].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.vehicle?.license }}
                    </span>
                </div>
                <div
                    v-if=" header[4].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.driver?.full_name }}
                    </span>
                </div>
                <div
                    v-if=" header[5].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.driver?.phone_number }}
                    </span>
                </div>
                <div
                    v-if=" header[6].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.package_count }}
                    </span>
                </div>
                <div
                    v-if=" header[7].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.created_at_fa }}
                    </span>
                </div>
                <div
                    v-if=" header[8].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t12500 text-gray500 py-5 number-font">
                        {{ item.updated_at_fa }}
                    </span>
                </div>
                <div
                    v-if=" header[9].show"
                    class="c-table__contents__item justify-center"
                    style="width: 14.09091%; flex: 0 0 14.09091%;">
                    <div class="retail-status-box d-flex align-center pr-2">
                        <span class="t12500 text-gray500 py-5 ">
                            {{getStatus( item.status )}}
                        </span>
                    </div>

                </div>

                <div style="width: 7.09091%; flex: 0 0 7.09091%;" class="c-table__contents__item justify-center">
                  <v-menu :close-on-content-click="false" :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-gray500">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/cargo-management/${item.id}/package`)">
                                        <v-icon class="text-grey-darken-1" size="small">mdi-package-variant-closed</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            بسته های کارگو
                                        </span>

                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                  <div class=" pointer" @click="print(item)">
                                    <v-icon class="text-grey-darken-1" size="small">mdi-printer-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14300">
                                            پرینت بسته های کارگو
                                        </span>
                                  </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item :disabled="checkPermission(item.status , deleteAndShippingPermission)">
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeItem(item.id)">
                                        <v-icon class="text-grey-darken-1" size="small">mdi-trash-can-outline</v-icon>
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
                <span class="t12500 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>


</div>
</template>

<script>
import {openConfirm, isOdd, convertDateToJalai} from "@/assets/js/functions";
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



    },

    data() {
        return {
            statusItems: [{
                    label: 'خالی',
                    value: 'empty',
                },
                {
                    label: 'در حال بارگیری',
                    value: 'luggage',
                },
                {
                    label: 'انتقال به انبار اصلی',
                    value: 'sent_to_warehouse',
                }, {
                    label: 'رسیده به انبار اصلی',
                    value: 'received_by_warehouse',
                }
            ],
            order_type: "desc",
            ordering: {},
            per_page: '25',
            filter: [],
            active: [],

        }
    },

    computed: {

        deleteAndShippingPermission() {
            return ['approved', 'sending_warehouse', 'received_by_warehouse',
                'counting', 'approved_by_warehouse', 'sending_base_warehouse',
                'received_base_warehouse', 'locating', 'located'
            ]
        },
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
            val.forEach(element => {
                var active = false
                if (element.is_active == 1) active = true
                this.active.push(active)

            });
        }
    },

    methods: {

      print(object) {

        window.open(`${ import.meta.env.VITE_API_SITEURL}cargo-management/${object.id}/print`, '_blank');


      },
        checkPermission(status, permissions) {
            const index = permissions.findIndex(p => p === status)
            if (index > -1) return true
            return false
        },
        getStatus(status) {
            const persianStatus = this.statusItems.find(element => element.value === status)
            return persianStatus.label
        },
        convertDateToJalai,
        /**
         * requestShipment modal
         */


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
            openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", this.deletePath + id, true)
        },
    },
}
</script>
