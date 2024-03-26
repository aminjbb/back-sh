import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const zoneList = ref([]);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام', show: true , value:'id', order: false},
        { name: 'نام انگلیسی', show: true, value:'name' , order: false},
    ]);

    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getZoneList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }

        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `warehouse/zone/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            zoneList.value = data.data
            loading.value = false
        }
    };

    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/zone/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/zone/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {
        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getZoneList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength, zoneList ,addPerPage, getZoneList, dataTableLength, page, header,loading}
}

