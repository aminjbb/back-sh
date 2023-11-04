import {ref, onMounted, watch} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRouter, useRoute} from 'vue-router'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {PanelFilter} from '@/assets/js/filter.js'
export default function setup(posts) {
    const permissions = ref([]);
    const allPermission = ref([]);
    const permission = ref({});
    const dataTableLength = ref(25)
    const page = ref(1)
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    const pageLength = ref(1)
    const header = ref([
        {name: 'ردیف', show: true},
        {name: 'شناسه', show: true},
        {name: 'عنوان', show: true},
        {name: 'نام فارسی', show: true},
    ]);
    const loading = ref(false)
    const isFilter =ref(false)
    const isFilterPage =ref(false)
    const filter = new PanelFilter()
    async function getPermissions(query) {

        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `permission/crud/index${paramsQuery}`
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            permissions.value = data.data.data
            loading.value = false
        } else {
            loading.value = false
        }
    };
    async function getAllPermissions(query) {
        const form = {
            per_page:10000
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `permission/crud/index`
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.form =form
        let data = await AxiosMethod.axios_get()
        if (data) {
            allPermission.value = data.data.data
        }
    };
    function addPerPage(number) {
        filter.page = 1;
        page.value = 1;
        filter.per_page = number
        router.push('/permission/index/' +  filter.params_generator(route.query))
    }

    onBeforeRouteUpdate(async (to, from) => {

        if (!isFilterPage.value) {
            isFilter.value =true
            page.value = 1
            filter.page = 1
        }
        await getPermissions(to)
    })
    function addPagination(page) {
        filter.page = page
        filter.per_page = dataTableLength.value
        router.push('/permission/index/' + filter.query_maker())

    }
    watch(page, function (val) {
        if (!isFilter.value){
            isFilterPage.value = true
            addPagination(val)
        }
    })
    return {
        pageLength,
        permissions,
        permission,
        addPerPage,
        getPermissions,
        dataTableLength,
        page,
        header,
        loading,
        getAllPermissions,
        allPermission,
    }
}

