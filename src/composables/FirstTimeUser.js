import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useRoute} from "vue-router";

export default function setup() {
    const firstTimeUserList = ref([]);
    const detailFirstTimeUser = ref([]);
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
        {name:'کد تخفیف گروهی' , title:'کد تخفیف گروهی', key:'voucher_code', show:true, align:'center', sortable: false},
        {name:'توضیحات' ,title:'توضیحات', key:'content', show:true, align:'center', sortable: false},
        {name:'تصویر' ,title:'تصویر', key:'custom', show:true,  align:'center', sortable: false},
        {name:'تاریخ ایجاد' ,title:'تاریخ ایجاد', key:'created_at', show:true, align:'center'},
        {name:'وضعیت' ,title:'وضعیت', key:'custom2', show:true, align:'center', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);

    // const filterField = [
    //     { name: 'نام', type:'text', value:'first_name'},
    //     { name: 'نام خانوادگی', type:'text', value:'last_name'},
    //     { name:'شماره موبایل', type: 'text', value:'phone_number'},
    // ];

    async function getAllFirstTimeUserList() {
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
        AxiosMethod.end_point = `page/modal/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            firstTimeUserList.value = data.data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    }

    async function getDetailFirstTimeUser() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `page/modal/crud/get/${route.params.id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            detailFirstTimeUser.value = data.data
        }
    }

    return {
        pageLength,
        dataTableLength,
        page,
        header,
        getAllFirstTimeUserList,
        firstTimeUserList,
        loading,
        getDetailFirstTimeUser,
        detailFirstTimeUser
    }
}

