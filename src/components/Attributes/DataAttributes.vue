<template lang="">
    <div class="h-100 d-flex flex-column align-stretch">
        <v-card height="70" class="ma-5 br-12 stretch-card-header-70" >
            <v-row justify="center" align="center" class="px-10 py-5">
                <v-col cols="6">
                    <v-row justify="start">
                        <v-btn  @click="$router.push('/attributes/create')" color="primary500" height="40" rounded class="px-8 mt-1">
                            <template v-slot:prepend>
                               <v-icon>mdi-plus</v-icon>
                              </template>
                              افزودن
                        </v-btn>

                       <ModalGroupAdd  getEndPoint="product/attribute/csv/get/template" uploadEndpoint="product/attribute/csv/bulk"/>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row justify="end">
                        <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header"/>
                        <ModalTableFilter  path="attributes/index" :filterField="filterField"/>
                    </v-row>
                </v-col>
     
            </v-row>
        </v-card>  
         
        <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
            <Table 
                class="flex-grow-1" 
                :getAttributes="getAttributes" 
                editPath="product/attribute/crud/update/filtering/" 
                editUrl="/attributes/edit/" 
                model="attribute" 
                deletePath="product/attribute/crud/delete/" 
                :header="header" 
                :items="attributes.data"
                updateUrl="product/attribute/csv/mass-update"
                :page="page"
                :perPage="dataTableLength"
                :loading="loading"
            />
            
            <v-divider/>

            <v-card-actions class="pb-3" height="70">
                <v-row class="pr-5">
                    <v-col cols="3"> 
                       <ModalExcelDownload getEndPoint="product/attribute/csv/get/export"/>
                    </v-col>
                    <v-col cols="6"> 
                        <div class="text-center" >
                            <v-pagination
                              v-model="page"
                              :length="pageLength"
                              rounded="circle"
                              size="40"
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
                                v-model="dataTableLength  "
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]"
                                ></v-select>
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
import Attributes from '@/composables/Attributes';
export default {
    components: {
        Table,
        ModalTableFilter,
        ModalColumnFilter,
        ModalGroupAdd,
        ModalExcelDownload
    },

    setup(props) {
        const { pageLength, attributes, getAttributes, addPerPage, dataTableLength, page, header, item, filterField ,loading} = Attributes();
        return { pageLength, attributes, getAttributes, addPerPage, dataTableLength, page, header, item, filterField ,loading};
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        }
    },
    mounted() {

        this.getAttributes();
    },

    watch: {
        confirmModal(val) {
            if (this.$cookies.get('deleteItem')) {
                if (!val) {

                    this.getAttributes();
                }
               setTimeout(() => {
                this.$cookies.remove('deleteItem')
               }, 1000);
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
