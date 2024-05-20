<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card class="mx-5 br-12 py-5">
        <v-row
            justify="center"
            align="center"
            class="px-10 ">
            <v-col cols="11">
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
    <v-card height="70" class="mx-5 my-2 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-4">
            <v-col cols="6">
                <ModalAddSectionForSku :getHomePageCategory="getHomePageCategory" />
            </v-col>

            <v-col cols="6" />
        </v-row>
    </v-card>

    <v-card class="mx-5 my-2 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="categoryHeader"
            :items="homePageCategory.data"
            editUrl="/seller/edit/"
            activePath="seller/crud/update/activation/"
            deletePath="page/home/section/category/delete/"
            changeStatusUrl="seller/crud/update/contract/"
            :loading="loading"
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
                                v-model="dataTableLength"
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
import Table from '@/components/HomePage/Table/HomePageCategoryTable.vue'
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
import ModalAddBanner from "@/components/HomePage/Modals/ModalAddBanner.vue";
import ModalAddSectionForSku from "@/components/HomePage/Modals/ModalAddSectionForSku.vue";
import {
    AxiosCall
} from "@/assets/js/axios_call";
export default {
    setup() {
        const {
            bannerHeader,
            getHomeSection,
            homeSection,
            dataTableLength,
            page,
            filterBannerField,
            loading,
            getHomePageCategory,
            homePageCategory,
            categoryHeader
        } = new Home();
        return {
            bannerHeader,
            getHomeSection,
            homeSection,
            dataTableLength,
            page,
            filterBannerField,
            loading,
            getHomePageCategory,
            homePageCategory,
            categoryHeader
        };
    },
    data() {
        return {
            title: '',
            editLoading: false
        }
    },

    components: {
        ModalAddSectionForSku,
        ModalAddBanner,
        Table,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        }
    },

    methods: {
        changeHeaderShow(index, value) {
            this.bannerHeader[index].show = value
        },
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
    },

    mounted() {
        this.getHomeSection()
        this.getHomePageCategory()
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },
        
        confirmModal(val) {
            if (localStorage.getItem('deleteObject')) {
                if (!val) {
                    this.getHomePageCategory()
                    openToast(
                        this.$store,
                        'منو مورد نظر با موفقیت حذف شد',
                        "success"
                    );
                    localStorage.removeItem('deleteObject')
                }
            }
        },

        homeSection(val) {
            this.title = val.label
        }
    }
}
</script>
