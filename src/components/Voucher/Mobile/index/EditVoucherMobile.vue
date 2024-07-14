<template>
    <v-bottom-sheet v-model="editModal" height="80%">
        <v-card class="rounded-t-lg px-3 vh-100">
            <div class="d-flex justify-space-between t16500 py-6 px-5">
                <v-icon   @click="editModal = false"  class="bg-grey-lighten-3 rounded-circle" color="grey-darken-1">
                    mdi-close
                </v-icon>
                <span >ویرایش کد تخفیف</span>
            </div>

<!-- fields-->
            <v-form ref="addVoucher" class="px-5">
                <div class="t14500 text-gray600 text-right my-2">
                   عنوان *
                </div>
                <v-text-field
                    variant="outlined"
                    :rules="rule"
                    v-model="voucherForm.title"
                    rounded="lg">

                </v-text-field>

              <div class="t14500 text-gray600 text-right my-3 mt-6">
                  تاریخ پایان
              </div>
                <v-text-field
                    placeholder="روز و ساعت پایان"
                    density="compact"
                    variant="outlined"
                    single-line
                    class="end-date"
                    :rules="rule"
                    v-model="voucherForm.endTime" />
                <date-picker
                    class="d--rtl flex-grow-1 c-modal-table-filter__date-picker"
                    format="jYYYY-jMM-jDD HH:mm"
                    display-format="jYYYY-jMM-jDD HH:mm"
                    type="datetime"
                    v-model="voucherForm.endTime"
                    variant="outlined"
                    placeholder="تاریخ تولد"
                    custom-input=".end-date"
                />
            </v-form>


            <v-row
                no-gutters
                justify="space-between"
                align="end"
                class="px-5 my-5 mt-7">
                <v-btn
                    @click="editModal = false"
                    variant="outlined"
                    rounded
                    class="px-3 mt-1 mr-4">
                    بازگشت
                </v-btn>

                <v-btn
                    :loading="loading"
                    @click="updateVoucher"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 ">
                    ذخیره
                </v-btn>
            </v-row>
        </v-card>
    </v-bottom-sheet>
</template>

<script>
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import {convertDateToJalai, convertDateToGregorian, openToast} from "@/assets/js/functions";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
    components: {datePicker: VuePersianDatetimePicker},
    data(){
        return {
            editModal: false,
            loading: false,
            rule: [v => !!v || 'این فیلد الزامی است'],
            voucherDetail: null,
            voucherForm: {
                title: null,
                endTime:'',
            },
        }
    },
    props: {
        voucherId: Number
    },

    methods: {
        setForm() {
            try {
                this.voucherForm.title = this.voucherDetail.name
                this.voucherForm.endTime = this.voucherDetail.end_time_fa

            } catch (error) {
                console.log(error)
            }
        },

        async getVoucherDetail() {

            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `voucher/crud/get/${this.voucherId}`
            let data = await AxiosMethod.axios_get()
            if (data) {
                this.voucherDetail = data.data
            }
        },

        async updateVoucher() {
            try {
                this.loading = true
                let formData = new FormData();
                const AxiosMethod = new AxiosCall()
                const splitEndDate = this.voucherForm.endTime.split(' ')
                const endTime = convertDateToGregorian(splitEndDate[0] , '-' , false)
                AxiosMethod.end_point = `voucher/crud/update/${this.voucherId}`
                formData.append('name', this.voucherForm.title)
                formData.append('end_time' , `${endTime} ${splitEndDate[1]}:00`)

                AxiosMethod.form = formData
                AxiosMethod.store = this.$store
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                let data = await AxiosMethod.axios_post()
                if (data) {
                    this.loading = false
                    this.editModal = false
                    openToast(this.$store,
                        'کد تخفیف با موفقیت ویرایش شد.',
                        "success")
                    this.$emit('updateVoucherList')
                } else {
                    this.loading = false
                    this.editModal = false

                    openToast(this.$store,
                        'ویرایش کد تخفیف با مشکل مواجه شد',
                        "error")
                }
            }
            catch (e) {
                this.loading = false
                this.editModal = false
            }
        },
    },

    watch: {
        voucherId(val) {
            this.getVoucherDetail()
        },

        voucherDetail(val) {
            this.setForm()
        },
    }
}
</script>

