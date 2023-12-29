import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const packagePlacement = ref([]);
    const singlePackagePlacement = ref([
        {
            package_id:122,
            placement_id:12
        },
        {
            package_id:122,
            placement_id:12
        },
        {
            package_id:122,
            placement_id:12
        }, {
            package_id:122,
            placement_id:12
        },
        {
            package_id:122,
            placement_id:12
        },
        {
            package_id:122,
            placement_id:12
        },
    ]);
    const cookies = useCookies()
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const router = useRouter()
    const route = useRoute()
    const page = ref(1)

    const header = ref([
        {name:'ردیف' , show:true , value:null, order: false},
        {name:'شناسه بسته' , show:true , value:'created_at', order: false},
        {name:'نوع محموله' , show:true , value:'name', order: false},
        {name:'شماره جایگاه' , show:true ,  value:'label', order: false},
    ]);

    const item = []
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getPackagePlacement(query) {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `placement/packages`
        AxiosMethod.using_auth = true
        let data = await AxiosMethod.axios_get()
        if (data) {
            packagePlacement.value = data.data
            loading.value = false
        }
    };
    async function getSinglePackagePlacement(id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `placement/package/${id}`
        AxiosMethod.using_auth = true
        let data = await AxiosMethod.axios_get()
        if (data) {
            singlePackagePlacement.value = data.data
        }
    };


    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/categories/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/categories/index'+ filter.params_generator(route.query))
    }


    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getCategories(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return { pageLength, packagePlacement, addPerPage, getPackagePlacement, dataTableLength , page  , header , item ,
        loading , getSinglePackagePlacement ,singlePackagePlacement }
}

