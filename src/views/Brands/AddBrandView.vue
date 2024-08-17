

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
<!--      <AddBrandForm/>-->
      <div class="mh-100">
        <v-card
            class="ma-5 br--12 pa-10 position__relative"
            min-height="600"
        >
          <BrandForm ref="BrandForm" />

          <v-row
              justify="end"
              class="position__absolute bottom left"
          >
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1"
            >
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن برند
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
import {openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";
const AddBrandForm = defineAsyncComponent(()=> import ('@/components/Brands/Add/AddBrandForm.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const BrandForm = defineAsyncComponent(()=> import ('@/components/Brands/BrandForm.vue'))

export default {
  components:{
    DashboardLayout,
    Header,
    BrandForm
  },

  data() {
    return {
      loading: false,
    }
  },

  methods: {
    /**
     * validate Form
     */
    validate() {
      if (this.$refs.BrandForm.form.image_id == 0 ) {
        openToast( this.$store,
            'عکس الزامی است',
            "error")
      }
      else{
        this.$refs.BrandForm.$refs.addBrand.validate()
        if (this.$refs.BrandForm.valid) {
          this.submitForm()
        }
      }
    },

    /**
     * Submit form
     */
    async submitForm() {
      this.loading=true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'brand/crud/create'
      AxiosMethod.form = formdata
      formdata.append('name' , this.$refs.BrandForm.form.name)
      formdata.append('label', this.$refs.BrandForm.form.label)
      formdata.append(`image_id`, this.$refs.BrandForm.form.image_id)
      formdata.append('priority', this.$refs.BrandForm.form.priority)

      if(this.$refs.BrandForm.form.active) formdata.append('is_active', 1)
      else formdata.append('is_active', 0)

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/brand/index')

      }
      else{
        this.loading=false
      }
    }
  }
}
</script>
