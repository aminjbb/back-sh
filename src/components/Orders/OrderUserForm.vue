<template>
  <v-form  class="create-product__info-form scroller" ref="editUser" v-model="valid">
    <v-row
        justify="center"
        align="center"
        class="px-15">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                    <span class="t14500">
                        نام و نام خانوادگی <span class="text-red">*</span>
                    </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            label="نام و نام خانوادگی"
            v-model="form.user_name"
            :rules="persianRule" />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                    <span class="t14500">
                        استان <span class="text-red">*</span>
                    </span>
        </div>
        <v-autocomplete
            :items="provinceList"
            density="compact"
            variant="outlined"
            label="استان"
            single-line
            :rules="rule"
            v-model="form.province"
            @update:modelValue="getCities()" />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                    <span class="t14500">
                        شهر <span class="text-red">*</span>
                    </span>
        </div>
        <v-autocomplete
            :items="cityList"
            density="compact"
            variant="outlined"
            label="شهر"
            single-line
            :rules="rule"
            v-model="form.city" />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                    <span class="t14500">
                        تلفن <span class="text-red">*</span>
                    </span>
        </div>
        <v-text-field
            type="number"
            density="compact"
            variant="outlined"
            single-line
            label="تلفن"
            v-model="form.phone"
            :rules="rule" />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                    <span class="t14500">
                        موبایل <span class="text-red">*</span>
                    </span>
        </div>
        <v-text-field
            type="number"
            density="compact"
            variant="outlined"
            single-line
            label="موبایل"
            v-model="form.mobile"
            :rules="mobileRule" />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                    <span class="t14500">
                        کد پستی <span class="text-red">*</span>
                    </span>
        </div>
        <v-text-field
            type="number"
            density="compact"
            variant="outlined"
            single-line
            label="کد پستی"
            v-model="form.postal_code"
            :rules="rule" />
      </v-col>
      <v-col cols="12">
        <div class="text-right my-5">
                    <span class="t14500">
                        آدرس <span class="text-red">*</span>
                    </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            label="آدرس"
            v-model="form.address"
            :rules="persianRule" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {
    AxiosCall
} from "@/assets/js/axios_call";
export default {
    props: {
        orderDetail: {},
    },

    data() {
        return {
            valid: true,
            provinces: [],
            cities: [],
            form: {
                user_name: null,
                province: null,
                city: null,
                phone: null,
                mobile: null,
                postal_code: null,
                address: null,
            },

            rule: [v => !!v || 'این فیلد الزامی است'],
            persianRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأء۰۱۲۳۴۵۶۷۸۹0-9\s]+$/.test(v) ||
                "فقط حروف فارسی ",
            ],
            mobileRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                    v
                ) || "شماره موبایل معتبر نیست",
            ],
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
        },
    },

    methods: {
        /**
         * Set form
         */
        setForm() {
            try {
                this.form.user_name = this.orderDetail.receiver_name
                this.form.province = this.orderDetail.state?.id
                this.getCities()
                this.form.city = this.orderDetail.city?.id
                this.form.phone = this.orderDetail.receiver_phone
                this.form.mobile = this.orderDetail.receiver_mobile
                this.form.postal_code = this.orderDetail.receiver_postal_code
                this.form.address = this.orderDetail.receiver_address
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

    mounted() {
        this.getProvince()
    },

    watch: {
      orderDetail() {
            this.setForm()
        }
    }
}
</script>

