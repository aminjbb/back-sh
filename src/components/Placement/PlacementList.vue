<template>
<div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
        <v-row
            justify="center"
            align="center"
            class="px-10 pt-3">
            <v-col cols="6" />

            <v-col cols="6" class="mt-3">
                <v-row justify="end">
                    <ModalTableFilter path="placement/index" :filterField="filterField" />
                </v-row>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
        <Table
            class="flex-grow-1"
            :header="header"
            :items="placementList.data"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
            @updateList="updateList"
            deletePath="placement/crud/delete/"
            model="placement" />

        <v-divider />

        <v-card-actions class="pb-3">
            <v-row class="px-8">
                <v-col cols="3" class="d-flex justify-start" />

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
import Table from '@/components/Placement/Table/Table.vue'
import Placement from "@/composables/Placement";
import ModalTableFilter from '@/components/Placement/Filter/Filter.vue'

export default {
    setup() {
        const {
            pageLength,
            getPlacementList,
            placementList,
            filterField,
            dataTableLength,
            page,
            header,
            loading
        } = Placement();
        return {
            pageLength,
            getPlacementList,
            placementList,
            filterField,
            dataTableLength,
            page,
            header,
            loading
        };
    },

    components: {
        Table,
        ModalTableFilter,
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        }
    },

    methods: {


        updateList(status) {
            if (status === 'true') {
                this.getPlacementList();
            }
        },
    },

    mounted() {
        this.getPlacementList();
    },

    watch: {
        dataTableLength(val) {
            this.getPlacementList(val)
        },
    }
}
</script>
