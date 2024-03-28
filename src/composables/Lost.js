import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import {  onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter_lost.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const itemList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'سریال کالا', show: true , value:'shps_s', order: false},
        { name: 'نام کالا', show: true , value:'shps_label', order: false},
        { name: 'شناسه بسته', show: true , value:'id', order: false},
        { name: 'نوع بسته', show: true, value:'package_type' , order: false},
        { name: 'شناسه محموله', show: true , value:'shipment_id', order: false},
        { name: 'نوع محموله', show: true , value:'shipment_type', order: false},
        { name: 'نام فروشگاه', show: true , value:'shopping_name', order: false},
        { name: 'نام سازنده', show: true , value:'creator_id', order: false},
        { name: 'تاریخ افزودن به لیست', show: true , value:'created_at', order: false},




    ]);



    const createHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه بسته', show: true , value:'id', order: false},
        { name: 'نوع بسته', show: true, value:'type' , order: false},
        { name: 'نوع محموله', show: true , value:'shipment_type', order: false},
        { name: 'نام فروشگاه', show: true , value:'seller_name', order: false},
        { name: 'تامین کننده', show: true , value:'supplier', order: false},
        { name: 'سریال کالا', show: true , value:'license', order: false},
        { name: 'نام کالا', show: true , value:'shps_label', order: false},
        { name: 'نوع گزارش', show: true , value:'report_type', order: false},
        { name: 'تاریخ افزودن به لیست', show: true , value:'created_at', order: false},
    ]);
    const filterField = [
        { name: 'شناسه بسته', type:'text', value:'package_id'},
        { name: 'نوع بسته', type:'select', value:'package_type'},
        { name:'نوع محموله', type: 'select', value:'shipment_type'},
        { name: 'نام فروشگاه', type:'text', value:'shopping_name'},
        { name: 'تامین کننده', type:'select', value:'supplier_id'},
        { name: 'سریال کالا', type:'text', value:'shps_s'},
        { name: 'نام کالا', type:'text', value:'sku_label'},
        { name: 'نام ایجاد کننده', type:'select', value:'creator_id'},
        { name: 'تاریخ افزودن به لیست', type:'date', value:'date'},
    ];
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getWasteAndLostList(query) {
        console.log('hiiii')
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `report/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            itemList.value = data.data.data
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
        router.push(route.path+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push(route.path+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getWasteAndLostList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength, itemList ,addPerPage, getWasteAndLostList, dataTableLength, page, header,loading, createHeader ,
        filterField , addPagination}
}

