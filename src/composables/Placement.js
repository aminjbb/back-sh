import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_placement.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const placementList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه شلف', show: true , value:'id', order: false},
        { name: 'شماره ردیف', show: true, value:'row_number' , order: false},
        { name: 'شماره قفسه', show: true , value:'placement_number', order: false},
        { name: 'شماره طبقه', show: true, value:'step_number', order: false },
        { name: 'شماره شلف', show: true, value:'shelf_number', order: false },
        { name: 'تاریخ ایجاد', show: true, value:'created_at', order: false },
    ]);

    const filterField = [
        {name:'شناسه شلف' , type:'text', value:'id'},
        {name:'تاریخ ایجاد' , type:'date', value:'created_at'},
        {name:'شماره ردیف' , type:'text', value:'row_number_from'},
        {name:'شماره ردیف' , type:'text', value:'row_number_at'},
        {name:'شماره قفسه' , type: 'text', value:'placement_number_from'},
        {name:'شماره قفسه' , type: 'text', value:'placement_number_to'},
        {name:'شماره طبقه' , type: 'text', value:'step_number_from'},
        {name:'شماره طبقه' , type: 'text', value:'step_number_to'},
    ];

    const shpssHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'سریال shpss', show: true , value:'shipment_id', order: false},
        { name: 'نام کالا', show: true, value:'sku_label' , order: false},
        { name: 'تعداد کالا', show: true , value:'count', order: false},
    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getPlacementList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }

        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `placement/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            placementList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }
    };
    async function getAllPlacementList(query) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `placement/crud/index?per_page=1000000`
        let data = await AxiosMethod.axios_get()
        if (data) {

            placementList.value = data.data.data
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/placement/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/placement/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getPlacementList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength,filterField, placementList ,addPerPage, getPlacementList, dataTableLength, page, header,loading, shpssHeader , getAllPlacementList}
}

