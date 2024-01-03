<template>
<div class="h-100 d-flex flex-column align-stretch">
    <v-card height="200" class="ma-5 br-12 stretch-card-header-90">
        <v-row
            justify="start"
            align="start"
            class="px-10 py-5">
            <v-col
                cols="12"
                class="d-flex justify-center align-center t14500">
                اسکن شناسه بسته
            </v-col>
            <v-divider color="grey"/>
            <v-col cols="12" md="6">

                <v-form @submit.prevent="onFormSubmit" class="">

                    <div class="text-right  ">

                        <span class="text-gray600 t14500">
                            شناسه بسته
                        </span>
                        <span class="text-error">
                            *
                        </span>
                    </div>
                    <div>
                        <v-text-field
                            variant="outlined"
                            :rules="rule"
                            v-model="cargo" />
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            deletePath="category/crud/delete/"
            :header="cargoReceivingHeader"
            :items="shpsList.shps_list "
            :page="page"
            :perPage="dataTableLength"
            :loading="loading" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-5 py-2" justify="end">
                <v-btn
                    color="primary500"
                    height="40"
                    rounded
                    variant="flat"
                    class="px-8 mt-2">
                    بستن بسته
                </v-btn>
            </v-row>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import {
    ref
} from 'vue'
//Components
import Table from '@/components/BulkLabelPrint/Table/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import BulkLabelPrintList from '@/composables/BulkLabelPrint';

export default {
    components: {
        Table,
        ModalTableFilter,
        ModalColumnFilter,
        ModalGroupAdd,
        ModalExcelDownload,

    },

    data() {
        return {
            cargo: null,
            rule: [v => !!v || 'این فیلد الزامی است'],
            allCargoData: [],
            filteredCargoData: [],

        }
    },

    setup(props) {
        const {
            pageLength,
            cargoList,
            addPerPage,
            getCargoList,
            dataTableLength,
            page,
            cargoReceivingHeader,
            item,
            filterField,
            loading,
            getShpsList,
            shpsList
        } = BulkLabelPrintList();
        return {
            pageLength,
            cargoList,
            addPerPage,
            getCargoList,
            dataTableLength,
            page,
            cargoReceivingHeader,
            item,
            filterField,
            loading,
            getShpsList,
            shpsList
        };
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal;

        }
    },
    mounted() {
        this.fetchCargoData();

    },

    watch: {
        cargo(newCargoId) {
            if (newCargoId) {
                this.fetchCargoData(newCargoId);
            }
        },

        confirmModal(val) {
            if (this.$cookies.get('deleteItem')) {
                if (!val) {
                    this.getCategories()
                    this.$cookies.remove('deleteItem')
                }

            }
        },

        dataTableLength(val) {
            this.addPerPage(val)
        },

    },

    methods: {
        async fetchCargoData(newCargoId) {
            this.getShpsList(newCargoId);
        },

        filterDataById(id) {
            if (!id) {
                this.filteredCargoData = this.allCargoData;
                return;
            }
            this.filteredCargoData = this.allCargoData.filter(item => item.id === id);
        },

        /**
         * Change Header Status
         * @param {*} index
         * @param {*} value
         */
        changeHeaderShow(index, value) {
            this.header[index].show = value
        },

        $route() {
            this.fetchCargoData();

        }
    }
}
</script>
