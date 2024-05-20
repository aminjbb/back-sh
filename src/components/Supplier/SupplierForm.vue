<template>
<v-form
    ref="addForm"
    class="create-product__info-form scroller"
    v-model="valid">
    <v-row justify="center" align="center">
        <v-col cols="12">
            <div class="text-center">
                <span class="t14500" v-if="supplier">ویرایش تامین‌کننده</span>
                <span class="t14500" v-else>افزودن تامین‌کننده</span>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    نام و نام خانوادگی
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="نام و نام خانوادگی تامین‌کننده را وارد نمایید"
                :rules="persianRule"
                v-model="form.fullName" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    نام فروشگاه
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="نام فروشگاه تامین‌کننده را وارد نمایید "
                :rules="persianRule"
                v-model="form.shopName" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    نوع تامین‌کننده
                </span>
            </div>
            <v-select
                :items="supplierTypes"
                density="compact"
                variant="outlined"
                single-line
                :rules="rule"
                v-model="form.type" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    ایمیل
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="برای مثال : suppier@gmail.com"
                :rules="emailRule"
                v-model="form.email" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    استان
                </span>
            </div>
            <v-autocomplete
                :items="provinceList"
                density="compact"
                variant="outlined"
                single-line
                :rules="rule"
                v-model="form.province"
                @update:modelValue="getCities()" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    شهر
                </span>
            </div>
            <v-autocomplete
                :items="cityList"
                density="compact"
                variant="outlined"
                single-line
                :rules="rule"
                v-model="form.city" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    تلفن ثابت
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="برای مثال : ۷۷۷۷۷۷۷۷-۰۲۱"
                :rules="rule"
                v-model="form.phoneNumber" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    تلفن همراه
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="برای مثال : ۰۹۱۲۱۱۱۱۱۱۱"
                :rules="rule"
                v-model="form.mobileNumber" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    شماره حساب
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="حداکثر ۱۸ رقم"
                :rules="rule"
                v-model="form.accountNumber" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    شماره شبا
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="عدد ۲۴ رقمی"
                :rules="shebaRule"
                v-model="form.shebaNumber">
                <template v-slot:prepend-inner>
                    <div style="border-right: 1px solid #EEE;
    padding-right: 10px;     height: 100%;" class="d-flex justify-center align-center">
                        <span class="text-gray500">IR</span>
                    </div>
                </template>
            </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    نوع پرداخت
                </span>
            </div>
            <v-select
                :items="paymentTypes"
                density="compact"
                variant="outlined"
                single-line
                :rules="rule"
                v-model="form.paymentType" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500">
                    بازه پرداخت (روز)
                </span>
            </div>
            <v-text-field
                density="compact"
                type="number"
                variant="outlined"
                single-line
                :rules="rule"
                v-model="form.paymentPeriod" />
        </v-col>

    </v-row>
</v-form>
</template>

<script>
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";

import {
    AxiosCall
} from "@/assets/js/axios_call";
export default {

    props: {
        supplier: null
    },
    components: {
        datePicker: VuePersianDatetimePicker,
    },

    data() {
        return {
            paymentTypes: [{
                    title: 'نقدی',
                    value: 'cash'
                },
                {
                    title: 'اعتباری',
                    value: 'credit'
                },
                {
                    title: 'امانی',
                    value: 'safekeeping'
                },

            ],
            supplierTypes: [{
                    title: 'حقیقی',
                    value: 'legal'
                },
                {
                    title: 'حقوقی',
                    value: 'genuine'
                },

            ],
            provinces: [],
            cities: [],
            form: {
                fullName: '',
                shopName: '',
                type: '',
                email: '',
                province: '',
                city: '',
                phoneNumber: '',
                mobileNumber: '',
                accountNumber: '',
                shebaNumber: '',
                paymentType: '',
                paymentPeriod: '',
            },
            rule: [v => !!v || 'این فیلد الزامی است'],
            valid: false,
            persianRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
                "فقط حروف فارسی ",
            ],

            emailRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    v
                ) || " ایمیل معتبر نیست",
            ],
            shebaRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^[0-9]{24}$/.test(
                    v
                ) || "شماره شبا معتبر وارد کنید",
            ],
        }
    },
    methods: {
        /**
         * Get image id
         * @param {*} url
         */
        getAvatar(url) {
            this.form.avatar = url
        },

        /**
         * Set from
         */
        setForm() {
            try {

                this.form.fullName = this.supplier.full_name
                this.form.shopName = this.supplier.shopping_name
                this.form.type = this.supplier.type
                this.form.province = this.supplier.state_id
                this.form.email = this.supplier.email
                this.getCities()
                this.form.city = this.supplier.city_id
                this.form.phoneNumber = this.supplier.phone
                this.form.mobileNumber = this.supplier.phone_number
                this.form.accountNumber = this.supplier.account_number
                this.form.shebaNumber = this.supplier.sheba_number
                this.form.paymentPeriod = this.supplier.payment_period
                this.form.paymentType = this.supplier.payment_type
            } catch (error) {}
        },

        async getProvince() {
            const form = {
                per_page: 10000
            }
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.form = form
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `system/state/crud/index`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.provinces = data.data.data
            }
        },
        async getCities() {
            this.cities = []
            this.form.city = null
            const form = {
                per_page: 10000
            }
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.form = form
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `system/state/crud/get/${this.form.province}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.cities = data.data.cities
            }
        },
    },
    watch: {
        supplier(val) {
            this.setForm()
        }
    },
    computed: {
        cityList() {
            try {
                let cityList = []
                this.cities.forEach(city => {
                    const form = {
                        title: city.label,
                        value: city.id
                    }
                    cityList.push(form)
                })
                return cityList
            } catch (e) {
                return []
            }
        },
        provinceList() {
            try {
                let provinceList = []
                this.provinces.forEach(province => {
                    const form = {
                        title: province.label,
                        value: province.id
                    }
                    provinceList.push(form)
                })
                return provinceList
            } catch (e) {
                return []
            }
        }
    },
    mounted() {
        this.getProvince()
    }
}
</script>
