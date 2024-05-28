import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { SupplierPanelFilter } from "@/assets/js/filter_supplier";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
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
    const skuSellerPage = ref(1)
    const skuPage = ref(1)
    const priceHistoryPage = ref(1)
    const siteHistoryPage = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()
    const headerConsigment =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true , value:'label', order: false},
        { name: 'تعداد کالا', show: true, value:'number' , order: false},
        { name: 'تلورانس پایین', show: false , value:'low_tolerance', order: false},
        { name: 'تلورانس بالا', show: false, value:'high_tolerance', order: false },
    ]);
    const header =ref([
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'شناسه پنل' , show:true, value:'id', order: false},
        {name:'شناسه کوثر' , show:true, value:'kosar_id', order: false},
        {name:'نام فروشگاه' , show:true, value:'shopping_name', order: false},
        {name:'نوع فروشنده' , show:true, value:'type', order: false},
        { name: 'ایمیل', show:true, value:'email', order: false},
        { name: 'یازه پرداخت', show:true, value:'payment_period', order: false},
        {name:'تاریخ ایجاد' , show:true, value:'created_at', order: true},
        {name:'وضعیت' , show:true, value:'is_active', order: false},
    ]);
    const headerSku =ref([
        { name: 'ردیف', show: true, value: null, order:false },
        { name: 'شناسه کالا', show: true, value: 'id', order:false },
        { name: 'شناسه shps', show: true, value: 'unique_code', order:false },
        { name:'نام کالا' , show:true ,  value:'label', order:true},
        { name: 'موجودی انبار', show: true, value: 'warehouse_stock', order:true },
        { name: 'موجودی سایت', show: true, value: 'site_stock', order:true },
        { name: ' قیمت مصرف کننده', show: true, value: 'customer_price', order:true },
        { name: ' تخفیف پایه', show: true, value: 'base_discount', order:true },
        { name: 'تخفیف مارکتینگ', show: true , value:'marketing_discount', order:true},
        { name: 'قیمت فروش', show: true , value:'site_price', order:true},
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
        { name: 'شناسه shps', type: 'text', value: 'id' },
        { name: 'شناسه کالا', type: 'text', value: 'id' },
        { name: 'نام کالا', type: 'text', value: 'sku' },
        { name: 'محدودیت سفارش', type: 'text', value: 'limit' },
        { name: 'موجودی انبار(از)', type: 'text', value: 'warehouse_stock_from' },
        { name: 'موجودی انبار(تا)', type: 'text', value: 'warehouse_stock_to' },
        { name: 'وضعیت', type: 'select', value: 'is_active' },
        { name: ' موجودی سایت(از)', type: 'text', value: 'site_stock_from' },
        { name: ' موجودی سایت(تا)', type: 'text', value: 'site_stock_to' },
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
        { name: 'کمترین قیمت مصرف‌کننده', type: 'text', value: 'customer_price_from', placeHolder:'از' },
        { name: 'بیشترین قیمت مصرف‌کننده', type: 'text', value: 'customer_price_to', placeHolder:'تا' },
        { name: 'کمترین قیمت فروش', type: 'text', value: 'site_price_from', placeHolder:'از' },
        { name: 'بیشترین قیمت فروش', type: 'text', value: 'site_price_to', placeHolder:'تا' },
        { name: 'کمترین تخفیف پایه', type: 'text', value: 'base_discount_from', placeHolder:'از' },
        { name: 'بیشترین تخفیف پایه', type: 'text', value: 'base_discount_to', placeHolder:'تا' },
        { name: 'کمترین تخفیف مارکتینگ', type: 'text', value: 'marketing_discount_from', placeHolder:'از' },
        { name: 'بیشترین تخفیف مارکتینگ', type: 'text', value: 'marketing_discount_to', placeHolder:'تا' },

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

    async function getSellerList() {
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
        AxiosMethod.end_point = `seller/crud/index`
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
    async function getSkuSeller() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
       if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                page:skuSellerPage.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:skuSellerPage.value,
                per_page : dataTableLength.value
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/sku/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =data.data.last_page
            sellerSku.value = data.data
            loading.value = false
            isFilter.value = false
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
        const AxiosMethod = new AxiosCall()
        var query = route.query
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
                    page:siteHistoryPage.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:siteHistoryPage.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/sku/${route.params.skuId}/history/site/stock/index`
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
    async function getPriceHistory(query){
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = skuSellerFilter.params_generator(query.query)
        }
        else  paramsQuery = skuSellerFilter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `seller/${route.params.sellerId}/sku/${route.params.skuId}/history/price/index${paramsQuery}`
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

    function addSkuSellerPagination(page){
        skuSellerFilter.page = page
        skuSellerFilter.per_page = dataTableLength.value
        router.push(route.path + skuSellerFilter.query_maker(route.query))
    }
    function addSkuSellerPerPage(number){
        skuSellerFilter.page = 1
        skuSellerFilter.per_page =number
        router.push(route.path + skuSellerFilter.params_generator(route.query))
    }

    function priceHistoryPagination(page){
        skuSellerFilter.page = page
        skuSellerFilter.per_page = dataTableLength.value
        router.push(route.path + skuFilter.params_generator(route.query))
    }
    function siteHistoryPagination(page){
        skuSellerFilter.page = page
        skuSellerFilter.per_page = dataTableLength.value
        router.push(route.path + skuFilter.params_generator(route.query))
    }

    watch(priceHistoryPage, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            priceHistoryPagination(val)
        }
    })



    return {priceHistory,siteInventoryHistory,filterInventorySite,filterPriceHistory,
        getPriceHistory,getSiteInventoryHistory,headerPriceHistory,headerSiteInventoryHistory,
        headerWarehouseInventoryHistory,dataSkuTableLength,skuPage,filterFieldSku,headerSku,
        getSkuSeller , sellerSku ,getSeller, seller, pageLength, getSellerList, sellerList, filterField,
        dataTableLength, page, header, loading , priceHistoryPage ,siteHistoryPage ,
        headerConsigment , addSkuSellerPerPage , skuSellerPage}
}