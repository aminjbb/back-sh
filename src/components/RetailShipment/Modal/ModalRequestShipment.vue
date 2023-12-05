<template>
  <div class="text-right">

    <v-dialog
        v-model="dialog"
        width="468"
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
                           درخواست ارسال
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center px-5" >
          <v-row justify="center" align="center">
            <v-col cols="11">
              <div class="text-right my-5">
                <span class="t14500">
                   انبار
                  <span class="text-error">
                    *
                  </span>
                </span>
              </div>
              <v-autocomplete
                  variant="outlined"
                  single-line
                  v-model="warehouse"
                  :items="warehouseData"
                  item-title="name"
                  item-value="id"
                  v-debounce:1s.unlock="searchWarehouse"

              />
            </v-col>
            <v-col cols="12">
             <div class="d-flex justify-center d--rtl">
               <div class=" navbar navbar__scroller"  @click="getnavbarItem()">
                <div class=" d-flex justify-start" id="navbarItems">
                  <v-card @click="setWorkDay(day)" v-for="(day , index) in  workDays" height="76" min-width="92" elevation="0" class="mx-3 br--8"
                  :class="workDaysClass(day)">
                   <div class="text-center mt-2">
                    <span >
                       {{day.day}}
                    </span>
                   </div>
                    <div class="text-center mt-2">
                        <span >
                            {{convertDateToJalai(day.date , '-' , false)}}
                        </span>
                    </div>
                  </v-card>

                </div>
               </div>
             </div>
            </v-col>
          </v-row>
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
import BlogForm from '@/components/HomePage/Forms/BlogForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import Warehouse from "@/composables/Warehouse"
import {convertDateToJalai} from "@/assets/js/functions";
export  default {
  setup(){
      const {getWarehouseList ,  warehouseList} = new Warehouse()
      return {getWarehouseList ,  warehouseList}
  },
  components:{
    UploadFileSection

  },
  data(){
    return{
      warehouse:null,
      workDays:[],
      workDay:null
    }
  },

  methods:{
    setWorkDay(workday){
      if (workday.storage > 0) this.workDay = workday.date
    },
    workDaysClass(workday){
      if (workday.date === this.workDay){
        return 'retailShipment--work-days-card__active'
      }
      else if (workday.storage === 0){
        return 'retailShipment--work-days-card__disable'
      }
      else {
        return 'retailShipment--work-days-card__free'
      }
    },
    convertDateToJalai,
    getnavbarItem(){
      console.log(document.getElementById('navbarItems').offsetWidth)
    },
    close(){
      const form = {
        dialog :false,
        object : ''
      }
      this.$store.commit('set_modalRequestShipment' , form)
    },
    validate(){
      this.$refs.BlogForm.$refs.addForm.validate()
      setTimeout(()=>{
        if (this.$refs.BlogForm.valid) this.createBlog()
      } , 200)
    },
    searchWarehouse(e){
      const filter = {
        name: e
      }
      this.getWarehouseList(filter)
    },
    async createBlog(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `page/home/section/banner/update/${this.blogObject.id}`
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
        this.close()
      }
      else{
        this.loading=false
      }
    },
    async updateWorkDay(){
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `warehouse/check/retail/storage/${this.warehouse}`
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.loading=false
        this.workDays = data.data
      }
      else{
        this.loading=false
      }
    }
  },

  computed:{
    dialog(){
      return this.$store.getters['get_modalRequestShipment']
    },
    retailObject(){
      return this.$store.getters['get_modalRequestShipmentObject']
    },
    warehouseData(){
      try {
        return this.warehouseList.data
      }
      catch (e) {
        return []
      }
    }
  },

  watch:{
    warehouse(val){
      this.updateWorkDay()
    }
  }
}
</script>

<style>



</style>