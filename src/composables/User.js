import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { useRoute } from 'vue-router'

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
        {name:'ردیف', title:'ردیف', show:true, key:'row', order:false, align:'center', sortable: false,},
        {name: 'شناسه', title: 'شناسه', show: true, key: 'id', order: true, align:'center'},
        {name:'نام', title:'نام', show:true, key:'first_name', order:false, align:'center', sortable: false},
        {name:'نام خانوادگی', title:'نام خانوادگی', show:true, key:'last_name', order:false, align:'center', sortable: false},
        {name:'شماره موبایل', title:'شماره موبایل', show:true, key:'phone_number', order:false, align:'center', sortable: false},
        {name:'تاریخ ساخت', title:'تاریخ ساخت', show:true, key:'created_at', order:true, align:'center'},
        {name:'تاریخ لاگین', title:'تاریخ لاگین', show:false, key:'last_login', order:false, align:'center', sortable: false},
        {name:'ایمیل', title:'ایمیل' , show:true, key:'email', order:false, align:'center', sortable: false},
        {name:'مسدود کردن', title:'مسدود کردن', show:true, key:'switch', order:false, align:'center', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ])
    const headerTransaction = ref([
        {name:'ردیف' ,title:'ردیف' , show:true, key:'row', align: 'center', sortable: false},
        {name:'شماره مشتری' ,title:'شماره مشتری' , show:true, key:'phone_number', align: 'center', sortable: false},
        {name:'نام مشتری' ,title:'نام مشتری' , show:true, key:'name', align: 'center', sortable: false},
        {name:'کد رهگیری' ,title:'کد رهگیری' , show:true, key:'refid', align: 'center', sortable: false},
        {name:' وضعیت تراکنش' ,title:' وضعیت تراکنش' , show:true, key:'status', align: 'center', sortable: false},
        {name:'علت تراکنش' ,title:'علت تراکنش' , show:true, key:'reason', align: 'center', sortable: false},
        {name:'برداشت از کیف پول' ,title:'برداشت از کیف پول' , show:true, key:'custom', align: 'center', sortable: false},
        {name:' شارژ کیف پول' ,title:' شارژ کیف پول' , show:true, key:'custom2', align: 'center', sortable: false},
        {name:' موجودی کیف پول' ,title:' موجودی کیف پول' , show:true, key:'wallet_value', align: 'center', sortable: false},
        {name:' تاریخ تراکنش' ,title:' تاریخ تراکنش' , show:true, key:'create_at', align: 'center', sortable: false},
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
        { name:'حداقل شارژ کیف پول', type: 'text', value:'deposit_amount_from'},
        { name:'حداکثر شارژ کیف پول', type: 'text', value:'deposit_amount_to'},
        { name:'تاریخ تراکنش', type: 'date', value:'created_at'},
        // { name:' شماره ارجاع', type: 'text', value:'refid'},
        { name: 'کد رهگیری', type:'text', value:'shvz_tracking_code'},
        { name: ' وضعیت تراکنش', type:'select', value:'status'},
        { name: ' علت تراکنش', type:'select', value:'charge_type'},
    ];
    const cookies = useCookies()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

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
        getTransactionList, transactionList, loading}
}

