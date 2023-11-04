<template lang="">
    <div>
        <v-form ref="addSlider" v-model="valid">
            <v-row
                justify="center"
                align="center"
                class="px-15">
                <v-col cols="12" md="6">
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
                        v-model="form.name" />
                </v-col>
    
                <v-col cols="12" md="6">
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
                        v-model="form.label" />
                </v-col>
            </v-row>
            <v-row
                justify="center"
                align="center"
                class="px-15">
                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            جایگاه
                        </span>
                    </div>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                        label="جایگاه"
                        v-model="form.position" />
                </v-col>
    
                <v-col cols="12" md="6">
                    <div class="text-right my-5">
                        <span class="t14500">
                            ایکون
                        </span>
                    </div>
                    <v-text-field
                        :rules="englishRule"
                        density="compact"
                        variant="outlined"
                        single-line
                        label="ایکون"
                        v-model="form.icon" />
                </v-col>
            </v-row>
        </v-form>
    </div>
    </template>
    
    <script>
    export default {
        props: {
            type: '',
            slider: {},
        },
    
        data() {
            return {
                valid: true,
    
                form: {
                    name: '',
                    label: '',
                    position: '',
                    icon: '',
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
            }
        },
    
        methods: {
            /**
             * Set form
             */
            setForm() {
                try {
                    this.form.name = this.slider.name
                    this.form.label = this.slider.label
                    this.form.position = this.slider.position
                    this.form.icon = this.slider.icon
                } catch (error) {}
            },
        },
    
        watch: {
            slider() {
                this.setForm()
            }
        }
    }
    </script>
    