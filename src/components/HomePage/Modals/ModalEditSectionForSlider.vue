<template>
  <div class="text-right">

    <v-dialog
        v-model="dialog"
        width="908"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                           ویرایش
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <AddSectionForm status="edit" ref="AddSectionForm"/>
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
              @click="close()"
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
import AddSectionForm from "@/components/HomePage/Forms/AddSectionForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
export  default {
  components:{
    AddSectionForm
  },

  data(){
    return{
    }
  },

  methods:{
    validate(){
      this.$refs.AddSectionForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.AddSectionForm.valid) this.createPartition()
      } , 200)
    },

    async createPartition(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/home/section/slider/partition/update/${this.objectSection.id}`
      formData.append('homepage_section_id' , this.$route.params.sectionId)
      formData.append('label' , this.$refs.AddSectionForm.form.title)
      formData.append('priority' , this.$refs.AddSectionForm.form.priority)
      formData.append('slider_id' , this.slider.id)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.close()
      }
      else{
        this.loading=false
      }
    },
    close(){
      const form = {
        dialog :false,
        object : ''
      }
      this.$store.commit('set_homePageSectionForSliderModal' , form)
    }
  },

  computed:{
    dialog(){
      return this.$store.getters['get_homePageSectionForSliderModal']
    },
    objectSection(){
      return this.$store.getters['get_homePageSectionForSliderObject']
    }
  }
}
</script>