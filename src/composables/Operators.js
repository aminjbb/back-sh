import { ref, watch } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const operator = ref([]);
    const dataTableLength = ref(25)
    const cookies = useCookies()

    const header = [
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'شناسه' , show:true, value:'created_at', order: true},
        {name:'نام انگلیسی' , show:true , value:'name', order: true},
        {name:'نام فارسی' , show:true ,  value:'label', order: true},
        {name:'فعال سازی ' , show:true, value:'is_active', order: true},
    ];

    const filterField = [
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'گروه' , type:'text', value:'group'},
        {name:'نام فارسی' , type:'text', value:'label'},
        {name:'فعال سازی ' , type:'select', value:'active'},
    ];

    async function  getOperator(query) {
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
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            operator.value = data.data
        }
        else {
        }
    };

    return {filterField, operator, getOperator  , dataTableLength , header }
}

