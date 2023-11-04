import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const size = ref([]);
    const dataTableLength = ref(25)
    let page = ref(1)
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
        {name:'شناسه' , type:'text', value:'id'},
        {name:'نام انگلیسی' , type:'text', value:'name'},
        {name:'گروه' , type:'text', value:'group'},
        {name:'نام فارسی' , type:'text', value:'label'},
        {name:'فعال سازی ' , type:'switch', value:'active'},
    ];

    const item = []

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
        filter.page = 1;
        page = 1;
        filter.per_page = number
        router.push('/color/'+ filter.query_maker())

    }

    function addPagination(page){
        const filter = new BrandPanelFilter()
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
        getVolume() 
    })

    watch(page, function(val) {
        addPagination(val)
    })

    return {filterField, size, getSize ,addPerPage , dataTableLength , page  , header , item}
}

