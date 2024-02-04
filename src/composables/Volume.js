import { ref } from 'vue';
import {  useRoute } from 'vue-router'
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";

export default function setup() {
    const volume = ref([]);
    const cookies = useCookies()
    const route = useRoute()
    async function  getVolume(query) {
        var formdata  ={}
        if(query){
             formdata  = query
        }
        else if (route.query) {
             formdata  = route.query
        }
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'product/volume/crud/index'
        AxiosMethod.form = formdata

        let data = await AxiosMethod.axios_get()
        if (data) {
            volume.value = data.data
        }
    };
    return { volume, getVolume   }
}

