<template>
  <div class="text-right ">

    <v-dialog
        v-model="dialog"
        width="1060"

    >
      <v-card class="">

        <div class="text-center px-5" >
          <v-card class="d-flex justify-center align-center px-10 ma-5"  height="82">
            <div class="mx-10" >
                <span class="t14500">
                     تاریخ ارسال :
                </span>
                <span  class="t13400 text-gray500">
                  ۱۴۰۲/۰۵/۱۵
                </span>
              </div>
            <div class="mx-10" >
                <span class="t14500">
                     شناسه محموله :
                </span>
                <span  class="t13400 text-gray500">
                  123456
                </span>
              </div>
            <div class="mx-10" >
                <span class="t14500">
                     تامین کننده :
                </span>
                <span  class="t13400 text-gray500">
                  زیبارویان نفیس
                </span>
              </div>
            <div class="mx-10" >
                <span class="t14500">
                     شناسه فاکتور :
                </span>
                <span  class="t13400 text-gray500">
                  123456
                </span>
            </div>
          </v-card>
          <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch d--rtl" height="580">
            <Table
                class="flex-grow-1"
                :header="headerShps"
                :items="[]"
                editUrl="/seller/edit/"
                activePath="seller/crud/update/activation/"
                deletePath="seller/crud/update/activation/"
                changeStatusUrl="seller/crud/update/contract/"
                :updateSkuUrl="`page/home/section/slider/${$route.params.specialId}/sku/attach`"
                :loading="loading"
                @updateList="updateList"
                updateUrl="seller/csv/mass-update"
                model="sku" />

            <v-divider />


          </v-card>
        </div>

<!--        <div class="mt-3 mb-8 px-5">-->
<!--          <v-divider />-->
<!--        </div>-->

<!--        <div class="d-flex justify-space-between pb-5 px-10">-->
<!--          <v-btn-->
<!--              width="80"-->
<!--              @click="validate()"-->
<!--              color="primary500"-->
<!--              height="40"-->
<!--              rounded-->
<!--              class="px-8 mt-1">-->
<!--            تایید-->
<!--          </v-btn>-->
<!--          <v-btn-->
<!--              @click="close()"-->
<!--              variant="text"-->
<!--              height="40"-->
<!--              rounded-->
<!--              class="px-5 mt-1"-->
<!--          >-->

<!--            انصراف-->
<!--          </v-btn>-->

<!--        </div>-->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BlogForm from '@/components/HomePage/Forms/BlogForm.vue'
import {AxiosCall} from "@/assets/js/axios_call";
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import RetailShipment from "@/composables/RetailShipment";
import Table from "@/components/RetailShipment/Table/RetailShipmentDetailShipmentShps.vue";
export  default {
  setup(){
    const {
      retailShipments, dataTableLength, page, header, loading ,headerShps
    } = RetailShipment();

    return {
      retailShipments, dataTableLength, page, header, loading ,headerShps
    };
  },
  components:{
    Table,
    UploadFileSection

  },
  data(){
    return{
    }
  },

  methods:{
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
    }
  },

  computed:{
    dialog(){
      return this.$store.getters['get_modalRetailShipmentDetail']
    },
    retailObject(){
      return this.$store.getters['get_modalRetailShipmentDetailObject']
    },
    warehouseData(){
      try {
        return this.warehouseList.data
      }
      catch (e) {
        return []
      }
    }
  }
}
</script>

<style>



</style>