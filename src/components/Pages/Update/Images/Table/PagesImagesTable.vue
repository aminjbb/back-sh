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
                @click="createOrdering(head.value)"
                class="text-center pointer c-table__header__item t12 w500 text-black"
                :key="index"
                :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">

                {{head.name}}
            </div>
        </template>

        <div class="text-center c-table__header__item" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
            <v-icon v-bind="props">
                mdi-dots-vertical
            </v-icon>
        </div>
    </header>

    <div class="stretch-table">
        <div v-if=" items&& items.length > 0 && !loading" class="c-table__contents">
            <div
                v-for="(item , index) in items"
                :key="index"
                :class="oddIndex(index) ? 'bg-gray90' : ''"
                class="d-flex justify-between c-table__contents__row">
                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <span class="t14 w300 text-gray500 py-5 number-font">
                        {{rowIndexTable(index)}}
                    </span>
                </div>

                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <img :src="form[index].imageUrl" width="68" height="28" alt="" class="br br--4">
                    <span>
                        <v-icon
                            color="gray500"
                            class="pointer"
                            @click="selectFile(index)">mdi-progress-upload</v-icon>
                    </span>
                </div>

                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-select
                        v-model="form[index].deviceType"
                        hide-details
                        variant="outlined"
                        :items="deviceType  " />
                </div>
                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-select
                        v-model="form[index].position"
                        hide-details
                        variant="outlined"
                        :items="positionImageList" />
                </div>
                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
                    <v-text-field
                        v-model="form[index].priority"
                        hide-details
                        variant="outlined"
                        class="number-font"
                        type="number" />
                </div>
                <div class="c-table__contents__item justify-center" :style="{ width: itemsWidth, flex: `0 0 ${itemsWidth}` }">
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
                                    <div class="ma-5 pointer" @click="removeItem(`${$route.params.pageId}/${form[index].imageId}` )">
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
        <div
            v-else
            class="null-data-table justify-center"
            style="top: 50%">
            <img src="@/assets/img/NullTable.png" alt="shavaz image">
            <div>
                <span class="t14 w300 text-gray500">داده‌ی مورد نظر وجود ندارد.</span>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import ModalMassUpdate from "@/components/Public/ModalMassUpdate.vue";
import {
    openToast,
    openConfirm,
    isOdd
} from "@/assets/js/functions";
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
            positionList: [],
            deviceType: [{
                    title: 'موبایل',
                    value: 'mobile'
                },
                {
                    title: 'تبلت',
                    value: 'tablet'
                },
                {
                    title: 'دسکتاپ',
                    value: 'desktop'
                },
            ],
            form: [{
                deviceType: null,
                position: null,
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
                if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == true) {
                    this.activeColumn = true;
                } else if ((element.value === 'is_active' || element.value === 'is_follow' || element.value === 'is_index') && element.show == false) {
                    this.activeColumn = false;
                }
            });
            return this.activeColumn;
        },

        positionImageList() {
            try {
                const positions = []
                this.positionList.forEach(position => {
                    const form = {
                        title: position.label,
                        value: position.id
                    }
                    positions.push(form)
                })
                return positions
            } catch (e) {

            }
        }
    },

    watch: {
        items(val) {
            this.form = []
            val.forEach(element => {
                const form = {
                    deviceType: element.device_type,
                    position: element.position ?.id,
                    image: element.id,
                    imageId: element.id,
                    imageUrl: element.image_url,
                    priority: element.priority,
                    loading: false
                }
                this.form.push(form)
            });
        }
    },

    methods: {
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

        selectFile(index) {
            var input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                let file = e.target.files[0];
                this.submitImage(index, file)
            }
            input.click();
        },

        async updateImage(index) {
            this.form[index].loading = true
            const formData = new FormData()
            formData.append('image_id', this.form[index].image)
            formData.append('image_position_id', this.form[index].position)
            formData.append('priority', this.form[index].priority)
            formData.append('device_type', this.form[index].deviceType)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.form = formData
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `page/crud/update/image/${this.$route.params.pageId}/${this.form[index].imageId}`
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.form[index].loading = false
                openToast(this.$store, 'اطلاعات با موفقیت ویرایش شد', 'success')
                if (this.form[index].image !== this.form[index].imageId) {
                    this.deleteImage(this.form[index].imageId)
                }
            }
        },
        async deleteImage(id) {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `file-manager/direct/delete/image/${id}`
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_delete()
            if (data) {
                this.loading = false
            } else {
                this.loading = false
            }
        },

        async getPositions() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `file-manager/image/position/crud/index`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.positionList = data.data.data;
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
         */
        createOrdering(index) {
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
            openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", this.deletePath + id, true);
        },

        /**
         * Update list
         * @param {*} status 
         */
         updateList(status) {
            this.$emit('updateList', status);
        },

    },

    mounted() {
        this.getPositions()
    }
}
</script>
