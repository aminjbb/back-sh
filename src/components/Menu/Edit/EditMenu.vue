<template>
  <div class="create-product flex-column d-flex vh-100">
    <v-card
        class="ma-5 br-12 pb-15 flex-grow-1"
        min-height="500"
    >
      <div class="text-center py-5">
          <span class="t14 w500">
            ویرایش آیتم منو
          </span>
      </div>
      <v-divider></v-divider>
      <MenuForm
          :menu="menu"
          ref="MenuForm"
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
import MenuForm from "@/components/Menu/MenuForm.vue";
import {AxiosCall} from "@/assets/js/axios_call";
import Menu from "@/composables/Menu"

export default {
  setup(){
    const {menu , getMenu}  = new Menu()
    return {menu , getMenu}
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {MenuForm},
  methods:{
    validate(){
      this.$refs.MenuForm.$refs.createMenu.validate()
      setTimeout(()=>{
        if (this.$refs.MenuForm.valid) this.createMenu()
      } , 200)
    },

    async createMenu(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `system/menu/crud/update/${this.$route.params.menuId}`
      formData.append('name' , this.$refs.MenuForm.form.name)
      formData.append('label' , this.$refs.MenuForm.form.lable)
      formData.append('url' , this.$refs.MenuForm.form.url)
      formData.append('icon' , this.$refs.MenuForm.form.icon)
      formData.append('priority' , this.$refs.MenuForm.form.priority)
      if (this.$refs.MenuForm.form.menu != 'none') formData.append('menu_id' , this.$refs.MenuForm.form.menu)
      if ( this.$refs.MenuForm.form.flashIcon === 'none' ) formData.append('has_chevron' , 0)
      else formData.append('has_chevron' , 1)
      formData.append('type' , this.$refs.MenuForm.form.deviceType)
      formData.append('position' , this.$refs.MenuForm.form.position)
      formData.append('is_active' , this.menu.is_active)

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
  }
}
</script>