<template>
<div>
    <v-card min-height="70" class="ma-5 br-12">
        <div class="text-rigth pr-10 pt-6">
            <span class="t14 w500">
                ساخت پیام
            </span>
        </div>
    </v-card>

    <v-card class="ma-5 br-12" height="580">
        <!-- notification type -->
        <v-form v-model="valid" ref="createNotification">
            <v-row justify="center" class="px-15 pt-10">
                <v-col cols="3" class="py-0">
                    <div class="text-right my-2">
                        <span class="t12 w500">
                            {{ lables.title }}
                        </span>
                    </div>

                    <v-text-field
                        v-model="form.title"
                        :rules="rule"
                        clearable
                        variant="outlined"
                        type="text" />
                </v-col>

                <v-col cols="3" class="py-0">
                    <div class="text-right my-2">
                        <span class="t12 w500">
                            {{ lables.priority }}
                        </span>
                    </div>

                    <v-select
                        v-model="form.priority"
                        :items="priority"
                        clearable
                        :rules="rule"
                        variant="outlined"
                        type="text" />
                </v-col>

                <v-col cols="3" class="py-0">
                    <div class="text-right my-2">
                        <span class="t12 w500">
                            {{ lables.type }}
                        </span>
                    </div>

                    <v-select
                        v-model="form.type"
                        clearable
                        :items="typeMessages"
                        :rules="rule"
                        variant="outlined"
                        type="text" />
                </v-col>

                <v-col cols="4" class="py-0">
                    <div class="text-right my-2">
                        <span class="t12 w500">
                            {{ lables.admin }}
                        </span>
                    </div>

                    <v-select
                        :items="adminList"
                        :rules="rule"
                        v-model="form.admin"
                        clearable
                        variant="outlined"
                        type="text" />
                </v-col>

                <v-col cols="12" class="py-0">
                    <v-row
                        justify="start"
                        align="center"
                        class="px-15 pt-5">
                        <v-col cols="3">
                            <div class="d-flex align-center justify-start">
                                <v-checkbox v-model="hasSchedule" style="flex: inherit;"/>
                                <div class="text-right my-2 mt-5">
                                    <span class="t12 w500">
                                        {{ lables.schedule }}
                                    </span>
                                </div>
                            </div>
                        </v-col>

                        <v-col v-if="hasSchedule" cols="3">
                            <div class="text-right my-2">
                                <span class="t12 w500">
                                    {{ lables.scheduleDate }}
                                </span>
                            </div>

                            <v-text-field
                                clearable
                                v-model="form.scheduleDate"
                                variant="outlined"
                                type="text"
                                class="custom-input" />

                            <date-picker
                                clearable
                                custom-input=".custom-input"
                                format="jYYYY-jMM-jDD"
                                display-format="jYYYY-jMM-jDD"
                                v-model="form.scheduleDate" />
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" class="py-0">
                    <v-row
                        justify="start"
                        align="center"
                        class="px-15 pt-5">
                        <v-col cols="3">
                            <div class="d-flex align-center justify-start">
                                <v-checkbox hide-details v-model="hasAttachment" style="flex: inherit;"/>
                                <div class="text-right my-2 mt-5">
                                    <span class="t12 w500">
                                        {{ lables.hasAttachment }}
                                    </span>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-if="hasAttachment" cols="2">
                            <ModalAddFile
                                :type="file"
                                :title="lables.fileUpload"
                                module="notification"
                                :getImageId="getfileId" />
                        </v-col>

                        <v-col v-if="form.fileUrl" cols="10">
                            <div>
                                <a :href="form.fileUrl">
                                    <v-icon icon="mdi-file-outline" />
                                </a>
                                <span>{{form.fileUrl}}</span>
                            </div>
                            <!-- <v-btn
                                :href="form.fileUrl"
                                variant="outlined"
                                height="40"
                                rounded
                                class="px-5 mt-1 mr-5">
                                فایل آپلود شده
                            </v-btn> -->
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-form>

        <v-row justify="end" class="position__absolute bottom left">
            <v-btn
                :loading="loading"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
                <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                </template>
                ارسال پیام
            </v-btn>

            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5">
                <template v-slot:prepend>
                    <v-icon>mdi-cancel</v-icon>
                </template>
                انصراف
            </v-btn>
        </v-row>
    </v-card>
</div>
</template>

<script>
//Components
import Admin from '@/composables/Admin'
import ModalAddFile from '@/components/Public/ModalAddFile.vue'

//Mixin
import {
    AxiosCall
} from '@/assets/js/axios_call.js'
import {
    openToast
} from "@/assets/js/functions";
import {
    jalaliToGregorian
} from '@/assets/js/functions'

export default {
    components: {
        ModalAddFile
    },

    setup() {
        const {
            admin,
            getAdmins
        } = Admin();
        return {
            admin,
            getAdmins
        };
    },

    data: () => ({
        loading: false,
        valid: true,
        rule: [v => !!v || 'این فیلد الزامی است'],
        lables: {
            title: 'عنوان',
            admin: 'انتخاب کاربر',
            type: 'نوع پیام',
            priority: 'اولویت',
            schedule: 'پیام زمان بندی شده',
            scheduleDate: 'انتخاب تاریخ',
            hasAttachment: 'ارسال فایل',
            fileUpload: 'آپلود فایل'
        },
        priority: [{
                value: 'low',
                title: 'پایین'
            },
            {
                value: 'normal',
                title: 'عادی'
            },
            {
                value: 'high',
                title: 'بالا'
            },
        ],
        typeMessages: [{
                value: 'alarm',
                title: 'هشدار'
            },
            {
                value: 'message',
                title: 'پیام'
            },
            {
                value: 'news',
                title: 'خبری'
            },
            {
                value: 'general',
                title: 'عمومی'
            },

        ],
        form: {
            scheduleDate: null,
            fileId: null,
            fileUrl: null,
            title: null,
            priority: null,
            admin: null

        },
        hasSchedule: false,
        hasAttachment: false,
        scheduleDate: null
    }),

    methods: {
        /**
         * Get file Id
         * @param {*} file 
         */
        getfileId(file) {
            this.form.fileId = file.data.file_id
            this.form.fileUrl = file.data.url
        },

        /**
         * Form validation
         */
        validate() {
            if (this.hasAttachment && !this.form.fileId) {
                openToast(this.$store,
                    'فایلی انتخاب نشده',
                    "error")
            } else if (this.hasSchedule && !this.form.scheduleDate) {
                openToast(this.$store,
                    'تاریخ ارسال رو انتخاب کنید',
                    "error")
            } else {
                setTimeout(() => {
                    this.$refs.createNotification.validate()
                    if (this.valid) {
                        this.createNotification()
                    }
                }, 100);
            }
        },

        /**
         * Create Notification
         */
        async createNotification() {
            this.loading = true
            var formdata = new FormData();

            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = 'notification/admin/crud/create'
            AxiosMethod.form = formdata
            formdata.append('title', this.form.title)
            formdata.append('admin_id', this.form.admin)
            formdata.append('priority', this.form.priority)
            formdata.append('section', this.form.type)
            if (this.form.priority === 'low') formdata.append('color', 'green')
            if (this.form.priority === 'normal') formdata.append('color', 'warning')
            if (this.form.priority === 'high') formdata.append('color', 'error')
            if (this.hasAttachment) {
                formdata.append('has_attachment', 1)
                formdata.append('file_id', this.form.fileId)
            }
            if (this.hasSchedule) {
                const splitDate = this.form.scheduleDate.split('-')
                const finaldate = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
                formdata.append('has_schedule', 1)
                formdata.append('send_at', finaldate)
            }
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.toast_success = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.loading = false
                this.$router.push('/notifications/index')

            } else {
                this.loading = false
            }
        }
    },

    computed: {
        // return admin lis for select
        adminList() {

            try {
                const admins = []
                this.admin.data.forEach(element => {
                    const userForm = {
                        title: element.first_name + ' ' + element.last_name,
                        value: element.id
                    }
                    admins.push(userForm)
                });
                return admins

            } catch (error) {

            }
        },
    },

    mounted() {
        const filter = {
            per_page: 10000
        }
        this.getAdmins(filter)
    }
}
</script>
