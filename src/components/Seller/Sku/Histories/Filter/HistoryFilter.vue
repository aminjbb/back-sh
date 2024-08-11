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
            <div class="mb-5 px-5">
                <v-divider />
            </div>

            <div>
                <v-row
                    justify="end"
                    align="center"
                    class="px-10 d--rtl">
                    <template v-for="(filter, index) in filterField" :key="index">
                        <!-- Text filds -->
                        <v-col v-if="filter.type === 'text'" cols="6">
                            <div class="t12 w300 text-right mb-1 text-grey">{{filter.name}}</div>

                            <v-text-field
                                variant="outlined"
                                :placeholder="filter.placeHolder"
                                :name="filter.value "
                                v-model="values[index].value" />
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
                class="px-5 p1-2">
                <v-col cols="6">
                    <v-btn
                        @click="removeAllFilters()"
                        variant="text"
                        height="40"
                        rounded
                        class="px-5 mr-5">
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
                            class="px-5 mr-5">
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

export default {
    props: {
        filterField: [],
        path: '',
        brandsList: [],
        colorsList: [],
        categoriesList: [],
        disableCategory: false,
        skuGroupList: [],
        model: ''
    },

    data() {
        return {
            dialog: false,
            active: false,
            values: [],
        }
    },

    computed: {
        customer_price_from() {
            try {
                const labelObject = this.values.find(element => element.name === 'customer_price_from');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
        customer_price_to() {
            try {
                const labelObject = this.values.find(element => element.name === 'customer_price_to');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
        site_price_from() {
            try {
                const labelObject = this.values.find(element => element.name === 'site_price_from');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
        site_price_to() {
            try {
                const labelObject = this.values.find(element => element.name === 'site_price_to');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
        base_discount_from() {
            try {
                const labelObject = this.values.find(element => element.name === 'base_discount_from');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
        base_discount_to() {
            try {
                const labelObject = this.values.find(element => element.name === 'base_discount_to');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
        marketing_discount_from() {
            try {
                const labelObject = this.values.find(element => element.name === 'marketing_discount_from');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
        marketing_discount_to() {
            try {
                const labelObject = this.values.find(element => element.name === 'marketing_discount_to');
                return labelObject.value
            } catch (error) {
                return ''
            }
        },
    },

    methods: {

        setFilter() {
            const filter = new SkuSellerPanelFilter()

            if (this.base_discount_from) {
                filter.base_discount_from = this.base_discount_from
            } else {
                filter.base_discount_from = null
            }

            if (this.base_discount_to) {
                filter.base_discount_to = this.base_discount_to
            } else {
                filter.base_discount_to = null
            }

            if (this.marketing_discount_from) {
                filter.marketing_discount_from = this.marketing_discount_from
            } else {
                filter.marketing_discount_from = null
            }

            if (this.marketing_discount_to) {
                filter.marketing_discount_to = this.marketing_discount_to
            } else {
                filter.marketing_discount_to = null
            }

            if (this.site_price_from) {
                filter.site_price_from = this.site_price_from
            } else {
                filter.site_price_from = null
            }

            if (this.site_price_to) {
                filter.site_price_to = this.site_price_to
            } else {
                filter.site_price_to = null
            }

            if (this.customer_price_from) {
                filter.customer_price_from = this.customer_price_from
            } else {
                filter.customer_price_from = null
            }

            if (this.customer_price_to) {
                filter.customer_price_to = this.customer_price_to
            } else {
                filter.customer_price_to = null
            }

            filter.page = 1;
            filter.per_page = this.$route.query.per_page;
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
                value: null
            }
            this.values.push(form)
        })
    }
}
</script>
