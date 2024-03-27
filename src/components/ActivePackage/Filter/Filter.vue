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
                        <v-col v-if="filter.type === 'text'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-text-field
                                variant="outlined"
                                :name="filter.value"
                                :placeholder="filter.value === 'shps_count_from' ? 'از' : filter.value === 'shps_count_to' ? 'تا': ''"
                                v-model="values[index].value" />
                        </v-col>

                        <v-col v-if="filter.type === 'select'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-select
                                v-if="filter.value ==='type'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="typeList"
                                v-model="typeModel" />

                            <v-select
                                v-if="filter.value ==='status'"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="statusList"
                                v-model="statusModel" />
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
                    value: null
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
