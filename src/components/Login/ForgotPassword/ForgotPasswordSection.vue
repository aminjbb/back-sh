<template >
    <div>
        <v-row 
            justify="center"
            align="center"
        >
            <div class="container-400"> 
                <OtpSection 
                    v-if="otpSection"
                    :gotoLogin="gotoLogin"
                    :forgotPassword="forgotPassword"
                    :changeOtpSection="changeOtpSection"
                />
                <ForgotPasswordForm
                    v-else
                    :otpSectionTrue="otpSectionTrue"
                    :loginStepTrue="loginStepTrue"
                    :changeOtpSection="changeOtpSection"
                />
            </div>
        </v-row>
    </div>
</template>

<script>
//Components
import OtpSection from "@/components/Login/ForgotPassword/OtpSection.vue";
import ForgotPasswordForm from "@/components/Login/ForgotPassword/ForgotPasswordForm.vue";

export default {
    props: {
        forgotPassword: { type: Function },
        changeOtpSection: { type: Function },
        loginStepTrue: { type: Function },
        otpSectionTrue: { type: Function },
        gotoLogin: { type: Function },
        otpSection:true,
        
    },

    components:{
        OtpSection,
        ForgotPasswordForm
    },

    data() {
        return {
            rule: [v => !!v || "این فیلد الزامی است"],
            valid: false,
            password1: 'password',
            password2: 'password',
          
        }
    },
}
</script>
