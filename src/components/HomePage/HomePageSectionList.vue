<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 py-4">
            <v-col cols="6">
            </v-col>

            <v-col cols="6">
                <v-row justify="end" class="pt-3">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="sectionsHeader" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="sectionsHeader"
            :items="homeSections.data"
            :page="page"
            :perPage="dataTableLength"
            activePath="page/home/section/crud/update/activation/"
            deletePath="system/menu/crud/delete/"
            :loading="loading"
            updateUrl="page/csv/mass-update"
            model="page" />

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
import Table from '@/components/HomePage/Table/HomePageSectionTable.vue'
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {
    openToast
} from "@/assets/js/functions";
export default {
    setup() {
        const {
            sectionsHeader,
            getHomeSections,
            homeSections,
            dataTableLength,
            page,
            filterField
        } = new Home();
        return {
            sectionsHeader,
            getHomeSections,
            homeSections,
            dataTableLength,
            page,
            filterField
        };
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
        }
    },

    methods: {
        changeHeaderShow(index, value) {
            this.sectionsHeader[index].show = value
        },
    },

    mounted() {
        this.getHomeSections()
    },

    watch: {
        dataTableLength(val) {
            this.addPerPage(val)
        },

        confirmModal(val) {
            if (this.$cookies.get('deleteItem')) {
                if (!val) {
                    this.getMenus();
                    openToast(
                        this.$store,
                        'منو مورد نظر با موفقیت حذف شد',
                        "success"
                    );
                    this.$cookies.remove('deleteItem')
                }
            }
        },
    }
}
</script>
