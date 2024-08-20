<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <!--      <AddBestSellingCategories/>-->
      <div class="h-100vh">
        <v-card
            class="ma-5 br--12 pa-10 position__relative "
            min-height="600"
        >
          <BestSellingCategoriesForm ref="BestSellingCategoryForm"/>

          <v-row
              justify="end"
              class="position__absolute bottom left"
          >
            <v-btn
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1"
            >
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن
            </v-btn>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5"
            >
              <template v-slot:prepend>
                <v-icon>mdi-cancel</v-icon>
              </template>
              انصراف
            </v-btn>
          </v-row>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";
// const AddBestSellingCategories = defineAsyncComponent(()=> import ('@/components/BestSellingCategories/Add/AddBestSellingCategories.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import CategoryForm from "@/components/Categories/CategoryForm.vue";
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
const BestSellingCategoriesForm = defineAsyncComponent(()=> import('@/components/BestSellingCategories/Form/BestSellingCategoriesForm.vue'))

export default {
  components: {
    CategoryForm,
    BestSellingCategoriesForm,
    DashboardLayout,
    Header
  },

  methods: {
    validate() {
      if (this.$refs.BestSellingCategoryForm.form.image_id == null){
        openToast(this.$store, 'حتما باید عکس اضافه شود' , 'error')
      }

      else{
        this.$refs.BestSellingCategoryForm.$refs.addBestSelling.validate()
        setTimeout(()=>{
          if (this.$refs.BestSellingCategoryForm.valid) {
            this.submitForm()
          }
        }, 200)
      }
    },

    async submitForm() {
      this.loading = true
      let formdata = new FormData()

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'category/best_selling/crud/create'
      AxiosMethod.form = formdata
      formdata.append('label', this.$refs.BestSellingCategoryForm.form.label)
      formdata.append('priority', this.$refs.BestSellingCategoryForm.form.priority)
      formdata.append('device', this.$refs.BestSellingCategoryForm.form.device)
      formdata.append('image_alt', this.$refs.BestSellingCategoryForm.form.image_alt)
      formdata.append('link', this.$refs.BestSellingCategoryForm.form.link)
      formdata.append('image_id', this.$refs.BestSellingCategoryForm.form.image_id)

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')

      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/best-selling-categories/index')
      }
      else {
        this.loading = false
      }
    }
  }
}
</script>
