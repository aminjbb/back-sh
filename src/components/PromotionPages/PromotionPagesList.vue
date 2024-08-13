<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-4">
        <v-col cols="6" >
          <v-row justify="start" class="pt-2">
          <v-btn
              @click="$router.push('/promotion-page/create')"
              color="primary500"
              height="40"
              rounded
              class="px-8 ">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            افزودن تکی
          </v-btn>
          </v-row>

        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <PanelFilter @resetPage="resetPage" path="promotion-page/index" :filterField="filterField" :statusItems="status"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          activePath="page/promotion/crud/update/activation/"
      >
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
                              <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                  <v-icon class="text-grey-darken-1">mdi-delete</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                        حذف
                                    </span>
                              </div>
                          </v-list-item-title>

                          <v-list-item-title>
                              <div class="ma-5 pointer" @click="$router.push(`/promotion-page/update/${item.data.id}`)">
                                  <v-icon class="text-grey-darken-1">mdi-pen-minus</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                        ویرایش
                                  </span>
                              </div>
                          </v-list-item-title>

                          <v-list-item-title>
                              <div class="ma-5 pointer" @click="$router.push(`/promotion-page/${item.data.id}/sku-group/add`)">
                                  <v-icon class="text-grey-darken-1">mdi-package-variant-closed</v-icon>
                                  <span class="mr-2 text-grey-darken-1 t14 w300">
                                        مدیریت محصولات
                                  </span>
                              </div>
                          </v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
          </template>
      </ShTable>
      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <ModalExcelDownload getEndPoint="page/promotion/csv/get/export"  />
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
import PromotionPage from "@/composables/PromotionPage";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";


export default {
  data() {
    return {
      perPageFilter:false,
        itemListTable: []
    }
  },
  setup() {
    const status = [
      {
        label: 'همه',
        value: '',
      },
      {
        label: 'فعال',
        value: '1',
      },
      {
        label: 'غیرفعال',
        value: '0',
      }
    ]
   const {
     promotion ,
     promotions ,
     getPromotion ,
     getPromotions,
     pageLength,
     filterField,
     dataTableLength,
     page,
     header,
     loading
    }=new PromotionPage()
    return{
      promotion,
      promotions,
      getPromotion,
      getPromotions,
      pageLength,
      filterField,
      dataTableLength,
      page,
      header,
      loading,
      status
    }
  },

  components: {
    PanelFilter,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable
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
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete",  "page/promotion/crud/delete/"+id, true)
    },
  },

  mounted() {
    this.getPromotions();
  },

  watch: {
    dataTableLength() {
      this.perPageFilter = true
      this.page = 1
      let query = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...query,
            per_page: this.dataTableLength,
          }
        })
      }
      else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },
    page(){
      if (!this.perPageFilter){
        this.getPromotions()
      }
    },
    confirmModal(val) {
      if ( localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getPromotions();
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    $route(){
      this.getPromotions()
    },

      promotions() {
          this.itemListTable = []
          this.promotions.data.forEach((item) => {
              this.itemListTable.push(
                  {
                      id: item.id,
                      name: item.name,
                      label: item.label,
                      created_at_fa: item.created_at_fa,
                      updated_at_fa: item.updated_at_fa,
                      is_active: item.is_active,
                      is_active_id: item.id,
                  }
              )
          })
      },
  }
}
</script>
