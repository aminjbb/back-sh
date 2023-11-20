<template>
  <div class="h-100 d-flex flex-column align-stretch seller">

    <v-card height="70" class="mx-5 my-2 br-12 pt-2 stretch-card-header-70">
        <div class="d-flex justify-start align-center pr-15">
          <ModalPartitionSlider :slider="slider"/>
           <div class="d-flex px-15">
              <div class="d-flex mx-5">
                  <span>
                    عنوان :
                  </span>
                  <span>
                    {{ slider?.label }}
                  </span>
              </div>
              <div class="d-flex mx-5">
                  <span>
                    کد رنگ :
                  </span>
                  <span class="d--ltr">
                   {{ slider?.background_hex_code }}
                  </span>
              </div>
           </div>

        </div>
    </v-card>
    <v-card height="70" class="mx-5 my-2 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-4">
        <v-col cols="6" >
         <ModalAddSectionForSlider :slider="slider"/>
        </v-col>

        <v-col cols="6">

        </v-col>
      </v-row>
    </v-card>

    <v-card class="mx-5 my-2 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="categoryHeader"
          :items="homePartitionSlider.data"
          editUrl="/seller/edit/"
          activePath="seller/crud/update/activation/"
          deletePath="page/home/section/slider/partition/delete/"
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
import Table from '@/components/HomePage/Table/HomePagePartitionTable.vue'
import Home from "@/composables/Home";
import ModalTableFilter from '@/components/Menu/Filter/Filter.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import { openToast} from "@/assets/js/functions";
import ModalPartitionSlider from "@/components/HomePage/Modals/ModalPartitionSlider.vue";
import ModalAddSectionForSlider from "@/components/HomePage/Modals/ModalAddSectionForSlider.vue";
export default {
  setup(props) {
    const {
      bannerHeader , getHomeSection , homeSection ,  dataTableLength, page , filterBannerField , loading ,getHomePartitionSlider , homePartitionSlider , categoryHeader
    } = new Home();
    return {
      bannerHeader , getHomeSection , homeSection ,  dataTableLength, page , filterBannerField , loading , getHomePartitionSlider , homePartitionSlider , categoryHeader
    };
  },

  components: {
    ModalAddSectionForSlider,
    ModalPartitionSlider,
    Table,
    ModalGroupAdd,
    ModalTableFilter,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    slider(){
      return this.homeSection?.sliders[0]
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.bannerHeader[index].show = value
    },

  },

  mounted() {
    this.getHomeSection()
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

    slider(val){
      this.getHomePartitionSlider(val.id)
    }
  }
}
</script>
