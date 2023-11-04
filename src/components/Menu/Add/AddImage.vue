<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card
        class="ma-5 br-12 pb-15 flex-grow-1"
        min-height="500"
    >
      <div class="text-center py-5">
          <span class="t14500">
            افزودن تصویر
          </span>
      </div>
      <v-form ref="addImageMenu" v-model="valid" class="create-with-title__info-form scroller">
        <v-col cols="12" md="12">
          <div class="text-right my-5">
                      <span class="t14500">
                        بنر پروموشن
                      </span>
          </div>
          <UploadFileSection @getImage="getImage"/>
          <div class="d-flex align-center mt-5" v-if="image">
            <span>IMG-{{image}}</span>
            <span class="mr-15" ><v-icon @click="removeItem(image)" color="error">mdi-delete</v-icon></span>
          </div>
        </v-col>
        <v-col cols="12" md="12">
          <div class="text-right my-5">
                      <span class="t14500">
                        URL تصویر  <span class="text-error">*</span>
                      </span>
          </div>
          <v-text-field
              density="compact"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="imageUrl"
          />
        </v-col>
      </v-form>
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
import MenuForm from "@/components/Menu/MenuForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import Menu from "@/composables/Menu"
import UploadFileSection from "@/components/Public/UploadFileSection.vue";
import {openConfirm , openToast} from "@/assets/js/functions";

export default {
  setup(){
    const {menu , getMenu}  = new Menu()
    return {menu , getMenu}
  },
  data() {
    return {
      loading: false,
      valid:false,
      image:null,
      imageUrl:null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      imageId:null
    }
  },
  components: {UploadFileSection, MenuForm},
  methods:{
    removeItem(id) {
      this.imageId = id;
      openConfirm(this.$store, "آیا از حذف آیتم مطمئن هستید؟", "حذف آیتم", "delete", 'file-manager/direct/delete/image/' + id, true)
    },
    getImage(image){
      this.image = image.data.data.image_id
    },
    validate(){
      if (this.image){
        this.$refs.addImageMenu.validate()
        setTimeout(()=>{
          if (this.valid) this.addImage()
        } , 200)
      }
      else {
        openToast(this.$store , 'حتما باید عکس اضافه کنید' , 'error')
      }

    },

    async addImage(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `system/menu/crud/update/${this.$route.params.menuId}`
      formData.append('image_id' , this.image)
      formData.append('image_url' , this.imageUrl)
      formData.append('has_chevron' , this.menu.has_chevron)
      formData.append('is_active' , this.menu.is_active)
      formData.append('label' , this.menu.label)
      formData.append('name' , this.menu.name)
      formData.append('position' , this.menu.position)
      formData.append('priority' , this.menu.priority)
      formData.append('type' , this.menu.type)
      formData.append('url' , this.menu.url)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.$router.push('/menu/index')

      }
      else{
        this.loading=false
      }
    }
  },
  mounted() {
    this.getMenu()
  },
  computed:{
    confirmModal(){
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },
  watch:{
    confirmModal(val){
      if (!val) {
        if (localStorage.getItem('deleteObject') === 'done') {
          this.image = null
          localStorage.removeItem('deleteObject')
        }
      }
    },
    menu(val){
      this.image = val.image_id
      this.imageUrl = val.image_url

    }
  }
}
</script>