<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card
        height="70"
        class="ma-5 br--12 stretch-card-header-70">

      <v-row
          justify="end"
          align="center"
          class="px-10 py-5">
        <ModalColumnFilter
            :changeHeaderShow="changeHeaderShow"
            :header="header"/>

        <PanelFilter
            @resetPage="resetPage"
            path="comment/index"
            :filterField="filterField"
            :brandsList="brandsList"
            :scoreItems="scoreItems"
            :statusItems="statusComment"/>
      </v-row>
    </v-card>


    <v-card
        class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
        height="580">
        <ShTable
            class="flex-grow-1"
            :headers="header"
            :items="itemListTable"
            :page="page"
            :perPage="dataTableLength"
            :loading="loading"
        >

            <template v-slot:customSlot="item">
                <v-sheet  class=" br--12 py-2 px-5 "  :color="getStatusClass(item.data.custom)" width="100">
                    {{getPersianStatus(item.data.custom)}}
                </v-sheet>
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
                                <div class=" pointer" @click="$router.push(`/Comment/reply/`+item.data.id)">
                                    <v-icon class="text-grey-darken-1">mdi-eye-outline</v-icon>
                                    <span class="mr-2 text-grey-darken-1 t14 w300">
                                    نمایش جزئیات
                                    </span>
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </ShTable>


      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3">
            <ModalExcelDownload getEndPoint="product/comment/export"/>
          </v-col>
          <v-col cols="6">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="5"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left"/>
            </div>
          </v-col>
          <v-col cols="3">
            <div  id="rowSection"
                class="d-flex align-center">
                <span class="ml-5">
                    تعداد سطر در هر صفحه
                </span>
                <span class="mt-2" id="row-selector">
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
import commentsComposable from '@/composables/Comments';
import BrandsComposable from "@/composables/Brands";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  data() {
    return {
      perPageFilter: false,
      scoreItems: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      itemListTable: []
    }
  },

  components: {
    PanelFilter,
    ModalColumnFilter,
    ModalExcelDownload,
    ShTable
  },

  setup() {
    const { allBrands, getAllBrands } = BrandsComposable();
    const statusComment = [
      {
        label: 'تایید شده',
        value: 'approved'
      },
      {
        label: 'رد شده',
        value: 'rejected'
      },
      {
        label: 'در انتظار',
        value: 'waiting'
      }
    ]
    const {
      header,
      filterField,
      loading,
      CommentData,
      getComments,
      page,
      pageLength,
      dataTableLength,

    } = new commentsComposable();
    return {
      header,
      filterField,
      loading,
      CommentData,
      getComments,
      page,
      pageLength,
      dataTableLength,
      allBrands,
      getAllBrands,
      statusComment
    };
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

      getStatusClass(status){
          if (status === 'waiting') return '#FFF3E0'
          else if (status === 'rejected') return '#FFEBEE'
          else if (status === 'approved') return '#E8F5E9'
      },

      getPersianStatus(status){
          if (status === 'waiting') return ' در انتظار '
          else if (status === 'rejected') return ' رد شده '
          else if (status === 'approved') return ' تایید شده '
      },
  },

  computed:{
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
  },

  mounted() {
    this.getAllBrands()
    this.getComments()
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
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },

    $route() {
      this.getComments()
    },

    page() {
      if (!this.perPageFilter) {
        this.getComments()
      }
    },

      CommentData(){
        this.itemListTable = []

          this.CommentData.forEach((item) =>
              this.itemListTable.push(
                  {
                      id: item.id,
                      sku_id: item.sku_id,
                      label: item.sku.label,
                      score: item.score,
                      brand: item.sku.brand.name,
                      user: item.user.first_name + ' ' + item.user.last_name,
                      phone_number: item.user.phone_number,
                      email: item.user.email,
                      admin: item.creator.first_name !== null ? item.creator.first_name + ' ' + item.creator.last_name : '-',
                      created_at: item.created_at_fa,
                      updated_at: item.updated_at_fa,
                      custom: item.status /* for customSlot*/
                  },
              ),
          )
      }
  }
}
</script>