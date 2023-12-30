<template lang="">
<div class="h-100 d-flex flex-column align-stretch">
    <v-card class="ma-5 br-12 flex-grow-1 mt-0" style="padding-bottom:80px">
        <header class="modal__header d-flex justify-center align-center pt-2">
            <span class="t16400 pa-4">
                ویرایش اطلاعات مشتری
            </span>
        </header>

        <div class="mt-2 mb-2">
            <v-divider class="grey"/>
        </div>

        <OrderUserForm
            style="padding: 20px 10%"
            ref="OrderUserForm"
            type="edit"
            :user="user" />

        <v-row justify="end" class="position__absolute bottom left px-3">
            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 ml-5">
                انصراف
            </v-btn>

            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
                تایید
            </v-btn>
        </v-row>
    </v-card>
</div>
</template>

<script>
//component
import OrderUserForm from '@/components/Orders/OrderUserForm.vue'

//mixins
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {
    components: {
        OrderUserForm
    },

    data() {
        return {
            loading: false,
            user: ''
        }
    },

    methods: {
        /**
         * validate form
         */
        validate() {
            this.$refs.OrderUserForm.$refs.editUser.validate()
            if (this.$refs.OrderUserForm.valid) {
                this.submitForm()
            }
        },

        /**
         * Submit from
         */
        async submitForm() {
            this.loading = true
            var formdata = new FormData();

            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'order/user/crud/update/' + this.$route.params.id
            AxiosMethod.form = formdata
            formdata.append('user', this.$refs.OrderUserForm.form.user_name)
            formdata.append('province', this.$refs.OrderUserForm.form.province)
            formdata.append(`city`, this.$refs.OrderUserForm.form.city)
            formdata.append('phone', this.$refs.OrderUserForm.form.phone)
            formdata.append('mobile', this.$refs.OrderUserForm.form.mobile)
            formdata.append('postal_code', this.$refs.OrderUserForm.form.postal_code)
            formdata.append('address', this.$refs.OrderUserForm.form.address)

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/orders/index')
            } else {
                this.loading = false
            }
        },

        /**
         * Get brans
         */
        async getUser() {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = 'user/crud/get/' + this.$route.params.id
            AxiosMethod.toast_error = true
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.user = data.data
            }

        }
    },

    mounted() {
        this.getUser()
    }
}
</script>

<style lang="">
    
</style>
