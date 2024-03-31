<template>
    <div>
        <v-form ref="addAttribute">
            <v-row justify="center" align="center">
                <v-col cols="12" md="2">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اسم انگلیسی
                        </span>
                    </div>
                    <v-text-field
                        :rules="englishRule"
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اسم انگلیسی"
                        v-model="form.name"
                    />
                </v-col>

                <v-col cols="12" md="2">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اسم فارسی
                        </span>
                    </div>
                    <v-text-field
                        :rules="persianRule"
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اسم فارسی"
                        v-model="form.label"
                    />
                </v-col>

                <v-col cols="12" md="2">
                    <div class="text-right my-5">
                        <span class="t14500">
                            نوع ویژگی
                        </span>
                    </div>
                    <v-select
                        :rules="rule"
                        density="compact"
                        variant="outlined"
                        single-line
                        item-title="name"
                        item-value="value"
                        label="نوع ویژگی"
                        :items="nameTypes"
                        v-model="form.nameType"
                    />
                </v-col>
              
                <v-col cols="12" md="2">
                    <div class="text-right my-5">
                        <span class="t14500">
                            فیلتر
                        </span>
                    </div>
                    <v-select
                        density="compact"
                        item-title="name"
                        item-value="value"
                        variant="outlined"
                        single-line
                        label="نوع ویژگی"
                        :items="filters"
                        v-model="form.fillterable"
                    />
                </v-col>

                <v-col cols="12" md="2">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اولویت
                        </span>
                    </div>
                    <v-text-field
                        type="number"
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اولویت"
                        v-model="form.priority"
                        :rules="rule"
                    />
                </v-col>
            </v-row>

            <div class="pa-5">
                <v-divider />
            </div>

            <!-- // -->
            
        </v-form>
    </div>
</template>
<script>

export default {
    props: {
        type: '',
        attribute: ''

    },

    data() {
        return {
            active: false,

            form: {
                name: '',
                label: '',
                nameType: 'title',
                fillterable:1 ,
                priority: 1
            },
            rule: [v => !!v || 'این فیلد الزامی است'],
            persianRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                    /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
                    "فقط حروف فارسی ",
            ],
            englishRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) => !RegExp("[\u0600-\u06FF]").test(v) || "فقط حروف انگلیسی ",
            ],

            nameTypes: [
                {
                name: 'عنوان',
                value: 'title'
            },
            {
                name: 'توضیح',
                value: 'description'
            }
                
            ],
            valueTypes: [
                'radio',
                'check',
                'text',
                'drop down'
            ],
            filters: [{
                name: 'دارد',
                value: 1
            },
            {
                name: 'ندارد',
                value: 0
            }],

            fillter: false,
        }
    },

    methods: {
        setForm(){
            try {
                this.form.name = this.attribute.name
                this.form.label = this.attribute.label
                this.form.nameType = this.attribute.type
                this.form.priority = this.attribute.priority
                this.form.fillterable = this.attribute.is_filterable
            } catch (error) {
                
            }
        }
    },
    
    watch:{
        attribute(){
            this.setForm()
        }
    }
}
</script>
