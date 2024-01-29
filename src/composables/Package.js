import { ref, onMounted, watch } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { PanelFilter } from '@/assets/js/filter.js'
import { useRouter, useRoute } from 'vue-router'
import { useCookies } from "vue3-cookies";

export default function setup(posts) {
    const packageList = ref([]);
    const singlePackage = ref(null);
    const packageShpsList = ref(null);
    const assignPackage = ref(null)
    const donePackage = ref(false);
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const cookies = useCookies()
    const page = ref(1)
    const router = useRouter()
    const route = useRoute()

    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه بسته', show: true , value:'id', order: false},
        { name: 'نوع بسته', show: true, value:'type' , order: false},
        { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
        { name: 'وضعیت', show: true, value:'status', order: false },
    ]);

    const filterField = [
        {name:'شناسه بسته' , type:'text', value:'id'},
        {name:'نوع بسته' , type:'select', value:'type'},
        {name:'وضعیت' , type:'select', value:'status'},
        {name:'تعداد کالا' , type:'text', value:'shps_count_from'},
        {name:'تعداد کالا' , type: 'text', value:'shps_count_to'},
    ];

    const historyHeader =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'تاریخ آخرین وضعیت', show: true, value:'updated_at', order: false },
        { name: 'نوع بسته', show: true, value:'type' , order: false},
        { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
        { name: 'وضعیت', show: true, value:'status', order: false },
    ]);


    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()

    async function getPackageList(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `package/crud/index${paramsQuery}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            packageList.value = data.data
            loading.value = false
           setTimeout(()=>{
               isFilter.value =false
               isFilterPage.value = false
           } , 2000)
        }

        else {
        }
    };
    async function getPackage(id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `package/crud/get/${id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            singlePackage.value = data.data
        }

        else {
        }
    };
    async function getPackageShpsList(id) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `package/shps/list/${id}`
        let data = await AxiosMethod.axios_get()
        if (data) {
            packageShpsList.value = data.data
        }

        else {
        }
    };
    async function getAssignPackageList() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `package/assigned`
        let data = await AxiosMethod.axios_get()
        if (data) {
            if (data.data == null) donePackage.value = true
            else {
                assignPackage.value = data.data.id
                await getPackageShpsList(data.data.id)
            }
        }
    };
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/package/index'+ filter.params_generator(route.query))
    }

    function addPagination(page){
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/package/index'+ filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getPackageList(to)
    })

    watch(page, function(val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })

    return {pageLength,filterField, packageList ,addPerPage, getPackageList, dataTableLength, page, header,loading,
        historyHeader , getPackage , singlePackage , packageShpsList , getPackageShpsList, getAssignPackageList,
        assignPackage , donePackage}
}

