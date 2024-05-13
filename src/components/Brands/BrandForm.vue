<template>
<div>
    <v-form ref="addBrand" v-model="valid">
        <v-row
            justify="center"
            align="center"
            class="px-15">
            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t14500">
                        اسم انگلیسی
                    </span>
                </div>
                <v-text-field
                    :rules="englishRule"
                    density="compact"
                    variant="outlined"
                    single-line
                    label="اسم انگلیسی"
                    v-model="form.name" />
            </v-col>

            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t14500">
                        اسم فارسی
                    </span>
                </div>
                <v-text-field
                    :rules="persianRule"
                    density="compact"
                    variant="outlined"
                    single-line
                    label="اسم فارسی"
                    v-model="form.label" />
            </v-col>
        </v-row>
        <v-row
            justify="center"
            align="center"
            class="px-15">
            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t14500">
                        اولویت
                    </span>
                </div>
                <v-text-field
                    type="number"
                    density="compact"
                    variant="outlined"
                    single-line
                    label="اولویت"
                    v-model="form.priority"
                    :rules="rule" />
            </v-col>
            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t14500">
                        بارگزار تصویر
                    </span>
                </div>
                <UploadFileSection @getImage="getLogoImage" />
                <div class="d-flex align-center mt-5" v-if="form.image_id">
                    <span>IMG-{{ form.image_id }}</span>
                    <span class="mr-15 pointer" @click="removeItem(form.image_id)">
                        <v-icon color="error">mdi-delete</v-icon>
                    </span>
                </div>
            </v-col>
        </v-row>
    </v-form>
</div>
</template>

<script>
import UploadFileSection from '@/components/Public/UploadFileSection.vue'
import {
    openToast
} from '@/assets/js/functions'
import { AxiosCall } from '@/assets/js/axios_call.js'

export default {
    props: {
        type: '',
        brand: {},
    },

    components: {
        UploadFileSection
    },

    data() {
        return {
            valid: true,

            form: {
                name: '',
                label: '',
                active: 0,
                priority: 1,
                image_id: '',
            },

            rule: [v => !!v || 'این فیلد الزامی است'],
            persianRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
                "فقط حروف فارسی ",
            ],
            englishRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) => !RegExp("[\u0600-\u06FF]").test(v) || "فقط حروف انگلیسی ",
            ],

        }
    },

    methods: {
        getLogoImage(image) {
            this.form.image_id = image.data.data.image_id
        },

        /**
         * Set form
         */
        setForm() {
            try {
                this.form.name = this.brand.name
                this.form.label = this.brand.label
                this.form.priority = this.brand.priority
                this.form.active = this.brand.is_active
                this.form.image_id = this.brand.image_id
            } catch (error) {}
        },

        async removeItem(id) {
            this.loading = true

            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'file-manager/direct/delete/image/' + id

            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_delete()
            if (data) {
                this.form.image_id = '';
                openToast(
                    this.$store,
                    'تصویر با موفقیت حذف شد.',
                    "success"
                );
            } else {
                this.loading = false
                openToast(
                    this.$store,
                    'حذف با مشکل مواجه شد.',
                    "error"
                );
            }
        }

    },

    watch: {
        brand() {
            this.setForm()
        }
    }
}
</script>
