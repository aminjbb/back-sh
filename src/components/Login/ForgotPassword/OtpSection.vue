<template>
    <div>
        <v-form ref="otp" v-model="valid" > 
            <div class="text-center">
                <img 
                    src="@/assets/img/shavaz-logo.png"
                    class="mb-5"
                    alt="shavaz image"
                >

                <div class="mt-6">
                    <div class="text-right mb-2 pr-1">
                        <span class="t12300">
                            لطفا شماره همراه خود را وارد کنید.
                        </span>
                    </div>

                    <v-text-field
                        :rules="mobileRule"
                        variant="outlined"
                        v-model="mobile"
                        type="text"
                        placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    />
               </div>
        
               <div class="mt-10">
                   <v-btn
                        :loading="loading"
                        :disabled="!valid"
                        color="primary500"
                        block
                        rounded="xl"
                        @click="validate()"
                    > 
                       <span class="t12300" >
                            مرحله بعد
                       </span>
                   </v-btn>
               </div>

               <div class="mt-3 text-right container-400">
                    <v-btn
                        @click="gotoLogin"
                        variant="text"
                    > 
                        <span class="t12300 text-primary500" >
                            بازگشت به صفحه ورود
                        </span>
                    </v-btn>
                </div>
            </div>
        </v-form>
    </div>
</template>

<script>
//Mixins
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
    props:{
        changeOtpSection:{type : Function},
        forgotPassword: { type: Function },
        gotoLogin: { type: Function }

    },

    data() {
        return {
            mobile:'',
            loading:false,
            valid:false,
            mobileRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                    /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                        v
                    ) || "شماره موبایل معتبر نیست",
            ],
        }
    },

    methods:{
        /**
         * Validate
         */
        validate(){
            this.$refs.otp.validate()
            setTimeout(() => {
                if(this.valid) this.submitOtpCode()
            }, 200);
        },

        /**
         * Submit Otp code
         */
        async submitOtpCode() {
            this.loading=true
            var formdata = new FormData();
            formdata.append('phone_number', this.mobile)
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'auth/admin/forgot-password'
            AxiosMethod.form = formdata
            AxiosMethod.store = this.$store
            AxiosMethod.toast_success = true
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading=false
                this.$cookies.set('userPhone',data.data);
                this.loginStep = !this.loginStep
                this.changeOtpSection()
            }
            else{
                this.loading=false
            }
        }
    }
}
</script>
