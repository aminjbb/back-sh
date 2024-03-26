import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRouter, useRoute} from 'vue-router'
import {PanelFilter} from '@/assets/js/filter.js'
export default function setup() {
    const rolePermissions = ref([]);
    const rolePermission = ref({});
    const allRolePermission = ref({});
    const pageLength = ref(1);
    const dataTableLength = ref(25);
    const cookies = useCookies()
    const route = useRoute()
    const router = useRouter()
    const header = ref([
        {name: 'ردیف', show: true},
        {name: 'شناسه', show: true},
        {name: 'عنوان', show: true},
        {name: 'نام فارسی', show: true},
    ]);
    const loading = ref(false)
    const filter = new PanelFilter()
    async function getRolePermissions(query) {
        loading.value = true
        let paramsQuery = null
        if (query){
            paramsQuery = filter.params_generator(query.query)
        }
        else  paramsQuery = filter.params_generator(route.query)

        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `role/crud/index${paramsQuery}`
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.data.last_page
            rolePermissions.value = data.data.data
            loading.value = false
        } else {
            loading.value = false
        }
    };

    async function getAllRolePermission(query) {
        const form ={
            per_page:10000
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `role/crud/index`
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.form  =form
        let data = await AxiosMethod.axios_get()
        if (data) {
            allRolePermission.value = data.data.data
        }
    };
    async function getRolePermission(query) {

        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `role/crud/get/${route.params.roleId}`
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
            rolePermission.value = data.data
        }
    };
    function addPerPage(number){
        filter.page = 1
        filter.per_page =number
        router.push('/role-permission/index'+ filter.params_generator(route.query))
    }
    return {
        getRolePermissions,
        header,
        loading,
        rolePermissions,
        getRolePermission,
        rolePermission,
        allRolePermission,
        getAllRolePermission,
        pageLength,
        dataTableLength,
        addPerPage

    }
}

