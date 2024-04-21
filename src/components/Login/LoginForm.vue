<template >
    <div>
        <v-row justify="center" align="center">
            <div class="container-400">
                <v-form
                    v-model="valid"
                    ref="login"
                    @submit.prevent="validate('/')"
                >
                    <div class="text-center">
                        <img src="@/assets/img/shavaz-logo.png" class="mb-5" alt="shavaz image">

                        <div class="mt-6">
                            <div class="text-right mb-2 pr-1">
                                <span class="t12300">
                                    لطفا شماره همراه خود را وارد کنید.
                                </span>
                            </div>

                            <v-text-field 
                                v-model="mobile"
                                :rules="mobileRule"
                                class=""
                                variant="outlined"
                                placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                            />
                        </div>

                        <div class="mt-6">
                            <div class="text-right mb-2 pr-1">
                                <span class="t12300">
                                    لطفا رمز عبور خود را وارد کنید.
                                </span>
                            </div>

                            <v-text-field 
                                v-model="password"
                                :rules="passwordRule"
                                class=""
                                variant="outlined"
                                :type="passwordType"
                                placeholder="***********"

                            >
                                <template v-slot:prepend-inner>
                                    <v-btn @click="changePasswordType()" min-width="10" small variant="icon">
                                        <img src="@/assets/img/Eye.svg" alt="shavaz image">
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </div>

                        <div class="mt-10">
                            <v-btn
                                :loading="loading"
                                color="primary500"
                                block rounded="xl"
                                @click="validate('/')"

                            >
                                <span class="t12300">
                                    ورود
                                </span>
                            </v-btn>

                          <v-btn
                              :loading="loading"
                              color="primary500"
                              block
                              rounded="xl"
                              @click="validate('/locating/dashboard')"
                              class="mt-5 d-md-none d-block"
                          >
                                <span class="t12300">
                                  ورود با هندهلد
                                </span>
                          </v-btn>
                        </div>

                        <div class="mt-3 text-right container-400">
                            <v-btn
                                :loading="otpLoading"
                                @click="forgotPassword"
                                variant="text"
                            >
                                <span class="t12300 text-primary500">
                                    رمز خود را فراموش کرده اید؟
                                </span>
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </div>
        </v-row>
    </div>
</template>
<script>
//Mixin
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
    props: {
        forgotPassword: { type: Function },
        otpLoading:false
    },

    data() {
        return {
            mobile:'',
            password:'',
            valid: true,
            passwordType: 'password',
            loading : false ,
            rule: [v => !!v || "این فیلد الزامی است"],
            mobileRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                    /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                        v
                    ) || "شماره موبایل معتبر نیست",
            ],
          passwordRule: [
            (v) => !!v || "این فیلد الزامی است",
            (v) => /^[a-zA-Z0-9-~!@#$%^&*()_+=><?/|.,}{]{6,}$/.test(v) || "گذر واژه معتبر نیست",
          ],
        }
    },

    methods: {
        /**
         * Change password type
         */
        changePasswordType() {
            if (this.passwordType == 'password') this.passwordType = 'text'
            else this.passwordType = 'password'
        },

        /**
         * Validate form
         */
        validate(to) {
            this.$refs.login.validate()
            setTimeout(() => {
                if (this.valid) this.submitForm(to)
            }, 200);
        },

        /**
         * Submit form
         */
        async submitForm(to) {
            this.loading=true
            var formdata = new FormData();
            formdata.append('phone_number', this.mobile)
            formdata.append('password', this.password)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'auth/admin/login'
            AxiosMethod.form = formdata
            AxiosMethod.store = this.$store
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading=false
                localStorage.setItem('fullName' ,data.data.admin.first_name + ' ' + data.data.admin.last_name)
                localStorage.setItem('userId' ,data.data.admin.id )
                this.$cookies.set('adminToken',data.data.token);
                this.$router.push(to)
                // this.$router.push()


            }
            else{
                this.loading=false
            }
        }
    },
}
</script>
