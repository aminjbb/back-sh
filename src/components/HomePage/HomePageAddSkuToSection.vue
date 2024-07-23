<template>
<div class="h-100 d-flex flex-column align-stretch sku-seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
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
                                        <div @click="assignSku(item)" class="seller__add-sku-btn d-flex justify-center align-center">
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
            <v-col cols="6" />
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="homePageSkuHeader"
            :items="homePageSingleCategory.skus"
            editUrl="/seller/edit/"
            activePath="seller/crud/update/activation/"
            :deletePath="`page/home/section/category/${$route.params.categoryId}/sku/detach/`"
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
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
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
            getHomePageSingleCategory,
            homePageSingleCategory,
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
            getHomePageSingleCategory,
            homePageSingleCategory,
            homePageSkuHeader
        };
    },

    data() {
        return {
            skuSearchList: []
        }
    },

    components: {
        Table,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },
        skuGroupList() {
            try {
                let group = []
                this.allSkuGroups.data.forEach(skuGroup => {
                    const form = {
                        label: skuGroup.label,
                        value: skuGroup.id
                    }
                    group.push(form)
                })
                return group
            } catch (e) {
                return []
            }
        },
        skuList() {
            try {
                let sku = []
                this.skuSearchList.forEach(permission => {
                    const form = {
                        name: permission.label + '(' + permission.id + ')',
                        id: permission.id
                    }
                    sku.push(form)
                })
                return sku
            } catch (e) {
                return []
            }
        },
    },

    methods: {
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

        async assignSku(item) {
            const formData = new FormData()
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.store = this.$store
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `page/home/section/category/${this.$route.params.categoryId}/sku/attach`
          formData.append('shps', item?.item?.value)
          formData.append('sku_id', item?.item?.raw?.sku?.id)
            formData.append('priority', 1)
            formData.append('is_active', 0)
            AxiosMethod.form = formData
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.getHomePageSingleCategory()
                openToast(
                    this.$store,
                    'کد کالا با موفقیت افزوده شد.',
                    "success"
                );
            }
        }
    },

    mounted() {
        this.getHomePageSingleCategory()
    },

    watch: {
        dataSkuTableLength(val) {
            this.addSkuPerPage(val)
        },
      confirmModal(val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          if (!val) {
            this.getHomePageSingleCategory()
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
            this.getSkuSeller()
        }
    }

}
</script>
