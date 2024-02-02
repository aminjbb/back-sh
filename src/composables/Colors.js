import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { PanelFilter} from '@/assets/js/filter.js'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const color = ref([]);
    const allColors = ref([]);
    const colorGroups = ref([]);
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()

    const header = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه' , show:true , value:'created_at', order: true},
        {name:'نام انگلیسی' , show:true , value:'name', order: true},
        {name:'نام فارسی' , show:true ,  value:'label', order: true},
        {name:'گروه' , show:true, value:'group', order: true},
        {name:'فعال سازی ' , show:true, value:'is_active', order: true},
    ]);

    const filterField = [
        { name: 'نام انگلیسی', type: 'text', value: 'name' },
        { name: 'نام فارسی', type: 'text', value: 'label' },
        { name: 'گروه', type: 'text', value: 'group' },
        { name: 'فعال سازی ', type: 'select', value: 'active' },
        { name:'تاریخ ایجاد' , type: 'date', value:'created_at'},
        { name:'تاریخ بروز‌رسانی' , type: 'date', value:'updated_at'},
    ];
    
    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getColor(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/color/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            color.value = data.data
            loading.value = false
            setTimeout(()=>{
                isFilter.value =false
                isFilterPage.value = false
            } , 2000)
        }
    };

    async function getAllColor(query) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/color/crud/index?per_page=1000000&order=created_at&order_type=desc`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            allColors.value = data.data
        }
    };

    async function getGroupColor(query) {
        loading.value = true
        var formdata = {}
        if (query) {
            formdata = query
        }
        else if (route.query) {
            formdata = route.query
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'product/color/get/groups?per_page=100000'
        AxiosMethod.form = formdata

        let data = await AxiosMethod.axios_get()
        if (data) {
            colorGroups.value = data.data
            loading.value = false
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/color/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/color/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
       await getColor(to)
    })

    watch(page, function (val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return { pageLength, filterField, color, getColor, getGroupColor,getAllColor, allColors, colorGroups, addPerPage, dataTableLength, page, header, item , loading}
}

