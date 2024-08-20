<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePageSpecialSalesList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6">
              <v-btn
                  @click="$router.push(`/home-page/${$route.params.sectionId}/special-sales/add`)"
                  color="primary500"
                  height="40"
                  rounded
                  class="px-8 mt-1">
                <template v-slot:prepend>
                  <v-icon>mdi-plus</v-icon>
                </template>
                افزودن اسلایدر
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="specialSalesHeader" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="specialSalesHeader"
              :items="itemListTable"
              :loading="loading"
          >
              <template v-slot:customSlot="item">
                  <div class=" slider_status" :class="sliderStatusClass(item.data.status)">
                        <span class="t14 w300 text-gray500 py-5 number-font">
                            {{sliderStatus(item.data.status)}}
                        </span>
                  </div>
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
                                  <div class="ma-5 pointer" @click="$router.push(`/home-page/${$route.params.sectionId}/special-sales/${item.data.id}/edit`)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش
                                        </span>
                                  </div>
                              </v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                              <v-list-item-title>
                                  <div class="ma-5 pointer" @click="$router.push(`/home-page/${$route.params.sectionId}/special-sales/${item.data.id}/add/shps`)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش محصولات
                                        </span>
                                  </div>
                              </v-list-item-title>
                              <v-list-item>
                                  <v-list-item-title>
                                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                            <span class="mr-2 text-grey-darken-1 t14 w300">
                                                حذف
                                            </span>
                                      </div>
                                  </v-list-item-title>
                              </v-list-item>
                          </v-list-item>
                      </v-list>
                  </v-menu>
              </template>
          </ShTable>
          <v-divider />

          <v-card-actions class="pb-3">
            <v-row class="px-8">
              <v-col cols="3" class="d-flex justify-start" />

              <v-col cols="6" class="d-flex justify-center">
                <div class="text-center">
                  <v-pagination
                      v-model="skuPage"
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

    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const HomePageSpecialSalesList = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageSpecialSalesList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {convertDateToJalai, openConfirm, openToast} from "@/assets/js/functions";
import ModalAddBanner from "@/components/HomePage/Modals/ModalAddBanner.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  data(){
        return{
            itemListTable: []
        }
    },
  setup() {
    const {
      specialSalesHeader,
      getHomeSection,
      homeSection,
      dataTableLength,
      page,
      filterBannerField,
      loading,
    } = new Home();
    return {
      specialSalesHeader,
      getHomeSection,
      homeSection,
      dataTableLength,
      page,
      filterBannerField,
      loading
    };
  },

  components: {
    ModalAddBanner,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header,
    ShTable
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

    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", "page/home/section/slider/delete/"+id, true)
    },
    getTime(date) {
      const splitDate = date.split(' ')
      return splitDate[1]
    },
    convertDateToJalai,
    sliderStatus(status) {
      switch (status) {
          case 'in_progress':
              return 'در حال انتشار'
          case 'waiting':
              return 'در انتظار انتشار'
          case 'expired':
              return 'اتمام انتشار'
      }
    },
    sliderStatusClass(status) {
          switch (status) {
              case 'in_progress':
                  return 'slider_status__progress'
              case 'waiting':
                  return 'slider_status__waiting'
              case 'expired':

          }
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
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getHomeSection()
          openToast(
              this.$store,
              'آیتم مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    homeSection() {
    if(this.homeSection.sliders) {

        this.itemListTable = []
        this.homeSection.sliders.forEach((item) => {
            this.itemListTable.push(
                {
                    id: item.id,
                    label: item.label,
                    start_time: this.convertDateToJalai(item.start_time, '-' , true) +' '+this.getTime(item.start_time),
                    end_time: this.convertDateToJalai(item.end_time, '-' , true) +' '+this.getTime(item.end_time),
                    creator: item.creator?.first_name +' '+item.creator?.last_name,
                    status: item.status,
                }
            )
        })
    }
},
  }
}
</script>

<style lang="scss">
.slider_status {
    padding: 3px 8px ;
    border-radius: 8px;
    height: 30px;

    &__waiting {
        background: #FFF3E0;
    }

    &__progress {
        background: #E8F5E9;
    }

    &__expire {
        background: #FFEBEE;
    }
}
</style>
