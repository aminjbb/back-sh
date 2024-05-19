import { ref, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import {  onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const attributes = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()

    const header = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه' , show:true , value:'id', order: true},
        {name:'نام انگلیسی' , show:true , value:'name', order: true},
        {name:'نام فارسی' , show:true,  value:'label', order: true},
        {name:'نوع' , show:true, value:'type', order: false},
        {name:'مقدار ویژگی' , show:true, order: false},
        {name:'فیلتر' , show:true, order: false},
    ]);

    const filterField =  [
        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: 'نوع ', type: 'select', value: 'type' },
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getAttributes () {
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
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/attribute/crud/index`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            attributes.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
        else {
            loading.value = false

        }
    };

    async function getAllAttributes () {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/attribute/crud/index?per_page=100000`

        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            attributes.value = data.data
        }
        else {
            loading.value = false
        }
    };
    async function getProductAttributes (id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/attribute/crud/product-index/${id}`

        let data = await AxiosMethod.axios_get()
        if (data) {
            attributes.value = data
        }
        else {
            loading.value = false
        }
    }

    return {pageLength, attributes, getAttributes ,getAllAttributes, getProductAttributes , dataTableLength , page  , header , item , filterField , loading}
}

