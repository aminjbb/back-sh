<template >
    <div>
        <v-form 
            v-model="valid"
            ref="forgotPassword"
        >
            <div class="text-center">
                <img src="@/assets/img/shavaz-logo.png" class="mb-5"  alt="shavaz image">

               <div class="mt-6">
                   <div class="text-right mb-2 pr-1">
                       <span class="t12 w300">
                         رمز عبور جدید را وارد کنید.
                       </span>
                   </div>

                   <v-text-field
                        :rules="rule"
                        class="" 
                        variant="outlined"
                        :type="password1"
                        hint="رمز عبور باید شامل (۸ کاراکتر- حروف خاص - عدد و حروف بزرگ و کوچک باشد.)"
                        persistent-hint
                        v-model="password"
                    >
                        <template v-slot:prepend-inner>
                            <v-btn
                                min-width="10"
                                small
                                variant="icon"
                            >
                                <img 
                                    src="@/assets/img/Eye.svg"
                                    alt="shavaz image"
                                >
                            </v-btn>
                        </template>
                    </v-text-field>
               </div>

               <div class="mt-6">
                   <div class="text-right mb-2 pr-1">
                       <span class="t12 w300">
                         رمز عبور جدید را مجدد وارد کنید.
                       </span>
                   </div>

                   <v-text-field
                        :rules="confirmPasswordRules"
                        class=""
                        variant="outlined"
                        :type="password2"
                        v-model="repPassword"
                    >
                        <template v-slot:prepend-inner>
                            <v-btn
                                min-width="10"
                                small
                                variant="icon"
                            >
                                <img src="@/assets/img/Eye.svg" alt="shavaz image">
                            </v-btn>
                        </template>
                    </v-text-field>
               </div>

               <div class="mt-6">
                    <div class="text-right mb-2 pr-1">
                        <span class="t12 w300">
                            کد ارسال شده به شماره {{userPhone}} را وارد کنید
                        </span>
                    </div>
                    
                    <v-text-field
                        :rules="rule"
                        variant="outlined"
                        class="text-center"
                        v-model="code"
                    />
                    <div class="text-center">
                        <v-btn 
                            @click="submitOtpCode()"
                            :loading="otpLoading"
                            :disabled="counter > 0"
                            variant="text"
                        >
                            <span class="text-gray500 t14300" v-if="counter > 0">
                                {{counter}} ثانیه مانده تا دریافت مجدد کد
                            </span>

                            <span class="text-primary500 t14300" v-else>
                                دریافت مجدد کد
                            </span>
                        </v-btn>
                    </div>
                </div>

                <div class="mt-10">
                    <v-btn 
                        :loading="loading"
                        :disabled="!valid"
                        color="primary500"
                        block rounded="xl"
                        @click="validate()"
                    > 
                        <span class="t12 w300" >
                            تایید رمز عبور جدید
                        </span>
                    </v-btn>
                </div>
            </div>
        </v-form>
    </div>
</template>
<script>
//Mixin
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
    props: {
        changeOtpSection: { type: Function },
        loginStepTrue: { type: Function },
        otpSectionTrue: { type: Function }
    },

    data() {
        return {
            otpLoading:false,
            counter: 120,
            loading: false,
            rule: [v => !!v || "این فیلد الزامی است"],
            confirmPasswordRules: [
                (value) => !!value || "این فیلد الزامی است",
                (value) => value === this.password || "تکرار رمز صحیح نیست. لطفا مجدد رمز خود را وارد کنید.",
            ],
            valid: false,
            password1: 'password',
            password2: 'password',
            password: '',
            repPassword: '',
            code: ''
        }
    },

    methods: {
        /**
         * Validate from
         */
        validate() {
            this.$refs.forgotPassword.validate()
            setTimeout(() => {
                if (this.valid) this.resetPassword()
            }, 200);
        },

        /**
         * Reset password
         */
        async resetPassword() {
            this.loading = true
            var formdata = new FormData();
            formdata.append('phone_number', this.userPhone)
            formdata.append('password_confirmation', this.repPassword)
            formdata.append('password', this.password)
            formdata.append('code', this.code)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'auth/admin/reset-password'
            AxiosMethod.form = formdata
            AxiosMethod.store = this.$store
            AxiosMethod.toast_success = true
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.loginStepTrue()
                this.otpSectionTrue()
            }
            else {
                this.loading = false
            }
        },

        /**
         * Submit Otp 
         */
        async submitOtpCode( ) {
            this.otpLoading=true
            var formdata = new FormData();
            formdata.append('phone_number', this.userPhone)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'auth/admin/forgot-password'
            AxiosMethod.form = formdata
            AxiosMethod.store = this.$store
            AxiosMethod.toast_success = true
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.otpLoading=false
                this.$cookies.set('userPhone',data.data);
            }
            else{
                this.otpLoading=false
            }
        },

        /**
         * Count down
         */
        countDown() {
            setTimeout(() => {
                if (this.counter != 0) {
                    --this.counter
                    this.countDown()
                }
            }, 1000);
        }
    },

    computed: {
        userPhone() {
            return this.$cookies.get('userPhone')
        }
    },

    mounted() {
        this.countDown()
    }   
}   
</script>
