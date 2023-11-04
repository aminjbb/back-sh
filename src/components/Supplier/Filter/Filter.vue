<template lang="">
<div class="text-center c-modal-table-filter">
    <v-btn
        @click="openModal()"
        variant="outlined"
        rounded
        class="px-3 mt-1 mr-4">
        <template v-slot:prepend>
            <img src="@/assets/img/Fillter.svg" alt="shavaz-img">
        </template>
        فیلتر
    </v-btn>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="1000">
        <v-card>
            <v-row
                justify="center"
                align="center"
                class="pa-5">
                <v-col cols="5">
                    <v-btn @click="closeModal()" variant="icon">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="7">
                    <div class="text-left pl-10">
                        <span class="t14300">
                            فیلتر
                        </span>
                    </div>
                </v-col>
            </v-row>

            <div class="mt-3 mb-8 px-5">
                <v-divider />
            </div>

            <div>
                <v-row
                    justify="center"
                    align="center"
                    class="px-10 d--rtl">
                    <template v-for="(filter, index) in filterField" :key="index">
                        <v-col v-if="filter.type === 'text'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                v-model="values[index].value" />
                        </v-col>

                        <v-col v-if="filter.type === 'number'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                v-if="filter.value == 'phone_number'"
                                variant="outlined"
                                :name="filter.value"
                                placeholder="برای مثال : ۰۹۱۲۱۱۱۱۱۱۱"
                                v-model="values[index].value" />

                            <v-text-field
                                v-if="filter.value == 'phone'"
                                variant="outlined"
                                :name="filter.value"
                                placeholder="برای مثال : ۷۷۷۷۷۷۷۷-۰۲۱"
                                v-model="values[index].value" />
                        </v-col>

                        <v-col v-else-if="filter.type === 'select'" cols="4">
                            <div class="t13300 text-right mb-1">{{filter.name}}</div>

                            <v-autocomplete
                                v-if="filter.value == 'state_id'"
                                :items="provinceList"
                                density="compact"
                                variant="outlined"
                                single-line
                                :rules="rule"
                                v-model="provinceModel"
                                @update:modelValue="getCities()" />

                            <v-autocomplete
                                v-if="filter.value == 'city_id'"
                                :items="cityList"
                                density="compact"
                                variant="outlined"
                                single-line
                                :rules="rule"
                                v-model="cityModel" />

                            <v-select
                                v-if="filter.value == 'type'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="supplierTypeFilter"
                                v-model="supplierTypeModel" />

                            <v-select
                                v-if="filter.value == 'payment_type'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="paymentTypeFilter"
                                v-model="paymentTypeModel" />
                        </v-col>
                    </template>
                </v-row>
            </div>

            <div class="mt-3 mb-5 px-5">
                <v-divider />
            </div>

            <v-row
                justify="center"
                align="center"
                class="px-5 py-5">
                <v-col cols="6">
                    <v-btn
                        @click="removeAllFilters()"
                        variant="text"
                        height="40"
                        rounded
                        class="px-5 mt-1 mr-5">
                        حذف همه فیلترها
                    </v-btn>
                </v-col>

                <v-col cols="6">
                    <div class="text-right">
                        <v-btn
                            @click="setFilter()"
                            color="primary500"
                            height="40"
                            rounded
                            class="px-5 mt-1 mr-5">
                            مشاهده
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { SupplierPanelFilter } from '@/assets/js/filter_supplier.js'
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    props: {
        filterField: [],
        path: ''
    },

    data() {
        return {
            dialog: false,
            active: false,
            values: [],
            originalData: [],
            filteredData: [],
            provinces: [],
            cities: [],
            provinceModel:'',
            cityModel:'',

            paymentTypeFilter: [{
                    label: 'همه',
                    value: '',
                },
                {
                    label: 'نقدی',
                    value: 'cash',
                },
                {
                    label: 'امانی',
                    value: 'safekeeping',
                },
                {
                    label: 'اعتباری',
                    value: 'credit',
                }
            ],
            paymentTypeModel: '',

            supplierTypeFilter: [{
                    label: 'همه',
                    value: '',
                },
                {
                    label: 'حقوقی',
                    value: 'legal',
                },
                {
                    label: 'حقیقی',
                    value: 'genuine',
                },
            ],
            supplierTypeModel: '',
        }
    },

    computed: {
        fullName() {
            try {
                const fullNameObject = this.values.find(element => element.name === 'full_name');
                return fullNameObject.value
            } catch (error) {
                return ''
            }
        },

        shoppingName() {
            try {
                const shoppingNameObject = this.values.find(element => element.name === 'shopping_name');
                return shoppingNameObject.value
            } catch (error) {
                return ''
            }
        },

        email() {
            try {
                const emailObject = this.values.find(element => element.name === 'email');
                return emailObject.value
            } catch (error) {
                return ''
            }
        },

        id() {
            try {
                const idObject = this.values.find(element => element.name === 'id');
                return idObject.value
            } catch (error) {
                return ''
            }
        },

        kosarId() {
            try {
                const kosarIdObject = this.values.find(element => element.name === 'kosar_id');
                return kosarIdObject.value
            } catch (error) {
                return ''
            }
        },

        phone() {
            try {
                const phoneObject = this.values.find(element => element.name === 'phone');
                return phoneObject.value
            } catch (error) {
                return ''
            }
        },

        phoneNumber() {
            try {
                const phoneNumberObject = this.values.find(element => element.name === 'phone_number');
                return phoneNumberObject.value
            } catch (error) {
                return ''
            }
        },

        paymentPeriod() {
            try {
                const paymentPeriodObject = this.values.find(element => element.name === 'payment_period');
                return paymentPeriodObject.value
            } catch (error) {
                return ''
            }
        },

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
        setFilter() {
            const filter = new SupplierPanelFilter()

            if (this.fullName) {
                filter.full_name = this.fullName
            } else if (this.$route.query.full_name) {
                filter.full_name = null
            }

            if (this.shoppingName) {
                filter.shopping_name = this.shoppingName
            } else if (this.$route.query.shopping_name){
                filter.shopping_name = null
            }

            if (this.email) {
                filter.email = this.email
            } else if (this.$route.query.email){
                filter.email = null
            }

             if (this.id) {
                filter.id = this.id
            } else if (this.$route.query.id){
                filter.id = null
            }

            if (this.kosarId) {
                filter.kosar_id = this.kosarId
            } else if (this.$route.query.kosar_id){
                filter.kosar_id = null
            }

            if (this.phone) {
                filter.phone = this.phone
            } else if (this.$route.query.phone){
                filter.phone = null
            }

            if (this.phoneNumber) {
                filter.phone_number = this.phoneNumber
            } else if (this.$route.query.phone_number){
                filter.phone_number = null
            }

            if (this.paymentPeriod) {
                filter.payment_period = this.paymentPeriod
            } else if (this.$route.query.payment_period){
                filter.payment_period = null
            }

            if (this.paymentTypeModel) {
                filter.payment_type = this.paymentTypeModel
            } else if (this.$route.query.payment_type){
                filter.payment_type = null
            }

            if (this.supplierTypeModel) {
                filter.type = this.supplierTypeModel
            } else if (this.$route.query.type){
                filter.type = null
            }

            if (this.provinceModel) {
                filter.state_id = this.provinceModel
            } else if (this.$route.query.state_id){
                filter.state_id = null
            }

            if (this.cityModel) {
                filter.city_id = this.cityModel
            } else if (this.$route.query.city_id){
                filter.city_id = null
            }

            filter.page = 1;

            if (this.$route.query.per_page) {
                filter.per_page = this.$route.query.per_page;
            }

            this.$router.push('/' + this.path + '/' + filter.query_maker());
            this.dialog = false;
        },

        removeAllFilters() {
            this.$router.push('/' + this.path);
            this.values = [];
            this.supplierTypeModel= '',
            this.paymentTypeModel= '',
            this.provinceModel='',
            this.cityModel='',

            this.filterField.forEach(el => {
                const form = {
                    name: el.value,
                    value: ''
                }

                this.values.push(form)
                this.dialog = false;
            })
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
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
            this.cityModel = null
            const form = {
                per_page: 10000
            }
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.form = form
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `system/state/crud/get/${this.provinceModel}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.cities = data.data.cities
            }
        },
    },

    mounted() {
        this.filterField.forEach(el => {
            const form = {
                name: el.value,
                value: ''
            }
            this.values.push(form)
        });

        this.getProvince();
    }
}
</script>
