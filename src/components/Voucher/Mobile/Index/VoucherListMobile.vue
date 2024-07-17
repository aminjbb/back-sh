<template>
    <div class="h-100 scroller">
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

            <PanelFilterMobile
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
                        <v-icon class="me-auto" color="red" size="large" @click="removeVoucher(voucher.id)">
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
                        :total-visible="5"
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
    <CreateVoucher  ref="CreateVoucher" @updateVoucherList="updateList('created')"/>
<!-- show more voucher details-->
    <DetailsDiscount  ref="DetailsDiscount" @updateVoucherList="updateList('statusChanged')"/>
<!-- operation -->
<operations  ref="operations" :voucherId="voucherId" @openEdit="openEdit"/>
<!-- edit -->
    <EditVoucher  ref="EditVoucher" :voucherId="voucherId" @updateVoucherList="updateList('updated')"/>
<!-- delete -->
    <deleteVoucher  ref="deleteVoucher" :title="deleteTitle" :text="deleteText" :endPoint="endPointVoucher" @updateVoucherList="updateList('deleted')"/>

</template>

<script>
import Voucher from "@/composables/Voucher";
import {openConfirm, openToast} from "@/assets/js/functions";
import PanelFilterMobile from "@/components/PanelFilterMobile.vue";
import CreateVoucher from '@/components/Voucher/Mobile/Index/CreateVoucherMobile.vue'
import DetailsDiscount from '@/components/Voucher/Mobile/Index/DetailsDiscountMobile.vue'
import operations from '@/components/Voucher/Mobile/Index/VoucherOperationMobile.vue'
import EditVoucher from '@/components/Voucher/Mobile/Index/EditVoucherMobile.vue'
import deleteVoucher from '@/components/Public/ConfirmModalMobile.vue'


export default {
    data() {
        return {
            perPageFilter:false,
            voucherId: Number,
            endPointVoucher: String,
            deleteTitle: "حذف کد تخفیف",
            deleteText: "آیا از حذف کد تخفیف اطمینان دارید؟"
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
        PanelFilterMobile,
        DetailsDiscount,
        CreateVoucher,
        operations,
        EditVoucher,
        deleteVoucher
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
            this.$refs.CreateVoucher.createModal = true
        },
        openDetails(id){
            this.$refs.DetailsDiscount.detailsModal = true
            this.$refs.DetailsDiscount.id = id
        },
        openOperation(id){
            this.$refs.operations.operations = true
            this.voucherId = id
        },
        openEdit(){
            this.$refs.EditVoucher.editModal = true
        },
        removeVoucher(id) {
            this.$refs.deleteVoucher.deleteModal = true
            this.endPointVoucher = "voucher/crud/delete/" + id
        },

        updateList(val) {
            this.getVoucherList();
            if(val === "deleted"){
                openToast(
                    this.$store,
                    'کد تخفیف با موفقیت حذف شد',
                    "success"
                );}
            else if(val === "updated"){
                openToast(
                    this.$store,
                    'کد تخفیف با موفقیت آپدیت شد',
                    "success"
                );
            } else if(val === "created"){
                openToast(
                    this.$store,
                    'کد تخفیف با موفقیت ساخته شد',
                    "success"
                );
            } else if(val === "statusChanged"){
                openToast(
                    this.$store,
                    'وضعیت فعال سازی کد تخفیف با موفقیت تغییر کرد',
                    "success"
                );
            }
        },

        scrollToTop() {
            document.querySelector('.scroller').scrollTo({top: 0, behavior: 'smooth'})
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
            this.scrollToTop()
            if (!this.perPageFilter){
                this.getVoucherList()
            }
        }
    }
}
</script>
