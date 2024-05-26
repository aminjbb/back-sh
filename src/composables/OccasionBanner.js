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
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'تصویر' , show:true, value:'image_url', order: true},
        // {name:'دستگاه' , show:true , value:'device', order: true},
        {name:'لینک' , show:true ,  value:'link', order: true},
        {name:'سازنده' , show:true, value:'creator', order: true},
        {name:'وضعیت' , show:true, value:'is_active', order: true},
        {name:'زمان ویرایش' , show:false, value:'updated_at', order: true},
        {name:'زمان شروع' , show:false, value:'start_date', order: true},
        {name:'زمان پایان' , show:false, value:'end_date', order: true},
    ];

    const filterField = [
        {name:'دستگاه' , type:'select', value:'device' ,},
        {name:'زمان شروع' , type:'date', value:'start_date'},
        {name:'زمان پایان' , type:'date', value:'end_date'},
        {name:'سازنده' , type:'autocomplete', value:'creator_id'},
        {name:'وضعیت' , type:'select', value:'is_active'},
    ];

    async function  getOccasionBanners(query) {
        const AxiosMethod = new AxiosCall()
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

