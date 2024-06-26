<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card
        height="70"
        class="ma-5 br-12 stretch-card-header-70">

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
        class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
        height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          editUrl="/Comment/reply/"
          :items="CommentData"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
      />

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
import Table from '@/components/Comments/CommentTable.vue';
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";

export default {
  data() {
    return {
      perPageFilter: false,
      scoreItems: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    }
  },

  components: {
    PanelFilter,
    ModalColumnFilter,
    ModalExcelDownload,
    Table
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
    }
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
    }
  }
}
</script>