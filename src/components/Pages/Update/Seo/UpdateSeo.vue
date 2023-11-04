<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card
        class="ma-5 br-12 pb-15 flex-grow-1"
        min-height="600"
    >

      <SeoForm
          :page="pageSingle"
          ref="SeoForm"
      />
      <footer class="create-warehouse__actions">
        <v-row
            justify="end"
            class="pl-10 pt-5"
        >
          <v-btn
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1"
          >

            تایید
          </v-btn>


        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import SeoForm from "@/components/Pages/Update/Seo/SeoForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import Page from "@/composables/Page"

export default {
  setup(){
    const {pageSingle , getPage}  = new Page()
    return {pageSingle , getPage}
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {SeoForm},
  methods:{
    validate(){
      this.$refs.SeoForm.$refs.updateSeo.validate()
      setTimeout(()=>{
        if (this.$refs.SeoForm.valid) this.updateSeo()
      } , 200)
    },

    async updateSeo(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/crud/update/seo/${this.$route.params.pageId}`
      formData.append('slug' , this.$refs.SeoForm.form.slug)
      formData.append('meta_title', this.$refs.SeoForm.form.metaTitle)
      formData.append('meta_description', this.$refs.SeoForm.form.metaDescription)
      formData.append('og_title', this.$refs.SeoForm.form.ogTitle)
      formData.append('og_description', this.$refs.SeoForm.form.ogDescription)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/page/index')

      }
      else{
        this.loading=false
      }
    }
  },
  mounted() {
    this.getPage()
  }
}
</script>