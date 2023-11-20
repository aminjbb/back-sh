<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card class="mx-5 br-12 py-5">
      <v-row
          justify="center"
          align="center"
          class="px-10 ">
        <v-col cols="11" >
          <div class="text-right mb-2">
            عنوان
            <span class="text-error">
            *
            </span>
          </div>
          <div class="mb-4">
            <v-text-field  variant="outlined" placeholder="عنوان نمایشی را وارد نمایید"/>
          </div>
        </v-col>

        <v-col cols="1">
          <v-row justify="end" >
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1"
            >

              تایید
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card height="70" class="mx-5 my-2 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-4">
        <v-col cols="6" >
          <ModalAddBlog/>
        </v-col>

        <v-col cols="6">

        </v-col>
      </v-row>
    </v-card>

    <v-card class="mx-5 my-2 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="bannerHeader"
          :items="[]"
          editUrl="/seller/edit/"
          activePath="seller/crud/update/activation/"
          deletePath="seller/crud/update/activation/"
          changeStatusUrl="seller/crud/update/contract/"
          :loading="loading"

          updateUrl="seller/csv/mass-update"
          model="sku" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">

          </v-col>

          <v-col cols="6" class="d-flex justify-center">
            <div class="text-center">
              <v-pagination
                  v-model="skuPage"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="4"
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
import Table from '@/components/HomePage/Table/HomePageBannerTable.vue'
import Home from "@/composables/Home";
import ModalTableFilter from '@/components/Menu/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
import ModalAddBlog from "@/components/HomePage/Modals/ModalAddBlog.vue";
export default {
  setup(props) {
    const {
      bannerHeader , getHomeSections , homeSections ,  dataTableLength, page , filterBannerField , loading ,
    } = new Home();
    return {
      bannerHeader , getHomeSections , homeSections ,  dataTableLength, page , filterBannerField , loading
    };
  },

  components: {
    ModalAddBlog,
    Table,
    ModalGroupAdd,
    ModalTableFilter,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.bannerHeader[index].show = value
    },

  },

  mounted() {
    this.getHomeSections()
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getMenus();
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
  }
}
</script>
