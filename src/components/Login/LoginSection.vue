<template >
    <div>
        <v-row 
            justify="center"
            align="center"
            class="pa-7"
        >
            <v-col cols="5" class="pa-0 d-none d-md-block">
                <v-card
                    color="primary500"
                    class="h-93vh rounded-16"
                >
                    <v-row
                        justify="center"
                        align="center"
                        class="h-93vh"
                    >
                        <img src="@/assets/img/login-logo.png" alt="shavaz image">
                    </v-row>
                </v-card>
            </v-col>

            <v-col cols="6" md="7" lass="pa-0">
                <LoginForm
                    v-if="loginStep"
                    ref="loginFormComponent"
                    :otpLoading="otpLoading"
                    :forgotPassword="forgotPassword"
                />

                <ForgotPasswordSection
                    v-else
                    :gotoLogin="gotoLogin"
                    :otpSectionTrue="otpSectionTrue"
                    :loginStepTrue="loginStepTrue"
                    :otpSection="otpSection"
                    :changeOtpSection="changeOtpSection"
                    :forgotPassword="forgotPassword"
                />
             </v-col>
        </v-row>
    </div>
</template>

<script>
//Components
import LoginForm from '@/components/Login/LoginForm.vue'
import ForgotPasswordSection from '@/components/Login/ForgotPassword/ForgotPasswordSection.vue'

//Mixins
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
    components: {
        LoginForm,
        ForgotPasswordSection
    },

    data() {
        return {
            loginStep: true,
            otpSection: true,
            otpLoading:false
        }
    },

    methods: {
        /**
         * Forgot password
         */
        forgotPassword() {
            if(this.$refs.loginFormComponent.mobile) this.submitOtpCode(this.$refs.loginFormComponent.mobile)
            else this.loginStep = !this.loginStep
        },

        /**
         * Go to login page
         */
        gotoLogin() {
             this.loginStep = true
        },

        /**
         * Set login step
         */
        loginStepTrue(){
            this.loginStep = true
        },

        /**
         * Change Otp status
         */
        changeOtpSection() {
            this.otpSection = !this.otpSection
        },

        /**
         * Submit Otp code
         * @param {*} mobile 
         */
        async submitOtpCode( mobile) {
            this.otpLoading=true
            var formdata = new FormData();
            formdata.append('phone_number', mobile)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'auth/admin/forgot-password'
            AxiosMethod.form = formdata
            AxiosMethod.store = this.$store
            AxiosMethod.toast_success = true
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.otpLoading=false
                this.$cookies.set('userPhone',data.data);
                this.loginStep = !this.loginStep
                this.changeOtpSection()
            }
            else{
                this.otpLoading=false
            }
        },

        /**
         * Otp section status
         */
        otpSectionTrue(){
            this.otpSection=true
        }
    }
}
</script>