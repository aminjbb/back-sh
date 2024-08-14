import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
export default function setup() {
    const zoneList = ref([]);
    const cookies = useCookies()
    const header =ref([
        { name: 'ردیف',title: 'ردیف', show: true , key: 'row', sortable:false, align:'center'},
        { name: 'نام',title: 'نام', show: true , key:'label', sortable: false, align:'center'},
        { name: 'نام انگلیسی',title: 'نام انگلیسی', show: true, key:'name' , sortable: false, align:'center'},
        { name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
    ]);
    const loading = ref(false)
    async function getZoneList() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `warehouse/zone/index`
        let data = await AxiosMethod.axios_get()
        if (data) {
            zoneList.value = data.data
            loading.value = false
        }
    };
    return {zoneList, getZoneList, header,loading}
}

