import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
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
        { name: 'نوع تخفیف', show: true, value: 'label', order: false},
        { name: 'کد تخفیف', show: true, value: 'customer_price', order: false},
        { name: ' مقدار تخفیف', show: true, value: 'site_price', order: false},
        { name: ' تعداد استفاده سفارش', show: true, value: 'site_price', order: false},
        { name: ' تعداد استفاده مشتری', show: true, value: 'site_price', order: false},
        { name: 'حداقل هزینه سفارش', show: true, value: 'site_price', order: false},
        { name: 'چندمین سفارش', show: true, value: 'site_price', order: false},
        { name: 'تاریخ شروع', show: true, value: 'site_price', order: true},
        { name: 'تاریخ پایان', show: true, value: 'site_price', order: true},
        { name: 'استان', show: false, value: 'site_price', order: true},
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

    const indexFilterField =ref( [
        {name:'شناسه' , type:'text', value:'id'},
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'گروه' , type:'text', value:'group'},
        {name:'نام فارسی' , type:'text', value:'label'},
        {name:'فعال سازی ' , type:'switch', value:'active'},
    ]);


    async function  getVoucherList(query) {
        // if(query){
        //     formdata  = query
        // }
        // else if (route.query) {
        //     formdata  = route.query
        // }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'voucher/crud/index'
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

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `voucher/get/users/${route.params.voucherId}`

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
        router.push('/color/'+ filter.query_maker())

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
        router.push('/color/'+ filter.query_maker())
    }


    watch(page, function(val) {
        addPagination(val)
    })

    return {headerShps , headerCustomer , headerVouchers ,filterField , page , voucherList
    ,dataTableLength ,pageLength , getVoucherShps , voucher , getVoucherList , getVoucherCustomer ,
        getVoucherDetail , voucherDetail}
}

