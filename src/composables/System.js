import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import { useRoute, useRouter} from "vue-router";

export default function setup() {
    const items = ref([]);
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()
    async function getSystemSetting ( query) {
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'system/setting/admin/crud/index'
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.using_auth =  true
        let data = await AxiosMethod.axios_get()
        if (data) {
            items.value = data.data
        }
        else {
        }
    };
    return {
        getSystemSetting , items
    }
}

