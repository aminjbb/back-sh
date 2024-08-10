import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";
import {useRoute} from 'vue-router'

export default function setup() {
    const permissions = ref([]);
    const allPermission = ref([]);
    const permission = ref({});
    const dataTableLength = ref(25)
    const page = ref(1)
    const cookies = useCookies()
    const route = useRoute()
    const pageLength = ref(1)
    const loading = ref(false)
    const header = ref([
        {name: 'ردیف', show: true},
        {name: 'شناسه', show: true},
        {name: 'عنوان', show: true},
        {name: 'نام فارسی', show: true},
    ]);

    async function getPermissions() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true
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
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `permission/crud/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = data.data.last_page
            permissions.value = data.data.data
            loading.value = false
        } else {
            loading.value = false
        }
    }

    async function getAllPermissions() {
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

    return {
        pageLength,
        permissions,
        permission,
        getPermissions,
        dataTableLength,
        page,
        header,
        loading,
        getAllPermissions,
        allPermission,
    }
}

