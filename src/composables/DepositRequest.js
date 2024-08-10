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
        { name: 'ردیف',title: 'ردیف', show: true , key:'row',align:'center', sortable: false},
        { name: ' شناسه ',title: ' شناسه ', show: true , key:'id',align:'center'},
        { name: ' شناسه مشتری',title: ' شناسه مشتری', show: true , key:'user_id',align:'center'},
        { name: ' نام مشتری',title: ' نام مشتری', show: true , key:'name',align:'center', sortable: false},
        { name: ' شماره مشتری',title: ' شماره مشتری', show: true , key:'phone_number',align:'center', sortable: false},
        { name: '  مبلغ درخواستی',title: '  مبلغ درخواستی', show: true , key:'amount',align:'center', sortable: false},
        { name: ' شماره شبا مشتری' ,title: ' شماره شبا مشتری', show: true, key:'card_number' ,align:'center', sortable: false},
        { name: ' موجودی قابل برداشت', title: ' موجودی قابل برداشت', show: true, key:'wallet_value', align:'center', sortable: false},
        { name: ' موجودی  کل',title: ' موجودی  کل', show: true, key:'total_inventory', align:'center', sortable: false},
        { name: ' تاریخ درخواست ',title: ' تاریخ درخواست ', show: true, key:'created_at', align:'center'},
        { name: ' تاریخ بروز‌رسانی ',title: ' تاریخ بروز‌رسانی ', show: true, key:'updated_at', align:'center'},
        { name: 'وضعیت تراکنش',title: 'وضعیت تراکنش', show: true, key:'custom', align:'center', sortable: false},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
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

