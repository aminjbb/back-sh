import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useRoute} from "vue-router";

export default function setup() {
    const giftList = ref([])
    const ordersList = ref([])
    const usersList = ref([])
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)

    const header =ref( [
        {name:'ردیف', title:'ردیف', key:'row', show:true, align:'center', sortable: false},
        {name:'عنوان' , title:'عنوان',key:'name', show:true, align:'center', sortable: false},
        {name:'شناسه کالا' , title:'شناسه کالا', key:'shps_id', show:true, align:'center', sortable: false},
        {name:'تصویر کالا' ,title:'تصویر کالا', key:'image', show:true, align:'center', sortable: false},
        {name:'نام کالا' , title:'نام کالا',key:'shps_name', show:true, align:'center', sortable: false},
        {name:'تعداد کالا' ,title:'تعداد کالا', key:'shps_count', show:true,  align:'center', sortable: false},
        {name:'چندمین سفارش' ,title:'چندمین سفارش', key:'order_count', show:true,  align:'center', sortable: false},
        {name:'تعداد استفاده کاربر' ,title:'تعداد استفاده کاربر', key:'user_limit', show:true,  align:'center', sortable: false},
        {name:'حداقل هزینه سفارش' ,title:'حداقل هزینه سفارش', key:'min_order_price', show:true,  align:'center', sortable: false},
        {name:'تاریخ شروع' ,title:'تاریخ شروع', key:'start_time', show:true, align:'center'},
        {name:'تاریخ پایان' , title:'تاریخ پایان' ,key:'end_time', show:true, align:'center'},
        {name:'وضعیت' ,title:'وضعیت', key:'is_active', show:true, align:'center', sortable: false},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ])

    const headerUsersList =ref( [
        {name:'ردیف', title:'ردیف', key:'row', show:true, align:'center', sortable: false},
        {name:'شناسه کاربر' , title:'شناسه کاربر', key:'id', show:true, align:'center', sortable: false},
        {name:'نام کاربر' , title:'نام کاربر', key:'first_name', show:true, align:'center', sortable: false},
        {name:'نام خانوادگی کاربر' , title:'نام خانوادگی کاربر', key:'last_name', show:true, align:'center', sortable: false},
        {name:'شماره تماس' , title:'شماره تماس', key:'phone_number', show:true, align:'center', sortable: false},
    ])

    const headerOrdersList =ref( [
        {name:'ردیف', title:'ردیف', key:'row', show:true, align:'center', sortable: false},
        {name:'شناسه سفارش' , title:'شناسه سفارش', key:'id', show:true, align:'center', sortable: false},
        {name:'نام کاربر' , title:'نام کاربر', key:'first_name', show:true, align:'center', sortable: false},
        {name:'نام خانوادگی کاربر' , title:'نام خانوادگی کاربر', key:'last_name', show:true, align:'center', sortable: false},
        {name:'شماره تماس کاربر' , title:'شماره تماس کاربر', key:'phone_number', show:true, align:'center', sortable: false},
        {name:'کد تخفیف' , title:'کد تخفیف', key:'voucher_code', show:true, align:'center', sortable: false},
        {name:'چندمین سفارش' , title:'چندمین سفارش', key:'order_number', show:true, align:'center', sortable: false},
        {name:'تعداد آیتم' , title:'تعداد آیتم', key:'details_count', show:true, align:'center', sortable: false},
        {name:'مبلغ سفارش(ریال)' , title:'مبلغ سفارش(ریال)', key:'paid_price', show:true, align:'center', sortable: false},
        {name:'تاریخ ثبت سفارش' ,title:'تاریخ ثبت سفارش', key:'created_at', show:true, align:'center'},
    ])

    const filterField = [
        { name: 'عنوان', type:'text', value:'name'},
        { name: 'شناسه کالا', type:'text', value:'shps'},
        { name:'نام کالا', type: 'text', value:'sku_name'},

        {name:'تاریخ شروع ' , type:'date', value:'start_time'},
        {name:'تاریخ پایان ' , type:'date', value:'end_time'},

        { name:'وضعیت' , type:'select', value:'is_active'},

        { name:'تعداد کالا از' , type:'text', value:'shps_count_from', place:'از'},
        { name:'تعداد کالا تا' , type: 'text', value:'shps_count_to', place:'تا'},

        { name:'کمترین شماره سفارش' , type:'text', value:'order_count_from', place:'از'},
        { name:'بیشترین شماره سفارش' , type:'text', value:'order_count_to', place: 'تا'},

        { name:'کمترین تعداد استفاده کاربر' , type:'text', value:'user_limit_from', place:'از'},
        { name:'بیشترین تعداد استفاده کاربر' , type:'text', value:'user_limit_to', place: 'تا'},

        { name:'کمترین هزینه سفارش' , type:'text', value:'min_order_price_from', place:'از'},
        { name:'بیشترین هزینه سفارش ' , type:'text', value:'min_order_price_to', place: 'تا'},
    ]

    const filterFieldUsersList = [
        { name: 'شناسه کاربر', type:'text', value:'id'},
        { name:'نام کاربر', type: 'text', value:'first_name'},
        { name:'نام خانوادگی کاربر', type: 'text', value:'last_name'},
        { name:'شماره تماس', type: 'text', value:'phone_number'},
    ]

    const filterFieldOrdersList = [
        { name:'شناسه سفارش', type:'text', value:'id'},
        { name:'شماره تماس کاربر', type:'select', value:'user_id'},

        { name:'کمترین تعداد آیتم' , type:'text', value:'details_count_from', place:'از'},
        { name:'بیشترین تعداد آیتم' , type: 'text', value:'details_count_to', place:'تا'},

        { name:'کمترین مبلغ سفارش' , type:'text', value:'paid_price_from', place:'از'},
        { name:'بیشترین مبلغ سفارش' , type:'text', value:'paid_price_to', place: 'تا'},

        { name:'کد تخفیف', type:'text', value:'voucher_code'},
        { name:'تاریخ ثبت سفارش' , type:'date', value:'submit_date'}
    ]

    async function getGiftList() {
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
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'gift/crud/index'
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            giftList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    async function getOrders() {
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
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `gift/crud/${route.params.id}/orders/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            ordersList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    async function getUsers() {
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
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `gift/crud/${route.params.id}/users/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            usersList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }


    return {
        pageLength,
        filterField,
        dataTableLength ,
        page,
        header,
        loading,
        getGiftList,
        giftList,
        headerUsersList,
        filterFieldUsersList,
        headerOrdersList,
        filterFieldOrdersList,
        getOrders,
        ordersList,
        getUsers,
        usersList
    }
}

