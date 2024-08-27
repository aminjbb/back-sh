import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useRoute} from "vue-router";

export default function setup() {
    const sellers = ref([]);
    const sellerRequests = ref([]);
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
        {name:'تاریخ اخرین درخواست' , title:'تاریخ اخرین درخواست',key:'updated_at_fa', show:true, align:'center', sortable: false},
        {name:'نام فروشنده' , title:'نام فروشنده', key:'seller', show:true, align:'center', sortable: false},
        {name:'نام فروشگاه' ,title:'نام فروشگاه', key:'shopping_name', show:true, align:'center', sortable: false},
        {name:'نوع فروشگاه' ,title:'نوع فروشگاه', key:'seller_type', show:true,  align:'center', sortable: false},
        {name:'تعداد درخواست' ,title:'تعداد درخواست', key:'request_count', show:true, align:'center'},
        {name:'وضعیت' , title:'وضعیت' ,key:'custom', show:true, align:'center', sortable: false},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const requestListHeader =ref( [
        {name:'ردیف', title:'ردیف', key:'row', show:true, align:'center', sortable: false},
        {name:'بخش درخواست' , title:'بخش درخواست',key:'section', show:true, align:'center', sortable: false},
        {name:'عنوان درخواست' , title:'عنوان درخواست', key:'title', show:true, align:'center', sortable: false},
        {name:'توضیحات' ,title:'توضیحات', key:'custom', show:true, align:'center', sortable: false},
        {name:'وضعیت' , title:'وضعیت' ,key:'custom2', show:true, align:'center', sortable: false},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [
        { name: 'تاریخ درخواست', type:'text', value:'first_name'},
        { name: 'نام فروشنده', type:'text', value:'last_name'},
        { name:'نوع فروشگاه', type: 'text', value:'phone_number'},
        { name:'وضعیت', type: 'text', value:'phone_number'},
        { name:'تعداد درخوست', type: 'text', value:'phone_number'},
    ];

    async function getSellersRequest () {
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
        AxiosMethod.end_point = 'seller/cartable/index'
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            sellers.value = data.data.data
        }
        else {
        }
    };
    async function getRequests () {
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
        AxiosMethod.end_point = `seller/cartable/get/${route.params.sellerId}`
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            sellerRequests.value = data.data
        }
        else {
        }
    };



    return {pageLength , filterField, dataTableLength , page  , header , loading , sellers , sellerRequests ,
        getSellersRequest , isFilter , isFilterPage , requestListHeader , getRequests}
}

