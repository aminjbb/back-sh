import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_factor.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const factorList = ref([]);
    const priceList = ref([])
    const templates =ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    // Factor table header
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه فاکتور', show: true , value:'id', order: false},
        { name: 'تامین کننده ', show: true, value:'supplier' , order: false},
        { name: 'سازنده', show: true , value:'creator', order: false},
        { name: 'شماره فاکتور تامین کننده ', show: true, value:'factor_number', order: false },
        { name: 'تاریخ ساخت', show: true, value:'created_at_fa', order: false },
        { name: 'وضعیت', show: true, value:'status', order: false },
    ]);

    const pricingHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه shps', show: true , value:'shps', order: false},
        { name: 'نام کالا', show: true, value:'sku' , order: false},
        { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
        { name: 'قیمت خرید', show: true, value:'buying_price', order: false },
        { name: 'قیمت مصرف کننده', show: true, value:'customer_price', order: false },
        { name: 'مجموع قیمت خرید', show: true, value:'sum_buying_price', order: false },
        { name: 'مجموع قیمت مصرف کننده', show: true, value:'sum_customer_price', order: false },
        { name: 'درصد سود', show: true, value:'profit', order: false },
    ]);

    const filterField = [
        {name:'شناسه فاکتور' , type:'text', value:'id'},
        { name:'سازنده' , type: 'select', value:'creator_id'},
        { name: 'تامین کننده', type:'select', value:'supplier_id'},
        { name: 'شماره فاکتور تامین کننده', type:'text', value:'factor_number'},
        { name: 'تاریخ ساخت', type: 'date', value: 'created_at'},
        { name: 'وضعیت', type:'select', value:'status'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    /**
     * Get factor list
     * @param {*} query 
     */
    async function getFactorList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `factor/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            factorList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    };

    /**
     * Get Price list of a factor
     * @param {*} query 
     */
    async function getPricingList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `factor/crud/detail/${route.params.id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            priceList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/factor/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/factor/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getFactorList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {templates, pageLength, filterField, factorList, addPerPage, getFactorList, dataTableLength, page, header, loading, pricingHeader, getPricingList, priceList }
}

