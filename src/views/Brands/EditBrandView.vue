
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main>
      <Header/>
<!--    <EditBrandForm/>-->
      <div class="mh-100">
        <v-card
            class="ma-5 br--12 position__relative"
            min-height="600"
        >
          <BrandForm
              ref="BrandForm"
              type="edit"
              :brand="brand"
          />

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
                <v-icon>mdi-pen</v-icon>
              </template>
              ویرایش برند
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
const EditBrandForm = defineAsyncComponent(()=> import ('../../components/Brands/Edit/EditBrandForm.vue'))
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
      brand: ''
    }
  },

  methods: {
    /**
     * validate form
     */
    validate() {
      if (this.$refs.BrandForm.form.image_id == 0 ) {
        openToast(this.$store,
            'عکس الزامی است',
            "error")
      }
      else {
        this.$refs.BrandForm.$refs.addBrand.validate()
        if (this.$refs.BrandForm.valid) {
          this.submitForm()
        }

      }

    },

    /**
     * Submit from
     */
    async submitForm() {
      this.loading = true
      var formdata = new FormData();

      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'brand/crud/update/' + this.$route.params.id
      AxiosMethod.form = formdata
      formdata.append('name', this.$refs.BrandForm.form.name)
      formdata.append('label', this.$refs.BrandForm.form.label)
      formdata.append(`image_id`, this.$refs.BrandForm.form.image_id)
      formdata.append('priority', this.$refs.BrandForm.form.priority)
      formdata.append('is_active', this.$refs.BrandForm.form.active)

      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.go(-1)
      }
      else {
        this.loading = false
      }
    },

    /**
     * Get brans
     */
    async getBrand() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'brand/crud/get/' + this.$route.params.id
      AxiosMethod.toast_error = true
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.brand = data.data
      }

    }
  },

  mounted() {
    this.getBrand()
  }
}
</script>
