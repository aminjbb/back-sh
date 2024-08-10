import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const WithdrawRequestList = ref([]);
    const WithdrawRequest = ref([])
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const route = useRoute()

    // Page table header
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: ' شناسه ', show: true , value:'id', order: true},
        { name: ' شناسه مشتری', show: true , value:'user_id', order: true},
        { name: ' نام مشتری', show: true , value:'name', order: false},
        { name: ' شماره مشتری', show: true , value:'phone_number', order: false},
        { name: '  مبلغ درخواستی', show: true , value:'id', order: false},
        { name: ' شماره شبا مشتری', show: true, value:'type' , order: false},
        { name: ' موجودی قابل برداشت', show: true, value:'value', order: false },
        { name: ' موجودی  کل', show: true, value:'value', order: false },
        { name: ' تاریخ درخواست ', show: true, value:'created_at', order: true },
        { name: ' تاریخ بروز‌رسانی ', show: true, value:'updated_at', order: true },
        // { name: 'نام ادمین ', show: true, value:'updated_at', order: false },
        { name: 'وضعیت تراکنش', show: true, value:'is_active', order: false },
    ]);

    const filterField = [
        {name:' شناسه' , type:'text', value:'id' , place:'شناسه'},
        {name:' شناسه مشتری' , type:'text', value:'user_id' , place:'شناسه مشتری'},
        { name:'نام مشتری' , type: 'auto-complete', value:'user_id' , place:'نام مشتری'},
        { name: 'شماره شبا مشتری', type:'text', value:'card_number' , place:'شماره شبا مشتری'},
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
    /**
     * Get page list
     * @param {*} query
     */
    async function getWithdrawRequestList() {
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
        AxiosMethod.end_point = `finance/admin/transaction/crud/withdraw/index`
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
    }

    return {
        pageLength, filterField, WithdrawRequestList , getWithdrawRequestList, dataTableLength, page, header, loading, WithdrawRequest
    }
}

