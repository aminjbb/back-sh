<template>
    <v-bottom-sheet v-model="createModal" >
        <v-card class="rounded-t-lg px-3">

            <div class="d-flex justify-space-between t16500 py-6">
                <v-icon   @click="createModal = false"  class="bg-grey-lighten-3 rounded-circle" color="grey-darken-1">
                    mdi-close
                </v-icon>
                <span>ساخت کد تخفیف</span>
            </div>

            <CreateVoucherFrom ref="CreateVoucherFrom" class="my-2"/>

             <v-row no-gutters class=" mb-5 ">
                <v-col class="me-2">
                    <v-btn
                        :loading="loading"
                        @click="validate"
                        color="primary500 "
                        class="px-3 t14500"
                        rounded
                        block
                    >
                        تایید
                    </v-btn>
                </v-col>

                <v-col class="ms-2">
                    <v-btn
                        @click="createModal = false"
                        color="primary500"
                        variant="outlined"
                        class="px-3 t14500"
                        rounded
                        block
                    >
                        انصراف
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-bottom-sheet>
</template>

<script>
import {AxiosCall} from "@/assets/js/axios_call";
import {convertDateToGregorian, openToast} from "@/assets/js/functions";
import CreateVoucherFrom from "@/components/Voucher/Add/CreateVoucherFrom.vue";

export default {
    data(){
        return {
            createModal: false,
            loading: false,
        }
    },
    components: {
        CreateVoucherFrom
    },

    methods:{

        validate() {
            this.$refs.CreateVoucherFrom.$refs.addVoucher.validate()
            setTimeout(()=>{
                let isFileNull = false

                this.$refs.CreateVoucherFrom.voucherForm.voucherCondition.forEach((condition, index) => {
                    switch (condition.data) {
                        case null:
                            isFileNull = true
                            openToast(this.$store,`پر کردن اطلاعات ${condition.title} الزامی است` , 'error')
                            break;
                        default:
                            isFileNull = false
                            break;
                    }
                })
                if (this.$refs.CreateVoucherFrom.valid && !isFileNull){
                    this.createVoucher()
                }
            }, 200)


        },

        async createVoucher() {
            try {
                this.loading = true
                let formData = new FormData();
                const AxiosMethod = new AxiosCall()
                AxiosMethod.end_point = 'voucher/crud/create'
                formData.append('name', this.$refs.CreateVoucherFrom.voucherForm.title)
                formData.append('code', this.$refs.CreateVoucherFrom.voucherForm.code)
                formData.append('discount_type', this.$refs.CreateVoucherFrom.voucherForm.voucherAmountType)
                formData.append('discount', this.$refs.CreateVoucherFrom.voucherForm.voucherAmount)
                formData.append('is_active', this.$refs.CreateVoucherFrom.voucherForm.voucherActive)
                formData.append('sending_price', this.$refs.CreateVoucherFrom.voucherForm.sending)
                formData.append('voucher_type', this.$refs.CreateVoucherFrom.voucherForm.voucherType)
                if (this.$refs.CreateVoucherFrom.voucherForm.voucherType === 'group')  formData.append('count', this.$refs.CreateVoucherFrom.voucherForm.voucherCount)
                this.$refs.CreateVoucherFrom.voucherForm.voucherCondition.forEach((condition, index) => {
                    if (condition.value === 'start-and-end-time'){
                        const startDateSplit = condition.raw.data[0].split(' ')
                        const endDateSplit = condition.raw.data[1].split(' ')
                        formData.append('start_time', convertDateToGregorian(startDateSplit[0] , '/' , false) + ' ' + startDateSplit[1]+':00')
                        formData.append('end_time', convertDateToGregorian(endDateSplit[0] , '/' , false) +  ' ' + endDateSplit[1]+':00')
                    }
                    else {
                        formData.append(condition.value, condition.raw.data)
                    }
                })
                AxiosMethod.form = formData
                AxiosMethod.store = this.$store
                AxiosMethod.using_auth = true
                AxiosMethod.token = this.$cookies.get('adminToken')
                let data = await AxiosMethod.axios_post()
                if (data) {
                    this.loading = false
                    this.createModal = false
                    this.$emit('updateVoucherList')
                } else {
                    this.loading = false
                    openToast(this.$store,
                        'ایجاد کد تخفیف مشکل مواجه شد',
                        "error")
                }
            }
            catch (e) {
                this.loading = false
            }
        },
    }

}
</script>

