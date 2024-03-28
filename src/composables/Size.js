import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const size = ref([]);
    const pageLength = ref(1)
    const cookies = useCookies()
    const route = useRoute()

    const header = [
        {name:'ردیف' , show:true, value:null, order: false},
        {name:'شناسه' , show:true, value:'created_at', order: true},
        {name:'نام انگلیسی' , show:true , value:'name', order: true},
        {name:'نام فارسی' , show:true ,  value:'label', order: true},
        {name:'فعال سازی ' , show:true, value:'is_active', order: true},
    ];

    const filterField = [
        {name:'شناسه' , type:'text', value:'id'},
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'گروه' , type:'text', value:'group'},
        {name:'نام فارسی' , type:'text', value:'label'},
        {name:'فعال سازی ' , type:'switch', value:'active'},
    ];


    async function  getSize(query) {
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
        AxiosMethod.end_point = 'product/size/crud/index'
        AxiosMethod.form = formdata

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value =  Math.ceil(data.data.total / data.data.per_page)
            size.value = data.data
        }
    };



    return {filterField, size, getSize    , header }
}

