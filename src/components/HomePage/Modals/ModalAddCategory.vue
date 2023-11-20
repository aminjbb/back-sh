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
      افزودن دسته‌بندی
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
                           افزودن  دسته بندی
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <CategoryForm ref="CategoryForm"/>
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
import CategoryForm from '@/components/HomePage/Forms/CategoryForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian} from "@/assets/js/functions";
export  default {
  components:{
    CategoryForm
  },
  data(){
    return{
      dialog:false
    }
  },

  methods:{
    validate(){
      this.$refs.CategoryForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.CategoryForm.valid) this.createCategory()
      } , 200)
    },

    async createCategory(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'page/home/section/banner/create'
      formData.append('homepage_section_id' , this.$route.params.sectionId)
      formData.append('link', this.$refs.CategoryForm.form.link)
      formData.append(`image_alt`, this.$refs.CategoryForm.form.imageAlt)
      formData.append('image_id', this.$refs.CategoryForm.form.image)
      formData.append('priority', this.$refs.CategoryForm.form.priority)
      formData.append('image_id', this.$refs.CategoryForm.form.image)
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