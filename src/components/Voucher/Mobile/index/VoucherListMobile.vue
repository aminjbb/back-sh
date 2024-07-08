<template>
    <div >
        <v-row
            no-gutters
            justify="space-between"
            align="end"
            class="px-5 mb-3">

            <v-btn
                @click="openCreate"
                color="primary500"
                height="40"
                rounded
                class="px-8 ">
                <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                </template>
                افزودن
            </v-btn>

            <PanelFilter
                @resetPage="resetPage"
                path="voucher/index"
                :filterField="indexFilterField"
                :typeItems="voucherTypes"
                :statusItems="activeFilter"
                :voucherAmountTypes="voucherAmountTypes"
                :sendingItems="sendingItems"
                :page="page"
                :perPage="dataTableLength"/>
        </v-row>

        <v-card v-for="(voucher, i) in voucherList" :key="i"
                class=" pa-3 mx-5 my-2 br-12 flex-grow-1 d-flex flex-column align-stretch">

            <v-row no-gutters class="t12500 number-font " >
                <v-col cols="12" class="my-1">
                    <v-row no-gutters>
                        <v-icon>mdi-circle-small</v-icon>
                        <span>  {{ `عنوان  : ${voucher.name}` }} </span>
                        <v-spacer></v-spacer>
<!-- delete voucher-->
                        <v-icon class="me-auto" color="red" size="large" @click="removeItem(voucher.id)">
                            mdi-trash-can-outline
                        </v-icon>
                    </v-row>

                </v-col>

                <v-col cols="6" class="my-1">
                    <v-icon>mdi-circle-small</v-icon>
                    <span>مقدار تخفیف : </span>
                    {{voucher?.discount}}
                </v-col>

                <v-col cols="6" class="my-1">
                    <v-icon>mdi-circle-small</v-icon>
                    {{discountType(voucher.discount_type)}}
                </v-col>

                <v-col cols="6" class="my-1">
                    <v-icon>mdi-circle-small</v-icon>
                    <span>نوع  تخفیف : </span>
                    {{voucherType(voucher.voucher_type)}}
                </v-col>

                <v-col cols="6" class="my-1">
                    <v-icon>mdi-circle-small</v-icon>
                    <span> کد تخفیف :</span>
                    {{voucher.code}}
                </v-col>
            </v-row>

            <v-row no-gutters >
                <v-col class="me-1">
                    <v-btn
                        @click="openDetails(voucher.id)"
                        variant="outlined"
                        color="primary500 "
                        rounded class="px-3 mt-1 t14500"
                        block
                    >
                        نمایش بیشتر
                    </v-btn>
                </v-col>

                <v-col class="ms-1">
                    <v-btn
                        @click="openOperation(voucher.id)"
                        variant="outlined"
                        color="primary500"
                        class="px-3 mt-1 t14500"
                        rounded
                        block
                    >
                        عملیات
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>


        <v-card class=" py-3 mx-5 my-2  br-12">
            <v-row class="px-8 align-center justify-center" no-gutters >

                <v-col cols="12" class="mb-2 d-flex justify-center">
                    <v-pagination
                        v-model="page"
                        :length="pageLength"
                        rounded="circle"
                        size="20"
                        :total-visible="3"
                        prev-icon="mdi-chevron-right"
                        next-icon="mdi-chevron-left" />
                </v-col>

                <div class="d-flex align-center  t12300">
                   <span class="ml-5">
                     تعداد سطر در هر صفحه
                   </span>
                    <v-select
                        v-model="dataTableLength"
                        variant="outlined"
                        :items="[25,50,100]" />
                </div>
            </v-row>
        </v-card>
    </div>

<!-- create-->
    <CreateVoucher  ref="CreateVoucher"/>
<!-- show more voucher details-->
    <DetailsDiscount  ref="DetailsDiscount" :voucherId="voucherId"/>
<!-- operation -->
    <operations  ref="operations"/>

</template>

<script>
import Voucher from "@/composables/Voucher";
import {openConfirm, openToast} from "@/assets/js/functions";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import CreateVoucher from '@/components/Voucher/mobile/index/CreateVoucherMobile.vue'
import DetailsDiscount from '@/components/Voucher/mobile/index/DetailsDiscountMobile.vue'
import operations from '@/components/Voucher/mobile/index/VoucherOperationMobile.vue'

export default {
    data() {
        return {
            perPageFilter:false,
            voucherId: null,
        }
    },

    setup(props) {
        const voucherTypes= [
            {
                title: 'همه',
                value: ''
            },
            {
                title: 'عادی',
                value: 'regular'
            },
            {
                title: 'گروهی',
                value: 'group'
            },
            {
                title: 'نظیر به نظیر',
                value: 'peer_to_peer'
            },

        ]
        const voucherAmountTypes= [
            {
                title: 'همه',
                value: ''
            },
            {
                title: 'ریالی',
                value: 'rial'
            },
            {
                title: 'درصدی',
                value: 'percent'
            },

        ]
        const activeFilter= [
            {
                label: 'وضعیت',
                value: '',
            },
            {
                label: 'فعال',
                value: '1',
            },
            {
                label: 'غیرفعال',
                value: '0',
            }
        ]
        const sendingItems = [
            {
                title: 'همه',
                value: ''
            },
            {
                title: 'پیش فرض',
                value: 'default'
            },
            {
                title: 'رایگان',
                value: 'free'
            }
        ]
        const {
            headerVouchers,
            filterField,
            page,
            voucherList,
            dataTableLength,
            pageLength,
            getVoucherList,
            indexFilterField,
        } = Voucher()
        return {
            headerVouchers ,
            filterField ,
            page ,
            voucherList,
            dataTableLength ,
            pageLength ,
            getVoucherList ,
            indexFilterField ,
            voucherTypes,
            voucherAmountTypes,
            activeFilter,
            sendingItems
        }
    },

    components: {
        PanelFilter,
        DetailsDiscount,
        CreateVoucher,
        operations,
    },

    methods: {
        resetPage(){
            this.perPageFilter = true
            this.page = 1
            setTimeout(()=>{
                this.perPageFilter = false
            }, 1000)
        },

        voucherType(value){
            if(value === 'regular'){
                return  'عادی'
            } else if(value === "group"){
                return 'گروهی'
            } else if(value === 'peer_to_peer'){
                return 'نظیر به نظیر'
            } else if(value === ''){
                return 'همه'
            }
        },

        discountType(value){
            if(value === 'rial'){
                return  'ریالی'
            } else if(value === "percent"){
                return 'درصدی'
            } else if(value === ''){
                return 'همه'
            }
        },

        openCreate(){
            this.$refs.CreateVoucher.create = true
        },
        removeItem(id) {
            openConfirm(this.$store, "آیا از حذف آیتم مورد نظر مطمئن هستید ؟", "حذف تخفیف", "delete", "voucher/crud/delete/" + id, true);
        },
        openDetails(val){
            this.$refs.DetailsDiscount.details = true
            this.voucherId = val
        },
        openOperation(val){
            this.$refs.DetailsDiscount.operations = false
            this.voucherId = val
        }
    },

    mounted() {
        this.getVoucherList()
    },

    watch: {

        dataTableLength() {
            this.perPageFilter = true
            this.page = 1
            let query = this.$route.query
            if (query) {
                this.$router.replace({
                    query: {
                        ...query,
                        per_page: this.dataTableLength,
                    }
                })
            }
            else {
                this.$router.push({
                    query: {
                        per_page: this.dataTableLength,
                    }
                })
            }
            this.perPageFilter = false
        },
        $route(to){
            this.getVoucherList(to)
        },
        page(){
            if (!this.perPageFilter){
                this.getVoucherList()
            }
        }
    }
}
</script>
