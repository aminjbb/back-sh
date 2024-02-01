import { ref, onMounted, watch } from 'vue';
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
        {name:'شناسه' , show:true , value:'created_at', order: true},
        {name:'نام انگلیسی' , show:true , value:'name', order: true},
        {name:'نام فارسی' , show:true,  value:'label', order: true},
        {name:'نوع' , show:true, value:'type', order: false},
        {name:'مقدار ویژگی' , show:true, order: false},
        {name:'فیلتر' , show:true, order: false},
    ]);

    const filterField =  [
        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: 'نوع ', type: 'select', value: 'active' },
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getAttributes (query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/attribute/crud/index${paramsQuery}`

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
    };

    function addPerPage(number){

        filter.page = 1;
        page.value = 1;
        filter.per_page = number
        
       router.push('/attributes/index'+ filter.query_maker())
    }

    function addPagination(page){

        filter.page = page
        filter.per_page = dataTableLength.value
       router.push('/attributes/index'+ filter.query_maker())
    }

    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getAttributes(to)
    })
    
    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength, attributes,addPerPage, getAttributes ,getAllAttributes, getProductAttributes , dataTableLength , page  , header , item , filterField , loading}
}

