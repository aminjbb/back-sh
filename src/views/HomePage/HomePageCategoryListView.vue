<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePageCategoryList />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card class="mx-5 br--12 py-5">
          <v-row
              justify="center"
              align="center"
              class="px-10 ">
            <v-col cols="11">
              <div class="text-right mb-2">
                عنوان
                <span class="text-error">*</span>
              </div>
              <div class="mb-4">
                <v-text-field
                    v-model="title"
                    variant="outlined"
                    placeholder="عنوان نمایشی را وارد نمایید" />
              </div>
            </v-col>

            <v-col cols="1">
              <v-row justify="end">
                <v-btn
                    :loading="editLoading"
                    @click="editSection()"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                  تایید
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card height="70" class="mx-5 my-2 br--12 stretch-card-header-70">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-4">
            <v-col cols="6">
              <ModalAddCategory :getHomePageBanner="getHomePageBanner" />
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="bannerHeader" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mx-5 my-2 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
<!--          <Table-->
<!--              class="flex-grow-1"-->
<!--              :header="bannerHeader"-->
<!--              :items="homePageBanner.data"-->
<!--              editUrl="/seller/edit/"-->
<!--              activePath="page/home/section/banner/update/activation/"-->
<!--              deletePath="page/home/section/banner/delete/"-->
<!--              changeStatusUrl="seller/crud/update/contract/"-->
<!--              :loading="loading"-->
<!--              updateUrl="seller/csv/mass-update"-->
<!--              model="category" />-->

          <ShTable
              class="flex-grow-1"
              :headers="bannerHeader"
              :items="itemListTable"
              :activePath="`page/home/section/banner/update/activation/`"
              :loading="loading">
            <template v-slot:customSlot="item">
              <div class="d-flex align-center">
                <img :src="item.data.data.image.image_url" width="68" height="28" alt="" class="br br--4">
                <span>
                <v-icon
                    color="gray500"
                    class="pointer"
                    @click="selectFile(item.index)">mdi-progress-upload</v-icon>
              </span>
              </div>

            </template>

<!--            <template v-slot:customSlot2="item">-->
<!--              <v-text-field  v-model="item.data.priority"  hide-details  variant="outlined"  class="number-font"  type="number" />-->
<!--            </template>-->

<!--            <template v-slot:customSlot3="item">-->
<!--              <div @click="updateImage(item.index, item.data.data, item.data.priority)"-->
<!--                   class="seller__add-sku-btn d-flex justify-center align-center pointer">-->

<!--                <v-icon size="15">mdi-plus</v-icon>-->
<!--              </div>-->
<!--            </template>-->

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
                        <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
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
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const HomePageCategoryList = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageCategoryList.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/HomePage/Table/HomePageBannerTable.vue'
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openConfirm, openToast} from "@/assets/js/functions";
import ModalAddBanner from "@/components/HomePage/Modals/ModalAddBanner.vue";
import ModalAddCategory from "@/components/HomePage/Modals/ModalAddCategory.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  setup() {
    const {
      bannerHeader,
      getHomeSection,
      getHomePageBanner,
      homePageBanner,
      homeSection,
      dataTableLength,
      page,
      filterBannerField,
      loading,
    } = new Home();
    return {
      bannerHeader,
      getHomeSection,
      homeSection,
      getHomePageBanner,
      homePageBanner,
      dataTableLength,
      page,
      filterBannerField,
      loading
    };
  },
  data() {
    return {
      title: '',
      editLoading: false,
      itemListTable: [],
      imageUrl: [],
      image_id: [],
    }
  },
  components: {
    ShTable,
    ModalAddCategory,
    ModalAddBanner,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    openEditModal(obejct, image_id, description) {
      const obj = {...obejct , image :image_id, description:description}
      const form = {
        dialog: true,
        object: obj
      }
      this.$store.commit('set_homePageBrandModal', form)
    },

    changeHeaderShow(index, value) {
      this.bannerHeader[index].show = value
    },

    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", "page/home/section/banner/delete/"+id, true)
    },

    async editSection() {
      this.editLoading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/home/section/crud/update/${this.$route.params.sectionId}`

      formData.append('label', this.title)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.editLoading = false
        this.dialog = false
      } else {
        this.editLoading = false
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
        this.itemListTable[index].imageUrl = data.data.data.url
        this.itemListTable[index].image = data.data.data.image_id
        console.log()
      }
    }
  },

  mounted() {
    this.getHomeSection()
    this.getHomePageBanner()
  },

  watch: {
    homePageBanner() {
      if(this.homePageBanner.data) {
        this.itemListTable = []
        this.homePageBanner.data.forEach((item) => { console.log(item, 'item')
          this.itemListTable.push(
              {
                data: item,
                id: item.id,
                custom: item.image.image_url,
                device_type: item.device,
                link: item.link,
                admin: item.creator.full_name,
                is_active: item.is_active,
                is_active_id: item.id,

                // label: item.label,
                // link: item.link,
                // priority: item.priority,
                // imageId: item.id,
                // custom: item.image.image_url,
                // description: item.description,
                // creator: item.creator?.first_name+' '+item.creator?.last_name,
              })

          // this.imageUrl.push(item.image.image_url)
          // this.image_id.push(item.image_id)
          // this.description.push(item.description)
        })
      }
    },

    homeSection(val) {
      this.title = val.label
    },
    dataTableLength(val) {
      this.addPerPage(val)
    },
    confirmModal(val) {
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getHomePageBanner()
          openToast(
              this.$store,
              'منو مورد نظر با موفقیت حذف شد',
              "success"
          );
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>


