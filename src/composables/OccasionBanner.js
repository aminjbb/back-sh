import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useRoute} from "vue-router";

export default function setup() {
    const OccasionBanners = ref([]);
    const cookies = useCookies()
    const route = useRoute()
    const dataTableLength = ref(25)
    const page = ref(1)
    const isFilterPage =ref(false)
    const header = [
        {name:'ردیف' ,title:'ردیف' , show:true, key:'row', sortable: false, align: 'center'},
        {name:'تصویر' ,title:'تصویر' , show:true, key:'image', align: 'center'},
        {name:'لینک' ,title:'لینک' , show:true ,  key:'link', align: 'center'},
        {name:'سازنده' ,title:'سازنده' , show:true, key:'creator', align: 'center', width:'300'},
        {name:'وضعیت' ,title:'وضعیت' , show:true, key:'switch', align: 'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ];

    const filterField = [
        {name:'دستگاه' , type:'select', value:'device' ,},
        {name:'زمان شروع' , type:'date', value:'start_time'},
        {name:'زمان پایان' , type:'date', value:'end_time'},
        {name:'سازنده' , type:'autocomplete', value:'creator_id'},
        {name:'وضعیت' , type:'select', value:'is_active'},
    ];

    async function  getOccasionBanners() {
        const AxiosMethod = new AxiosCall()
        let query = route.query
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
        AxiosMethod.end_point = 'page/top_banner/crud/index'
        let data = await AxiosMethod.axios_get()
        if (data) {
            OccasionBanners.value = data.data
        }
        else {
        }
    };

    return {filterField, OccasionBanners, getOccasionBanners  , header , isFilterPage , page , dataTableLength }
}

