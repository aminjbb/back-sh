<template>
<div :style="{height: height}" class="c-table pl-1">
    <v-progress-linear color="primary500" indeterminate reverse v-if="loading" />

    <header class="c-table__header d-flex justify-between">
        <template v-for="(head, index) in header">
            <div v-if="head.show" @click="createOrdering(head.value, head.order)" class="text-center c-table__header__item t12500 text-black" :class="head.order == true ? 'pointer' : ''" :key="index" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-bind="props" class="text-gray500">
                mdi-dots-vertical
            </v-icon>
        </div>
    </header>

    <div class="stretch-table">
        <div v-if="items && items.length > 0 && !loading" class="c-table__contents">
            <div v-for="(item , index) in items" :key="index" :class="oddIndex(index) ? 'bg-gray90' : ''" class="d-flex justify-between c-table__contents__row">
                <div v-if="header[0].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>
                <div v-if="item.id && header[1].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.id }}
                    </span>
              </div>

                <div v-if="item.id && header[1].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        {{ item.user_id }}
                    </span>
                </div>

                <div v-if="header[2].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item?.user?.first_name && item?.user?.last_name">
                            {{ item?.user?.first_name }} {{ item?.user?.last_name }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div v-if="header[3].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.user.phone_number">
                            {{ item.user.phone_number }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
              </div>

                <div v-if="header[4].show" class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t13300 text-gray500 py-5 number-font">
                        <template v-if="item.card_number">
                            {{ item.card_number }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div v-if="header[5].show" class="c-table__contents__item justify-center " :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.amount">
                            {{ item.amount }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>
                <div v-if="header[6].show" class="c-table__contents__item justify-center " :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.user.wallet.value ">
                            {{ item.user.wallet.value }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>
                <div v-if="header[7].show" class="c-table__contents__item justify-center " :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.user.wallet.value ">
                            {{ parseInt(item.user.wallet.value) + parseInt(item.amount )}}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
              </div>
                <div v-if="header[8].show" class="c-table__contents__item justify-center " :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.created_at_fa">
                            {{ item.created_at_fa }}
                        </template>

                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
              </div>
                <div v-if="header[9].show" class="c-table__contents__item justify-center " :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14300 text-gray500 py-5 number-font">
                        <template v-if="item.updated_at_fa">
                            {{ item.updated_at_fa }}
                        </template>

                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
              </div>

                <div v-if="header[10].show" class="c-table__contents__item justify-center" :ref="`factor--${index}`" :style="{ width: itemsWidth, flex: `0 0 11%` }">
                    <template v-if="item.status">

                        <div v-if="item.status === 'pending'" class="factor-dropdown">
                            <div class="factor-dropdown__selected" @click="showDropDown(index)" :style="{ backgroundColor: BgSelected(item.status) }">
                                <span class="t10400">{{ factorSelectedTitle(item.status) }}</span>
                                <v-icon icon="mdi-chevron-down"></v-icon>
                            </div>
                            <div class="factor-dropdown__items  align-center pr-2" :id="`factor-dropdown__items-${index}`">
                                <div class="factor-dropdown__item my-2 t10400" id="factor-dropdown__item--1">
                                    {{ translateType(item.status) }}

                                </div>
                                <div class="factor-dropdown__item my-2 t10400" id="factor-dropdown__item--2" @click="openRejectModal(item)">
                                    رد شده
                                </div>
                                <div class="factor-dropdown__item retail-status-box my-2 t10400" id="factor-dropdown__item--3" @click="updateStatus(index,'approved',item)">
                                    تایید شده
                                </div>
                            </div>
                        </div>
                        <div v-else class="expanded-background" :style="{ backgroundColor: BgSelected(item.status) }">
                            {{ factorSelectedTitle(item.status) }}
                        </div>
                    </template>
                    <template v-else>
                        نامعلوم
                    </template>
                </div>

                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-start">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-gray500">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="withdrawDetail(item)">
                                        <v-icon size="small" class="text-grey-darken-1">mdi-eye-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            مشاهده دلیل رد </span>
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

    <DetailModalTest />

    <ModalRejectWithdrawRequest :getWithdrawRequestList="getWithdrawRequestList" />
</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    SupplierPanelFilter
} from "@/assets/js/filter_supplier"

import DetailModalTest from "@/components/DepositRequest/Modal/Modal.vue";
import ModalRejectWithdrawRequest from "@/components/DepositRequest/Modal/ModalRejectedWithdraw.vue";

import {
    openToast,
    isOdd
} from "@/assets/js/functions";

export default {
    components: {
        ModalRejectWithdrawRequest,
        DetailModalTest,

    },

    props: {
        getWithdrawRequestList: {
            type: Function
        },
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

    },

    methods: {
        openRejectModal(item) {
            const form = {
                dialog: true,
                object: item
            }
            this.$store.commit('set_modalRejectWithdrawRequest', form)
        },
        showDropDown(index) {
            const item = this.items[index];
            if (item.status === 'pending') {
                const itemDropdown = document.getElementById(`factor-dropdown__items-${index}`);
                itemDropdown.classList.toggle('active');
            }
        },
        translateType(type) {
            const translations = {

                'pending': 'درانتظار'
            };
            return translations[type] || type;
        },
        BgSelected(status) {
            if (status === 'pending') {
                return '#FFF3E0'; // Light purple
            }
            if (status === 'accepted') {
                return '#E8F5E9'; // Light green
            }
            if (status === 'rejected') {
                return '#FFEBEE'; // Light red
            }
            return 'transparent'; // Default background
        },

        factorSelectedTitle(status) {
            if (status === 'pending') {
                return 'در انتظار '
            }
            if (status === 'accepted') {
                return '  تایید شده'
            }
            if (status === 'rejected') {
                return '  رد شده '
            }

        },

        /**
         * Update list
         * @param {*} status
         */

        async updateStatus(index, status, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            formdata.append('status', status)
            AxiosMethod.end_point = 'finance/admin/transaction/crud/withdraw/accept/' + item.id
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()

            if (data.status === 'Success') {

                this.getWithdrawRequestList()

                openToast(
                    this.$store,
                    'وضعیت با موفقیت ویرایش شد.',
                    "success"
                );
                this.$router.push(`/withdraw-request/index`)

            } else {
                this.loading = true
            }
        },

        async withdrawDetail(item) {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `finance/admin/transaction/crud/withdraw/get/${item.id}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                const form = {
                    dialog: true,
                    object: data.data
                }
                this.$store.commit('set_depositDetail', form)

            }

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
         * Return odd index
         * @param {*} index
         */
        oddIndex(index) {
            return isOdd(index)
        },

    },
}
</script>
