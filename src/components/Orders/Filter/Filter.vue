<template>
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
            <header class="modal__header d-flex justify-center align-center mt-3">
                <span class="t16400 pa-6">
                    فیلتر پیشرفته
                </span>

                <v-btn
                    class="modal__header__btn"
                    @click="closeModal()"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="mt-3 mb-8 px-5">
                <v-divider />
            </div>

            <div>
                <v-row
                    justify="start"
                    align="center"
                    class="px-10 d--rtl">
                    <template v-for="(filter, index) in filterField" :key="index">
                        <v-col v-if="filter.type === 'text' && filter.value !== 'paid_price_from' && filter.value !== 'paid_price_to'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                hide-details
                                v-model="values[index].value" />
                        </v-col>

                        <v-col v-if="filter.type === 'text' && (filter.value === 'paid_price_from' ||filter.value === 'paid_price_to')" cols="6">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                hide-details
                                :placeholder="filter.value === 'paid_price_from' ? 'از' : filter.value === 'paid_price_to' ? 'تا': ''"
                                v-model="values[index].value" />
                        </v-col>

                        <v-col cols="4" v-if="filter.type === 'select' && filter.value === 'creator_id'">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                           <v-autocomplete
                                placeholder="شماره تلفن کاربر را وارد کنید"
                                variant="outlined"
                                prepend-inner-icon-cb="mdi-map-marker"
                                rounded="lg"
                                v-model="userModal"
                                :items="userList"
                                item-title="name"
                                item-value="value"
                                v-debounce="searchUser" />
                        </v-col>

                        <v-col v-if="filter.type === 'select' && filter.value !== 'creator_id'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-select
                                v-if="filter.value ==='status'"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                item-title="label"
                                item-value="value"
                                :items="statusList"
                                v-model="statusModel" />

                            <v-select
                                v-if="filter.value ==='packed_status'"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                item-title="label"
                                item-value="value"
                                :items="packedStatus"
                                v-model="packedStatusModel" />

                            <v-select
                                v-if="filter.value ==='payment_status'"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                item-title="label"
                                item-value="value"
                                :items="paymentStatuses"
                                v-model="paymentStatusModel" />

                            <v-select
                                v-if="filter.value ==='payment_method'"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                item-title="label"
                                item-value="value"
                                :items="paymentMethods"
                                v-model="paymentMethodModel" />

                            <v-autocomplete
                                v-if="filter.value == 'receive_state_id'"
                                :items="provinceList"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                v-model="province"
                                @update:modelValue="getCities()" />

                            <v-autocomplete
                                v-if="filter.value == 'receive_city_id'"
                                :items="cityList"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                v-model="city" />
                        </v-col>

                        <v-col
                            cols="6"
                            v-else-if=" filter.value === 'created_at'"
                            class="mt-3">
                            <div class="t13300 text-right mb-3">{{filter.name}}</div>
                            <div align="center" class="d-flex pb-5 align-center">
                                <date-picker
                                    range
                                    clearable
                                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                    format="jYYYY-jMM-jDD"
                                    display-format="jYYYY-jMM-jDD"
                                    v-model="createdAtModel"
                                    variant="outlined" />

                                <v-icon @click="createdAtModel= [] ;gregorianCreateDate =[]">mdi-close</v-icon>
                            </div>
                        </v-col>

                        <v-col cols="6" v-else-if=" filter.value === 'logistic_at'">
                            <div class="t13300 text-right mb-4">{{filter.name}}</div>
                            <div align="center" class="d-flex pb-5 align-center">
                                <date-picker
                                    range
                                    clearable
                                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                    format="jYYYY-jMM-jDD"
                                    display-format="jYYYY-jMM-jDD"
                                    v-model="logisticAtModel"
                                    variant="outlined" />

                                <v-icon @click="logisticAtModel= [] ;gregorianLogisticDate =[]">mdi-close</v-icon>
                            </div>
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
                            اعمال تغییرات
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    PanelFilter
} from '@/assets/js/filter_order.js'
import {
    AxiosCall
} from "@/assets/js/axios_call";

import {
    jalaliToGregorian
} from '@/assets/js/functions'

export default {
    props: {
        filterField: [],
        path: null,
    },

    data() {
        return {
            dialog: false,
            cities: [],
            values: [],
            statusList: [
                {
                    label: 'پیش پردازش',
                    value: 'pre_progress'
                },
                {
                    label: 'ارسال شده',
                    value: 'sending'
                },
                {
                    label: 'تحویل داده شده',
                    value: 'received'
                },
              {
                label: 'انقضای سفارش',
                value: 'payment_out_date'
              }
            ],
            statusModel: null,
            paymentMethods: [
                {
                    label: 'کیف پول',
                    value: 'wallet'
                },
                {
                    label: 'آنلاین',
                    value: 'online'
                },
                {
                    label: 'اسنپ پی',
                    value: 'snap_pay'
                }
            ],
            paymentMethodModel: null,
            paymentStatuses: [
                {
                    label: 'پرداخت شده',
                    value: 'successful'
                },
                {
                    label: 'در انتظار پرداخت',
                    value: 'payment_in_progress'
                },
              {
                label: 'انقضای پرداخت',
                value: 'payment_out_date'
              }
            ],
            paymentStatusModel: null,
            packedStatus: [{
                    label: 'بارگیری شده',
                    value: '1'
                },
                {
                    label: 'بارگیری نشده',
                    value: '0'
                }
            ],
            packedStatusModel: null,
            province : null,
            city: null,
            userSearchList: [],
            userModal: null,
            createdAtModel: null,
            gregorianCreateDate: [],
            logisticAtModel: null,
            gregorianLogisticDate: [],
        }
    },

    computed: {
        userList(){
            try {
                let users = []
                this.userSearchList.forEach(user => {
                const form = {
                    name: user?.first_name + ' ' +user?.last_name + '(' + user.phone_number + ')',
                    value: user
                }
                users.push(form)
                })
                return users
            } catch (e) {
                return e
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

        id() {
            try {
                const idObject = this.values.find(element => element.name === 'id');
                return idObject.value
            } catch (error) {
                return ''
            }
        },

        phone_number() {
            try {
                const idObject = this.values.find(element => element.name === 'phone_number');
                return idObject.value
            } catch (error) {
                return ''
            }
        },

        orderNumber() {
        try {
          const idObject = this.values.find(element => element.name === 'order_number');
          return idObject.value
        } catch (error) {
          return ''
        }
      },

        paidPriceFrom() {
            try {
                const paidPriceFromObject = this.values.find(element => element.name === 'paid_price_from');
                return paidPriceFromObject.value
            } catch (error) {
                return ''
            }
        },

        paidPriceTo() {
            try {
                const paidPriceToObject = this.values.find(element => element.name === 'paid_price_to');
                return paidPriceToObject.value
            } catch (error) {
                return ''
            }
        },

        createdAt() {
            if (this.createdAtModel) {
                if (this.createdAtModel[0] && !this.createdAtModel[1]) {
                    const splitDate = this.createdAtModel[0].split('-')
                    this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                    this.gregorianCreateDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                } else if (this.createdAtModel[0] && this.createdAtModel[1]) {
                    const splitDate = this.createdAtModel[0].split('-')
                    const splitDateUp = this.createdAtModel[1].split('-')
                    this.gregorianCreateDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                    this.gregorianCreateDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
                }
            }
            return this.gregorianCreateDate;
        },

        logisticAt() {
            if (this.logisticAtModel) {
                if (this.logisticAtModel[0] && !this.logisticAtModel[1]) {
                    const splitDate = this.logisticAtModel[0].split('-')
                    this.gregorianLogisticDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                    this.gregorianLogisticDate[1] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                } else if (this.logisticAtModel[0] && this.logisticAtModel[1]) {
                    const splitDate = this.logisticAtModel[0].split('-')
                    const splitDateUp = this.logisticAtModel[1].split('-')
                    this.gregorianLogisticDate[0] = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                    this.gregorianLogisticDate[1] = jalaliToGregorian(splitDateUp[0], splitDateUp[1], splitDateUp[2])
                }
            }
            return this.gregorianLogisticDate;
        },
    },

    methods: {
        setFilter() {
            const filter = new PanelFilter()
            if (this.id) {
                filter.id = this.id
            } else if (this.$route.query.id) {
                filter.id = null
            }
          if (this.phone_number) {
            filter.phone_number = this.phone_number
          } else if (this.$route.query.phone_number) {
            filter.phone_number = null
          }

            if (this.orderNumber) {
                filter.orderNumber = this.orderNumber
            } else if (this.$route.query.order_number) {
                filter.orderNumber = null
            }

            if (this.userModal && this.userModal.id) {
                filter.creator_id = this.userModal.id
            } else if (this.$route.query.id) {
                filter.creator_id = null
            }

            if (this.statusModel) {
                filter.status = this.statusModel
            } else if (this.$route.query.status) {
                filter.status = null
            }

            if (this.paymentMethodModel) {
                filter.payment_method = this.paymentMethodModel
            } else if (this.$route.query.payment_method) {
                filter.payment_method = null
            }

            if (this.paymentStatusModel) {
                filter.payment_status = this.paymentStatusModel
            } else if (this.$route.query.payment_status){
                filter.payment_status = null
            }

            if (this.packedStatusModel) {
                filter.packed_status = this.packedStatusModel
            } else {
                filter.packed_status = null
            }

            if (this.paidPriceTo) {
                filter.paid_price_to = this.paidPriceTo
            } else {
                filter.paid_price_to = null
            }

            if (this.paidPriceFrom) {
                filter.paid_price_from = this.paidPriceFrom
            } else {
                filter.paid_price_from = null
            }

            if (this.city) {
                filter.receive_city_id = this.city
            } else {
                filter.receive_city_id = null
            }

            if (this.province) {
                filter.receive_state_id = this.province
            } else {
                filter.receive_state_id = null
            }

            if (this.createdAt && this.createdAt[0]) {
                filter.created_at_from_date = this.createdAt[0]
            } else {
                filter.created_at_from_date = null
            }

            if (this.createdAt && this.createdAt[1]) {
                filter.created_at_to_date = this.createdAt[1]
            } else {
                filter.created_at_to_date = null
            }

            if (this.logisticAt && this.logisticAt[0]) {
                filter.logistic_at_from_date = this.logisticAt[0]
            } else {
                filter.logistic_at_from_date = null
            }

            if (this.logisticAt && this.logisticAt[1]) {
                filter.logistic_at_to_date = this.logisticAt[1]
            } else {
                filter.logistic_at_to_date = null
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
            this.statusModel = null;
            this.paymentMethodModel = null;
            this.packedStatusModel = null;
            this.packedStatusModel = null;
            this.createdAtModel = null;
            this.logisticAtModel = null;
            this.userModal = null;

            this.filterField.forEach(el => {
                const form = {
                    name: el.value,
                    value: null
                }

                this.values.push(form)
                this.dialog = false;
            })
        },

        async searchUser(search) {
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `user/crud/index?phone_number=${search}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.userSearchList = data.data.data
            }
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
            AxiosMethod.end_point = `system/state/crud/get/${this.province}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.cities = data.data.cities
            }
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
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
