import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { useRouter, useRoute } from 'vue-router'
import {UserPanelFilter} from "@/assets/js/filter_user";
import {UserWalletFilter} from "@/assets/js/wallet_filter";
export default function setup() {
    const users = ref([]);
    const user = ref(null);
    const userAddress = ref(null)
    const userList  = ref([])
    const transactionList  = ref([])
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const header = ref([
        {name:'ردیف' , show:true, value:null, order:false},
        {name:'نام' , show:true, value:'first_name', order:false},
        {name:'نام خانوادگی' , show:true, value:'last_name', order:false},
        {name:'شماره موبایل' , show:true, value:'phone_number', order:false},
        {name:'تاریخ ساخت' , show:true, value:'created_at_fa', order:true},
        {name:'تاریخ لاگین' , show:false, value:'last_login', order:false},
        {name:'ایمیل' , show:true, value:'email', order:false},
        {name:'مسدود کردن' , show:true, value:'is_ban', order:false},
    ])
    const headerTransaction = ref([
        {name:'ردیف' , show:true, value:null, order:false},
        {name:'شماره مشتری' , show:true, value:'first_name', order:false},
        {name:'نام مشتری' , show:true, value:'last_name', order:false},
        {name:'کد رهگیری' , show:true, value:'phone_number', order:false},
        {name:' وضعیت تراکنش' , show:true, value:'email', order:false},
        {name:'علت تراکنش' , show:true, value:'last_login', order:false},
        {name:'برداشت از کیف پول' , show:true, value:'email', order:false},
        {name:' شارژ کیف پول' , show:true, value:'is_ban', order:false},
        {name:' موجودی کیف پول' , show:true, value:'is_ban', order:false},
        {name:' تاریخ تراکنش' , show:true, value:'is_ban', order:false},
    ])
    const filterField = [
        { name: 'نام', type:'text', value:'first_name'},
        { name: 'نام خانوادگی', type:'text', value:'last_name'},
        { name:'شماره موبایل', type: 'text', value:'phone_number'},
        { name: 'ایمیل', type:'select', value:'email'},
    ];
    const filterFieldWallet = [

        { name:'شماره مشتری', type: 'auto-complete', value:'user_id'},
        { name:'حداقل برداشت از کیف پول', type: 'text', value:'withdraw_amount_from'},
        { name:'حداکثر برداشت از کیف پول', type: 'text', value:'withdraw_amount_to'},
        { name:'حداکثر شارژ کیف پول', type: 'text', value:'deposit_amount_to'},
        { name:'حداقل شارژ کیف پول', type: 'text', value:'deposit_amount_from'},
        // { name:'تاریخ تراکنش', type: 'date', value:'created_at'},
        { name:' شماره ارجاع', type: 'text', value:'refid'},
        { name: 'کد رهگیری', type:'text', value:'shvz_tracking_code'},
        { name: ' وضعیت تراکنش', type:'select', value:'status'},
        { name: ' علت تراکنش', type:'select', value:'charge_type'},
    ];
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new UserPanelFilter()
    const walletFilter = new UserWalletFilter()

    async function getUsers (filter) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'user/crud/index'
        AxiosMethod.form = filter
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            users.value = data.data
        }
        else {
        }
    };

    async function getUserAddress (id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `user/crud/get/address/${id}`
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            userAddress.value = data.data
        }
        else {
        }
    };

    async function getUser () {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `user/crud/get/${route.params.userId}`
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            user.value = data.data
        }
        else {
        }
    };

    async function getUserList (query) {
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
        AxiosMethod.end_point = `user/crud/index/${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            userList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function getTransactionList (query) {
        let paramsQuery = null
        loading.value = true
        if (query){
            paramsQuery = walletFilter.params_generator(query.query)
        }
        else  paramsQuery = walletFilter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `finance/admin/transaction/crud/index/${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            transactionList.value = data.data.data
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
        router.push(route.path+ filter.query_maker(route.query))
    }
    
    function addPaginationWallet(page){
        walletFilter.page = page
        walletFilter.per_page = dataTableLength.value
        router.push(route.path+ walletFilter.params_generator(route.query))
    }

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push(route.path+ filter.params_generator(route.query))
    }

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            if (route.name === 'walletUser') addPaginationWallet(val)
            else addPagination(val)


        }
    })



    return {pageLength, users, getUsers ,
        dataTableLength , page  , header , userList ,
        getUserList , filterField , filterFieldWallet, user , getUser , addPerPage,
        getUserAddress , userAddress, headerTransaction, getTransactionList, transactionList,
        addPaginationWallet}
}

