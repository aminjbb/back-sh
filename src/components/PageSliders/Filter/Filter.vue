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

                        <v-col v-else-if="filter.type === 'select'" cols="4">
                            <div class="t13300 text-right mb-1">{{filter.name}}</div>

                            <v-select
                                v-if="filter.value === 'page_type'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="pageTypeFilter"
                                v-model="pageTypeModel" />

                            <v-select
                                v-if="filter.value === 'is_active'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="activeFilter"
                                v-model="activeModel" />

                            <v-select
                                v-if="filter.value === 'is_follow'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="followFilter"
                                v-model="followModel" />

                            <v-select
                                v-if="filter.value === 'is_index'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="indexFilter"
                                v-model="indexModel" />
                        </v-col>

                        <v-col
                            cols="4"
                            v-else-if=" filter.value === 'created_at'"
                            class="mt-3">
                            <div class="t13300 text-right mb-1">{{filter.name}}</div>
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
import {
    PanelFilter
} from '@/assets/js/filter_page.js'
import {
    AxiosCall
} from "@/assets/js/axios_call";

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
            createdAtModel: null,
            activeModel: '',
            followModel: '',
            indexModel: '',
            pageTypeModel: '',

            activeFilter: [{
                    label: 'همه',
                    value: '',
                },
                {
                    label: 'فعال',
                    value: '1',
                },
                {
                    label: 'غیرفعال',
                    value: '0',
                }
            ],
            indexFilter: [{
                    label: 'همه',
                    value: '',
                },
                {
                    label: 'فعال',
                    value: '1',
                },
                {
                    label: 'غیرفعال',
                    value: '0',
                }
            ],
            followFilter: [{
                    label: 'همه',
                    value: '',
                },
                {
                    label: 'فعال',
                    value: '1',
                },
                {
                    label: 'غیرفعال',
                    value: '0',
                }
            ],
            pageTypeFilter: [{
                    label: 'همه',
                    value: '',
                },
                {
                    label: 'دسته بندی',
                    value: 'category',
                },
                {
                    label: 'برند',
                    value: 'brand',
                }
            ],
        }
    },

    computed: {
        label() {
            try {
                const labelObject = this.values.find(element => element.name === 'label');
                return labelObject.value
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

            if (this.label) {
                filter.label = this.label
            } else if (this.$route.query.label) {
                filter.label = null
            }

            if (this.createdAt[0]) {
                filter.created_at_from_date = this.createdAt[0]
            } else {
                filter.created_at_from_date = null
            }

            if (this.createdAt[1]) {
                filter.created_at_to_date = this.createdAt[1]
            } else {
                filter.created_at_to_date = null
            }

            if (this.activeModel === '') {
                filter.active = null
            } else if (this.activeModel !== '') {
                filter.active = this.activeModel
            } else if (this.$route.query.is_active) {
                filter.active = this.$route.query.is_active
            }

            if (this.followModel === '') {
                filter.follow = null
            } else if (this.followModel !== '') {
                filter.follow = this.followModel
            } else if (this.$route.query.is_follow) {
                filter.follow = this.$route.query.is_follow
            }

            if (this.indexModel === '') {
                filter.index = null
            } else if (this.indexModel !== '') {
                filter.index = this.indexModel
            } else if (this.$route.query.is_index) {
                filter.index = this.$route.query.is_index
            }

            if (this.pageTypeModel === '') {
                filter.type = null
            } else if (this.pageType !== '') {
                filter.type = this.pageType
            } else if (this.$route.query.type) {
                filter.type = this.$route.query.type
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
            this.activeModel= '';
            this.followModel= '';
            this.indexModel= '';
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
