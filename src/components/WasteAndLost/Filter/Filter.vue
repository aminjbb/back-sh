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
                    justify="center"
                    align="center"
                    class="px-10 d--rtl">
                    <template v-for="(filter, index) in filterField" :key="index">
                        <v-col v-if="filter.type === 'text'" cols="6">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                v-model="values[index].value" />
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
} from '@/assets/js/filter.js'

import {
    jalaliToGregorian
} from '@/assets/js/functions'

export default {
    props: {
        filterField: [],
        path: ''
    },

    data() {
        return {
            dialog: false,
            values: [],
            originalData: [],
            filteredData: [],
            createdAtModel: null,
            gregorianCreateDate: [],
        }
    },

    computed: {
        id() {
            try {
                const idObject = this.values.find(element => element.name === 'id');
                return idObject.value
            } catch (error) {
                return ''
            }
        },

        vehicleType() {
            try {
                const vehicleTypeObject = this.values.find(element => element.name === 'vehicle_type');
                return vehicleTypeObject.value
            } catch (error) {
                return ''
            }
        },

        license() {
            try {
                const licenseObject = this.values.find(element => element.name === 'license');
                return licenseObject.value
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
    },

    methods: {
        setFilter() {
            const filter = new PanelFilter()

            if (this.id) {
                filter.id = this.id
            } else if (this.$route.query.id) {
                filter.id = null
            }

            if (this.vehicleType) {
                filter.vehicle_type = this.vehicleType
            } else if (this.$route.query.vehicle_type) {
                filter.vehicle_type = null
            }

            if (this.license) {
                filter.license = this.license
            } else if (this.$route.query.license) {
                filter.license = null
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
    },

    mounted() {
        this.filterField.forEach(el => {
            const form = {
                name: el.value,
                value: ''
            }
            this.values.push(form)
        });
    }
}
</script>
