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
    const pageLengthWallet =ref(1)
    const header = ref([
        {name:'ردیف' , show:true, value:null, order:false},
        {name: 'شناسه', show: true, value: 'created_at', order: true},
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
        { name: 'شناسه', type:'text', value:'id'},
        { name:'شماره موبایل', type: 'text', value:'phone_number'},
        {name: 'تاریخ ایجاد', type: 'date', value: 'created_at'},
        {name: 'تاریخ بروز‌رسانی', type: 'date', value: 'updated_at'},
        // { name: 'ایمیل', type:'select', value:'email'},
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

    async function getUserList () {
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
        AxiosMethod.end_point = `user/crud/index/`
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
    }

    async function getTransactionList () {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
        if ( !route.query.per_page ){
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        else{
            AxiosMethod.form = {
                ...query,
                page:page.value,
                per_page : dataTableLength.value
            }
        }
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `finance/admin/transaction/crud/index/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLengthWallet.value = data.data.last_page
            transactionList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    return {pageLength, pageLengthWallet,  users, getUsers , dataTableLength , page  , header , userList , getUserList ,
        filterField , filterFieldWallet, user , getUser , getUserAddress , userAddress, headerTransaction,
        getTransactionList, transactionList}
}

