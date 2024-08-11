

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <SkuGroupEdit/>-->
      <div class="px-2 py-2 h-100 create-sku-step2">
        <v-card
            class="ma-5 br-12"
            height="580"
        >
          <v-form
              class="create-product__specs-form scroller"
          >
            <v-row align="center" class="mt-15">
              <v-col cols="12">
                <div class="text-right my-2 w-100">
            <span class="t12500">
                {{ lables.label }}

            </span>
                </div>

                <v-text-field
                    v-model="specsFromModal.label"
                    class="t1330"
                    variant="outlined"
                    :items="heightList"
                    :placeholder="lables.label"
                    @update:modelValue="saveCreateFromModel();"
                />
              </v-col>
              <v-col cols="12">
                <div>
                  <UploadFileSection @getImage="getSkuImage"/>
                  <div class="d-flex align-center mt-5" v-if="specsFromModal.image">
                    <span>IMG-{{ specsFromModal.image }}</span>
                    <span class="mr-15"><v-icon color="error" @click="removeItem(specsFromModal.image)">mdi-delete</v-icon></span>
                  </div>
                </div>
              </v-col>

            </v-row >

          </v-form>
          <footer class="create-product__actions ">
            <v-row justify="space-between" class="px-8 pt-8">
              <div>
                <v-btn
                    rounded
                    variant="outlined"
                    width="115"
                    @click="$router.go(-1)"
                >
              <span class="t14300">
                انصراف
              </span>
                </v-btn>
              </div>

              <div>
                <v-btn
                    :loading="loading"
                    rounded
                    color="primary400"
                    variant="elevated"
                    width="115"
                    @click="editSku"
                >
                  <span
                      class="t14300"
                  >
                 ذخیره
              </span>
                </v-btn>
              </div>
            </v-row>
          </footer>
        </v-card>
      </div>

    </v-main>
  </v-layout>


</template>
<script>
import {defineAsyncComponent} from "vue";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import Sku from "@/composables/Sku";
import {openConfirm} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
const SkuGroupEdit = defineAsyncComponent(()=> import ('@/components/Products/Sku/Edit/SkuGroupEdit.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  components:{
    Header,
    DashboardLayout,
    UploadFileSection,
  },

  setup(){
    const {getSkuGroup , skuGroup} = new Sku()
    return {getSkuGroup , skuGroup}
  },


  data: () => ({
    lables: {
      label:'نام فارسی ',
    },
    specsFromModal: {
      label:null,
      image:null
    },
    rule: [v => !!v || 'این فیلد الزامی است'],
    editorConfig: {
      language: 'en',
      contentsLangDirection: 'rtl',
    },
  }),

  methods: {
    getSkuImage(image){
      this.specsFromModal.image = image.data.data.image_id
    },
    removeItem(id) {
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
    saveCreateFromModel() {
      const createFromModelJson = JSON.stringify(this.specsFromModal);
      this.$cookies.set('createFromModelStep2', createFromModelJson);
    },

    setFormModel() {
      if (this.$cookies.get('createFromModelStep2')) {
        const jsonForm = this.$cookies.get('createFromModelStep2')
        this.specsFromModal = jsonForm
      }
    },

    setForm(){
      this.specsFromModal.label = this.sku.label

    },
    async editSku(){
      let sizes =[]
      const formData = new FormData()
      formData.append('label', this.specsFromModal.label)
      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/sku/group/crud/update/' + this.$route.params.skuGroupId
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.attachImage()

      } else {
        this.loading = false
      }
    },
    async attachImage(){
      const formData = new FormData()
      formData.append('image_id', this.specsFromModal.image)

      this.loading = true
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'product/sku/group/crud/attach/image/' + this.$route.params.skuGroupId
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/product/get/skugroups/index')
      } else {
        this.loading = false
      }
    }
  },
  watch:{
    skuGroup(val){
      this.specsFromModal.label = val.label
    }
  },
  mounted() {
    this.getSkuGroup(this.$route.params.skuGroupId)
  },
}
</script>