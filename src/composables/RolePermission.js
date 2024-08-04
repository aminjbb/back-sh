import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRoute} from 'vue-router'

export default function setup() {
    const rolePermissions = ref([]);
    const rolePermission = ref({});
    const allRolePermission = ref({});
    const page = ref(1);
    const pageLength = ref(1);
    const dataTableLength = ref(25);
    const cookies = useCookies()
    const route = useRoute()
    const header = ref([
        {name: 'ردیف', title:'ردیف', key:'row', show: true, align:'right', sortable: false},
        {name: 'شناسه', title:'شناسه', key:'id', show: true, align:'right', sortable: false},
        {name: 'عنوان', title:'عنوان', key:'title', show: true, align:'right', sortable: false},
        {name: 'نام فارسی', title:'نام فارسی', key:'name', show: true, align:'right', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true, minWidth:'5'}
    ]);
    const loading = ref(false)

    async function getRolePermissions() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }

        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }

        }
        AxiosMethod.end_point = `role/crud/index`
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
    }

    async function getAllRolePermission() {
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
    }

    async function getRolePermission() {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `role/crud/get/${route.params.roleId}`
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        let data = await AxiosMethod.axios_get()
        if (data) {
            rolePermission.value = data.data
        }
    }

    return {
        getRolePermissions,
        header,
        loading,
        page,
        rolePermissions,
        getRolePermission,
        rolePermission,
        allRolePermission,
        getAllRolePermission,
        pageLength,
        dataTableLength,
    }
}

