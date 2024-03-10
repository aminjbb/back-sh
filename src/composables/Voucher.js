import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_voucher.js'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const voucherList = ref([]);
    const voucherDetail = ref(null);
    const voucher = ref([]);
    const dataTableLength = ref(25)
    let page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const headerVouchers =ref( [
        { name: 'ردیف', show: true, value: null , order: false},
        { name: 'عنوان', show: true, value: 'id', order: false},
        { name: 'نوع مقدار تخفیف', show: true, value: 'label', order: false},
        { name: 'نوع  تخفیف', show: true, value: 'voucher_type', order: false},
        { name: 'کد تخفیف', show: true, value: 'code', order: false},
        { name: ' مقدار تخفیف', show: true, value: 'discount', order: false},
        { name: ' تعداد استفاده سفارش', show: true, value: 'order_limit', order: false},
        { name: ' تعداد استفاده مشتری', show: true, value: 'user_limit', order: false},
        { name: 'حداقل هزینه سفارش', show: true, value: 'min_order_price', order: false},
        { name: 'چندمین سفارش', show: true, value: 'order_count', order: false},
        { name: 'تاریخ شروع', show: true, value: 'start_time', order: true},
        { name: 'تاریخ پایان', show: true, value: 'end_time', order: true},
        { name: 'استان', show: false, value: 'state_id', order: true},
        { name: 'وضعیت', show: true, value: 'is_active', order: false},
    ]);
    const headerShps = ref([
        { name: 'ردیف', show: true, value: null , order: false},
        { name: 'شناسه کالا', show: true, value: 'id', order: true},
        { name: 'نام کالا', show: true, value: 'label', order: true},
        { name: 'قیمت مصرف کننده', show: true, value: 'customer_price', order: true},
        { name: ' قیمت فروش', show: true, value: 'site_price', order: false},
    ]);
    const headerCustomer =ref( [
        { name: 'ردیف', show: true, value: null , order: false},
        { name: 'شناسه مشتری', show: true, value: 'id', order: true},
        { name: 'نام مشتری', show: true, value: 'first_name', order: true},
        { name: 'نام خانوادگی مشتری', show: true, value: 'last_name', order: true},
        { name: ' شماره تماس', show: true, value: 'phone', order: false},
    ]);
    const headerOrder =ref( [
        { name: 'ردیف', show: true, value: null , order: false},
        { name: 'شماره سفارش', show: true, value: 'id', order: true},
        { name: 'نام مشتری', show: true, value: 'first_name', order: true},
        { name: 'نام خانوادگی مشتری', show: true, value: 'last_name', order: true},
        { name: ' شماره تماس', show: true, value: 'phone', order: false},
        { name: ' چندمین سفارش', show: true, value: 'order_number', order: false},
        { name: ' تعداد آیتم', show: true, value: 'variant', order: false},
        { name: 'مبلغ', show: true, value: 'price', order: false},
        { name: 'تاریخ ثبت', show: true, value: 'created_at', order: false},
    ]);

    const indexFilterField =ref( [
        {name:'عنوان' , type:'text', value:'name'},
        {name:'کد تخفیف' , type:'text', value:'code'},
        {name:'نوع کد تخفیف' , type:'select', value:'voucher_type'},
        {name:'نوع تخفیف' , type:'select', value:'discount_type'},
        {name:'هزینه ارسال' , type:'select', value:'sending_method'},
        {name:'استان' , type:'select', value:'state_id'},
        {name:'تاریخ شروع ' , type:'date', value:'start_time'},
        {name:'تاریخ پایان ' , type:'date', value:'end_time'},
        {name:'وضعیت' , type:'select', value:'is_active'},
        {name:'کمترین مقدار تخفیف (از)' , type:'text', value:'discount_from'},
        {name:'بیشترین مقدار تخفیف (تا)' , type:'text', value:'discount_to'},
        {name:'کمترین شماره سفارش (از)' , type:'text', value:'order_count_from'},
        {name:'بیشترین شماره سفارش (تا)' , type:'text', value:'order_count_to'},
        {name:'کمترین تعداد استفاده سفارش (از)' , type:'text', value:'order_limit_from'},
        {name:'بیشترین تعداد استفاده سفارش (تا)' , type:'text', value:'order_limit_to'},
        {name:'کمترین تعداد استفاده مشتری(از) ' , type:'text', value:'user_limit_from'},
        {name:'بیشترین تعداد استفاده مشتری(تا) ' , type:'text', value:'user_limit_to'},
        {name:'کمترین هزینه سفارش (از) ' , type:'text', value:'min_order_price_from'},
        {name:'بیشترین هزینه سفارش(تا)  ' , type:'text', value:'min_order_price_to'},
        {name:'کالا ' , type:'select', value:'sku_id'},
        {name:'مشتری ' , type:'select', value:'user_id'},
    ]);

    const filterField =ref( [
        {name:'شناسه' , type:'text', value:'id'},
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'گروه' , type:'text', value:'group'},
        {name:'نام فارسی' , type:'text', value:'label'},
        {name:'فعال سازی ' , type:'switch', value:'active'},
    ]);
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function  getVoucherList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucherList.value = data.data.data
        }
    };
    async function  getVoucherDetail(query) {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/crud/get/${route.params.voucherId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            voucherDetail.value = data.data
        }
    };
    async function  getVoucherShps(query) {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/get/shps/${route.params.voucherId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucher.value = data.data
        }
    };
    async function  getVoucherCustomer(query) {
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/get/users/${route.params.voucherId}${paramsQuery}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucher.value = data.data
        }
    };

    function addPerPage(number){
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name =route.query.name
        }
        if (route.query.label) {
            filter.label =route.query.label
        }

        if (route.query.id) {
            filter.id =route.query.id
        }
        filter.page = 1;
        page = 1;
        filter.per_page = number
        router.push('/voucher/index'+ filter.query_maker())

    }

    function addPagination(page){
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name =route.query.name
        }
        if (route.query.label) {
            filter.label =route.query.label
        }
        if (route.query.active) {
            filter.active =route.query.active
        }
        if (route.query.id) {
            filter.id =route.query.id
        }
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/voucher/index'+ filter.query_maker())
    }

    function addPerPageCustomer(number){
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name =route.query.name
        }
        if (route.query.label) {
            filter.label =route.query.label
        }

        if (route.query.id) {
            filter.id =route.query.id
        }
        filter.page = 1;
        page = 1;
        filter.per_page = number
        router.push(route.path+ filter.query_maker())

    }

    function addPaginationCustomer(page){
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name =route.query.name
        }
        if (route.query.label) {
            filter.label =route.query.label
        }
        if (route.query.active) {
            filter.active =route.query.active
        }
        if (route.query.id) {
            filter.id =route.query.id
        }
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push(route.path + filter.query_maker())
    }
    return {headerShps , headerCustomer , headerVouchers ,filterField , page , voucherList
    ,dataTableLength ,pageLength , getVoucherShps , voucher , getVoucherList , getVoucherCustomer ,addPagination,
        getVoucherDetail , voucherDetail, indexFilterField , addPerPage , addPerPageCustomer , addPaginationCustomer,
        headerOrder}
}

