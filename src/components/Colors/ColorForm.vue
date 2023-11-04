<template lang="">
    <div>
        <v-form ref="addColor" v-model="valid">
            <v-row justify="center" align="center">
                <v-col cols="12" md="5">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اسم انگلیسی
                        </span>
                    </div>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اسم انگلیسی"
                        :rules="englishRule"
                        v-model="form.name"
                    />
                </v-col>

                <v-col cols="12" md="5">
                    <div class="text-right my-5">
                        <span class="t14500">
                            اسم فارسی
                        </span>
                    </div>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        single-line
                        label="اسم فارسی"
                        :rules="persianRule"
                        v-model="form.label"
                    />
                </v-col>

                <v-col cols="12" md="5">
                    <div class="text-right my-5">
                        <span class="t14500">
                            گروه رنگ
                        </span>
                    </div>
                    <v-combobox
                        :items="groupList"
                        v-model="form.group"
                        label="گروه رنگ"
                        single-line
                        clearable
                        density="compact"
                        variant="outlined"
                    />
                </v-col>

                <v-col cols="12" md="5">
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

                <v-col cols="12" md="3">
                    <v-color-picker
                        v-model="form.color"
                        elevation="1"
                    />
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>
<script>
import { watch } from 'vue'

export default {
    props: {
        color: '',
        type: '',
        groupList: [],
    },

    data() {
        return {
            form: {
                active: 0,
                name: '',
                label: '',
                color: '#ff00ff',
                group: '',
                priority: 1
            },
            rule: [v => !!v || 'این فیلد الزامی است'],
            valid: false,
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
         * Get image id
         * @param {*} id 
         */
        getImageId(id) {
            this.imgId = id
        },

        /**
         * Set from
         */
        setForm() {
            try {
                this.form.name = this.color.name
                this.form.label = this.color.label
                this.form.category = this.color.category
                this.form.priority = this.color.priority
                this.form.group = this.color.group
                this.form.color = this.color.value
                this.form.active = this.color.is_active

            } catch (error) { }
        }
    },

    watch: {
        color(val) {
            this.setForm()
        }
    }
}
</script>
