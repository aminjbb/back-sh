import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";
import {PanelFilter} from "../assets/js/filter_deposit_request";


export default function setup() {
    const WithdrawRequestList = ref([]);
    const WithdrawRequest = ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    // Page table header
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: ' شناسه ', show: true , value:'id', order: true},
        { name: ' شناسه مشتری', show: true , value:'user_id', order: true},
        { name: ' نام مشتری', show: true , value:'name', order: false},
        { name: ' شماره مشتری', show: true , value:'phone_number', order: false},
        { name: ' شماره شبا مشتری', show: true, value:'type' , order: false},
        { name: '  مبلغ درخواستی', show: true , value:'id', order: false},
        { name: ' موجودی قابل برداشت', show: true, value:'value', order: false },
        { name: ' موجودی  کل', show: true, value:'value', order: false },
        { name: ' تاریخ درخواست ', show: true, value:'created_at', order: true },
        { name: ' تاریخ بروز‌رسانی ', show: true, value:'updated_at', order: true },
        // { name: 'نام ادمین ', show: true, value:'updated_at', order: false },
        { name: 'وضعیت تراکنش', show: true, value:'is_active', order: false },
    ]);

    const filterField = [
        {name:'شماره تماس' , type:'text', value:'phone_number' , place:'شماره تماس'},
        {name:' شناسه' , type:'text', value:'id' , place:'شناسه'},
        { name:'نام مشتری' , type: 'auto-complete', value:'user_id' , place:'نام مشتری'},
        { name: 'شماره شبا مشتری', type:'text', value:'card_number' , place:'شماره شبا مشتری'},
        { name: 'نام ادمین', type:'auto-complete', value:'admin' , place:'نام ادمین'},
        { name: 'حداقل مبلغ درخواستی', type:'text', value:'amount_from', place:'از'},
        { name: 'حداکثر مبلغ درخواستی', type:'text', value:'amount_to', place:'تا'},
        { name: 'حداقل موجودی کیف پول', type:'text', value:'wallet_value_from', place:'از '},
        { name: 'حداکثر موجودی کیف پول ', type:'text', value:'wallet_value_to', place:' تا'},
        { name: 'تاریخ درخواست', type:'date', value:'created_at', place:'از'},
        { name: ' وضعیت درخواست', type:'select', value:'status', place:'تا'},
    ];

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    /**
     * Get page list
     * @param {*} query
     */
    async function getWithdrawRequestList(query) {

        let paramsQuery = null
        loading.value = true
        if (query){
            if (query.query.page)   page.value = parseInt(query.query?.page)
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `finance/admin/transaction/crud/withdraw/index/${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            WithdrawRequestList.value = data.data
            WithdrawRequest.value = data.data.id


            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 1000)
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/withdraw-request/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/withdraw-request/index'+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {
        pageLength, filterField, WithdrawRequestList ,addPerPage, getWithdrawRequestList,
        dataTableLength, page, header, loading, WithdrawRequest
    }
}

