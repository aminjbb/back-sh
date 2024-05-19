import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const OccasionBanners = ref([]);
    const cookies = useCookies()

    const header = [
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'تصویر' , show:true, value:'image_url', order: true},
        {name:'دستگاه' , show:true , value:'device', order: true},
        {name:'لینک' , show:true ,  value:'link', order: true},
        {name:'سازنده' , show:true, value:'creator', order: true},
        {name:'وضعیت' , show:true, value:'is_active', order: true},
        {name:'زمان ویرایش' , show:false, value:'updated_at', order: true},
        {name:'زمان شروع' , show:false, value:'start_date', order: true},
        {name:'زمان پایان' , show:false, value:'end_date', order: true},
        {name:'دخیره' , show:true, value:'save', order: true},
    ];

    const filterField = [
        {name:'دستگاه' , type:'select', value:'device' ,},
        {name:'زمان شروع' , type:'date', value:'start_date'},
        {name:'زمان پایان' , type:'date', value:'end_date'},
        {name:'سازنده' , type:'autocomplete', value:'creator_id'},
        {name:'وضعیت' , type:'select', value:'is_active'},
    ];

    async function  getOccasionBanners(query) {
        var formdata  ={}
        if(query){
            formdata  = query
        }
        else if (route.query) {
            formdata  = route.query
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'product/operator/crud/index'
        AxiosMethod.form = formdata

        let data = await AxiosMethod.axios_get()
        if (data) {
            OccasionBanners.value = data.data
        }
        else {
        }
    };

    return {filterField, OccasionBanners, getOccasionBanners  , header }
}

