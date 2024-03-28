import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
export default function setup() {
    const zoneList = ref([]);
    const cookies = useCookies()
    const header =ref([
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'نام', show: true , value:'label', order: false},
        { name: 'نام انگلیسی', show: true, value:'name' , order: false},
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

