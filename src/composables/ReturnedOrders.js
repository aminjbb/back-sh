import {ref, watch} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {onBeforeRouteUpdate} from 'vue-router'
import {PanelFilter} from '@/assets/js/filter_order.js'
import {useRouter, useRoute} from 'vue-router'
import {useCookies} from "vue3-cookies";

export default function setup() {
    const returnedOrderList = ref([]);
    const returnedOrder = ref(null);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه سفارش', show: true, value: 'id', order: false},
        {name: 'شناسه مرجوعی', show: true, value: 'returned_id', order: false},
        {name: 'نام مشتری', show: true, value: 'user', order: false},
        {name: 'تعداد کالا', show: true, value: 'shps_count', order: false},
        {name: 'وضعیت سفارش', show: false, value: 'status', order: false},
        {name: 'وضعیت مرجوعی', show: true, value: 'returned_status', order: false},
        {name: 'وضعیت پرداخت', show: false, value: 'payment_status', order: false},
        {name: 'روش پرداخت', show: true, value: 'payment_method', order: false},
        {name: 'مبلغ پرداختی', show: true, value: 'paid_price', order: false},
        {name: 'بررسی درخواست', show: true, value: 'request_status', order: false},
        {name: 'وضعیت بارگیری', show: false, value: 'packed_status', order: false},
        {name: 'تاریخ ثبت سفارش', show: false, value: 'submit_date', order: true},
        {name: 'تاریخ ارسال سفارش', show: true, value: 'receive_date', order: true},
        {name: 'تاریخ ثبت مرجوعی', show: true, value: 'created_at', order: false},
        {name: 'مبلغ تخفیف', show: false, value: 'discount', order: false},
        {name: 'استان', show: false, value: 'state', order: false},
        {name: 'شهر', show: false, value: 'city', order: false},
        {name: 'کد معرف', show: false, value: 'identifier_code', order: false},
        {name: 'شناسه بانکی', show: false, value: 'bank_id', order: false},
    ]);

    const filterField = [
        {name: 'شناسه سفارش', type: 'text', value: 'id'},
        {name: 'شناسه مرجوعی', type: 'text', value: 'id'},
        {name: 'نام مشتری', type: 'text', value: 'user_id'},
        {name: 'وضعیت مرجوعی', type: 'select', value: 'status'},
        {name: 'روش پرداخت', type: 'select', value: 'payment_method'},
        {name: 'بررسی درخواست', type: 'select', value: 'payment_method'},
        {name: 'کد معرف', type: 'text', value: 'identification_code'},
        {name: 'شناسه بانکی', type: 'text', value: 'bank_id'},
        {name: 'تاریخ ثبت سفارش', type: 'date', value: 'submit_date'},
        {name: 'تاریخ ارسال سفارش', type: 'date', value: 'receive_date'},
        {name: 'استان', type: 'select', value: 'state_id'},
        {name: 'شهر', type: 'select', value: 'city_id'},
        {name: 'کمترین تعداد کالا', type: 'text', value: 'lower_payment'},
        {name: 'بیشترین تعداد کالا', type: 'text', value: 'highest_payment'},
        {name: 'کمترین مبلغ پرداختی ', type: 'text', value: 'lower_payment'},
        {name: 'بیشترین مبلغ پرداختی ', type: 'text', value: 'highest_payment'},
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
    const filter = new PanelFilter()

    async function getReturnedOrderList(query) {
        loading.value = true
        let paramsQuery = null
        if (query) {
            paramsQuery = filter.params_generator(query.query)
        } else paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/returned/order/crud/index${paramsQuery}`
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
        AxiosMethod.end_point = `admin/returned/order/detail/crud/get/${route.params.id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            returnedOrder.value = data
            loading.value = false
        } else {
        }
    };

    function addPerPage(number) {
        filter.page = 1
        filter.per_page = number
        router.push('/returned-orders/index' + filter.params_generator(route.query))
    }

    function addPagination(page) {
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/returned-orders/index' + filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value = true
            page.value = 1
            filter.page = 1
        }
        await getReturnedOrderList(to)
    })

    watch(page, function (val) {
        if (!isFilter.value) {
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {
        pageLength, filterField, returnedOrderList,
        addPerPage, getReturnedOrderList, dataTableLength,
        page, header, loading, shpsModalHeader, discountModalHeader,
        factorModalHeader, returnedShpsModalHeader, getReturnOrder , returnedOrder
    }
}
