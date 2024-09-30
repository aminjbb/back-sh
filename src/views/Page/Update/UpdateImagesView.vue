<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <!--      <UpdateImagesPage/>-->
      <div class="create-product flex-column d-flex v-field">
        <v-card class="ma-5 br--12 pb-15 flex-grow-1 pt-10 v-field" min-height="500">
          <div class="px-15 mb-5">
            <UploadFileSection @getImage="assignImage" />
          </div>
          <v-card class="ma-5 mt-0 br--12 flex-grow-1 d-flex flex-column align-stretch v-field pb-16">
            <ShTable
                ref="pageImageTable"
                class="flex-grow-1"
                :headers="imageHeader"
                :items="itemListTable"
                :loading="loading"
                :activePath="'product/sku/crud/update/activation/'"
                :dataSelect="positionImageList"
                :deviceData="deviceData"
            >

              <template v-slot:customSlot="item">
                <img :src="itemListTable[item.index].imageUrl" width="68" height="28" alt="" class="br br--4">
                <span>
                <v-icon
                    color="gray500"
                    class="pointer"
                    @click="selectFile(item.index)">mdi-progress-upload</v-icon>
              </span>
              </template>

              <template v-slot:customSlot2="item">
                <v-progress-circular
                    v-if="itemListTable[item.index].loading"
                    indeterminate
                    color="primary"/>
                <div
                    v-else
                    @click="updateImage(item.index)"
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
                        <div class="ma-5 pointer" @click="removeItem(`${$route.params.pageId}/`+item.data.id)">
                          <v-icon size="small" class="text-grey-darken-1">
                            mdi-trash-can-outline
                          </v-icon>
                          <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                        </div>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </ShTable>
          </v-card>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const UpdateImagesPage = defineAsyncComponent(()=> import ('@/components/Pages/Update/Images/UpdateImagesPage.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import ContentForm from "@/components/Pages/Update/Content/ContentForm.vue";
import { AxiosCall } from "@/assets/js/axios_call";
import { openToast, openConfirm } from "@/assets/js/functions";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import Page from '@/composables/Page'
import ShTable from "@/components/Components/Table/sh-table.vue";

export default {
  components: {
    UploadFileSection,
    ContentForm,
    ShTable,
    DashboardLayout,
    Header
  },

  setup() {
    const {
      imageHeader,
      pageSingle,
      getPage
    } = new Page()
    return {
      imageHeader,
      pageSingle,
      getPage
    }
  },

  data() {
    return {
      loading: false,
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "page/crud/delete/image/",
      },
      itemListTable: [],
      positionList: [],
      deviceData: [
        {title: 'موبایل', value: 'mobile'},
        {title: 'تبلت', value: 'tablet'},
        {title: 'دسکتاپ', value: 'desktop'}
      ]
    }
  },

  computed: {
    avatar() {
      return this.$store.getters['get_avatar']
    },
    images() {
      try {
        return this.pageSingle.images
      } catch (e) {
        return []
      }
    },
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    positionImageList() {
      try {
        const positions = []
        this.positionList.forEach(position => {
          const form = {
            title: position.label,
            value: position.id
          }
          positions.push(form)
        })
        return positions
      } catch (e) {

      }
    }
  },

  methods: {
    async getPositions() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `file-manager/image/position/crud/index`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.positionList = data.data.data;
      }
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
        console.log(data.data.data.url, 'url')
        this.itemListTable[index].imageUrl = data.data.data.url
        this.itemListTable[index].image = data.data.data.image_id
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

    async updateImage(index) {
      this.itemListTable[index].loading = true
      const formData = new FormData()
      formData.append('image_id', this.itemListTable[index].image)
      formData.append('image_position_id', this.itemListTable[index].position)
      formData.append('priority', this.itemListTable[index].show_order)
      formData.append('device_type', this.itemListTable[index].deviceType)
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = formData
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `page/crud/update/image/${this.$route.params.pageId}/${this.itemListTable[index].imageId}`
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.itemListTable[index].loading = false
        openToast(this.$store, 'اطلاعات با موفقیت ویرایش شد', 'success')
        if (this.itemListTable[index].image !== this.itemListTable[index].imageId) {
          this.deleteImage(this.itemListTable[index].imageId)
        }
      }
    },

    async deleteImage(id) {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `file-manager/direct/delete/image/${id}`
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_delete()
      if (data) {
        this.loading = false
      } else {
        this.loading = false
      }
    },

    async assignImage(image) {
      this.loading = true
      const formData = new FormData()
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/crud/attach/image/${this.$route.params.pageId}`
      formData.append('image_id', image.data.data.image_id)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.getPage()
      } else {
        this.loading = false
      }
    },

    validate() {
      this.$refs.SupplierForm.$refs.addForm.validate()
      setTimeout(() => {
        if (this.$refs.SupplierForm.valid) this.createSupplier()
      }, 200)
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  },

  mounted() {
    this.getPage()
    this.getPositions()
  },

  watch:{
    images(){
      this.itemListTable = []

      this.images.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                deviceType: item.device_type,
                position: item.position ?.id,
                image: item.id,
                imageId: item.id,
                imageUrl: item.image_url,
                show_order: item.priority,
                loading: false
              },
          ),
      )
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getPage()
          openToast(this.$store, 'عکس مورد نظر با موفقیت حذف شد', "success");
          localStorage.removeItem('deleteObject')
        }
      }
    },
  }
}
</script>


