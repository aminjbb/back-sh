<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePagePartitionSlider />-->
      <div class="h-100 d-flex flex-column align-stretch seller">

        <v-card height="70" class="mx-5 my-2 br--12 pt-2 stretch-card-header-70">
          <div class="d-flex justify-start align-center pr-15">
            <ModalPartitionSlider :getHomeSection="getHomeSection" :slider="slider" />
            <div class="d-flex px-15">
              <div class="d-flex mx-5">
                <span>عنوان :</span>
                <span>{{ slider?.label }}</span>
              </div>
              <div class="d-flex mx-5">
                <span>کد رنگ :</span>
                <span class="d--ltr">{{ slider?.background_hex_code }}</span>
              </div>
            </div>
          </div>
        </v-card>
        <v-card height="70" class="mx-5 my-2 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6">
              <ModalAddSectionForSlider :getHomeSection="getHomeSection" :slider="slider" />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mx-5 my-2 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="categoryHeader"
              :items="itemListTable"
              :loading="loading"
          >
              <template v-slot:customSlot="item">
                  <v-text-field  v-model="item.data.priority"  hide-details  variant="outlined"  class="number-font"  type="number" />
              </template>

              <template v-slot:customSlot2="item">
                  <div @click="update(item.data)"
                      class="seller__add-sku-btn d-flex justify-center align-center pointer">

                      <v-icon size="15">mdi-plus</v-icon>
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
                                  <div class="ma-5 pointer" @click="openEditModal(item.data.data)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش
                                        </span>
                                  </div>
                              </v-list-item-title>
                          </v-list-item>

                          <v-list-item>
                              <v-list-item-title>
                                  <div class="ma-5 pointer" @click="$router.push(`/home-page/${$route.params.sectionId}/partition-slider/${item.data.id}/add/sku`)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            مدیریت کالا ها
                                        </span>
                                  </div>
                              </v-list-item-title>
                          </v-list-item>

                          <v-list-item>
                              <v-list-item-title>
                                  <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                        <span class=" text-grey-darken-1 t14 w300">
                                            حذف
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
              <v-col cols="3" class="d-flex justify-start" />

              <v-col cols="6" class="d-flex justify-center" />

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

          <ModalEditSectionForSlider />
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const HomePagePartitionSlider = defineAsyncComponent(()=> import ('@/components/HomePage/HomePagePartitionSlider.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import ModalPartitionSlider from "@/components/HomePage/Modals/ModalPartitionSlider.vue";
import ModalAddSectionForSlider from "@/components/HomePage/Modals/ModalAddSectionForSlider.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalEditSectionForSlider from "@/components/HomePage/Modals/ModalEditSectionForSlider.vue";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    data(){
        return{
            itemListTable: []
        }
    },

    setup() {
    const {
      bannerHeader,
      getHomeSection,
      homeSection,
      dataTableLength,
      page,
      filterBannerField,
      loading,
      getHomePartitionSlider,
      homePartitionSlider,
      categoryHeader
    } = new Home();
    return {
      bannerHeader,
      getHomeSection,
      homeSection,
      dataTableLength,
      page,
      filterBannerField,
      loading,
      getHomePartitionSlider,
      homePartitionSlider,
      categoryHeader
    };
  },

  components: {
    ModalAddSectionForSlider,
    ModalPartitionSlider,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header,
    ShTable,
    ModalEditSectionForSlider,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    slider() {
      return this.homeSection ?.sliders[0]
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.bannerHeader[index].show = value
    },
    removeItem(id) {
          openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", "page/home/section/slider/partition/delete/"+id, true)
      },
    openEditModal(object) {
          const form = {
              dialog: true,
              object: object
          }
          this.$store.commit('set_homePageSectionForSliderModal', form)
      },
    async update(item) {
          const formData = new FormData()
          const AxiosMethod = new AxiosCall()
          AxiosMethod.end_point = `page/home/section/slider/partition/update/${item.id}`
          formData.append('homepage_section_id', this.$route.params.sectionId)
          formData.append('label', item.label)
          formData.append('priority', item.priority)

          AxiosMethod.form = formData
          AxiosMethod.store = this.$store
          AxiosMethod.using_auth = true
          AxiosMethod.token = this.$cookies.get('adminToken')
          let data = await AxiosMethod.axios_post()
          if (data) {
              openToast(
                  this.$store,
                  'دسته بندی با موفقیت ویرایش شد.',
                  "success"
              );
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
      if (localStorage.getItem('deleteObject') == 'done') {
        if (!val) {
          this.getHomeSection()
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
    slider(val) {
      this.getHomePartitionSlider(val.id)
    },

    homePartitionSlider () {
        if(this.homePartitionSlider.data) {

            this.itemListTable = []
            this.homePartitionSlider.data.forEach((item) => {
                this.itemListTable.push(
                    {
                        data: item,
                        id: item.id,
                        label: item.label,
                        priority: item.priority,
                        creator: item.creator?.first_name+' '+item.creator?.last_name,
                    }
                )
            })
        }
    },
  }
}
</script>


