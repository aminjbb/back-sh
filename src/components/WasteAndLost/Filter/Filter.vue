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
                                v-model="values[index].value" />
                        </v-col>

                        <v-col v-if="filter.type === 'select'" cols="4">
                            <div class="t13300 text-right mb-2">{{filter.name}}</div>
                            <v-autocomplete
                                v-if="filter.value === 'supplier_id'"
                                density="compact"
                                variant="outlined"
                                single-line
                                :items="dataSupplier"
                                v-model="supplierModel"
                                item-title="label"
                                item-value="value" />

                            <v-autocomplete
                                v-if="filter.value === 'creator_id'"
                                density="compact"
                                variant="outlined"
                                single-line
                                :items="dataCreator"
                                v-model="creatorModel"
                                item-title="label"
                                item-value="value" />

                            <v-select
                                v-if="filter.value === 'package_type'"
                                :rules="rule"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="packageType"
                                v-model="packageTypeModal" />

                            <v-select
                                v-if="filter.value === 'shipment_type'"
                                :rules="rule"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="shipmentType"
                                v-model="shipmentTypeModal" />

                            <v-select
                                v-if="filter.value === 'report_type'"
                                :rules="rule"
                                density="compact"
                                variant="outlined"
                                single-line
                                item-title="label"
                                item-value="value"
                                :items="reportType"
                                v-model="reportTypeModal" />
                        </v-col>

                        <v-col
                            cols="4"
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
} from '@/assets/js/filter_waste.js'

import {
    jalaliToGregorian
} from '@/assets/js/functions'

import Admin from "@/composables/Admin";
import Supplier from "@/composables/Supplier";

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

            supplierItems: [],
            supplierModal: null,

            creatorItems: [],
            creatorModal: null,

            packageType: [{
                    label: 'بالک',
                    value: 'bulk'
                },
                {
                    label: 'پالت',
                    value: 'pallet'
                }
            ],
            packageTypeModal: null,

            shipmentType: [{
                    label: 'فروش مارکت',
                    value: 'cross_dock_marketplace'
                },
                {
                    label: 'انبارش شاوز',
                    value: 'consignment_shavaz'
                },
                {
                    label: 'انبارش مارکت',
                    value: 'consignment_marketplace'
                }
            ],
            shipmentTypeModal: null,

            reportType: [{
                    label: 'مفقودی',
                    value: 'lost'
                },
                {
                    label: 'ضایعات',
                    value: 'wastage'
                }
            ],
            reportTypeModal: null,
        }
    },

    setup(props) {
        const {
            allSuppliers,
            getAllSuppliers
        } = Supplier();

        const {
            admin,
            getAdmins
        } = Admin();

        return {
            allSuppliers,
            getAllSuppliers,
            admin,
            getAdmins
        };
    },

    computed: {
        dataSupplier() {
            try {
                const suppliers = []
                this.allSuppliers.data.forEach(element => {
                    const form = {
                        label: element.full_name,
                        value: element.id
                    }
                    suppliers.push(form)
                });
                return suppliers
            } catch (error) {
                return []
            }
        },

        dataCreator() {
            try {
                const creators = []
                this.admin.data.forEach(element => {
                    const form = {
                        label: element.first_name + ' ' + element.last_name,
                        value: element.id
                    }
                    creators.push(form)
                });
                return creators
            } catch (error) {
                return []
            }
        },

        package_id() {
            try {
                const packageIdObject = this.values.find(element => element.name === 'package_id');
                return packageIdObject.value
            } catch (error) {
                return ''
            }
        },

        shopping_name() {
            try {
                const shoppingNameObject = this.values.find(element => element.name === 'shopping_name');
                return shoppingNameObject.value
            } catch (error) {
                return ''
            }
        },

        shps_s() {
            try {
                const shps_sObject = this.values.find(element => element.name === 'shps_s');
                return shps_sObject.value
            } catch (error) {
                return ''
            }
        },

        sku_label() {
            try {
                const skuLabelObject = this.values.find(element => element.name === 'sku_label');
                return skuLabelObject.value
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

            if (this.supplierModal) {
                filter.supplier_id = this.supplierModal
            } else if (this.$route.query.supplier_id) {
                filter.supplier_id = null
            }

            if (this.creatorModal) {
                filter.creator_id = this.creatorModal
            } else if (this.$route.query.creator_id) {
                filter.creator_id = null
            }

            if (this.packageTypeModal) {
                filter.package_type = this.packageTypeModal
            } else if (this.$route.query.package_type) {
                filter.package_type = null
            }

            if (this.shipmentTypeModal) {
                filter.shipment_type = this.shipmentTypeModal
            } else if (this.$route.query.shipment_type) {
                filter.shipment_type = null
            }

            if (this.reportTypeModal) {
                filter.report_type = this.reportTypeModal
            } else if (this.$route.query.report_type) {
                filter.report_type = null
            }

            if (this.package_id) {
                filter.package_id = this.package_id
            } else if (this.$route.query.package_id) {
                filter.package_id = null
            }

            if (this.shopping_name) {
                filter.shopping_name = this.shopping_name
            } else if (this.$route.query.shopping_name) {
                filter.shopping_name = null
            }

            if (this.shps_s) {
                filter.shps_s = this.shps_s
            } else if (this.$route.query.shps_s) {
                filter.shps_s = null
            }

            if (this.sku_label) {
                filter.sku_label = this.sku_label
            } else if (this.$route.query.sku_label) {
                filter.sku_label = null
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

            console.log(filter);

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

        this.getAllSuppliers();
        this.getAdmins();
    }
}
</script>
