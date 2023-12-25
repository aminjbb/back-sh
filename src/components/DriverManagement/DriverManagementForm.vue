<template lang="">
    <div>
        <v-form ref="addFactor" v-model="valid">
            <v-row
                justify="start"
                align="center"
                class="px-15">
                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            نام و نام خانوادگی *
                        </span>
                    </div>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                      
                        v-model="form.full_name" />
                </v-col>
    
                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            کد ملی *
                       </span>
                    </div>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                      
                        v-model="form.identification_code" />
                </v-col>
            </v-row>
            <v-row align="center" class="px-15">
                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            شماره موبایل *
                        </span>
                    </div>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                     
                        v-model="form.phone_number" />
                </v-col>
            </v-row>
        </v-form>
    </div>
    </template>
    
    <script>
  
    
    export default {
        props: {
            type: '',
            driver: {},
        },
    
        setup(props) {
            
    
            return {
               
            };
        },
    
        data() {
            return {
                valid: true,
    
                form: {
                    full_name: '',
                    identification_code: '',
                    phone_number: '',
                    
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
                receivedImages: [],
            }
        },
    
        computed: {
           
        },
    
        methods: {
            /**
             * Set form
             */
            setForm() {
                try {
                    this.form.full_name = this.driver.full_name
                    this.form.identification_code = this.driver.identification_code
                    this.form.phone_number = this.driver.phone_number
                   
                } catch (error) {}
            },
        },
    
        mounted() {
           
        },
    
        watch: {
            driver() {
                this.setForm();
            }
        }
    }
    </script>
    