<template>
    <div class="h-100 d-flex flex-column align-stretch data-sku">
        <v-card 
            min-height="70"
            class="ma-5 br--12 stretch-card-header-70"
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
                    </v-row>
                </v-col>
     
            </v-row>
        </v-card>   
        <v-card 
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              activePath="product/sku/crud/update/activation/"
          >
            <template v-slot:colorSlot="item">
                   <span class=" pointer">
                            <v-icon
                                icon="mdi-circle"
                                size="small"
                                :style="{ color: item.data.color.value }"
                                :class="item.data.color.value == '#FFFFFF' ? 'icon-bordered' : ''" />

                            <v-tooltip
                                activator="parent"
                                location="top"
                                class="d--rtl">
                                {{item.data.color.label}}
                            </v-tooltip>
                        </span>
            </template>

            <template v-slot:customSlot="item">
              <template v-for="(volume,i) in item.data.custom" :key="i">
                {{volume.value}} {{volume.label}}
              </template>
            </template>

            <template v-slot:switchSlot="item">
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="item.data.switch"
                  inset
                  color="success"
                  @change="changeSellable(item.data,item.data.switch_id)"/>
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/product/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-pen
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-trash-can-outline
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item-title >
                    <div class="ma-5 pointer" >
                      <ModalFinancialInfo :id="item.data.id" :financialInfo="item.data.data" @getFinancialData="financialData"/>
                    </div>
                  </v-list-item-title>
                </v-list>
              </v-menu>
            </template>
          </ShTable>
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
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import ModalFinancialInfo from "@/components/Products/Sku/Modal/ModalFinancialInfo.vue";
import Sku from '@/composables/Sku';
import Brands from '@/composables/Brands';
import Colors from '@/composables/Colors';
import ShTable from "@/components/Components/Table/sh-table.vue";
import Categories from '@/composables/Categories';
import {openToast, openConfirm} from "@/assets/js/functions";

export default {
  components: {
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ModalFinancialInfo,
    ShTable
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

  data(){
    return{
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "product/sku/crud/delete/",
      },
      itemListTable: []
    }
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

  methods: {
    financialData(v) {
      this.getSkues()
    },

    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  watch: {
    skues(){
      this.itemListTable = []

      this.skues.forEach((item) =>
          this.itemListTable.push(
              {
                data : item,    /* for modal data binding*/
                id: item.id,
                name: item.name,
                label: item.label,
                sku_group: item.s_k_u_group.name,
                category: item.product.category.label,
                brand: item.brand.label,
                color: item.color,
                is_active: item.is_active,
                is_active_id: item.id,
                switch: item.is_sellable,
                switch_id: item.id,
                product: item.product.label,
                custom: item.volumes

              },
          ),
      )
    },

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
  }
}
</script>
