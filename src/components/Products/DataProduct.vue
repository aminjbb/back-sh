<template>
    <div class="h-100 d-flex flex-column align-stretch">
        <v-card
            height="70"
            class="ma-5 br-12 stretch-card-header-70"
        >
            <v-row
                justify="center"
                align="center"
                class="px-10 py-5"
            >
                <v-col cols="6">
                    <v-row justify="start">
                        <v-btn
                            @click="$router.push('/product/create')"
                            color="primary500"
                            height="40"
                            rounded
                            class="px-8 mt-1"
                        >
                            <template v-slot:prepend>
                               <v-icon>mdi-plus</v-icon>
                            </template>
                              افزودن
                        </v-btn>

                       <ModalGroupAdd 
                            getEndPoint="product/csv/get/template"
                            uploadEndpoint="product/csv/bulk"
                        />
                    </v-row>
                </v-col>

                <v-col cols="6">
                    <v-row justify="end">
                        <ModalColumnFilter
                            :header="header"
                            :changeHeaderShow="changeHeaderShow"
                        />

                        <ModalTableFilter
                            path="product/index"
                            :filterField="filterField"
                        />
                    </v-row>
                </v-col>
            </v-row>
        </v-card>   

        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
            <Table
                class="flex-grow-1"
                activePath="product/crud/update/activation/"
                editUrl="/product/edit/"
                model="product"
                deletePath="product/crud/delete/"
                :header="header"
                :items="productData"
                updateUrl="product/csv/mass-update"
                :page="page"
                :perPage="dataTableLength"
                :loading="loading"
                uploadImageUrl ="/product/get/image/"
            />
            
            <v-divider/>

            <v-card-actions class="pb-3">
                <v-row class="pr-5">
                    <v-col cols="3"> 
                       <ModalExcelDownload getEndPoint="product/csv/get/export"/>
                    </v-col>

                    <v-col cols="6"> 
                        <div class="text-center" >
                            <v-pagination
                                v-model="page"
                                :length="pageLength"
                                rounded="circle"
                                size="40"
                                :total-visible="4"
                                prev-icon="mdi-chevron-right"
                                next-icon="mdi-chevron-left"
                            />
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
import { ref } from 'vue'
import Table from '@/components/Public/Table.vue'
import ModalTableFilter from '@/components/Public/ModalTableFilter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Product from '@/composables/Product';
export default {
    components: {
        Table,
        ModalTableFilter,
        ModalColumnFilter,
        ModalGroupAdd,
        ModalExcelDownload
    },

    setup(props) {
        const { pageLength, product, addPerPage, getProduct, dataTableLength, page, header, item, filterField ,loading} = Product();
        return { pageLength, product, addPerPage, getProduct, dataTableLength, page, header, item, filterField ,loading};
    },
    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },

        productData() {
            try {
                return this.product.data
            } catch (error) {
                return []
            }
        }
    },

    mounted() {

        this.getProduct()
    },

    watch: {
        confirmModal(val) {
          console.log(val , 'confirm')
            if (localStorage.getItem('deleteObject') == 'done') {
                if (!val) {
                    this.getProduct()
                }
              localStorage.removeItem('deleteObject')
            }

        },

        dataTableLength(val) {
            this.addPerPage(val)
        },
    },

    methods: {
        changeHeaderShow(index, value) {
            this.header[index].show = value
        }
    }
}
</script>
