import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { SupplierPanelFilter } from "@/assets/js/filter_supplier";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {registry} from "chart.js";
import {SkuPanelFilter} from "@/assets/js/filter_sku";

export default function setup(posts) {
    const sellerList = ref([]);
    const seller = ref({});
    const sellerSku = ref([])
    const dataTableLength = ref(25)
    const dataSkuTableLength = ref(25)
    const page = ref(1)
    const skuPage = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()
    const header =ref([
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'شناسه پنل' , show:true, value:'id', order: false},
        {name:'شناسه کوثر' , show:true, value:'kosar_id', order: false},
        {name:'نام فروشگاه' , show:true, value:'shopping_name', order: false},
        {name:'نوع فروشنده' , show:true, value:'type', order: false},
        { name: 'ایمیل', show:true, value:'email', order: false},
        {name:'تاریخ ایجاد' , show:true, value:'created_at', order: true},
        {name:'وضعیت' , show:true, value:'is_active', order: false},
    ]);
    const headerSku =ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'شناسه کالا', show: true, value: 'id', order:false },
        { name: 'شناسه shps', show: true, value: 'unique_code', order:false },
        { name:'نام کالا' , show:true ,  value:'label', order:true},
        { name: 'موجودی انبار', show: true, value: 'sku_quntity', order:false },
        { name: 'موجودی سایت', show: true, value: 'category', order:true },
        { name: ' قیمت مصرف کننده', show: true, value: 'brand', order:true },
        { name: ' تخفیف پایه', show: true, value: 'volume', order:false },
        { name: 'تخفیف مارکتینگ', show: true , value:'is_active', order:false},
        { name: 'قیمت فروش', show: true , value:'is_active', order:false},
        { name: 'وضعیت', show: true , value:'is_active', order:false},
    ]
    );
    const filterField = [
        { name: 'نام و نام خانوادگی', type:'text', value:'full_name'},
        { name: 'نام فروشگاه', type:'text', value:'shopping_name'},
        { name:'نوع فروشنده', type: 'select', value:'type'},
        { name:'کدملی', type: 'number', value:'identification_code'},
        { name: 'ایمیل', type:'text', value:'email'},
        { name: 'استان', type:'select', value:'state_id'},
        { name: 'شهر', type:'select', value:'city_id'},
        { name: 'شناسه پنل', type:'text', value:'id'},
        { name: 'شناسه کوثر', type:'text', value:'kosar_id'},
        { name: 'شماره ثابت', type:'number', value:'phone'},
        { name: 'تلفن همراه', type:'number', value:'phone_number'},
        { name: 'نوع پرداخت', type:'select', value:'payment_type'},
        { name: 'بازده پرداخت', type:'text', value:'payment_period'},
    ];
    const filterFieldSku = [

        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: 'شماره sku', type: 'text', value: 'id' },
        { name: ' برند', type: 'auto-complete', value: 'brand' },
        { name: ' دسته بندی', type: 'auto-complete', value: 'category' },
        { name: ' گروه', type: 'auto-complete', value: 'group' },
        { name: 'قابل فروش', type: 'select', value: 'sellable' },
        { name: 'محصول', type: 'auto-complete', value: 'product' },
    ];
    
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new SupplierPanelFilter()
    const skuFilter = new SkuPanelFilter()
    
    async function getSellerList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            sellerList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    };
    async function getSeller(query) {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/crud/get/${route.params.sellerId}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            seller.value = data.data
        }
    };
    async function getSkuSeller(query) {
        let paramsQuery = null
        if (query){
            paramsQuery = skuFilter.params_generator(query.query)
        }
        else  paramsQuery = skuFilter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/sku/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            sellerSku.value = data.data
        }
    };
    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/seller/index/'+ filter.params_generator(route.query))

    }
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/seller/index'+ filter.params_generator(route.query))
    }

    function addSkuPerPage(number){
        skuFilter.page = 1
        skuFilter.per_page =number
        console.log( skuFilter.per_page)
        router.push(route.path + skuFilter.params_generator(route.query))
    }

    function addSkuPagination(page){
        skuFilter.page = page
        skuFilter.per_page = dataTableLength.value
        router.push(route.path + skuFilter.params_generator(route.query))
    }
    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getSellerList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })
    watch(skuPage, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addSkuPagination(val)
        }
    })

    return {addSkuPerPage,dataSkuTableLength,skuPage,filterFieldSku,headerSku, getSkuSeller , sellerSku ,getSeller, seller, pageLength, getSellerList, sellerList, filterField, dataTableLength, page, header, addPagination, addPerPage, loading}
}