<template>
<div>
    <v-form ref="addFactor" v-model="valid">
        <v-row
            justify="start"
            align="center"
            class="px-15">
            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t12 w500">
                        تامین کننده
                    </span>
                </div>

                <v-autocomplete
                    density="compact"
                    variant="outlined"
                    single-line
                    :items="dataSupplier"
                    v-model="form.supplier_id"
                    :rules="rule"
                    item-title="label"
                    item-value="value" />
            </v-col>

            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t14 w500">
                        شماره فاکتور تامین کننده
                    </span>
                </div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    single-line
                    label="شماره فاکتور تامین کننده"
                    v-model="form.factor_number" />
            </v-col>
        </v-row>
        <v-row align="center" class="px-15">
            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t14 w500">
                        شماره پیش فاکتور
                    </span>
                </div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    single-line
                    label="شماره پیش فاکتور"
                    v-model="form.pre_factor_number" />
            </v-col>
        </v-row>
    </v-form>
</div>
</template>

<script>
import Supplier from "@/composables/Supplier";

export default {
    props: {
        type: '',
        factor: {},
    },

    setup() {
        const {
            allSuppliers,
            getAllSuppliers
        } = Supplier();

        return {
            allSuppliers,
            getAllSuppliers
        };
    },

    data() {
        return {
            valid: true,

            form: {
                supplier_id: '',
                factor_number: '',
                pre_factor_number: '',
                status: 'draft',
            },

            rule: [v => !!v || 'این فیلد الزامی است'],

        }
    },

    computed: {
        dataSupplier(){
            try {
                const suppliers = []
                this.allSuppliers.data.forEach(element => {
                    const form = {
                        label : element.full_name,
                        value : element.id
                    }
                    suppliers.push(form)
                });
              return suppliers
            } catch (error) {
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
                this.form.supplier_id = this.factor.supplier_id
                this.form.factor_number = this.factor.factor_number
                this.form.pre_factor_number = this.factor.pre_factor_number
                this.form.status = this.factor.status
            } catch (error) {}
        },
    },

    mounted() {
        this.getAllSuppliers()
    },

    watch: {
        factor() {
            this.setForm();
        }
    }
}
</script>
