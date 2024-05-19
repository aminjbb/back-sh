import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {UserPanelFilter} from "@/assets/js/filter_user";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

export default function setup() {
    const admin = ref([]);
    const adminForEdit =ref(null)
    const adminList = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new UserPanelFilter()

    const header =ref( [
        {name:'ردیف' , show:true, value:null, order:false},
        {name:'نام' , show:true, value:'first_name', order:false},
        {name:'نام خانوادگی' , show:true, value:'last_name', order:false},
        {name:'شماره موبایل' , show:true, value:'phone_number', order:false},
        {name:'سطح دسترسی' , show:true, value:'role', order:false},
        {name:'تاریخ ساخت' , show:true, value:'created_at', order:true},
        {name:'تاریخ لاگین' , show:false, value:'last_login', order:false},
        {name:'ایمیل' , show:true, value:'email', order:false},
        {name:'مسدود کردن' , show:true, value:'is_ban', order:false},
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

