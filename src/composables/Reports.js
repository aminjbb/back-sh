import {ref} from 'vue';
import {AxiosCall} from '@/assets/js/axios_call.js'
import {useCookies} from "vue3-cookies";

export default function setup() {
    const commercialReportData = ref([]);
    const cookies = useCookies()
    const loading = ref(false);

    async function getCommercialReportData(from_date, to_date) {
        try {
            this.loading = true
            let now = new Date().getTime();
            let yesterday = new Date().getTime() - (24 * 60 * 60 * 1000);
            const AxiosMethod = new AxiosCall()
            AxiosMethod.token = cookies.cookies.get('adminToken')
            AxiosMethod.end_point = `system/reports/commercial?from_date=${from_date ?? yesterday}&to_date=${to_date ?? now}`
            AxiosMethod.using_auth = true
            AxiosMethod.toast_error = true
            let data = await AxiosMethod.axios_get()
            if (data) {
                commercialReportData.value = data.data
            }
            this.loading = false
        } catch (e) {
            this.loading = false
        }
    }

    return {
        commercialReportData, getCommercialReportData, loading
    }
}

