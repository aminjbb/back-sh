import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { useRouter, useRoute } from 'vue-router'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import {UserPanelFilter} from "@/assets/js/filter_user";
export default function setup(posts) {
    const users = ref([]);
    const user = ref(null);
    const userList  = ref([])
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const header = ref([
        {name:'ردیف' , show:true, value:null, order:false},
        {name:'نام' , show:true, value:'first_name', order:false},
        {name:'نام خانوادگی' , show:true, value:'last_name', order:false},
        {name:'شماره موبایل' , show:true, value:'phone_number', order:false},
        {name:'تاریخ ساخت' , show:true, value:'email', order:false},
        {name:'تاریخ لاگین' , show:false, value:'last_login', order:false},
        {name:'ایمیل' , show:true, value:'email', order:false},
        {name:'مسدود کردن' , show:true, value:'is_ban', order:false},
    ])

    const filterField = [
        { name: 'نام', type:'text', value:'first_name'},
        { name: 'نام خانوادگی', type:'text', value:'last_name'},
        { name:'شماره موبایل', type: 'text', value:'phone_number'},
        { name: 'ایمیل', type:'select', value:'email'},
    ];
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new UserPanelFilter()
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

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/user/index/'+ filter.params_generator(route.query))
    }
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/user/index'+ filter.params_generator(route.query))
    }
    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getUserList(to)
    })


    return {pageLength, users, getUsers , dataTableLength , page  , header , userList , getUserList , filterField ,user , getUser , addPerPage}
}

