<template>
<div>
    <v-form ref="addRole" v-model="valid">
        <v-row justify="center" align="center">
            <v-col cols="12" md="5">
                <div class="text-right my-5">
                    <span class="t14 w500">
                        نام انگلیسی
                    </span>
                </div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    single-line
                    label="نام انگلیسی"
                    :rules="englishRule"
                    v-model="form.name" />
            </v-col>

            <v-col cols="12" md="5">
                <div class="text-right my-5">
                    <span class="t14 w500">
                        نام فارسی
                    </span>
                </div>
                <v-text-field
                    density="compact"
                    variant="outlined"
                    single-line
                    label="نام فارسی"
                    :rules="persianRule"
                    v-model="form.lable" />
            </v-col>

            <v-col cols="12" md="6">
                <div class="text-right my-5">
                    <span class="t14 w500">
                        دسترسی
                    </span>
                </div>

                <v-autocomplete
                    class="role-permission-input"
                    v-model="form.permissions"
                    :items="permissionList"
                    chips
                    closable-chips
                    color="blue-grey-lighten-2"
                    item-title="name"
                    item-value="id"
                    multiple
                    variant="outlined">
                    <template v-slot:chip="{ props, item }">
                        <v-chip
                            v-bind="props"
                            :text="item.props.title"
                            class="t14 w500"></v-chip>
                    </template>

                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item?.props?.title"></v-list-item>
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
    </v-form>
</div>
</template>

<script>
import Permission from '@/composables/Permission'
export default {
    setup() {
        const {
            getAllPermissions,
            allPermission
        } = new Permission()
        return {
            getAllPermissions,
            allPermission
        }
    },
    props: {
        role: null
    },

    data() {
        return {
            form: {
                name: '',
                lable: '',
                permissions: []
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
         * @param {*} url
         */
        getAvatar(url) {
            this.form.avatar = url
        },

        /**
         * Set from
         */
        setForm() {
            try {
                this.form.name = this.role.name
                this.form.lable = this.role.label
                this.role.permissions.forEach(permission => {
                    this.form.permissions.push(permission.id)
                })
            } catch (error) {}
        }
    },

    watch: {
        role() {
            this.setForm()
        }
    },
    computed: {
        permissionList() {
            try {
                let permissions = []
                this.allPermission.forEach(permission => {
                    const form = {
                        name: permission.label,
                        id: permission.id
                    }
                    permissions.push(form)
                })
                return permissions
            } catch (e) {
                return []
            }
        }
    },
    mounted() {
        this.getAllPermissions()
    }

}
</script>
