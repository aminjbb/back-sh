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
                    :style="{ width: itemsWidth, flex:head.value === 'link' ? `2 0 ${itemsWidth}` :  `0 0 ${itemsWidth}`}">
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
                        <span class="t14300 text-gray500 py-5 number-font">
                            {{rowIndexTable(index)}}
                        </span>
                        <template v-if="checkbox">
                            <v-checkbox class="mr-1" v-model=item.value />
                        </template>
                    </div>
                </div>
                <div
                    v-if="header[1].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <img :src="form[index].imageUrl" width="68" height="28" alt="" class="br br__4">
                    <span>
                        <v-icon
                            color="gray500"
                            class="pointer"
                            @click="selectFile(index)">mdi-progress-upload</v-icon>
                    </span>
                </div>
                <div
                    v-if="header[2].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">

                    <span>
                        {{ item.device }}
                    </span>
                </div>
                <div
                    v-if="header[3].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">

                    <span>
                        {{ item.link }}
                    </span>
                </div>
                <div
                    v-if="header[4].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-text-field
                        v-model="form[index].priority"
                        hide-details
                        variant="outlined"
                        class="number-font"
                        type="number" />
                </div>
                <div
                    v-if="header[5].show"
                    class="c-table__contents__item justify-center"
                    :style="{ width: itemsWidth, flex: `1 0 ${itemsWidth}` }">

                    <span>
                        {{ item.creator?.first_name }} {{ item.creator?.last_name }}
                    </span>
                </div>
                <div
                    v-if="header[6].show"
                    class="c-table__contents__item "
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-progress-circular
                        v-if="form[index].loading"
                        indeterminate
                        color="primary"></v-progress-circular>
                    <div
                        v-else
                        @click="updateImage(index)"
                        class="seller__add-sku-btn d-flex justify-center align-center pointer">

                        <v-icon size="15">mdi-plus</v-icon>
                    </div>
                </div>
                <div
                    v-if="header[7].show"
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
                    v-if="header[8].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t10400 ">
                        {{convertDateToJalai(item.updated_at , '-' , true)}}
                    </span>
                </div>
                <div
                    v-if="header[9].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t10400 ">
                        {{convertDateToJalai(item.start_time , '-' , true)}}
                    </span>
                </div>
                <div
                    v-if="header[10].show"
                    :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }"
                    class="c-table__contents__item">
                    <span class="t10400 ">
                        {{convertDateToJalai(item.end_time , '-' , true)}}
                    </span>
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
                                        <span class="mr-2 text-grey-darken-1 t14300">
                                            ویرایش
                                        </span>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>
                                    <div class="ma-5 pointer" @click="removeItem(item.id)">
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

    <ModalEditBanner ref="ModalEditBanner" />
    <ModalEditCategory ref="ModalEditCategory" />
    <ModalEditBlog ref="ModalEditBlog"/>
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
import {
    openToast
} from "@/assets/js/functions";
import ModalEditBanner from "@/components/HomePage/Modals/ModalEditBanner.vue";
import ModalEditCategory from "@/components/HomePage/Modals/ModalEditCategory.vue";
import ModalEditBlog from "@/components/HomePage/Modals/ModalEditBlog.vue";
export default {
    components: {
        ModalEditBlog,
        ModalEditCategory,
        ModalEditBanner,
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
            per_page: '25',
            activeColumn: false,
            active: [],
            form: [{

                image: null,
                priority: null
            }],
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
                const width = 90 / (headerLength + 1);
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
                    banner: element.id,
                    image: element.image ?.id,
                    imageId: element.image ?.id,
                    imageUrl: element.image ?.image_url,
                    priority: element.priority,
                    device: element.device,
                    start_time: element.start_time,
                    end_time: element.end_time,
                    image_alt: element.image_alt,
                    is_active: element.is_active,
                    link: element.link,
                    loading: false
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
            if (this.model == 'category') {
              this.$refs.ModalEditCategory.dialog = true
              this.$refs.ModalEditCategory.categoryObject = object
            }
            else if (this.model == 'blog'){
              this.$refs.ModalEditBlog.dialog = true
              this.$refs.ModalEditBlog.blogObject = object
            }
            else {
              this.$refs.ModalEditBanner.dialog = true
              this.$refs.ModalEditBanner.bannerObject = object
            }
        },

        convertDateToJalai,

        async submitImage(index, file) {
            var formData = new FormData();
            const AxiosMethod = new AxiosCall()
            formData.append('file', file)
            formData.append('module', 'page')
            AxiosMethod.using_auth = true
            AxiosMethod.store = this.$store
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = 'file-manager/direct/store'
            AxiosMethod.form = formData
            let data = await AxiosMethod.axios_image_upload()
            if (data) {
                this.form[index].imageUrl = data.data.data.url
                this.form[index].image = data.data.data.image_id
            }
        },

        async updateImage(index) {
            this.form[index].loading = true
            const formData = new FormData()
            formData.append('homepage_section_id', this.$route.params.sectionId)
            if (this.form[index].image)  formData.append('image_id', this.form[index].image)
            formData.append('priority', this.form[index].priority)
            formData.append('device', this.form[index].device)
            if (this.form[index].end_time != null) formData.append('end_time', this.form[index].end_time)
            if (this.form[index].start_time != null) formData.append('start_time', this.form[index].start_time)
            formData.append('image_alt', this.form[index].image_alt)
            formData.append('is_active', this.form[index].is_active)
            formData.append('link', this.form[index].link)

            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.form = formData
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `page/home/section/banner/update/${this.form[index].banner}`
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.form[index].loading = false
                openToast(this.$store, 'اطلاعات با موفقیت ویرایش شد', 'success')
                if (this.form[index].image !== this.form[index].imageId) {
                    this.deleteImage(this.form[index].imageId)
                }
            }
        },

        selectFile(index) {
            var input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                let file = e.target.files[0];
                this.submitImage(index, file)
            }
            input.click();
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
