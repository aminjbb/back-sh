<template>
  <div class="text-right">
    <v-btn
        @click="dialog = true"
        color="primary500"
        height="40"
        rounded
        class="px-8 mt-1">
      <template v-slot:prepend>
        <v-icon>mdi-plus</v-icon>
      </template>
      افزودن مقاله
    </v-btn>
    <v-dialog
        v-model="dialog"
        width="908"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="dialog = false" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                           افزودن مقاله
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <BlogForm ref="BlogForm"/>
        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <v-btn

              variant="text"
              height="40"
              rounded
              class="px-5 mt-1"
          >

            انصراف
          </v-btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BlogForm from '@/components/HomePage/Forms/BlogForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";
export  default {
  components:{
    BlogForm
  },
  data(){
    return{
      dialog:false
    }
  },

  methods:{
    validate(){
      this.$refs.BlogForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.BlogForm.valid) this.createBlog()
      } , 200)
    },

    async createBlog(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'page/home/section/banner/create'
      formData.append('homepage_section_id' , this.$route.params.sectionId)
      formData.append('link', this.$refs.BlogForm.form.link)
      formData.append('label', this.$refs.BlogForm.form.title)
      formData.append(`image_alt`, this.$refs.BlogForm.form.imageAlt)
      formData.append('image_id', this.$refs.BlogForm.form.image)
      formData.append('priority', this.$refs.BlogForm.form.priority)
      formData.append('device', 'desktop')
      formData.append('is_active', 0)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.dialog = false
      }
      else{
        this.loading=false
      }
    }
  }
}
</script>