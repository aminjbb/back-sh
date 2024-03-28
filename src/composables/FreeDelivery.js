import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_free_delivery.js'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const freeDeliveryList = ref([]);
    const voucher = ref(null);
    const skuList = ref(null);
    const customerList = ref(null)
    const dataTableLength = ref(25)
    let page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const headerFreeDelivery =ref( [
        { name: 'ردیف', show: true, value: null , order: false},
        { name: 'عنوان', show: true, value: 'id', order: false},
        { name: ' نفیس اکسپرس', show: true, value: 'nafis', order: false},
        { name: ' پست پیشتاز', show: true, value: 'pishtaz', order: false},
        { name: ' پست', show: true, value: 'post', order: false},
        { name: 'تیپاکس', show: true, value: 'tpax', order: false},
        { name: 'تاریخ شروع', show: true, value: 'start-date', order: true},
        { name: 'تاریخ پایان', show: true, value: 'end-date', order: true},
        { name: 'استان', show: false, value: 'state', order: true},
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
    const headerOrderList =ref( [
        { name: 'ردیف', show: true, value: null , order: false},
        { name: 'شناسه سفارش', show: true, value: 'id', order: true},
        { name: 'نام مشتری', show: true, value: 'first_name', order: true},
        { name: 'نام خانوادگی مشتری', show: true, value: 'last_name', order: true},
        { name: ' شماره تماس مشتری', show: true, value: 'phone', order: false},
        { name: 'چندمین سفارش', show: true, value: 'ord_count', order: false},
        { name: 'تعداد ایتم', show: true, value: 'item_number', order: false},
        { name: 'مبلغ سفارش(ریال)', show: true, value: 'order_price', order: false},
        { name: 'تاریخ ثبت سفارش', show: true, value: 'order_date', order: false},
    ]);

    const indexFilterField =ref( [
        {name:'عنوان' , type:'text', value:'name'},
        {name:'تاریخ شروع ' , type:'date', value:'start_time'},
        {name:'تاریخ پایان ' , type:'date', value:'end_time'},
        {name:'وضعیت' , type:'select', value:'is_active'},
        {name:'روش ارسال' , type:'select', value:'sending_method'},

    ]);

    const filterField =ref( [
        {name:'شناسه' , type:'text', value:'id'},
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'گروه' , type:'text', value:'group'},
        {name:'نام فارسی' , type:'text', value:'label'},
        {name:'فعال سازی ' , type:'switch', value:'active'},
    ]);
    const loading = ref(false)
    const filter = new PanelFilter()

    async function  getFreeDeliveryList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/delivery-discount/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            freeDeliveryList.value = data.data.data
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

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `admin/delivery-discount/get/users/${route.params.freeDeliveryId}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
          customerList.value = data.data.data
        }
    };

    function addPerPage(number){
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
        router.push('/free-delivery/index'+ filter.query_maker())

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
        router.push('/free-delivery/index'+ filter.query_maker())
    }


    watch(page, function(val) {
        addPagination(val)
    })

    return {headerShps , headerCustomer  , headerFreeDelivery,filterField , page , freeDeliveryList , headerOrderList , addPerPage
    ,dataTableLength ,pageLength , getVoucher , getSkuList, voucher , getFreeDeliveryList, indexFilterField, getCustomerList, customerList, skuList}
}

