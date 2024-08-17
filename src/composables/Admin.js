import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useRoute} from "vue-router";

export default function setup() {
    const admin = ref([]);
    const adminForEdit =ref(null)
    const adminList = ref([]);
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
        {name:'نام' , title:'نام',key:'first_name', show:true, align:'center', sortable: false},
        {name:'نام خانوادگی' , title:'نام خانوادگی', key:'last_name', show:true, align:'center', sortable: false},
        {name:'شماره موبایل' ,title:'شماره موبایل', key:'phone_number', show:true, align:'center', sortable: false},
        {name:'سطح دسترسی' ,title:'سطح دسترسی', key:'role', show:true,  align:'center', sortable: false},
        {name:'تاریخ ساخت' ,title:'تاریخ ساخت', key:'created_at', show:true, align:'center'},
        {name:'تاریخ لاگین' , title:'تاریخ لاگین' ,key:'last_login', show:false, align:'center', sortable: false},
        {name:'ایمیل' ,title:'ایمیل', key:'email', show:true, align:'center', sortable: false},
        {name:'مسدود کردن' ,title:'مسدود کردن', key:'switch', show:true, align:'center', sortable: false},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    const filterField = [
        { name: 'نام', type:'text', value:'first_name'},
        { name: 'نام خانوادگی', type:'text', value:'last_name'},
        { name:'شماره موبایل', type: 'text', value:'phone_number'},
        // { name: 'ایمیل', type:'select', value:'email'},
    ];

    async function getAdmins ( query) {
        const filter = {
            per_page : 100000,
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'admin/crud/index'
        AxiosMethod.form = filter
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            admin.value = data.data
        }
        else {
        }
    };
    
    async function getAdmin () {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `admin/crud/get/${route.params.adminId}`
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            adminForEdit.value = data.data
        }
        else {
        }
    };
    async function getAdminList() {
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
        AxiosMethod.end_point = `admin/crud/index/`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            adminList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    return {pageLength, admin, getAdmins , getAdminList, adminList, filterField, dataTableLength , page  , header , adminForEdit , getAdmin, loading}
}

