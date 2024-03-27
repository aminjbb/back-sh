<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-4">
            <v-col cols="6">
                <v-btn
                    @click="$router.push(`/home-page/${$route.params.sectionId}/special-sales/add`)"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                    <template v-slot:prepend>
                        <v-icon>mdi-plus</v-icon>
                    </template>
                    افزودن اسلایدر
                </v-btn>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="specialSalesHeader" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="specialSalesHeader"
            :items="homeSection?.sliders"
            editUrl="/seller/edit/"
            activePath="seller/crud/update/activation/"
            deletePath="page/home/section/slider/delete/"
            changeStatusUrl="seller/crud/update/contract/"
            :loading="loading"
            updateUrl="seller/csv/mass-update"
            model="sku" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start" />

                <v-col cols="6" class="d-flex justify-center">
                    <div class="text-center">
                        <v-pagination
                            v-model="skuPage"
                            :length="pageLength"
                            rounded="circle"
                            size="40"
                            :total-visible="7"
                            prev-icon="mdi-chevron-right"
                            next-icon="mdi-chevron-left" />
                    </div>
                </v-col>

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
import Table from '@/components/HomePage/Table/HomePageSpecialSaleTable.vue'
import Home from "@/composables/Home";
import ModalTableFilter from '@/components/Menu/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
import ModalAddBanner from "@/components/HomePage/Modals/ModalAddBanner.vue";
export default {
    setup(props) {
        const {
            specialSalesHeader,
            getHomeSection,
            homeSection,
            dataTableLength,
            page,
            filterBannerField,
            loading,
        } = new Home();
        return {
            specialSalesHeader,
            getHomeSection,
            homeSection,
            dataTableLength,
            page,
            filterBannerField,
            loading
        };
    },

    components: {
        ModalAddBanner,
        Table,
        ModalGroupAdd,
        ModalTableFilter,
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

    },

    mounted() {
        this.getHomeSection()
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },
        
        confirmModal(val) {
            if (localStorage.getItem('deleteObject')) {
                if (!val) {
                    this.getHomeSection()
                    openToast(
                        this.$store,
                        'آیتم مورد نظر با موفقیت حذف شد',
                        "success"
                    );
                    localStorage.removeItem('deleteObject')
                }
            }
        },
    }
}
</script>
