<template>
    <div class="text-center">
        <v-btn
            @click="dialog = true"
            variant="outlined"
            rounded class="px-3 mt-1"
        >
            <template v-slot:prepend>
                <img src="@/assets/img/Download.svg" alt="shavaz image">
            </template>
دریافت خروجی
        </v-btn>

        <v-dialog
            v-model="dialog"
            width="468"
        >
            <v-card>
                <v-row
                    justify="center"
                    align="center"
                    class="pa-5"
                >
                    <v-col cols="4">
                        <v-btn @click="dialog = false" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>

                    <v-col cols="8">
                        <div class="text-left pl-10">
                            <span class="t14 w500">
                                دانلود
                            </span>
                        </div>
                    </v-col>
                </v-row>

                <div class="mt-3 mb-8 px-5">
                    <v-divider />
                </div>
                <v-row justify="end" v-if="hasFilter">
                    <v-col cols="6" >
                        <v-checkbox
                            v-model="filter"
                            class="mr-8"
                        >
                            <template v-slot:label>
                                <div>
                                    <span class="t14 w500">خروجی بهمراه اعمال فیلتر</span>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-col>
                </v-row>

                <div class="text-center my-5">
                    <v-btn
                        :loading="excelLoading"
                        @click="getExport()"
                        width="400"
                        color="black"
                        rounded
                    >
                        <span class="t14 w300" >
                            خروجی اکسل 
                        </span>
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { openToast } from "@/assets/js/functions";
import { AxiosCall } from '@/assets/js/axios_call.js'
export default {
    props: {
        getEndPoint: '',
        hasFilter: { 
            
            default: true
        }
    },
    data() {
        return {
            dialog: false,
            categoryName: '',
            label: '',
            active: false,
            excelLoading: false,
            filter: false
        }
    },

    methods: {
        /**
         * Get export
         */
        async getExport() {
            // var formdata = {}
            const AxiosMethod = new AxiosCall()
            this.excelLoading = true
            if (this.filter) {
                if (this.$route.query) {
                    var formData = this.$route.query
                    formData.per_page = 1000000
                }
                AxiosMethod.form = formData
            }
            AxiosMethod.end_point = this.getEndPoint
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_get()
            if (data) {
              console.log(data.message, 'data')
                this.excelLoading = false
                openToast(this.$store, data.message ||'درخواست شما ثبت شد', "success");
            }
            else {
                this.excelLoading = false
                openToast(
                    this.$store,
                    'درخواست با خطا مواجه شد',
                    "error"
                );

            }
        }
    },
}
</script>
