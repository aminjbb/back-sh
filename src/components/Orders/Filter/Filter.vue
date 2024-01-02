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
            <header class="modal__header d-flex justify-center align-center">
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
                        <v-col v-if="filter.type === 'text' && filter.value !== 'lower_payment' && filter.value !== 'highest_payment'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                hide-details
                                :placeholder="filter.value === 'shps_count_from' ? 'از' : filter.value === 'shps_count_to' ? 'تا': ''"
                                v-model="values[index].value" />
                        </v-col>

                        <v-col v-if="filter.type === 'text' && (filter.value === 'lower_payment' ||filter.value === 'highest_payment')" cols="6">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                hide-details
                                :placeholder="filter.value === 'shps_count_from' ? 'از' : filter.value === 'shps_count_to' ? 'تا': ''"
                                v-model="values[index].value" />
                        </v-col>

                        <v-col v-if="filter.type === 'select'" cols="4">
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
                                :items="paymentStatus"
                                v-model="paymentStatusModel" />

                            <v-select
                                v-if="filter.value ==='payment_method'"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                item-title="label"
                                item-value="value"
                                :items="paymentMethod"
                                v-model="paymentMethodModel" />

                            <v-autocomplete
                                v-if="filter.value == 'state_id'"
                                :items="provinceList"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                :rules="rule"
                                v-model="provinceModel"
                                @update:modelValue="getCities()" />

                            <v-autocomplete
                                v-if="filter.value == 'city_id'"
                                :items="cityList"
                                density="compact"
                                variant="outlined"
                                single-line
                                hide-details
                                :rules="rule"
                                v-model="cityModel" />
                        </v-col>

                        <v-col
                            cols="4"
                            v-else-if=" filter.value === 'submit_date'"
                            class="mt-3">
                            <div class="t13300 text-right mb-3">{{filter.name}}</div>
                            <div align="center" class="d-flex pb-5 align-center">
                                <date-picker
                                    range
                                    clearable
                                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                    format="jYYYY-jMM-jDD"
                                    display-format="jYYYY-jMM-jDD"
                                    v-model="submitAtModel"
                                    variant="outlined" />

                                <v-icon @click="submitAtModel= [] ;gregorianSubmitDate =[]">mdi-close</v-icon>
                            </div>
                        </v-col>

                        <v-col cols="4" v-else-if=" filter.value === 'receive_date'">
                            <div class="t13300 text-right mb-3">{{filter.name}}</div>
                            <div align="center" class="d-flex pb-5 align-center">
                                <date-picker
                                    range
                                    clearable
                                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker number-font"
                                    format="jYYYY-jMM-jDD"
                                    display-format="jYYYY-jMM-jDD"
                                    v-model="submitAtModel"
                                    variant="outlined" />

                                <v-icon @click="receiveAtModel= [] ;gregorianReceiveDate =[]">mdi-close</v-icon>
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

export default {
    props: {
        filterField: [],
        path: null,
    },

    data() {
        return {
            dialog: false,
            values: [],
            originalData: [],
            filteredData: [],
            statusList: [{
                    label: 'خالی',
                    value: 'empty'
                },
                {
                    label: 'لودینگ',
                    value: 'loading'
                },
                {
                    label: 'در حال بارگیری',
                    value: 'luggage'
                },
                {
                    label: 'انتقال به انبار اصلی',
                    value: 'sent_to_warehouse'
                },
                {
                    label: 'رسیده به انبار اصلی',
                    value: 'received_by_warehouse'
                }
            ],
            statusModel: null,

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

            typeList: [{
                    label: 'پالت',
                    value: 'pallet'
                },
                {
                    label: 'بالک',
                    value: 'bulk'
                },
            ],
            typeModel: null,
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

        id() {
            try {
                const idObject = this.values.find(element => element.name === 'id');
                return idObject.value
            } catch (error) {
                return ''
            }
        },

        shpsCountFrom() {
            try {
                const shpsCountFromObject = this.values.find(element => element.name === 'shps_count_from');
                return shpsCountFromObject.value
            } catch (error) {
                return ''
            }
        },

        shpsCountTo() {
            try {
                const shpsCountToObject = this.values.find(element => element.name === 'shps_count_to');
                return shpsCountToObject.value
            } catch (error) {
                return ''
            }
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

            if (this.statusModel) {
                filter.status = this.statusModel
            } else if (this.$route.query.status) {
                filter.status = null
            }

            if (this.typeModel) {
                filter.type = this.typeModel
            } else if (this.$route.query.type) {
                filter.type = null
            }

            if (this.shpsCountFrom) {
                filter.shps_count_from = this.shpsCountFrom
            } else {
                filter.shps_count_from = null
            }

            if (this.shpsCountTo) {
                filter.shps_count_to = this.shpsCountTo
            } else {
                filter.shps_count_to = null
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
            this.typeModel = null;
            this.filterField.forEach(el => {
                const form = {
                    name: el.value,
                    value: 'null'
                }

                this.values.push(form)
                this.dialog = false;
            })
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
