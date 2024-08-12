<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="h-100vh">
        <v-card class="ma-5 br--12 pa-10 position__relative" min-height="600">
          <RolePermissionForm ref="RolePermissionForm" />

          <v-row justify="end" class="position__absolute bottom left">
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن
            </v-btn>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5">
              <template v-slot:prepend>
                <v-icon>mdi-cancel</v-icon>
              </template>
              انصراف
            </v-btn>
          </v-row>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>


<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))


import RolePermissionForm from "@/components/Admin/RolePermission/RolePermissionForm.vue";
import {
  AxiosCall
} from "@/assets/js/axios_call";

export default {
  data() {
    return {
      loading: false,
    }
  },

  components: {
    RolePermissionForm,
    DashboardLayout,
    Header
  },

  methods: {
    validate() {
      this.$refs.RolePermissionForm.$refs.addRole.validate()
      setTimeout(() => {
        if (this.$refs.RolePermissionForm.valid) this.createRole()
      }, 200)
    },

    async createRole() {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'role/crud/create'
      formData.append('name', this.$refs.RolePermissionForm.form.name)
      formData.append('label', this.$refs.RolePermissionForm.form.lable)

      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.assignPermission(data.data.id)
      } else {
        this.loading = false
      }
    },

    async assignPermission(id) {
      this.loading = true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `role/crud/assign/permissions/${id}`
      this.$refs.RolePermissionForm.form.permissions.forEach((permission, index) => {
        formData.append(`permission_ids[${index}]`, permission)
      })
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/role-permission/index')

      } else {
        this.loading = false
      }
    },
  },

  computed: {
    avatar() {
      return this.$store.getters['get_avatar']
    }
  },
}
</script>
