import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const operator = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()

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

    const item = []

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

    function addPerPage(number){
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name =route.query.name
        }
        if (route.query.label) {
            filter.label =route.query.label
        }

        if (route.query.id) {
            filter.id =route.query.id
        }
        if (route.query.page) {
            filter.page =route.query.page
        }
        filter.per_page = number
       router.push('/color/'+ filter.query_maker())

    }

    function addPagination(page){
        const filter = new PanelFilter()
        if (route.query.name) {
            filter.name =route.query.name
        }
        if (route.query.label) {
            filter.label =route.query.label
        }
        if (route.query.active) {
            filter.active =route.query.active
        }
        if (route.query.id) {
            filter.id =route.query.id
        }
        filter.page = page
        filter.per_page = dataTableLength.value
       router.push('/color/'+ filter.query_maker())
    }

    onBeforeRouteUpdate(async (to, from) => {
        getOperator() 
    })

    watch(page, function(val) {
        addPagination(val)
    })

    return {filterField, operator, getOperator ,addPerPage , dataTableLength , page  , header , item}
}

