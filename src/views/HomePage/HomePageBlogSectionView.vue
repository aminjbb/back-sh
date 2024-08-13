<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <!--      <HomePageBlogSection />-->
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card class="mx-5 br--12 py-5">
          <v-row
              justify="center"
              align="center"
              class="px-10 ">
            <v-col cols="11">
              <div class="text-right mb-2">
                عنوان
                <span class="text-error">
                        *
                    </span>
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
              <ModalAddBlog />
            </v-col>

            <v-col cols="6">

            </v-col>
          </v-row>
        </v-card>

        <v-card class="mx-5 my-2 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              class="flex-grow-1"
              :header="blogHeader"
              :items="homePageBanner.data"
              editUrl="/seller/edit/"
              activePath="page/home/section/banner/update/activation/"
              deletePath="page/home/section/banner/delete/"
              changeStatusUrl="seller/crud/update/contract/"
              :loading="loading"
              updateUrl="seller/csv/mass-update"
              model="blog" />

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
// const HomePageBlogSection = defineAsyncComponent(()=> import ('@/components/HomePage/HomePageBlogSection.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from '@/components/HomePage/Table/HomePageBannerTable.vue'
import Home from "@/composables/Home";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import {openToast} from "@/assets/js/functions";
import ModalAddBlog from "@/components/HomePage/Modals/ModalAddBlog.vue";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  setup() {
    const {
      blogHeader,
      getHomeSection,
      homeSection,
      dataTableLength,
      page,
      filterBannerField,
      loading,
      getHomePageBanner,
      homePageBanner,
    } = new Home();
    return {
      blogHeader,
      getHomeSection,
      homeSection,
      dataTableLength,
      page,
      filterBannerField,
      loading,
      getHomePageBanner,
      homePageBanner
    };
  },

  components: {
    ModalAddBlog,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
    DashboardLayout,
    Header
  },
  data() {
    return {
      title: '',
      editLoading: false
    }
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
    }
  },

  mounted() {
    this.getHomeSection()
    this.getHomePageBanner()
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

    homeSection(val) {
      this.title = val.label
    },
  }
}
</script>
