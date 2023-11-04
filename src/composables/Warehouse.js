import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {UserPanelFilter} from "@/assets/js/filter_user";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

export default function setup(posts) {
    const warehouseList = ref([]);
    const warehouse = ref({});
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()

    const header = [
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'نام انبار' , show:true, value:'name', order: false},
        {name:'آدرس' , show:true, value:'address', order: false},
        {name:'شماره تماس' , show:true, value:'phone_number', order: false},
        {name:'نوع انبار' , show:true, value:'type', order: false},
        {name:'ظرفیت مارکت' , show:true, value:'market_storage_count', order: false},
        {name:'ظرفیت Retail' , show:true, value:'retail_storage_count', order: false},
        {name:'وضعیت' , show:true, value:'is_active', order: false},
    ];
    
    const SpecialCapacityHeader = [
        {name:'تاریخ ' , show:true},
        {name:'ظرفیت مارکت' , show:true},
        {name:'ظرفیت Retail', show:true} ,
    ];

    const router = useRouter()
    const route = useRoute()

    const filterField = [
        { name: 'نام', type:'text', value:'first_name'},
        { name: 'نام خانوادگی', type:'text', value:'last_name'},
        { name:'شماره موبایل', type: 'text', value:'phone_number'},
        { name: 'ایمیل', type:'select', value:'email'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new UserPanelFilter()
    
    async function getWarehouseList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `warehouse/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            warehouseList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    };

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/warehouse/index/'+ filter.params_generator(route.query))

    }
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/warehouse/index'+ filter.params_generator(route.query))
    }
    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getWarehouseList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength, getWarehouseList, warehouseList, filterField, dataTableLength, page, header, addPagination, addPerPage,SpecialCapacityHeader, loading}
}