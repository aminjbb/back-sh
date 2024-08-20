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
                class="text-center c-table__header__item t12 w500 text-black"
                :class="head.order == true ? 'pointer' : ''"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                <v-icon v-if="head.order == true" :icon="getIcon(head.value)" />
                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item t12 w500 text-black" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            عملیات
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
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div
                    v-if="item.label && header[1].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5">
                        {{ item.label }}
                    </span>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        <template v-if="item.pivot && item.pivot.shps">
                            {{ item.pivot.shps }}
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>

                <div
                    v-if="header[3].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5">
                        <template v-if="item.pivot && item.pivot.priority">
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                class="number-font"
                                single-line
                                v-model="priorityModal[index]" />
                        </template>
                        <template v-else>
                            نامعلوم
                        </template>
                    </span>
                </div>
                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="d-flex justify-center align-center">
                <v-btn fab icon color="#FCE4EC" @click="sendSelectedSku(item,index, item.pivot.shps)">
                <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>

                <div :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }" class="c-table__contents__item justify-center">
                    <v-menu :location="location">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-gray500">
                                mdi-dots-vertical
                            </v-icon>
                        </template>

                        <v-list class="c-table__more-options">
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeSkuFromSlider(item.id)">
                                        <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
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
                <span class="t18 w600 text-black mb-5">لیست خالی!</span>
                <span class="t14 w300 text-gray500">تاکنون داده‌ای به این صفحه، افزوده نشده است.</span>
            </div>
        </div>
    </div>
    <ModalMassUpdate :updateUrl="updateUrl" />
</div>
</template>

<script>
import {AxiosCall} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import {openToast, isOdd} from "@/assets/js/functions";

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
            activeColumn: false,
            priorityModal: [],
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
             
                this.priorityModal.push(element.pivot?.priority)
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

        sendSelectedSku(sku,index,shps) {
            console.log('SKU:', sku);
            console.log('SKU:', sku);
    console.log('Priority:', this.priorityModal[index]);


        const formData = new FormData();
        formData.append('sku_id', sku.id);
        formData.append('priority', this.priorityModal[index]);
        formData.append('shps', shps );



        this.sendSkus(formData);
    },

    async sendSkus(formData) {
        const AxiosMethod = new AxiosCall();
        AxiosMethod.using_auth = true;
        AxiosMethod.token = this.$cookies.get('adminToken');
        AxiosMethod.end_point = `page/slider/${this.$route.params.sliderId}/sku/attach`;
        AxiosMethod.form = formData;

        try {
            let response = await AxiosMethod.axios_post();
            if (response) {
                openToast(this.$store, 'ثبت با موفقیت', "success");
            }
        } catch (error) {
            console.error(error);
            openToast(this.$store, 'اشکال در ثبت', "error");
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

        /**
         * Remove Item
         * @param {*} id
         */
        async removeSkuFromSlider(skuId) {
            const formData = new FormData()
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = this.deletePath

            formData.append('sku_id', skuId)
            AxiosMethod.form = formData
            let data = await AxiosMethod.axios_post()
            if (data) {
                openToast(
                    this.$store,
                    'کالای مورد نظر با موفقیت حذف شد.',
                    "success"
                );
                this.updateList('true');
            } else {
                openToast(
                    this.$store,
                    'حذف کالا با مشکل مواجع شد.',
                    "error"
                );
            }
        },

        /**
         * Update list
         * @param {*} status 
         */
         updateList(status) {
            this.$emit('updateList', status);
        },
    },
}
</script>
