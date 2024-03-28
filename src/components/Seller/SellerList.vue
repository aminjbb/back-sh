<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-5">
            <v-col cols="6">
                <v-row justify="start">
                    <v-btn
                        @click="$router.push('/seller/create')"
                        color="primary500"
                        height="40"
                        rounded
                        class="px-8 mt-1">
                        <template v-slot:prepend>
                            <v-icon>mdi-plus</v-icon>
                        </template>
                        افزودن تکی
                    </v-btn>

                    <ModalGroupAdd getEndPoint="seller/csv/get/template" uploadEndpoint="seller/csv/bulk" />

                </v-row>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                    <ModalTableFilter path="seller/index" :filterField="filterField" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="sellerList.data"
            :page="page"
            :perPage="dataTableLength"
            editUrl="/seller/edit/"
            activePath="seller/crud/update/activation/"
            changeStatusUrl="seller/crud/update/contract/"
            :loading="loading"
            @updateList = "updateList"
            updateUrl="seller/csv/mass-update"
            model="seller" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start">
                    <ModalExcelDownload getEndPoint="seller/csv/get/export" />
                </v-col>

                <v-col cols="6" class="d-flex justify-center">
                    <div class="text-center">
                        <v-pagination
                            v-model="page"
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
import Table from '@/components/Seller/Table/Table.vue'
import Seller from "@/composables/Seller";
import ModalTableFilter from '@/components/Seller/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
export default {
    setup(props) {
        const {
            pageLength,
            getSellerList,
            sellerList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        } = Seller();
        return {
            pageLength,
            getSellerList,
            sellerList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        };
    },

    components: {
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
            this.header[index].show = value
        },

        updateList(status){
            if(status === 'true'){
                this.getSellerList();
            }
        },
    },

    mounted() {
        this.getSellerList();
        this.$store.commit('set_naturalSellerStep1' , null)
        this.$store.commit('set_naturalSellerStep2' , null)
        this.$store.commit('set_naturalSellerStep3' , null)

        this.$store.commit('set_legalSellerStep1' , null)
        this.$store.commit('set_legalSellerStep2' , null)
        this.$store.commit('set_legalSellerStep3' , null)
        this.$store.commit('set_legalSellerStep4' , null)
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },
        confirmModal(val) {
            if (this.$cookies.get('deleteItem')) {
                if (!val) {
                    this.getSellerList();
                    openToast(
                        this.$store,
                        'انبار با موفقیت حذف شد',
                        "success"
                    );
                    this.$cookies.remove('deleteItem')
                }
            }
        },
    }
}
</script>
