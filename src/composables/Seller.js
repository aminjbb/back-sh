import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { SupplierPanelFilter } from "@/assets/js/filter_supplier";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {registry} from "chart.js";
import {SkuPanelFilter} from "@/assets/js/filter_sku";
import {SkuSellerPanelFilter} from "@/assets/js/filter_sku_to_seller";

export default function setup(posts) {
    const sellerList = ref([]);
    const seller = ref({});
    const sellerSku = ref([])
    const siteInventoryHistory = ref([])
    const warehouseInventoryHistory = ref([])
    const priceHistory = ref([])
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
    const headerWarehouseInventoryHistory =ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'موجودی قبل', show: true, value: 'old_inventory', order:false },
        { name: 'تغییر موجودی', show: true, value: 'change_inventory', order:false },
        { name: 'موجودی جدید', show: true, value: 'new_inventory', order:false },
        { name: 'تاریخ', show: true, value: 'created_at', order:true },
    ]
    );
    const headerSiteInventoryHistory =ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'موجودی قبل', show: true, value: 'old_inventory', order:false },
        { name: 'تغییر موجودی', show: true, value: 'change_inventory', order:false },
        { name: 'موجودی جدید', show: true, value: 'new_inventory', order:false },
        { name: 'تاریخ', show: true, value: 'created_at', order:true },
    ]
    );
    const headerPriceHistory =ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'قیمت مصرف کننده', show: true, value: 'customer_price', order:false },
        { name: 'تخفیف پایه', show: true, value: 'basic_discount', order:false },
        { name: 'تخفیف مارکتینگ', show: true, value: 'marketing_discount', order:false },
        { name: 'قیمت فروش', show: true, value: 'sale_price', order:false },
        { name: 'تاریخ ویرایش', show: true, value: 'updated_at', order:true },
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

        { name: 'نام کالا', type: 'text', value: 'label' },
        { name: 'موجودی انبار(از)', type: 'text', value: 'warehouse_stock_from' },
        { name: 'موجودی انبار(تا)', type: 'text', value: 'warehouse_stock_to' },
        { name: 'وضعیت', type: 'select', value: 'active' },
        { name: ' موجودی قابل فروش(از)', type: 'text', value: 'site_stock_from' },
        { name: ' موجودی قابل فروش(تا)', type: 'text', value: 'site_stock_to' },
        { name: 'کمترین تخفیف پایه(از)', type: 'text', value: 'base_discount_from' },
        { name: ' بیشترین تخفیف پایه(تا)', type: 'text', value: 'base_discount_to' },
        { name: 'کمترین تخفیف مارکتینگ(از)', type: 'text', value: 'marketing_discount_from' },
        { name: 'بیشترین تخفیف مارکتینگ(تا)', type: 'text', value: 'marketing_discount_to' },
        { name: 'کمترین قیمت فروش(از)', type: 'text', value: 'site_price_from' },
        { name: 'بیشترین قیمت فروش(تا)', type: 'text', value: 'site_price_to' },
        { name: 'کمترین قیمت مصرف کننده(از)', type: 'text', value: 'customer_price_from' },
        { name: 'بیشترین قیمت مصرف کننده(تا)', type: 'text', value: 'customer_price_to' },
        { name: 'شروع تخفیف مارکتینگ', type: 'date', value: 'marketing_discount_start_time' },
        { name: 'پایان تخفیف مارکتینگ', type: 'date', value: 'marketing_discount_end_time' },
        { name: 'شروع تخفیف پایه', type: 'date', value: 'base_discount_start_time' },
        { name: 'پایان تخفیف پایه', type: 'date', value: 'base_discount_end_time' },
    ];
    const filterPriceHistory = [

        { name: 'کمترین قیمت مصرف‌کننده', type: 'text', value: 'customer_price_from' },
        { name: 'بیشترین قیمت مصرف‌کننده', type: 'text', value: 'customer_price_to' },
        { name: 'کمترین قیمت فروش', type: 'text', value: 'site_price_from' },
        { name: 'بیشترین قیمت فروش', type: 'text', value: 'site_price_to' },
        { name: 'کمترین تخفیف پایه', type: 'text', value: 'base_discount_from' },
        { name: 'بیشترین تخفیف پایه', type: 'text', value: 'base_discount_to' },
        { name: 'کمترین تخفیف مارکتینگ', type: 'text', value: 'marketing_discount_from' },
        { name: 'بیشترین تخفیف مارکتینگ', type: 'text', value: 'marketing_discount_to' },

    ];
    const filterInventorySite = [
        { name: 'کمترین موجودی', type: 'text', value: 'site_stock_from' },
        { name: 'بیشترین موجودی', type: 'text', value: 'site_stock_to' },
        { name: 'تاریخ', type: 'text', value: 'created_at_from_date' },

    ];
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new SupplierPanelFilter()
    const skuFilter = new SkuPanelFilter()
    const skuSellerFilter =  new SkuSellerPanelFilter()

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
            pageLength.value = data.data.last_page
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
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = skuSellerFilter.params_generator(query.query)
        }
        else  paramsQuery = skuSellerFilter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/sku/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            sellerSku.value = data.data
            loading.value = false
        }
    };
    
    async function getWarehouseInventoryHistory(){
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
            pageLength.value = data.data.last_page
            warehouseInventoryHistory.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

    }
    async function getSiteInventoryHistory(query){
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = skuSellerFilter.params_generator(query.query)
        }
        else  paramsQuery = skuSellerFilter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/sku/${route.params.skuId}/history/site/stock/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            siteInventoryHistory.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }

    }
    async function getPriceHistory(){
        loading.value = true
        // let paramsQuery = null
        // if (query){
        //     paramsQuery = filter.params_generator(query.query)
        // }
        // else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/sku/${route.params.skuId}/history/price/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            priceHistory.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }
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

    return {priceHistory,siteInventoryHistory,filterInventorySite,filterPriceHistory,getPriceHistory,getSiteInventoryHistory,headerPriceHistory,headerSiteInventoryHistory,headerWarehouseInventoryHistory,addSkuPerPage,dataSkuTableLength,skuPage,filterFieldSku,headerSku, getSkuSeller , sellerSku ,getSeller, seller, pageLength, getSellerList, sellerList, filterField, dataTableLength, page, header, addPagination, addPerPage, loading}
}