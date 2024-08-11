import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useRoute} from 'vue-router'
import {useCookies} from "vue3-cookies";

export default function setup() {
    const returnedOrderList = ref([]);
    const returnedOrder = ref(null);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    const header = ref([
        {name: 'ردیف',title: 'ردیف', show: true, key: 'row', sortable: false, align:'center'},
        {name: 'شناسه سفارش',title: 'شناسه سفارش', show: true, key: 'id', sortable: false, align:'center'},
        {name: 'شناسه مرجوعی',title: 'شناسه مرجوعی', show: true, key: 'returned_id', sortable: false, align:'center'},
        {name: 'نام مشتری',title: 'نام مشتری', show: true, key: 'user', sortable: false, align:'center'},
        {name: 'تعداد کالا',title: 'تعداد کالا', show: true, key: 'shps_count', sortable: false, align:'center'},
        {name: 'وضعیت سفارش',title: 'وضعیت سفارش', show: false, key: 'orderStatus', sortable: false, align:'center'},
        {name: 'وضعیت مرجوعی',title: 'وضعیت مرجوعی', show: true, key: 'returned_status', sortable: false, align:'center'},
        {name: 'وضعیت پرداخت',title: 'وضعیت پرداخت', show: false, key: 'payment_status', sortable: false, align:'center'},
        {name: 'روش پرداخت',title: 'روش پرداخت', show: true, key: 'payment_method', sortable: false, align:'center'},
        {name: 'مبلغ پرداختی',title: 'مبلغ پرداختی', show: true, key: 'paid_price', sortable: false, align:'center'},
        {name: 'بررسی درخواست',title: 'بررسی درخواست', show: true, key: 'request_status', sortable: false, align:'center', model:'icon'},
        {name: 'وضعیت بارگیری',title: 'وضعیت بارگیری', show: false, key: 'packed_status', sortable: false, align:'center', model:'icon'},
        {name: 'تاریخ ثبت سفارش',title: 'تاریخ ثبت سفارش', show: false, key: 'submit_date_fa', align:'center'},
        {name: 'تاریخ ارسال سفارش',title: 'تاریخ ارسال سفارش', show: true, key: 'receive_date_fa', align:'center'},
        {name: 'تاریخ ثبت مرجوعی',title: 'تاریخ ثبت مرجوعی', show: true, key: 'created_at_fa', sortable: false, align:'center'},
        {name: 'مبلغ تخفیف',title: 'مبلغ تخفیف', show: false, key: 'discount', sortable: false, align:'center'},
        {name: 'استان',title: 'استان', show: false, key: 'state', sortable: false, align:'center'},
        {name: 'شهر',title: 'شهر', show: false, key: 'city', sortable: false, align:'center'},
        {name: 'کد معرف',title: 'کد معرف', show: false, key: 'identifier_code', sortable: false, align:'center'},
        {name: 'شناسه بانکی',title: 'شناسه بانکی', show: false, key: 'bank_id', sortable: false, align:'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [
        {name: 'شناسه مرجوعی', type: 'text', value: 'id'},
        {name: 'شناسه سفارش', type: 'text', value: 'order_id'},
        {name: 'نام مشتری', type: 'select', value: 'user_id'},
        {name: 'وضعیت مرجوعی', type: 'select', value: 'status'},
        {name: 'روش پرداخت', type: 'select', value: 'payment_method'},
        {name: 'بررسی درخواست', type: 'select', value: 'packed_status'},
       // {name: 'کد معرف', type: 'text', value: 'identification_code'},
       // {name: 'شناسه بانکی', type: 'text', value: 'bank_id'},
       {name:'استان' , type:'select', value:'state_id'},
       {name:'شهر' , type:'select', value:'city_id'},
       {name:'تاریخ ثبت سفارش' , type:'date', value:'created_at'},
       {name:'تاریخ ارسال سفارش' , type:'date', value:'logistic_at'},
       {name:'کمترین مبلغ پرداختی ' , type:'text', value:'paid_price_from'},
       {name:'بیشترین مبلغ پرداختی ' , type:'text', value:'paid_price_to'},
    ];

    /**
     * Details modal headers
     */
    const discountModalHeader = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'عنوان', show: true, value: 'label', order: false},
        {name: 'کد تخفیف', show: true, value: 'code', order: false},
        {name: 'مقدار تخفیف', show: true, value: 'discount_amount', order: false},
        {name: 'تاریخ شروع', show: true, value: 'start_time', order: false},
        {name: 'تاریخ پایان', show: true, value: 'end_time', order: false},
    ]);

    const shpsModalHeader = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه کالا', show: true, value: 'shps_id', order: false},
        {name: 'نام کالا', show: true, value: 'shps_label', order: false},
        {name: 'تعداد کالا', show: true, value: 'shps_count', order: false},
        {name: 'فروشگاه', show: true, value: 'shopping_name', order: false},
        {name: 'قیمت کالا', show: true, value: 'price', order: false},
        {name: 'مقدار تخفیف پایه', show: true, value: 'base_discount', order: false},
        {name: 'مقدار تخفیف مارکتینگ', show: true, value: 'marketing_discount', order: false},
        {name: 'کد تخفیف', show: true, value: 'code', order: false},
        {name: 'پرداخت نهایی', show: true, value: 'total_price', order: false},
    ]);

    const returnedShpsModalHeader = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه کالا', show: true, value: 'shps_id', order: false},
        {name: 'نام کالا', show: true, value: 'shps_label', order: false},
        {name: 'تعداد کالا', show: true, value: 'shps_count', order: false},
        {name: 'فروشگاه', show: true, value: 'shopping_name', order: false},
        {name: 'قیمت کالا', show: true, value: 'price', order: false},
        {name: 'مقدار تخفیف پایه', show: true, value: 'base_discount', order: false},
        {name: 'مقدار تخفیف مارکتینگ', show: true, value: 'marketing_discount', order: false},
        {name: 'کد تخفیف', show: true, value: 'code', order: false},
        {name: 'پرداخت نهایی', show: true, value: 'total_price', order: false},
    ]);

    /**
     * Factor modal header
     */
    const factorModalHeader = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه shps', show: true, value: 'shps_id', order: false},
        {name: 'نام کالا', show: true, value: 'shps_label', order: false},
        {name: 'تعداد کالا', show: true, value: 'shps_count', order: false},
        {name: 'مبلغ واحد(ریال)', show: true, value: 'price', order: false},
        {name: 'مبلغ کل(ریال)', show: true, value: 'total_price', order: false},
        {name: 'مبلغ کل تخفیف(ریال)', show: true, value: 'price', order: false},
        {name: 'مبلغ کل پس از تخفیف (ریال)', show: true, value: 'base_discount', order: false},
        {name: 'مبلغ جمع مالیات و عوارض (ریال)', show: true, value: 'tax_amount', order: false},
        {name: 'جمع مبلغ کل بعلاوه جمع  مالیات و عوارض (ریال)', show: true, value: 'tax_amount_sum', order: false},
    ]);


    const loading = ref(false)
    const isFilter = ref(false)
    const isFilterPage = ref(false)

    async function getReturnedOrderList() {
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
        AxiosMethod.end_point = `admin/returned/order/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            returnedOrderList.value = data.data
            loading.value = false
            setTimeout(() => {
                isFilter.value = false
                isFilterPage.value = false
            }, 2000)
        } else {
        }
    };

    async function getReturnOrder(query) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/returned/order/detail/get/${route.params.id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            returnedOrder.value = data.data
            loading.value = false
        } else {
        }
    }

    return {
        pageLength, filterField, returnedOrderList, getReturnedOrderList, dataTableLength,
        page, header, loading, shpsModalHeader, discountModalHeader,
        factorModalHeader, returnedShpsModalHeader, getReturnOrder , returnedOrder
    }
}
