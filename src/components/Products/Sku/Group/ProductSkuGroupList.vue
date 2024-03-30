<template>
    <div class="h-100 d-flex flex-column align-stretch">
        <v-card 
            min-height="70"
            class="ma-5 br-12 stretch-card-header-70"
        >
            <v-row 
                justify="center" 
                align="center" 
                class="px-10 py-5"
            >
                <v-col cols="6" justify="start" class="d-flex">
                    <ModalGroupAdd
                        getEndPoint="product/sku/group/csv/get/template"
                        uploadEndpoint="product/sku/group/csv/bulk"
                    />
                </v-col>

                <v-col cols="6">
                    <v-row justify="end">
                        <ModalColumnFilter 
                            :header="skuGroupsHeader"
                            :changeHeaderShow="changeHeaderShow"
                        />

                        <ModalTableFilter 
                            :path="`product/get/skugroups/index`" 
                            :filterField="filterField"
                        />
                    </v-row>
                </v-col>
            </v-row>
        </v-card>

        <v-card 
            class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
            height="580"
        >
            <Table 
                class="flex-grow-1"
                editUrl="/product/edit/"
                model="skuGroup"
                :header="skuGroupsHeader" 
                :items="allSkuGroups.data"
                :loading="skuGroupLoading"
                :page="page"
                :perPage="dataTableLength"
                updateUrl="product/sku/group/csv/mass-update"
                uploadImageUrl="/product/get/skugroups/image/"
            />

            <v-divider/>

            <v-card-actions class="pb-3">
                <v-row class="pr-5">
                    <v-col cols="3"> 
                       <ModalExcelDownload getEndPoint="product/sku/group/csv/get/export"/>
                    </v-col>

                    <v-col cols="6"> 
                        <div class="text-center" >
                            <v-pagination
                                v-model="page"
                                :length="pageLength"
                                rounded="circle"
                                size="40"
                                :total-visible="7"
                                prev-icon="mdi-chevron-right"
                                next-icon="mdi-chevron-left"
                            >
                          </v-pagination>
                        </div>
                    </v-col>

                    <v-col cols="3"> 
                        <div 
                            align="center" 
                            id="rowSection" 
                            class="d-flex align-center"
                        >
                            <span class="ml-5">
                                تعداد سطر در هر صفحه
                            </span>
                            <span class="mt-2"  id="row-selector">
                                <v-select
                                    v-model="dataTableLength"
                                    class="t1330"
                                    variant="outlined"
                                    :items="[25,50,100]"
                                />
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import Table from '@/components/Public/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Sku from '@/composables/Sku';

export default {
    components: {
        Table,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
        ModalTableFilter,
    },

    setup() {
        const { pageLength, allSkuGroups, addPerPage, getAllSkuGroups, dataTableLength, page, skuGroupsHeader, item, filterField, skuGroupLoading } = Sku();

        return { 
            pageLength, allSkuGroups, addPerPage, getAllSkuGroups, dataTableLength, page, skuGroupsHeader, item, filterField, skuGroupLoading
        };
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },
    },

    mounted() {
        this.getAllSkuGroups();
    },

    watch: {
        confirmModal(val) {
            if (!val) {
                this.getProduct()
            }
        },

        dataTableLength(val) {
            this.addPerPage(val)
        },
    },

    methods: {
        changeHeaderShow(index, value) {
            this.skuGroupsHeader[index].show = value
        }
    }
}
</script>
