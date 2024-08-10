import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const voucherList = ref([]);
    const voucherGroup = ref([]);
    const voucherDetail = ref(null);
    const voucher = ref([]);
    const dataTableLength = ref(25)
    let page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const headerVouchers =ref( [
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , sortable: false, align:'center'},
        { name: 'عنوان',title: 'عنوان', show: true, key: 'name', sortable: false, align:'center', minWidth:'120'},
        { name: 'نوع مقدار تخفیف',title: 'نوع مقدار تخفیف', show: true, key: 'discount_type', sortable: false, align:'center'},
        { name: 'نوع  تخفیف',title: 'نوع  تخفیف', show: true, key: 'voucher_type', sortable: false, align:'center'},
        { name: 'کد تخفیف',title: 'کد تخفیف', show: true, key: 'voucherCode', sortable: false, align:'center'},
        { name: ' مقدار تخفیف',title: ' مقدار تخفیف', show: true, key: 'discount', sortable: false, align:'center'},
        { name: ' تعداد استفاده سفارش',title: ' تعداد استفاده سفارش', show: true, key: 'order_limit', sortable: false, align:'center'},
        { name: ' تعداد استفاده مشتری',title: ' تعداد استفاده مشتری', show: true, key: 'user_limit', sortable: false, align:'center'},
        { name: 'حداقل هزینه سفارش',title: 'حداقل هزینه سفارش', show: true, key: 'min_order_price', sortable: false, align:'center'},
        { name: 'چندمین سفارش',title: 'چندمین سفارش', show: true, key: 'order_count', sortable: false, align:'center'},
        { name: 'تاریخ شروع',title: 'تاریخ شروع', show: true, key: 'start_time_fa', align:'center'},
        { name: 'تاریخ پایان',title: 'تاریخ پایان', show: true, key: 'end_time_fa', align:'center'},
        { name: 'استان',title: 'استان', show: false, key: 'state_id', sortable: false, align:'center'},
        { name: 'وضعیت',title: 'وضعیت', show: true, key: 'is_active', sortable: false, align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const headerShps = ref([
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , sortable: false, align:'center'},
        { name: 'شناسه کالا',title: 'شناسه کالا', show: true, key: 'sku_id', align:'center'},
        { name: 'نام کالا',title: 'نام کالا', show: true, key: 'sku_label', align:'center'},
        { name: 'قیمت مصرف کننده',title: 'قیمت مصرف کننده', show: true, key: 'customer_price', align:'center'},
        { name: ' قیمت فروش',title: ' قیمت فروش', show: true, key: 'site_price', sortable: false, align:'center'},
    ]);
    const headerPublicVoucherList = ref([
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , sortable: false, align:'center'},
        { name: ' کد تخفیف',title: ' کد تخفیف', show: true, key: 'voucherCode', sortable: false, align:'center'},
    ]);
    const headerPeerToPeerVoucherList = ref([
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , sortable: false, align:'center'},
        { name: ' کد تخفیف',title: ' کد تخفیف', show: true, key: 'voucherCode', sortable: false, align:'center'},
        { name: ' شماره تماس کاربر',title: ' شماره تماس کاربر', show: true, key: 'phone_number', sortable: false, align:'center'},
        { name: ' نام کاربر',title: ' نام کاربر', show: true, key: 'first_name', sortable: false, align:'center'},
        { name: ' نام خانوادگی کاربر',title: ' نام خانوادگی کاربر', show: true, key: 'last_name', sortable: false, align:'center'},
    ]);
    const headerCustomer =ref( [
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , order: false, align:'center'},
        { name: 'شناسه مشتری',title: 'شناسه مشتری', show: true, key: 'id', align:'center'},
        { name: 'نام مشتری',title: 'نام مشتری', show: true, key: 'first_name', align:'center'},
        { name: 'نام خانوادگی مشتری',title: 'نام خانوادگی مشتری', show: true, key: 'last_name', align:'center'},
        { name: ' شماره تماس',title: ' شماره تماس', show: true, key: 'phone_number', sortable: false, align:'center'},
    ]);
    const headerOrder =ref( [
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , sortable: false, align:'center'},
        { name: 'شماره سفارش',title: 'شماره سفارش', show: true, key: 'id', align:'center'},
        { name: 'نام مشتری',title: 'نام مشتری', show: true, key: 'first_name', align:'center'},
        { name: 'نام خانوادگی مشتری',title: 'نام خانوادگی مشتری', show: true, key: 'last_name', align:'center'},
        { name: ' شماره تماس',title: ' شماره تماس', show: true, key: 'phone_number', sortable: false, align:'center'},
        { name: ' چندمین سفارش',title: ' چندمین سفارش', show: true, key: 'order_number', sortable: false, align:'center'},
        { name: ' تعداد آیتم',title: ' تعداد آیتم', show: true, key: 'details_count', sortable: false, align:'center'},
        { name: 'مبلغ',title: 'مبلغ', show: true, key: 'total_price', sortable: false, align:'center'},
        { name: 'تاریخ ثبت',title: 'تاریخ ثبت', show: true, key: 'created_at_fa', sortable: false, align:'center'},
    ]);

    const indexFilterField =ref( [
        {name:'عنوان' , type:'text', value:'name'},
        {name:'کد تخفیف' , type:'text', value:'code'},
        {name:'نوع کد تخفیف' , type:'select', value:'voucher_type'},
        {name:'نوع مقدارتخفیف' , type:'select', value:'discount_type'},
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
    const filterFieldPeerToPeer =ref( [
        {name:'کد تخفیف ' , type:'text', value:'code'},
        {name:'نام مشتری' , type:'auto-complete', value:'user_id'},

    ]);
    const loading = ref(false)

    async function  getVoucherList() {
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
        AxiosMethod.end_point = `voucher/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucherList.value = data.data.data
        }
    }

    async function  getVoucherDetail() {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/crud/get/${route.params.voucherId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            voucherDetail.value = data.data
        }
    }

    async function  getVoucherShps() {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/get/shps/${route.params.voucherId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucher.value = data.data.data
        }
    }

    async function  getVoucherGroup() {
        loading.value = true
        let query = route.query
        const AxiosMethod = new AxiosCall()
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

        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/crud/group/index/${route.params.voucherId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucherGroup.value = data.data.data
        }
    }

    async function  getVoucherCustomer() {
        const AxiosMethod = new AxiosCall()
        let query = route.query
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
        AxiosMethod.end_point = `voucher/get/users/${route.params.voucherId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucher.value = data.data
        }
    }

    async function  getVoucherOrder() {
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
        AxiosMethod.end_point = `voucher/get/orders/${route.params.voucherId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucher.value = data.data
        }
    }

    return {headerShps , headerPublicVoucherList, headerPeerToPeerVoucherList, headerCustomer , headerVouchers, filterField ,
        page , voucherList, filterFieldPeerToPeer,dataTableLength ,pageLength , getVoucherShps , voucher , getVoucherList ,
        getVoucherCustomer , getVoucherDetail , voucherDetail, getVoucherGroup, voucherGroup, indexFilterField ,
        headerOrder , getVoucherOrder}
}

