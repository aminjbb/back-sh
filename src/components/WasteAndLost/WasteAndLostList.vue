<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
            <v-col cols="6">
                <v-btn
                    @click="$router.push('/report/create')"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                    <template v-slot:prepend>
                        <v-icon>mdi-plus</v-icon>
                    </template>
                    افزودن
                </v-btn>
            </v-col>

            <v-col cols="6">
                <v-row justify="end">
                    <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

                    <ModalTableFilter path="report/index" :filterField="filterField" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="itemList"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
            @updateList="updateList"
            deletePath="report/crud/delete/"
            model="report" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start">
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
import Table from '@/components/WasteAndLost/Table/Table.vue'
import WasteAndLost from "@/composables/WasteAndLost";
import ModalTableFilter from '@/components/WasteAndLost/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'

export default {
    components: {
        Table,
        ModalTableFilter,
        ModalColumnFilter,
    },

    setup(props) {
        const {
            pageLength,
            getWasteAndLostList,
            itemList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        } = WasteAndLost();
        return {
            pageLength,
            getWasteAndLostList,
            itemList,
            filterField,
            dataTableLength,
            page,
            header,
            addPagination,
            addPerPage,
            loading
        };
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

        updateList(status) {
            if (status === 'true') {
                this.getWasteAndLostList();
            }
        },
    },

    mounted() {
        this.getWasteAndLostList();
    },

    watch: {
        dataTableLength(val) {
            this.getWasteAndLostList(val)
        },
    }
}
</script>
