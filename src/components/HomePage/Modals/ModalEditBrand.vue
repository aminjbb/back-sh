<template>
  <div class="text-right">

    <v-dialog
        v-model="dialog"
        width="908"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click=" close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14 w500">
                           ویرایش برند
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <BrandForm status="edit" ref="BrandForm"/>
        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <v-btn
              @click=" close()"
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
import BrandForm from '@/components/HomePage/Forms/BrandForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";

export  default {
  components:{
    BrandForm
  },

  data(){
    return{
      loading:false
    }
  },

  computed:{
    dialog(){
      return this.$store.getters['get_homePageBrandModal']
    },

    brandObject(){
      return this.$store.getters['get_homePageBrandObject']
    }
  },

  methods:{
    validate(){
      this.$refs.BrandForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.BrandForm.valid) this.updateBrand()
      }, 200)
    },

    async updateBrand(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/home/section/brand/update/${this.brandObject.id}`
      formData.append('homepage_section_id' , this.$route.params.sectionId)
      formData.append('label', this.$refs.BrandForm.form.title)
      formData.append(`link`, this.$refs.BrandForm.form.link)
      formData.append('image_id', this.$refs.BrandForm.form.image)
      formData.append('priority', this.$refs.BrandForm.form.priority)
      formData.append('description', this.$refs.BrandForm.form.desc)
      AxiosMethod.form = formData
      formData.append('is_active', 0)
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()

      if (data) {
        this.loading = false;
        this.updateList('true');
        this.close();
      }
      else{
        this.loading=false
      }
    },

    /**
     * Update list
     * @param {*} status
    */
    updateList(status) {
      this.$emit('updateList', status);
    },

    close(){
      const form = {
        dialog :false,
        object : ''
      }
      this.$store.commit('set_homePageBrandModal' , form)
    }
  },
}
</script>