<template>
    <div class="h-100 d-flex flex-column align-stretch data-sku">
        <v-card 
            min-height="70"
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
                            @click="$router.push(`/product/create/sku/${$route.params.productId}`)"
                            color="primary500" height="40"
                            rounded class="px-8 mt-1"
                        >
                            <template v-slot:prepend>
                               <v-icon>mdi-plus</v-icon>
                            </template>
                              افزودن
                        </v-btn>

                        <ModalGroupAdd
                            getEndPoint="product/sku/csv/get/template"
                            uploadEndpoint="product/sku/csv/bulk"
                        />
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row justify="end">
                        <ModalColumnFilter 
                            :header="header"
                            :changeHeaderShow="changeHeaderShow"
                        />

                        <PanelFilter
                            :path="`product/get/${$route.params.productId}/sku/index`"
                            :filterField="filterField"
                            :brandsList="brandsList"
                            :colorsList="colorsList"
                            :categoriesList="categoriesList"
                            :disable-category = true
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
                activePath="product/sku/crud/update/activation/" 
                sellablePath="product/sku/crud/update/sellable/"
                editUrl="/product/edit/" 
                model="sku" 
                :header="header" 
                :items="skues"
                :loading="loading"
                :page="page"
                :perPage="dataTableLength"
                updateUrl="product/sku/csv/mass-update"
                uploadImageUrl="/product/get/sku/image/"
            />

            <v-divider/>

            <v-card-actions class="pb-3">
                <v-row class="pr-5">
                    <v-col cols="3"> 
                        <ModalExcelDownload :getEndPoint="`product/sku/csv/get/export?product_id=${$route.params.productId}`"/>
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
                            
                            <span 
                                class="mt-2" 
                                id="row-selector"
                            >
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
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Sku from '@/composables/Sku';
import Brands from '@/composables/Brands';
import Colors from '@/composables/Colors';
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import Categories from '@/composables/Categories';
import {openToast} from "@/assets/js/functions";

export default {
    components: {
        Table,
        ModalGroupAdd,
        ModalColumnFilter,
        ModalExcelDownload,
    },

    setup() {
        const { pageLength, skues, addPerPage, getSkues, dataTableLength, page, header, item, filterField, loading } = Sku();
        const { allBrands, getAllBrands } = Brands();
        const { allColors, getAllColor } = Colors();
        const { allCategories, getAllCategories } = Categories();

        return { 
            allBrands, getAllBrands,
            allColors, getAllColor,
            allCategories, getAllCategories,
            pageLength, skues, addPerPage, getSkues, dataTableLength, page, header, item, filterField, loading
        };
    },

    computed: {
        confirmModal() {
            return this.$store.getters['get_confirmForm'].confirmModal
        },

        categoriesList() {
            try {
                const categories = []
                this.allCategories.data.forEach(element => {
                    const form = {
                        label: element.label,
                        value: element.id
                    }
                    categories.push(form)
                });
                return categories
            } catch (error) {
                return []
            }
        },

        brandsList() {
            try {
                const brands = []
                this.allBrands.data.forEach(element => {
                    const form = {
                        label: element.label,
                        value: element.id
                    }
                    brands.push(form)
                });
                return brands
            } catch (error) {
                return []
            }
        },

        colorsList() {
            try {
                const colors = []
                this.allColors.data.forEach(element => {
                    const form = {
                        label: element.label,
                        value: element.id,
                    }
                    colors.push(form)
                });
                return colors
            } catch (error) {
                return []
            }
        },
    },

    mounted() {
        this.getSkues();
        this.getAllBrands();
        this.getAllColor();
        this.getAllCategories();
    },

    watch: {
      confirmModal(val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          if (!val) {
            this.getSkues();
            openToast(
                this.$store,
                'محصول با موفقیت حذف شد',
                "success"
            );
            localStorage.removeItem('deleteObject')
          }
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
