<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePageBrandSection />-->
      <div class="h-100 d-flex flex-column align-stretch seller">

        <v-card height="70" class="mx-5 my-2 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6">
              <ModalAddBrand :getHomeBrand="getHomeBrand" />
            </v-col>

            <v-col cols="6" />
          </v-row>
        </v-card>

        <v-card class="mx-5 my-2 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="brandHeader"
              :items="itemListTable"
              :loading="loading"
          >
              <template v-slot:customSlot="item">
                  <img :src="imageUrl[item.index]" width="68" height="28" alt="" class="br br--4">
                  <span>
                        <v-icon  color="gray500"  class="pointer"  @click="selectFile(item.index)">mdi-progress-upload</v-icon>
                    </span>
              </template>

              <template v-slot:customSlot2="item">
                  <v-text-field  v-model="item.data.priority"  hide-details  variant="outlined"  class="number-font"  type="number" />
              </template>

              <template v-slot:customSlot3="item">
                  <div @click="updateImage(item.index, item.data.data, item.data.priority)"
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
                                  <div class="ma-5 pointer" @click="openEditModal(item.data,image_id[item.index],description[item.index])">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
                                            ویرایش
                                        </span>
                                  </div>
                              </v-list-item-title>
                          </v-list-item>

                          <v-list-item>
                              <v-list-item-title>
                                  <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                                        <span class="mr-2 text-grey-darken-1 t14 w300">
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

        <ModalEditBrand @updateList="updateList"/>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const HomePageBrandSection = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageBrandSection.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import ModalAddBrand from "@/components/HomePage/Modals/ModalAddBrand.vue";
import ModalEditBrand from "@/components/HomePage/Modals/ModalEditBrand.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {AxiosCall} from "@/assets/js/axios_call";

export default {

  data(){
        return{
            itemListTable: [],
            imageUrl: [],
            image_id: [],
            description:[]
        }
    },
  setup() {
    const {
      brandHeader,
      getHomeBrand,
      homeBrand,
      dataTableLength,
      page,
      filterBannerField,
      loading,
    } = new Home();
    return {
      brandHeader,
      getHomeBrand,
      homeBrand,
      dataTableLength,
      page,
      filterBannerField,
      loading
    }
  },

  components: {
    ModalAddBrand,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header,
    ShTable,
    ModalEditBrand,
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

    openEditModal(obejct, image_id, description) {
      const obj = {...obejct , image :image_id, description:description}
      const form = {
          dialog: true,
          object: obj
      }
      this.$store.commit('set_homePageBrandModal', form)
    },

    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", "page/home/section/brand/delete/"+id, true)
    },

    async updateImage(index, item, priority) {
          const formData = new FormData()
          formData.append('homepage_section_id', this.$route.params.sectionId)
          formData.append('image_id', this.image_id[index])
          formData.append('priority', priority)
          formData.append('device', item.device)
          formData.append('image_alt', item.image_alt)
          formData.append('is_active', item.is_active)
          formData.append('link', item.link)
          formData.append('label', item.label)
          const AxiosMethod = new AxiosCall()
          AxiosMethod.using_auth = true
          AxiosMethod.form = formData
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = `page/home/section/brand/update/${item.id}`
          let data = await AxiosMethod.axios_post()
          if (data) {
              openToast(this.$store, 'اطلاعات با موفقیت ویرایش شد', 'success')
          }
      },

    selectFile(index) {
          var input = document.createElement('input');
          input.type = 'file';
          input.onchange = e => {
              let file = e.target.files[0];
              this.submitImage(index, file)
          }
          input.click();
    },

    async submitImage(index, file) {
          var formData = new FormData();
          const AxiosMethod = new AxiosCall()
          formData.append('file', file)
          formData.append('module', 'page')
          AxiosMethod.using_auth = true
          AxiosMethod.store = this.$store
          AxiosMethod.token = this.$cookies.get('adminToken')
          AxiosMethod.end_point = 'file-manager/direct/store'
          AxiosMethod.form = formData
          let data = await AxiosMethod.axios_image_upload()
        if (data) {
            this.imageUrl[index] = data.data.data.url
            this.image_id[index] = data.data.data.image_id
        }
      },

      updateList(status) {
        this.getHomeBrand();
      },
  },

  mounted() {
    this.getHomeBrand()
  },

  watch: {
    dataTableLength(val) {
      this.addPerPage(val)
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject') === 'done') {
        if (!val) {
          this.getHomeBrand();
          openToast(
              this.$store,
              'آیتم مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },

    homeBrand() {
          if(this.homeBrand.data) {
              this.itemListTable = []
              this.description = []
              this.imageUrl = []
              this.homeBrand.data.forEach((item) => {
                  this.itemListTable.push(
                      {
                          data: item,
                          id: item.id,
                          label: item.label,
                          link: item.link,
                          priority: item.priority,
                          creator: item.creator?.first_name+' '+item.creator?.last_name,
                       })

                  this.imageUrl.push(item.image.image_url)
                  this.image_id.push(item.image_id)
                  this.description.push(item.description)
              })
          }
      },
  }
}
</script>
