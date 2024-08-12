<template>
<div class="mh-100">
    <v-card class="ma-5 br--12 pa-10 position__relative" min-height="600">
        <SliderForm ref="SliderForm" />

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
</template>

<script>
import SliderForm from '@/components/PageSliders/SliderForm.vue'

import {
    openToast
} from "@/assets/js/functions";
import {
    AxiosCall
} from '@/assets/js/axios_call.js'

export default {
    components: {
        SliderForm
    },

    data() {
        return {
            loading: false,
        }
    },

    methods: {
        /**
         * validate Form
         */
        validate() {
            this.$refs.SliderForm.$refs.addSlider.validate()
            if (this.$refs.SliderForm.valid) {
                this.submitForm()
            }
        },

        /**
         * Submit form
         */
        async submitForm() {
            this.loading = true
            var formdata = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `page/slider/crud/create/?page_id=${this.$route.params.pageId}`
            AxiosMethod.form = formdata
            formdata.append('name', this.$refs.SliderForm.form.name)
            formdata.append('label', this.$refs.SliderForm.form.label)
            formdata.append('position', this.$refs.SliderForm.form.position)
            formdata.append('icon', this.$refs.SliderForm.form.icon)

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false;
                openToast(
                    this.$store,
                    'اسلایدر با موفقیت ساخته شد',
                    "success"
                );
                this.$router.push(`/page/${this.$route.params.pageId}/sliders/index`)

            } else {
                this.loading = false;
                openToast(
                    this.$store,
                   'فرآیند ساخت با مشکل مواجه شد.',
                    "error"
                );
            }
        }
    }
}
</script>
