<template>
<div class="h-100 d-flex flex-column align-stretch sku-seller">

    <v-card
        height="70"
        class="ma-5 br-12 stretch-card-header-70"
        min-height="100">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <v-row justify="start">
                    <v-autocomplete
                        placeholder="نام کالا یا شماره SKU را جستجو نمایید"
                        variant="outlined"
                        prepend-inner-icon-cb="mdi-map-marker"
                        rounded="lg"
                        :items="skuSearchList"
                        item-title="id"
                        return-object
                        v-debounce="searchSku">

                        <template v-slot:item="item">
                            <v-list-item>
                                <v-row justify="center">

                                    <v-col cols="4">

                                        <div @click="assignSku(item.props.value , item)" class="seller__add-sku-btn d-flex justify-center align-center">
                                            <v-icon>mdi-plus</v-icon>
                                        </div>

                                    </v-col>
                                    <v-col cols="8">
                                        <text-clamp
                                            :text='item?.props?.title'
                                            :max-lines='1'
                                            autoResize
                                            location="start"
                                            class="text-gray500 t14300 text-right" />
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </template>
                    </v-autocomplete>
                </v-row>
            </v-col>

            <v-col cols="5">
                <div class="text-right mb-2">
                    عنوان
                    <span class="text-error">
                        *
                    </span>
                </div>
                <div class="mb-4">
                    <v-text-field
                        v-model="title"
                        variant="outlined"
                        placeholder="عنوان نمایشی را وارد نمایید" />
                </div>
            </v-col>

            <v-col cols="1">
                <v-row justify="end">
                    <v-btn
                        :loading="editLoading"
                        @click="editSection()"
                        color="primary500"
                        height="40"
                        rounded
                        class="px-8 mt-1">
                         تایید
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="homePageSkuHeader"
            :items="homeSection?.skus"
            editUrl="/seller/edit/"
            activePath="seller/crud/update/activation/"
            :deletePath="`page/home/section/${$route.params.sectionId}/sku/detach/`"
            changeStatusUrl="seller/crud/update/contract/"
            :loading="loading"
            @updateList="updateList"
            updateUrl="seller/csv/mass-update"
            model="sku" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start" />

                <v-col cols="6" class="d-flex justify-center" />

                <v-col cols="3" class="d-flex justify-end">
                    <div
                        align="center"
                        id="rowSection"
                        class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>
                        <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataSkuTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]" />
                        </span>
                    </div>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import Table from '@/components/HomePage/Table/HomePageShpsTable.vue'
import Seller from "@/composables/Seller";
import Home from "@/composables/Home";

import {
    openToast
} from "@/assets/js/functions";
import {
    AxiosCall
} from "@/assets/js/axios_call";

export default {
    setup() {
        const {
            getSkuSeller,
            sellerSku,
            headerSku,
            filterFieldSku,
            skuPage,
            dataSkuTableLength,
            addSkuPerPage,
            pageLength
        } = Seller();
        const {
            getHomeSection,
            homeSection,
            homePageSkuHeader
        } = new Home()
        return {
            getSkuSeller,
            sellerSku,
            headerSku,
            filterFieldSku,
            addSkuPerPage,
            pageLength,
            skuPage,
            dataSkuTableLength,
            getHomeSection,
            homeSection,
            homePageSkuHeader
        };
    },

    data() {
        return {
            skuSearchList: [],
            title: '',
            editLoading: false
        }
    },

    components: {
        Table,

    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },

    },

    methods: {
        async editSection() {
            this.editLoading = true
            let formData = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `page/home/section/crud/update/${this.$route.params.sectionId}`

            formData.append('label', this.title)
            AxiosMethod.form = formData
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.editLoading = false
                this.dialog = false
            } else {
                this.editLoading = false
            }

        },
        changeHeaderShow(index, value) {
            this.headerSku[index].show = value
        },

        updateList(status) {
            if (status === 'true') {
                this.getSkuSeller();
            }
        },

        async searchSku(search) {
            this.skuSearchList = []

            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `seller/sku/search?q=${search}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.skuSearchList = data.data.data
            }
        },

        async assignSku(id , item) {
            const formData = new FormData()
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.store = this.$store
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `page/home/section/${this.$route.params.sectionId}/sku/attach`
            formData.append('shps', id)
            formData.append('sku_id', item.item.raw.sku.id)
            formData.append('priority', 1)
            formData.append('is_active', 0)
            AxiosMethod.form = formData
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.getHomeSection()
                openToast(
                    this.$store,
                    'کد کالا با موفقیت افزوده شد.',
                    "success"
                );
            }
        }
    },

    mounted() {
        this.getHomeSection()
    },

    watch: {
        homeSection(val) {
            this.title = val.label
        },
        dataSkuTableLength(val) {
            this.addSkuPerPage(val)
        },
        confirmModal(val) {
            if (localStorage.getItem('deleteObject') === 'done') {
                if (!val) {
                    this.getHomeSection();
                    openToast(
                        this.$store,
                        'محصول با موفقیت حذف شد',
                        "success"
                    );
                    localStorage.removeItem('deleteObject')
                }
            }
        },
        $route() {
            this.getHomeSection()
        }
    }

}
</script>
