import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const freeDeliveryList = ref([]);
    const detailData =ref([])
    const orderList = ref([])
    const voucher = ref(null);
    const skuList = ref(null);
    const customerList = ref(null)
    const dataTableLength = ref(25)
    let page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const route = useRoute()
    const headerFreeDelivery =ref( [
        { name: 'ردیف',title: 'ردیف', show: true , sortable: false,align:'center' ,key: 'row'},
        { name: 'عنوان',title: 'عنوان', show: true, sortable: false,align:'center' ,key: 'name'},
        { name: ' نفیس اکسپرس',title: ' نفیس اکسپرس', show: true, sortable: false,align:'center' ,key: 'nafis',model: 'icon'},
        { name: ' پست پیشتاز',title: ' پست پیشتاز', show: true, sortable: false,align:'center' ,key: 'pishtaz',model: 'icon'},
        { name: ' پست',title: ' پست', show: true, sortable: false,align:'center' ,key: 'post',model: 'icon'},
        { name: 'تیپاکس',title: 'تیپاکس', show: true, sortable: false,align:'center' ,key: 'tpax',model: 'icon'},
        { name: 'تاریخ شروع',title: 'تاریخ شروع', show: true,align:'center' ,key: 'start_time_fa'},
        { name: 'تاریخ پایان',title: 'تاریخ پایان', show: true,align:'center' ,key: 'end_time_fa'},
        { name: 'وضعیت',title: 'وضعیت', show: true, sortable: false,align:'center' ,key: 'is_active'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
  
    const headerShps = ref([
        { name: 'ردیف',title: 'ردیف', show: true, key: 'key' , sortable: false, align:'center'},
        { name: 'شناسه کالا',title: 'شناسه کالا', show: true, key: 'sku_label',align:'center'},
        { name: 'نام کالا',title: 'نام کالا', show: true, key: 'sku_label',align:'center'},
        { name: 'قیمت مصرف کننده',title: 'قیمت مصرف کننده', show: true, key: 'customer_price',align:'center'},
        { name: ' قیمت فروش',title: ' قیمت فروش', show: true, key: 'buying_price', sortable: false, align:'center'},
    ]);
    const headerCustomer =ref( [
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , sortable: false, align:'center'},
        { name: 'شناسه مشتری',title: 'شناسه مشتری', show: true, key: 'id', align:'center'},
        { name: 'نام مشتری',title: 'نام مشتری', show: true, key: 'first_name', align:'center'},
        { name: 'نام خانوادگی مشتری',title: 'نام خانوادگی مشتری', show: true, key: 'last_name', align:'center'},
        { name: ' شماره تماس',title: ' شماره تماس', show: true, key: 'phone_number', sortable: false, align:'center'},
    ]);
    const headerOrderList =ref( [
        { name: 'ردیف',title: 'ردیف', show: true, key: 'row' , sortable: false, align:'center'},
        { name: 'شناسه سفارش',title: 'شناسه سفارش', show: true, key: 'id', align:'center'},
        { name: 'نام مشتری',title: 'نام مشتری', show: true, key: 'first_name', align:'center'},
        { name: 'نام خانوادگی مشتری',title: 'نام خانوادگی مشتری', show: true, key: 'last_name', align:'center'},
        { name: ' شماره تماس مشتری',title: ' شماره تماس مشتری', show: true, key: 'phone_number', sortable: false, align:'center'},
        { name: 'چندمین سفارش',title: 'چندمین سفارش', show: true, key: 'order_number', sortable: false, align:'center'},
        { name: 'تعداد ایتم',title: 'تعداد ایتم', show: true, key: 'details_count', sortable: false, align:'center'},
        { name: 'مبلغ سفارش(ریال)',title: 'مبلغ سفارش(ریال)', show: true, key: 'paid_price', sortable: false, align:'center'},
        { name: 'تاریخ ثبت سفارش',title: 'تاریخ ثبت سفارش', show: true, key: 'created_at_fa', sortable: false, align:'center'},
    ]);

    const indexFilterField =ref( [
        {name:'عنوان' , type:'text', value:'name'},
        {name:'تاریخ شروع ' , type:'date', value:'start_time'},
        {name:'تاریخ پایان ' , type:'date', value:'end_time'},
        {name:'وضعیت' , type:'select', value:'is_active'},
        {name:'روش ارسال' , type:'select', value:'sending_method'},

    ]);

    const filterFieldCustomer =ref( [
        {name:'شناسه کاربر' , type:'text', value:'id'},
        {name:'نام کاربر' , type:'text', value:'first_name'},
        {name:'نام خانوادگی کاربر' , type:'text', value:'last_name'},
        {name:'شماره تماس' , type:'text', value:'phone_number'},

    ]);
    const filterFieldShps =ref( [
        {name:'شناسه کالا' , type:'text', value:'id'},
        {name:'نام کالا' , type:'text', value:'name'},
        {name:'قیمت مصرف کننده' , type:'text', value:'group'},
        {name:'قیمت فروش' , type:'text', value:'label'},
    ]);
    const filterFieldCOrderList =ref( [
        {name:'شناسه سفارش' , type:'text', value:'id'},
        {name:'شماره مشتری' , type:'auto-complete', value:'user_id'},
        {name:'کمترین تعداد آیتم' , type:'text', value:'details_count_from'},
        {name:'بیشترین تعداد آیتم' , type:'text', value:'details_count_to'},
        {name:'کمترین مبلغ سفارش' , type:'text', value:'paid_price_from'},
        {name:'بیشترین مبلغ سفارش' , type:'text', value:'paid_price_to'},
        {name:'تاریخ ثبت سفارش ' , type:'date', value:'created_at'},
    ]);
    const loading = ref(false)

    async function  getFreeDeliveryList() {
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
        AxiosMethod.end_point = `admin/delivery-discount/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            freeDeliveryList.value = data.data.data
        }
    };
    async function  getDetail() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/delivery-discount/crud/get/${route.params.freeDeliveryId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            detailData.value = data.data
        }
    };
    async function  getVoucher() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/crud/get/${route.params.voucherId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            voucher.value = data.data
        }
    };
    async function  getSkuList() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/delivery-discount/get/shps/${route.params.freeDeliveryId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            skuList.value = data.data.data
        }
    };
    async function  getCustomerList() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/delivery-discount/get/users/${route.params.freeDeliveryId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
          customerList.value = data.data.data
        }
    };

    async function  geOrderList() {
        loading.value = true

        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/delivery-discount/get/orders/${route.params.freeDeliveryId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            orderList.value = data.data.data
        }
    }

    return {headerShps , headerCustomer  , headerFreeDelivery,filterFieldCustomer , filterFieldShps, filterFieldCOrderList, page , freeDeliveryList , getDetail, detailData, headerOrderList
    ,dataTableLength ,pageLength , getVoucher , getSkuList, voucher , getFreeDeliveryList, indexFilterField, getCustomerList, customerList, skuList, geOrderList, orderList}
}

