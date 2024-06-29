<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">

        <v-col cols="6">
          <v-btn
              @click="$router.push('/best-selling-categories/create')"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            افزودن تصویر
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <PanelFilter
                @resetPage="resetPage"
                :filterField="filterField"
                path="best-selling-categories/index"
                :statusHasOption="devices"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="bestSellCategories"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          @updateList="updateList"
          deletePath="category/best_selling/crud/delete/"
          activePath="category/best_selling/crud/update/activation/"
          model="bestSellCategory" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3">
          </v-col>

          <v-col cols="6">
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

          <v-col cols="3">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
              <span class="ml-5">تعداد سطر در هر صفحه</span>
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
import {defineAsyncComponent} from 'vue'
const Table = defineAsyncComponent(()=> import('@/components/BestSellingCategories/Table/Table.vue'))
import BestSellingCategories from "@/composables/BestSellingCategories";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
const PanelFilter = defineAsyncComponent(() => import('@/components/PanelFilter/PanelFilter.vue'));


export default {
  data() {
    return {
      perPageFilter:false
    }
  },

  components: {
    ModalColumnFilter,
    PanelFilter,
    Table
  },

  setup() {
    const devices=[
      {
        label: 'دسکتاپ',
        value: 'desktop',
      },
      {
        label: 'تبلت',
        value: 'tablet',
      },
      {
        label: 'موبایل',
        value: 'mobile',
      },
    ]
   const {
     pageLength,
     bestSellCategories ,
     getAllBestSellCategories,
     dataTableLength,
     page,
     header,
     loading ,
     filterField ,
     bestSellCategory
   } = new BestSellingCategories()

    return{
     pageLength,
      bestSellCategories ,
      getAllBestSellCategories,
      dataTableLength,
      page,
      header,
      loading ,
      filterField ,
      bestSellCategory,
      devices
   }
  },

  methods: {
    updateList(status) {
      if (status === 'true') {
        this.getAllBestSellCategories();
      }
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
  },

  mounted() {
    this.getAllBestSellCategories()
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
        this.getAllBestSellCategories()
      }
    },

    $route(){
      this.getAllBestSellCategories()
    }
  }
}
</script>
