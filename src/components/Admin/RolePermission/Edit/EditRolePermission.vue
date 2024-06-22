<template>
<div class="vh-100 ">
    <v-card class="ma-5 br-12 pa-10 h-100  scroller">
        <RolePermissionForm ref="RolePermissionForm" :role="rolePermission" />
        <v-card-actions>
        <v-row justify="end" >
          <v-btn
              :loading="loading"
              @click="validate()"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            <template v-slot:prepend>
              <v-icon>mdi-pen</v-icon>
            </template>
            ویرایش
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
      </v-card-actions>
    </v-card>
</div>
</template>

<script>
import RolePermissionForm from "@/components/Admin/RolePermission/RolePermissionForm.vue";
import {
    AxiosCall
} from "@/assets/js/axios_call";
import RolePermission from '@/composables/RolePermission'
export default {
    setup() {
        const {
            getRolePermission,
            rolePermission,
        } = new RolePermission()
        return {
            getRolePermission,
            rolePermission,
        }
    },

    data() {
        return {
            loading: false,
        }
    },

    components: {
        RolePermissionForm
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
            AxiosMethod.end_point = `role/crud/update/${this.$route.params.roleId}`
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

    mounted() {
        this.getRolePermission()
    }
}
</script>
