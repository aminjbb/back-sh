<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
      <!--      <UpdateTemplate/>-->
      <div class="h-100vh">
        <v-card
            class="ma-5 br--12 pa-10 position__relative"
            min-height="600"
        >

          <TemplateForm :templateList="templateList" :page="pageSingle" ref="TemplateForm" />
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
                class="px-8 mt-1 ml-5"
            >

              تایید
            </v-btn>


          </v-row>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>


<script>
import {defineAsyncComponent} from "vue";
// const UpdateTemplate = defineAsyncComponent(()=> import ('@/components/Pages/Update/Template/UpdateTemplate.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import TemplateForm from "@/components/Pages/Update/Template/TemplateForm.vue";
import Page from "@/composables/Page";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  setup(){
    const {pageSingle , getPage , templates, getTemplates}  = new Page()
    return {pageSingle , getPage , templates, getTemplates}
  },
  data() {
    return {
      loading: false,
    }
  },
  components:{
    TemplateForm,
    DashboardLayout,
    Header
  },

  methods:{
    validate(){
      this.$refs.TemplateForm.$refs.updateTemplate.validate()
      setTimeout(()=>{
        if (this.$refs.TemplateForm.valid){
          this.updateTemplate()
        }
      } , 200)
    },

    async updateTemplate(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/crud/update/templates/${this.$route.params.pageId}`
      formData.append('templates[0][device_type]' ,'mobile')
      formData.append('templates[0][template_id]' ,this.$refs.TemplateForm.form.mobile)

      formData.append('templates[1][device_type]' ,'tablet')
      formData.append('templates[1][template_id]' ,this.$refs.TemplateForm.form.tablet)

      formData.append('templates[2][device_type]' ,'desktop')
      formData.append('templates[2][template_id]' ,this.$refs.TemplateForm.form.desktop)

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

  computed:{
    templateList(){
      try {
        const templates = []
        this.templates.forEach(template =>{
          const form = {
            title: template.name,
            value :template.id
          }
          templates.push(form)
        })
        return templates
      }
      catch (e) {
        return  []
      }
    }
  },

  mounted() {
    this.getPage()
    this.getTemplates()
  }
}
</script>

