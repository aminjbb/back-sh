import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const orderList = ref([]);
    const manualOrderList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()
    const manualOrderListGet = ref([])

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه سفارش', show: true , value:'id', order: false},
        { name: 'شماره سفارش', show: true , value:'order_number', order: false},
        { name: 'نام مشتری', show: true, value:'user' , order: false},
        { name: 'شماره تماس', show: true, value:'phone_number' , order: false},
        { name: 'تعداد کالا', show: false , value:'shps_count', order: false},
        { name: 'وضعیت سفارش', show: true, value:'status', order: false },
        { name: 'اسنپ پی', show: true, value:'snapp_transaction_id' , order: false},
        { name: 'وضعیت پرداخت', show: true, value:'payment_status', order: false },
        { name: 'روش پرداخت', show: true, value:'payment_method', order: false },
        { name: 'مبلغ پرداختی', show: true, value:'paid_price', order: false },
        { name: 'وضعیت بارگیری', show: true, value:'packed_status', order: false },
        { name: 'تاریخ ثبت سفارش', show: true, value:'submit_date', order: true },
        { name: 'تاریخ ارسال سفارش', show: true, value:'logistic_date', order: true },
    ]);

    const headerCanselOrder =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه کالا', show: true , value:'shps_id', order: false},
        { name: 'نام کالا', show: true, value:'shps_label' , order: false},
        { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
        { name: 'تعداد کالاهای کنسلی', show: true , value:'cancel', order: false},
        { name: 'تعداد کالاهای کنسل شده', show: true , value:'cancelled_count', order: false},
        { name: 'تعداد کالاهای باقی‌مانده', show: true , value:'remained_count', order: false},
        { name: 'فروشگاه', show: true, value:'shopping_name', order: false },
        { name: 'قیمت کالا', show: true, value:'price', order: false },
        { name: 'مقدار تخفیف پایه', show: true, value:'base_discount', order: false },
        { name: 'مقدار تخفیف مارکتینگ', show: true, value:'marketing_discount', order: false },
        { name: 'کد تخفیف', show: true, value:'code', order: false },
        { name: 'پرداخت نهایی', show: true, value:'total_price', order: false },
        { name: 'وضعیت کالا', show: true, value:'shps_status', order: false },
    ]);

    const filterField = [
        {name:'شناسه سفارش' , type:'text', value:'id'},
        {name:'اسنپ پی' , type:'text', value:'snapp_transaction_id'},
        {name:'شماره سفارش' , type:'text', value:'order_number'},
        {name:'نام مشتری' , type:'select', value:'user_id'},
        {name:'وضعیت سفارش' , type:'select', value:'status'},
        {name:'وضعیت پرداخت' , type:'select', value:'payment_status'},
        {name:'روش پرداخت' , type: 'select', value:'payment_method'},
        {name:'وضعیت بارگیری' , type:'select', value:'packed_status'},
        //{name:'کد معرف' , type:'text', value:'identification_code'},
        //{name:'شناسه بانکی' , type:'text', value:'bank_id'},
        {name:'استان' , type:'select', value:'receive_state_id'},
        {name:'شهر' , type:'select', value:'receive_city_id'},
        {name:'تاریخ ثبت سفارش' , type:'date', value:'created_at'},
        {name:'تاریخ ارسال سفارش' , type:'date', value:'logistic_date'},
        {name:'کمترین مبلغ پرداختی ' , type:'text', value:'paid_price_from'},
        {name:'بیشترین مبلغ پرداختی ' , type:'text', value:'paid_price_to'},
    ];

    const shpsModalHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه کالا', show: true , value:'shps_id', order: false},
        { name: 'نام کالا', show: true, value:'shps_label' , order: false},
        { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
        { name: 'تعداد کالاهای کنسلی', show: true , value:'cancelled_count', order: false},
        { name: 'تعداد کالاهای باقی‌مانده', show: true , value:'remained_count', order: false},
        { name: 'فروشگاه', show: true, value:'shopping_name', order: false },
        { name: 'قیمت کالا', show: true, value:'price', order: false },
        { name: 'مقدار تخفیف پایه', show: true, value:'base_discount', order: false },
        { name: 'مقدار تخفیف مارکتینگ', show: true, value:'marketing_discount', order: false },
        { name: 'کد تخفیف', show: true, value:'code', order: false },
        { name: 'پرداخت نهایی', show: true, value:'total_price', order: false },
    ]);
    const manualOrderHeader =ref([
        {name:'شناسه سفارش' , type:'text', value:'id'},
        {name:'اسنپ پی' , type:'text', value:'snapp_transaction_id'},
        {name:'شماره سفارش' , type:'text', value:'order_number'},
        {name:'نام مشتری' , type:'select', value:'user_id'},
        {name:'وضعیت سفارش' , type:'select', value:'status'},
        {name:'وضعیت پرداخت' , type:'select', value:'payment_status'},
        {name:'روش پرداخت' , type: 'select', value:'payment_method'},
        {name:'وضعیت بارگیری' , type:'select', value:'packed_status'},
        //{name:'کد معرف' , type:'text', value:'identification_code'},
        //{name:'شناسه بانکی' , type:'text', value:'bank_id'},
        {name:'استان' , type:'select', value:'receive_state_id'},
        {name:'شهر' , type:'select', value:'receive_city_id'},
        {name:'تاریخ ثبت سفارش' , type:'date', value:'created_at'},
        {name:'تاریخ ارسال سفارش' , type:'date', value:'logistic_at'},
        {name:'کمترین مبلغ پرداختی ' , type:'text', value:'paid_price_from'},
        {name:'بیشترین مبلغ پرداختی ' , type:'text', value:'paid_price_to'},

    ]);

    const discountModalHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'عنوان', show: true , value:'label', order: false},
        { name: 'کد تخفیف', show: true, value:'code' , order: false},
        { name: 'مقدار تخفیف', show: true , value:'discount_amount', order: false},
        { name: 'تاریخ شروع', show: true, value:'start_time', order: false },
        { name: 'تاریخ پایان', show: true, value:'end_time', order: false },
    ]);

    const factorModalHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps_id', order: false},
        { name: 'نام کالا', show: true, value:'shps_label' , order: false},
        { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
        { name: 'مبلغ واحد(ریال)', show: true , value:'price', order: false},
        { name: 'مبلغ کل(ریال)', show: true, value:'total_price', order: false },
        { name: 'مبلغ کل تخفیف(ریال)', show: true, value:'price', order: false },
        { name: 'مبلغ کل پس از تخفیف (ریال)', show: true, value:'base_discount', order: false },
        { name: 'مبلغ جمع مالیات و عوارض (ریال)', show: true, value:'tax_amount', order: false },
        { name: 'جمع مبلغ کل بعلاوه جمع  مالیات و عوارض (ریال)', show: true, value:'tax_amount_sum' , order: false},
    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    async function getOrderList() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }

        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            orderList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function getManualOrderList() {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }

        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/shps/detail/${route.params.orderId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            manualOrderList.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function getManualOrderListGet() {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }

        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/order/crud/get/${route.params.orderId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            manualOrderListGet.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    return {pageLength,filterField, orderList, getOrderList, dataTableLength, page, header,loading, shpsModalHeader,
        discountModalHeader, factorModalHeader, getManualOrderListGet , manualOrderListGet, getManualOrderList,
        manualOrderHeader, manualOrderList, headerCanselOrder}
}
