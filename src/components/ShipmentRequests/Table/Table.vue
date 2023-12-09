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
       <span class="t12500 text-black">عملیات</span>
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
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{ item.id }}
                        </span>
                    </div>
                    <div
                        v-if="header[2].show"
                        class="c-table__contents__item justify-center"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5 number-font">
                            <template v-if="item.id">
                                {{ item.type }}
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
                        <span class="t14300 text-gray500 py-5 number-font">
                            <template v-if="item.type">
                                {{ item.shps_variety }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
                    </div>
                    <div
                        v-if="header[3].show"
                        class="c-table__contents__item justify-center "
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5 number-font">
                            <template v-if="item.shps_count">
                                {{ item.shps_count }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
                    </div>
                    <div
                        v-if="header[4].show"
                        class="c-table__contents__item justify-center"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5">
                            <template v-if="item.type">
                                شاواز
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
                    </div>
                    <div
                        v-if="header[5].show"
                        class="c-table__contents__item justify-center"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5">
                            <template v-if="item.creator">
                                {{ item.creator.first_name + ' ' + item.creator.last_name }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
                    </div>
                    
    
                    <div
                        v-if="header[6].show"
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
                    
    
                    <div
                        v-if="header[7].show"
                        class="c-table__contents__item justify-center"
                        :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                        <span class="t14300 text-gray500 py-5 number-font">
                            <template v-if="item.updated_at_fa">
                                {{ item.updated_at_fa }}
                            </template>
                            <template v-else>
                                نامعلوم
                            </template>
                        </span>
                    </div>
    
                   
                   
                    
                    <div
    v-if="header[8].show"
    class="c-table__contents__item justify-center"
    :ref="`factor--${index}`"
    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
    <template v-if="item.status">
        
        <div v-if="item.status === 'in_review'" class="factor-dropdown">
            <div
                class="factor-dropdown__selected"
                @click="showDropDown(index)"
                :style="{ backgroundColor: BgSelected(item.status) }">
                <span>{{ factorSelectedTitle(item.status) }}</span>
                <v-icon icon="mdi-chevron-down"></v-icon>
            </div>
            <div class="factor-dropdown__items" :id="`factor-dropdown__items-${index}`">
                <div
                    class="factor-dropdown__item"
                    id="factor-dropdown__item--1">
                    {{ item.status }}
                </div>
                <div
                    class="factor-dropdown__item"
                    id="factor-dropdown__item--2"
                    @click="updateStatus(index,'rejected',item)">
                    رد شده
                </div>
                <div
                    class="retail-status-box"
                    id="factor-dropdown__item--3"
                    @click="updateStatus(index,'approved',item)">
                    تایید شده
                </div>
            </div>
        </div>
        <!-- Display status text for other statuses -->
        <div v-else class="expanded-background" :style="{ backgroundColor: BgSelected(item.status) }">
            {{ factorSelectedTitle(item.status) }}
        </div>
    </template>
    <template v-else>
        نامعلوم
    </template>
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
                                    <div class="ma-5 pointer" @click="requestShipmentDetailShipmentDetail(item)">
                                        <v-icon size="small" class="text-grey-darken-1">mdi-eye-outline</v-icon>
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            نمایش جزئیات
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
       
        <DetailsModal />
    </div>
    </template>
    
    <script>
    import {
        AxiosCall
    } from '@/assets/js/axios_call.js'
    import {
        SupplierPanelFilter
    } from "@/assets/js/filter_supplier"
   
    import DetailsModal from "@/components/ShipmentRequests/Modal/DetailsModal.vue";


    import {
        openToast,
        openConfirm,
        isOdd
    } from "@/assets/js/functions";
    import {
    openModal
} from "@/assets/js/functions_seller";
    export default {
        components: {
            DetailsModal,
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
                selectedOption: 'Select an Option',
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
    
        watch: {
            items(val) {
                this.active = []
                this.isIndex = []
                this.isFollow = []
                val.forEach(element => {
                    var active = false
                    element.dropdownDisabled = false;
                    if (element.is_active == 1) active = true
                    if (element.is_index == 1) is_index = true
                    if (element.is_follow == 1) is_follow = true
                    this.active.push(active)
                    
                    
                });
            }
        },
    
        methods: {

            showDropDown(index) {
    const item = this.items[index];
    if (item.status === 'in_review') {
        const itemDropdown = document.getElementById(`factor-dropdown__items-${index}`);
        itemDropdown.classList.toggle('active');
    }
},

BgSelected(status) {
    if (status === 'in_review') {
        return '#EDE7F6';  // Light purple
    }
    if (status === 'approved') {
        return '#E8F5E9';  // Light green
    }
    if (status === 'rejected') {
        return '#FFEBEE';  // Light red
    }
    return 'transparent';  // Default background
},

        factorSelectedTitle(status) {
            if (status === 'in_review') {
                return 'در حال بررسی '
            }
            if (status === 'approved') {
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
        updateList(status) {
            this.$emit('updateList', status);
        },
        

        async updateStatus(index, status, item) {
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            formdata.append('status', status)
            AxiosMethod.end_point = 'cargo/crud/update/status/' + item.id
            AxiosMethod.store = this.$store
            AxiosMethod.form = formdata

            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()

            if (data.status === 'Success') {

                this.updateList('true');

                openToast(
                    this.$store,
                    'وضعیت با موفقیت ویرایش شد.',
                    "success"
                );
            }
        },

requestShipment(item) {
      const form = {
        dialog :true,
        object : item
      }
      this.$store.commit('set_modalRequestShipment' , form)
    },
    /**
     * retailShipment detail modal
     */
    async requestShipmentDetailShipmentDetail(item) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `cargo/crud/get/${item.id}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        const form = {
          dialog :true,
          object : data.data
        }
        this.$store.commit('set_modalRetailShipmentDetail' , form)

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
    