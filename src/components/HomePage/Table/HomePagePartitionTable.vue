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
                    class="text-right c-table__header__item t12 w500 px-0"
                    :class="head.order == true ? 'pointer' : ''"
                    :key="index"
                    :style="{ width: itemsWidth, flex:head.value === 'link' ? `2 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
                    {{head.name}}
                </div>
            </template>
            <template v-else>
                <div
                    v-if="head.show"
                    class="text-right pointer c-table__header__item t12 w500"
                    :key="index"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
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
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
                        <template v-if="checkbox">
                            <v-checkbox class="mr-1" v-model=item.value />
                        </template>
                    </div>
                </div>
                <div
                    v-if="header[1].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{item.label}}
                        </span>

                    </div>
                </div>

                <div
                    v-if="header[2].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <v-text-field
                            v-model="form[index].priority"
                            hide-details
                            variant="outlined"
                            class="number-font"
                            type="number" />

                    </div>
                </div>
                <div
                    v-if="header[3].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <span>
                            {{item.creator?.first_name}} {{item.creator?.last_name}}
                        </span>

                    </div>
                </div>
                <div
                    v-if="header[3].show"
                    class="c-table__contents__item"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <div class="d-flex align-center">
                        <v-progress-circular
                            v-if="form[index].loading"
                            indeterminate
                            color="primary"></v-progress-circular>
                        <div
                            v-else
                            @click="update(index , item)"
                            class="seller__add-sku-btn d-flex justify-center align-center pointer">

                            <v-icon size="15">mdi-plus</v-icon>
                        </div>
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
                                    <div class="ma-5 pointer" @click="openEditModal(item)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="$router.push(`/home-page/${$route.params.sectionId}/partition-slider/${item.id}/add/sku`)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            مدیریت کالا ها
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                          <v-list-item>
                            <v-list-item-title>
                              <div class="ma-5 pointer" @click="removeItem(item.id)">

                                        <span class=" text-grey-darken-1 t14 w300">
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

    <ModalEditSectionForSlider />
</div>
</template>

<script>
import {
    isOdd
} from '@/assets/js/functions'
import {
    openConfirm
} from '@/assets/js/functions'
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    openToast
} from "@/assets/js/functions";
import ModalEditSectionForSlider from "@/components/HomePage/Modals/ModalEditSectionForSlider.vue";

export default {
    components: {
        ModalEditSectionForSlider,
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
            activeColumn: false,
            form: [{
                priority: ''
            }]
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
            this.form = []
            val.forEach(element => {
                const form = {
                    priority: element.priority
                }
                this.form.push(form)
                var active = false
                if (element.is_active == 1) active = true
                this.active.push(active)
            });
        }
    },

    methods: {
        openEditModal(object) {
            const form = {
                dialog: true,
                object: object
            }
            this.$store.commit('set_homePageSectionForSliderModal', form)
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
         * Change Active
         * @param {*} index
         * @param {*} item
         */
        async update(index, item) {
            const formData = new FormData()
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `page/home/section/slider/partition/update/${item.id}`
            formData.append('homepage_section_id', this.$route.params.sectionId)
            formData.append('label', item.label)
            formData.append('priority', this.form[index].priority)

            AxiosMethod.form = formData
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                openToast(
                    this.$store,
                    'دسته بندی با موفقیت ویرایش شد.',
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
    },
}
</script>
